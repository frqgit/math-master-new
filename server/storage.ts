import { drizzle } from "drizzle-orm/neon-serverless";
import { neonConfig, Pool } from "@neondatabase/serverless";
import { eq, desc, and, sql } from "drizzle-orm";
import bcrypt from "bcryptjs";
import ws from "ws";
import { 
  users, userProfiles, gameSessions, achievements, userAchievements, coinTransactions,
  type User, type UserProfile, type GameSession, type Achievement, type UserAchievement, type CoinTransaction,
  type InsertUser, insertGameSessionSchema, insertUserAchievementSchema, insertCoinTransactionSchema
} from "@shared/schema";

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL environment variable is not set");
  console.error("💡 Please set DATABASE_URL to connect to your database");
  console.error("💡 Example: $env:DATABASE_URL=\"postgresql://user:pass@host/db\"");
  // Don't throw immediately - let the server start and show a warning
  // The error will be thrown when storage methods are called
}

// Configure WebSocket for Neon serverless
// Vercel Edge Runtime has native WebSocket, Node.js uses ws package
if (typeof WebSocket !== 'undefined') {
  neonConfig.webSocketConstructor = WebSocket;
} else {
  neonConfig.webSocketConstructor = ws;
}

// Lazy initialization - only create db connection when DATABASE_URL is available
let db: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set. Please configure your database connection.");
  }
  if (!db) {
    db = drizzle(process.env.DATABASE_URL);
  }
  return db;
}

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
  
  // User profile methods
  getUserProfile(userId: number): Promise<UserProfile | undefined>;
  createUserProfile(userId: number): Promise<UserProfile>;
  updateUserProfile(userId: number, updates: Partial<UserProfile>): Promise<UserProfile>;
  
  // Game session methods
  createGameSession(session: { userId: number; difficulty: number; questionsAnswered: number; correctAnswers: number; coinsEarned: number; gameMode?: string }): Promise<GameSession>;
  getUserGameSessions(userId: number, limit?: number): Promise<GameSession[]>;
  
  // Achievement methods
  getAllAchievements(): Promise<Achievement[]>;
  getUserAchievements(userId: number): Promise<(UserAchievement & { achievement: Achievement })[]>;
  unlockAchievement(userId: number, achievementId: number): Promise<UserAchievement>;
  checkAndUnlockAchievements(userId: number, profile: UserProfile): Promise<Achievement[]>;
  
  // Coin transaction methods
  addCoins(userId: number, amount: number, type: string, description: string): Promise<CoinTransaction>;
  spendCoins(userId: number, amount: number, description: string): Promise<CoinTransaction>;
  getCoinTransactions(userId: number, limit?: number): Promise<CoinTransaction[]>;
  
  // Game statistics
  getLeaderboard(limit?: number): Promise<(UserProfile & { user: User })[]>;
}

export class PostgresStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await getDb().select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await getDb().select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    // Hash password before storing
    const hashedPassword = await bcrypt.hash(user.password, 12);
    const userWithHashedPassword = { ...user, password: hashedPassword };
    
    const result = await getDb().insert(users).values(userWithHashedPassword).returning();
    const newUser = result[0];
    
    // Create user profile automatically
    await this.createUserProfile(newUser.id);
    
    return newUser;
  }

  async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // User profile methods
  async getUserProfile(userId: number): Promise<UserProfile | undefined> {
    const result = await getDb().select().from(userProfiles).where(eq(userProfiles.userId, userId)).limit(1);
    return result[0];
  }

  async createUserProfile(userId: number): Promise<UserProfile> {
    const result = await getDb().insert(userProfiles).values({ userId }).returning();
    return result[0];
  }

  async updateUserProfile(userId: number, updates: Partial<UserProfile>): Promise<UserProfile> {
    const result = await getDb()
      .update(userProfiles)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(userProfiles.userId, userId))
      .returning();
    return result[0];
  }

  // Game session methods
  async createGameSession(session: { userId: number; difficulty: number; questionsAnswered: number; correctAnswers: number; coinsEarned: number; gameMode?: string }): Promise<GameSession> {
    return await getDb().transaction(async (tx) => {
      // Create game session
      const gameResult = await tx.insert(gameSessions).values(session).returning();
      const gameSession = gameResult[0];
      
      // Update user profile aggregates atomically
      const currentProfile = await tx.select().from(userProfiles).where(eq(userProfiles.userId, session.userId)).limit(1);
      if (currentProfile[0]) {
        const currentStreak = session.correctAnswers === session.questionsAnswered ? 
          currentProfile[0].highestStreak + session.correctAnswers : 0;
        
        await tx
          .update(userProfiles)
          .set({
            gamesPlayed: currentProfile[0].gamesPlayed + 1,
            totalCorrectAnswers: currentProfile[0].totalCorrectAnswers + session.correctAnswers,
            totalQuestions: currentProfile[0].totalQuestions + session.questionsAnswered,
            highestStreak: Math.max(currentProfile[0].highestStreak, currentStreak),
            updatedAt: new Date()
          })
          .where(eq(userProfiles.userId, session.userId));
        
        // Add coins atomically
        if (session.coinsEarned > 0) {
          await tx.insert(coinTransactions).values({
            userId: session.userId,
            amount: session.coinsEarned,
            type: "game_reward",
            description: `Game completed: ${session.correctAnswers}/${session.questionsAnswered} correct`
          });
          
          await tx
            .update(userProfiles)
            .set({ 
              totalCoins: sql`${userProfiles.totalCoins} + ${session.coinsEarned}`,
              updatedAt: new Date()
            })
            .where(eq(userProfiles.userId, session.userId));
        }
      }
      
      return gameSession;
    });
  }

  async getUserGameSessions(userId: number, limit: number = 10): Promise<GameSession[]> {
    return await getDb()
      .select()
      .from(gameSessions)
      .where(eq(gameSessions.userId, userId))
      .orderBy(desc(gameSessions.completedAt))
      .limit(limit);
  }

  // Achievement methods
  async getAllAchievements(): Promise<Achievement[]> {
    return await getDb().select().from(achievements);
  }

  async getUserAchievements(userId: number): Promise<(UserAchievement & { achievement: Achievement })[]> {
    const result = await getDb()
      .select({
        id: userAchievements.id,
        userId: userAchievements.userId,
        achievementId: userAchievements.achievementId,
        unlockedAt: userAchievements.unlockedAt,
        achievement: achievements
      })
      .from(userAchievements)
      .innerJoin(achievements, eq(userAchievements.achievementId, achievements.id))
      .where(eq(userAchievements.userId, userId))
      .orderBy(desc(userAchievements.unlockedAt));
    return result;
  }

  async unlockAchievement(userId: number, achievementId: number): Promise<UserAchievement> {
    return await getDb().transaction(async (tx) => {
      // Check if already unlocked using unique constraint
      try {
        // Unlock achievement - will fail if already exists due to unique constraint
        const result = await tx.insert(userAchievements).values({ userId, achievementId }).returning();
        
        // Get achievement details and award coins atomically
        const achievement = await tx.select().from(achievements).where(eq(achievements.id, achievementId)).limit(1);
        if (achievement[0]?.coinReward > 0) {
          await tx.insert(coinTransactions).values({
            userId,
            amount: achievement[0].coinReward,
            type: "achievement",
            description: `Achievement: ${achievement[0].name}`
          });
          
          await tx
            .update(userProfiles)
            .set({ 
              totalCoins: sql`${userProfiles.totalCoins} + ${achievement[0].coinReward}`,
              updatedAt: new Date()
            })
            .where(eq(userProfiles.userId, userId));
        }
        
        return result[0];
      } catch (error) {
        // Achievement already unlocked - fetch existing
        const existing = await tx
          .select()
          .from(userAchievements)
          .where(and(eq(userAchievements.userId, userId), eq(userAchievements.achievementId, achievementId)))
          .limit(1);
        return existing[0];
      }
    });
  }

  async checkAndUnlockAchievements(userId: number, profile: UserProfile): Promise<Achievement[]> {
    const allAchievements = await this.getAllAchievements();
    const userAchievements = await this.getUserAchievements(userId);
    const unlockedIds = new Set(userAchievements.map(ua => ua.achievementId));
    
    const newlyUnlocked: Achievement[] = [];
    
    // Get additional data for complex achievements
    const recentSessions = await this.getUserGameSessions(userId, 50);
    const difficultyLevelsCompleted = new Set(recentSessions.map(s => s.difficulty));
    
    for (const achievement of allAchievements) {
      if (unlockedIds.has(achievement.id)) continue;
      
      let shouldUnlock = false;
      
      switch (achievement.category) {
        case "games":
          shouldUnlock = profile.gamesPlayed >= achievement.requirement;
          break;
        case "coins":
          shouldUnlock = profile.totalCoins >= achievement.requirement;
          break;
        case "streak":
          shouldUnlock = profile.highestStreak >= achievement.requirement;
          break;
        case "accuracy":
          const accuracy = profile.totalQuestions > 0 ? (profile.totalCorrectAnswers / profile.totalQuestions) * 100 : 0;
          shouldUnlock = accuracy >= achievement.requirement;
          break;
        case "difficulty":
          // Check if player has completed games in required number of difficulty levels
          const completedLevels = difficultyLevelsCompleted.size;
          shouldUnlock = completedLevels >= achievement.requirement;
          break;
        case "speed":
          // For now, we'll unlock speed achievements based on total correct answers
          // This is a simplified implementation - in a real game we'd track actual speed
          shouldUnlock = profile.totalCorrectAnswers >= achievement.requirement;
          break;
        case "perfect_game":
          // Check for perfect games (100% accuracy in sessions with 10+ questions)
          const perfectGames = recentSessions.filter(s => 
            s.questionsAnswered >= 10 && 
            s.correctAnswers === s.questionsAnswered
          );
          shouldUnlock = perfectGames.length > 0;
          break;
        case "consistency":
          // Check for consistent accuracy across recent games
          const recentGames = recentSessions.slice(0, achievement.requirement);
          if (recentGames.length >= achievement.requirement) {
            const consistentAccuracy = recentGames.every(game => 
              game.questionsAnswered > 0 && 
              (game.correctAnswers / game.questionsAnswered) >= 0.8
            );
            shouldUnlock = consistentAccuracy;
          }
          break;
        case "daily_streak":
          // For now, simplified to games played (would need daily tracking in real implementation)
          shouldUnlock = profile.gamesPlayed >= achievement.requirement;
          break;
      }
      
      if (shouldUnlock) {
        await this.unlockAchievement(userId, achievement.id);
        newlyUnlocked.push(achievement);
      }
    }
    
    return newlyUnlocked;
  }

  // Coin transaction methods
  async addCoins(userId: number, amount: number, type: string, description: string): Promise<CoinTransaction> {
    return await getDb().transaction(async (tx) => {
      // Add coin transaction
      const transaction = await tx.insert(coinTransactions).values({
        userId,
        amount,
        type,
        description
      }).returning();
      
      // Update user profile atomically
      await tx
        .update(userProfiles)
        .set({ 
          totalCoins: sql`${userProfiles.totalCoins} + ${amount}`,
          updatedAt: new Date()
        })
        .where(eq(userProfiles.userId, userId));
      
      return transaction[0];
    });
  }

  async spendCoins(userId: number, amount: number, description: string): Promise<CoinTransaction> {
    return await getDb().transaction(async (tx) => {
      // Atomic check and update - will fail if insufficient coins
      const updateResult = await tx
        .update(userProfiles)
        .set({ 
          totalCoins: sql`${userProfiles.totalCoins} - ${amount}`,
          updatedAt: new Date()
        })
        .where(and(
          eq(userProfiles.userId, userId),
          sql`${userProfiles.totalCoins} >= ${amount}`
        ))
        .returning();
      
      if (updateResult.length === 0) {
        throw new Error("Insufficient coins");
      }
      
      // Add negative coin transaction
      const transaction = await tx.insert(coinTransactions).values({
        userId,
        amount: -amount,
        type: "shop_purchase",
        description
      }).returning();
      
      return transaction[0];
    });
  }

  async getCoinTransactions(userId: number, limit: number = 10): Promise<CoinTransaction[]> {
    return await getDb()
      .select()
      .from(coinTransactions)
      .where(eq(coinTransactions.userId, userId))
      .orderBy(desc(coinTransactions.createdAt))
      .limit(limit);
  }

  // Game statistics
  async getLeaderboard(limit: number = 10): Promise<(UserProfile & { user: User })[]> {
    const result = await getDb()
      .select({
        id: userProfiles.id,
        userId: userProfiles.userId,
        totalCoins: userProfiles.totalCoins,
        gamesPlayed: userProfiles.gamesPlayed,
        totalCorrectAnswers: userProfiles.totalCorrectAnswers,
        totalQuestions: userProfiles.totalQuestions,
        highestStreak: userProfiles.highestStreak,
        createdAt: userProfiles.createdAt,
        updatedAt: userProfiles.updatedAt,
        user: users
      })
      .from(userProfiles)
      .innerJoin(users, eq(userProfiles.userId, users.id))
      .orderBy(desc(userProfiles.totalCoins))
      .limit(limit);
    return result;
  }
}

export const storage = new PostgresStorage();
