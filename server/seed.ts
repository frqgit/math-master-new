import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { achievements } from "../shared/schema";
import dotenv from "dotenv";

dotenv.config();

const initialAchievements = [
  // Games category
  { name: "First Steps", description: "Complete your first game", icon: "🎯", coinReward: 10, requirement: 1, category: "games" },
  { name: "Getting Started", description: "Play 5 games", icon: "🎮", coinReward: 25, requirement: 5, category: "games" },
  { name: "Practice Makes Perfect", description: "Play 10 games", icon: "💪", coinReward: 50, requirement: 10, category: "games" },
  { name: "Dedicated Learner", description: "Play 25 games", icon: "📚", coinReward: 100, requirement: 25, category: "games" },
  { name: "Math Master", description: "Play 50 games", icon: "🎓", coinReward: 200, requirement: 50, category: "games" },
  
  // Coins category
  { name: "Coin Collector", description: "Earn 100 coins", icon: "💰", coinReward: 50, requirement: 100, category: "coins" },
  { name: "Treasure Hunter", description: "Earn 500 coins", icon: "💎", coinReward: 100, requirement: 500, category: "coins" },
  { name: "Rich Student", description: "Earn 1000 coins", icon: "👑", coinReward: 250, requirement: 1000, category: "coins" },
  
  // Streak category
  { name: "Hot Streak", description: "Get a 5 question streak", icon: "🔥", coinReward: 30, requirement: 5, category: "streak" },
  { name: "Unstoppable", description: "Get a 10 question streak", icon: "⚡", coinReward: 75, requirement: 10, category: "streak" },
  { name: "Legendary", description: "Get a 20 question streak", icon: "🌟", coinReward: 150, requirement: 20, category: "streak" },
  
  // Accuracy category
  { name: "Sharp Shooter", description: "Achieve 80% accuracy overall", icon: "🎯", coinReward: 100, requirement: 80, category: "accuracy" },
  { name: "Perfectionist", description: "Achieve 90% accuracy overall", icon: "✨", coinReward: 200, requirement: 90, category: "accuracy" },
  { name: "Math Genius", description: "Achieve 95% accuracy overall", icon: "🧠", coinReward: 500, requirement: 95, category: "accuracy" },
  
  // Perfect game
  { name: "Flawless Victory", description: "Complete a game with 100% accuracy", icon: "🏆", coinReward: 150, requirement: 1, category: "perfect_game" },
  
  // Consistency
  { name: "Consistent Performer", description: "Maintain 80%+ accuracy over 5 games", icon: "📈", coinReward: 200, requirement: 5, category: "consistency" },
];

async function seedDatabase() {
  try {
    console.log("🌱 Seeding database with initial achievements...");
    
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL not set in .env file");
    }

    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = drizzle(pool);
    
    // Insert achievements
    for (const achievement of initialAchievements) {
      try {
        await db.insert(achievements).values(achievement);
        console.log(`✅ Added achievement: ${achievement.name}`);
      } catch (error: any) {
        if (error.message?.includes('duplicate key') || error.message?.includes('unique constraint')) {
          console.log(`⏭️  Skipped (already exists): ${achievement.name}`);
        } else {
          throw error;
        }
      }
    }
    
    console.log("\n✅ Database seeded successfully!");
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();