import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull().unique(),
  totalCoins: integer("total_coins").default(0).notNull(),
  gamesPlayed: integer("games_played").default(0).notNull(),
  totalCorrectAnswers: integer("total_correct_answers").default(0).notNull(),
  totalQuestions: integer("total_questions").default(0).notNull(),
  highestStreak: integer("highest_streak").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const gameSessions = pgTable("game_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  difficulty: integer("difficulty").notNull(),
  questionsAnswered: integer("questions_answered").notNull(),
  correctAnswers: integer("correct_answers").notNull(),
  coinsEarned: integer("coins_earned").notNull(),
  gameMode: varchar("game_mode", { length: 50 }).default("standard").notNull(),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 50 }).notNull(),
  coinReward: integer("coin_reward").default(0).notNull(),
  requirement: integer("requirement").notNull(),
  category: varchar("category", { length: 50 }).notNull(), // "games", "coins", "streak", "difficulty"
});

export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  achievementId: integer("achievement_id").references(() => achievements.id).notNull(),
  unlockedAt: timestamp("unlocked_at").defaultNow().notNull(),
}, (table) => ({
  uniqueUserAchievement: {
    columns: [table.userId, table.achievementId],
    name: "unique_user_achievement"
  }
}));

export const coinTransactions = pgTable("coin_transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  amount: integer("amount").notNull(), // positive for earning, negative for spending
  type: varchar("type", { length: 50 }).notNull(), // "game_reward", "achievement", "shop_purchase"
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertUserProfileSchema = createInsertSchema(userProfiles).pick({
  userId: true,
  totalCoins: true,
  gamesPlayed: true,
  totalCorrectAnswers: true,
  totalQuestions: true,
  highestStreak: true,
});

export const insertGameSessionSchema = createInsertSchema(gameSessions).pick({
  userId: true,
  difficulty: true,
  questionsAnswered: true,
  correctAnswers: true,
  coinsEarned: true,
  gameMode: true,
});

export const insertAchievementSchema = createInsertSchema(achievements).pick({
  name: true,
  description: true,
  icon: true,
  coinReward: true,
  requirement: true,
  category: true,
});

export const insertUserAchievementSchema = createInsertSchema(userAchievements).pick({
  userId: true,
  achievementId: true,
});

export const insertCoinTransactionSchema = createInsertSchema(coinTransactions).pick({
  userId: true,
  amount: true,
  type: true,
  description: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type UserProfile = typeof userProfiles.$inferSelect;
export type GameSession = typeof gameSessions.$inferSelect;
export type Achievement = typeof achievements.$inferSelect;
export type UserAchievement = typeof userAchievements.$inferSelect;
export type CoinTransaction = typeof coinTransactions.$inferSelect;
