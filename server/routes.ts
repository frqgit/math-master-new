import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

  // Authentication middleware
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.session?.userId) {
      return res.status(401).json({ error: "Authentication required" });
    }
    next();
  };

// Register routes without creating a server (for Vercel)
export function registerRoutesOnly(app: Express): void {
  // Authentication routes
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(409).json({ error: "Username already exists" });
      }
      
      const user = await storage.createUser({ username, password });
      const profile = await storage.getUserProfile(user.id);
      
      // Create session
      req.session.userId = user.id;
      req.session.username = user.username;
      
      // Save session explicitly
      req.session.save((err) => {
        if (err) {
          console.error("Session save error:", err);
          return res.status(500).json({ error: "Failed to create session" });
        }
        
        res.json({ 
          user: { id: user.id, username: user.username }, 
          profile,
          achievements: []
        });
      });
    } catch (error) {
      console.error("Signup error:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      // Provide more helpful error messages
      if (errorMessage.includes("DATABASE_URL")) {
        return res.status(500).json({ 
          error: "Database not configured. Please set DATABASE_URL environment variable.",
          details: "See DATABASE_SETUP.md for instructions"
        });
      }
      
      if (errorMessage.includes("does not exist") || errorMessage.includes("relation") || errorMessage.includes("table")) {
        return res.status(500).json({ 
          error: "Database tables not found. Please run 'npm run db:push' to create the schema.",
          details: errorMessage
        });
      }
      
      res.status(500).json({ 
        error: "Internal server error",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined
      });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      const isValidPassword = await storage.verifyPassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      // Get profile and achievements
      const profile = await storage.getUserProfile(user.id);
      const achievements = await storage.getUserAchievements(user.id);
      
      // Create session
      req.session.userId = user.id;
      req.session.username = user.username;
      
      // Save session explicitly
      req.session.save((err) => {
        if (err) {
          console.error("Session save error:", err);
          return res.status(500).json({ error: "Failed to create session" });
        }
        
        res.json({ 
          user: { id: user.id, username: user.username }, 
          profile,
          achievements
        });
      });
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      if (errorMessage.includes("DATABASE_URL")) {
        return res.status(500).json({ 
          error: "Database not configured. Please set DATABASE_URL environment variable.",
          details: "See DATABASE_SETUP.md for instructions"
        });
      }
      
      if (errorMessage.includes("does not exist") || errorMessage.includes("relation") || errorMessage.includes("table")) {
        return res.status(500).json({ 
          error: "Database tables not found. Please run 'npm run db:push' to create the schema.",
          details: errorMessage
        });
      }
      
      res.status(500).json({ 
        error: "Internal server error",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined
      });
    }
  });

  // Session check endpoint
  app.get("/api/auth/me", async (req, res) => {
    try {
      if (!req.session?.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      
      const userId = req.session.userId;
      const user = await storage.getUser(userId);
      const profile = await storage.getUserProfile(userId);
      const achievements = await storage.getUserAchievements(userId);
      
      if (!user) {
        req.session.destroy(() => {});
        return res.status(401).json({ error: "User not found" });
      }
      
      res.json({
        user: { id: user.id, username: user.username },
        profile,
        achievements
      });
    } catch (error) {
      console.error("Session check error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/logout", requireAuth, async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ error: "Failed to logout" });
        }
        res.json({ success: true });
      });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // User profile routes
  app.get("/api/profile", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const profile = await storage.getUserProfile(userId);
      
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      
      res.json(profile);
    } catch (error) {
      console.error("Get profile error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Game session routes
  app.post("/api/game/complete", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const { difficulty, questionsAnswered, correctAnswers, coinsEarned, gameMode = "standard" } = req.body;
      
      if (!difficulty || questionsAnswered === undefined || correctAnswers === undefined || coinsEarned === undefined) {
        return res.status(400).json({ error: "Missing required game session data" });
      }
      
      // Create game session (also updates profile and adds coins atomically)
      const gameSession = await storage.createGameSession({
        userId,
        difficulty,
        questionsAnswered,
        correctAnswers,
        coinsEarned,
        gameMode
      });
      
      // Get updated profile
      const profile = await storage.getUserProfile(userId);
      
      // Check for new achievements
      if (profile) {
        const newAchievements = await storage.checkAndUnlockAchievements(userId, profile);
        
        res.json({ 
          gameSession, 
          profile, 
          newAchievements 
        });
      } else {
        res.json({ gameSession });
      }
    } catch (error) {
      console.error("Complete game error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/game/sessions", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const sessions = await storage.getUserGameSessions(userId, limit);
      res.json(sessions);
    } catch (error) {
      console.error("Get sessions error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Achievement routes
  app.get("/api/achievements", requireAuth, async (req, res) => {
    try {
      const achievements = await storage.getAllAchievements();
      res.json(achievements);
    } catch (error) {
      console.error("Get achievements error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/achievements/user", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const userAchievements = await storage.getUserAchievements(userId);
      res.json(userAchievements);
    } catch (error) {
      console.error("Get user achievements error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Coin transaction routes
  app.post("/api/coins/spend", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const { amount, description } = req.body;
      
      if (!amount || !description) {
        return res.status(400).json({ error: "Missing required data for coin transaction" });
      }
      
      const transaction = await storage.spendCoins(userId, parseInt(amount), description);
      const profile = await storage.getUserProfile(userId);
      
      res.json({ transaction, profile });
    } catch (error) {
      if (error instanceof Error && error.message === "Insufficient coins") {
        return res.status(400).json({ error: "Insufficient coins" });
      }
      console.error("Spend coins error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/coins/transactions", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const transactions = await storage.getCoinTransactions(userId, limit);
      res.json(transactions);
    } catch (error) {
      console.error("Get transactions error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Leaderboard route
  app.get("/api/leaderboard", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const leaderboard = await storage.getLeaderboard(limit);
      res.json(leaderboard);
    } catch (error) {
      console.error("Get leaderboard error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
}

// Register routes and create HTTP server (for traditional Express server)
export async function registerRoutes(app: Express): Promise<Server> {
  registerRoutesOnly(app);
  const httpServer = createServer(app);
  return httpServer;
}
