import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface User {
  id: number;
  username: string;
}

interface UserProfile {
  id: number;
  userId: number;
  totalCoins: number;
  gamesPlayed: number;
  totalCorrectAnswers: number;
  totalQuestions: number;
  highestStreak: number;
  createdAt: string;
  updatedAt: string;
}

interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  coinReward: number;
  requirement: number;
  category: string;
}

interface UserAchievement {
  id: number;
  userId: number;
  achievementId: number;
  unlockedAt: string;
  achievement: Achievement;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  profile: UserProfile | null;
  achievements: UserAchievement[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (username: string, password: string) => Promise<boolean>;
  signup: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  completeGame: (difficulty: number, questionsAnswered: number, correctAnswers: number, coinsEarned: number, gameMode?: string) => Promise<Achievement[]>;
  spendCoins: (amount: number, description: string) => Promise<boolean>;
}

export const useAuth = create<AuthState>()(
  subscribeWithSelector((set, get) => ({
    isAuthenticated: false,
    user: null,
    profile: null,
    achievements: [],
    isLoading: false,
    error: null,
    
    login: async (username: string, password: string) => {
      set({ isLoading: true, error: null });
      
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: 'include',
          body: JSON.stringify({ username, password }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          set({ error: data.error, isLoading: false });
          return false;
        }
        
        set({
          isAuthenticated: true,
          user: data.user,
          profile: data.profile,
          achievements: data.achievements || [],
          isLoading: false,
          error: null,
        });
        
        // Store user data in localStorage for persistence
        localStorage.setItem("authUser", JSON.stringify(data.user));
        
        return true;
      } catch (error) {
        set({ error: "Network error. Please try again.", isLoading: false });
        return false;
      }
    },
    
    signup: async (username: string, password: string) => {
      set({ isLoading: true, error: null });
      
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: 'include',
          body: JSON.stringify({ username, password }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          set({ error: data.error, isLoading: false });
          return false;
        }
        
        set({
          isAuthenticated: true,
          user: data.user,
          profile: data.profile,
          achievements: [],
          isLoading: false,
          error: null,
        });
        
        // Store user data in localStorage for persistence
        localStorage.setItem("authUser", JSON.stringify(data.user));
        
        return true;
      } catch (error) {
        set({ error: "Network error. Please try again.", isLoading: false });
        return false;
      }
    },
    
    logout: async () => {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          credentials: 'include'
        });
      } catch (error) {
        console.error('Logout request failed:', error);
      }
      
      set({
        isAuthenticated: false,
        user: null,
        profile: null,
        achievements: [],
        error: null,
      });
      localStorage.removeItem("authUser");
    },
    
    refreshProfile: async () => {
      try {
        const [profileResponse, achievementsResponse] = await Promise.all([
          fetch('/api/profile', { credentials: 'include' }),
          fetch('/api/achievements/user', { credentials: 'include' })
        ]);
        
        if (profileResponse.ok && achievementsResponse.ok) {
          const profile = await profileResponse.json();
          const achievements = await achievementsResponse.json();
          
          set({ profile, achievements });
        } else if (profileResponse.status === 401 || achievementsResponse.status === 401) {
          // Session expired, logout user
          get().logout();
        }
      } catch (error) {
        // Network error - server might not be running
        console.warn("Failed to refresh profile (server may be unavailable):", error);
        // Don't logout on network errors, just fail silently
        throw error;
      }
    },
    
    completeGame: async (difficulty: number, questionsAnswered: number, correctAnswers: number, coinsEarned: number, gameMode = "standard") => {
      try {
        const response = await fetch("/api/game/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: 'include',
          body: JSON.stringify({
            difficulty,
            questionsAnswered,
            correctAnswers,
            coinsEarned,
            gameMode,
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          
          // Update profile with new data
          if (data.profile) {
            set({ profile: data.profile });
          }
          
          // If there are new achievements, add them to the list
          if (data.newAchievements && data.newAchievements.length > 0) {
            const currentAchievements = get().achievements;
            const newUserAchievements = data.newAchievements.map((achievement: Achievement) => ({
              id: 0, // Will be set by the server
              userId: 0, // Will be handled server-side
              achievementId: achievement.id,
              unlockedAt: new Date().toISOString(),
              achievement,
            }));
            
            set({ achievements: [...currentAchievements, ...newUserAchievements] });
            return data.newAchievements;
          }
        } else if (response.status === 401) {
          get().logout();
        }
        
        return [];
      } catch (error) {
        console.error("Failed to complete game:", error);
        return [];
      }
    },
    
    spendCoins: async (amount: number, description: string) => {
      try {
        const response = await fetch("/api/coins/spend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: 'include',
          body: JSON.stringify({
            amount,
            description,
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.profile) {
            set({ profile: data.profile });
          }
          return true;
        } else if (response.status === 401) {
          get().logout();
          return false;
        } else {
          const errorData = await response.json();
          set({ error: errorData.error });
          return false;
        }
      } catch (error) {
        console.error("Failed to spend coins:", error);
        set({ error: "Failed to process transaction" });
        return false;
      }
    },
  }))
);

// Initialize auth state from localStorage on app start
const initializeAuth = async () => {
  const savedUser = localStorage.getItem("authUser");
  if (savedUser) {
    try {
      const user = JSON.parse(savedUser);
      useAuth.setState({ isAuthenticated: true, user });
      
      // Verify session is still valid by checking with server
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          // Session is valid, update state with fresh data
          useAuth.setState({
            isAuthenticated: true,
            user: data.user,
            profile: data.profile,
            achievements: data.achievements || []
          });
        } else {
          // Session expired or invalid, clear auth state
          console.warn("Session expired, clearing auth state");
          localStorage.removeItem("authUser");
          useAuth.setState({ isAuthenticated: false, user: null, profile: null });
        }
      } catch (error) {
        // Network error - keep local state but don't verify
        console.warn("Could not verify session (server may be unavailable):", error);
        // Don't clear auth state on network errors
      }
    } catch (error) {
      console.error("Failed to restore auth state:", error);
      localStorage.removeItem("authUser");
      useAuth.setState({ isAuthenticated: false, user: null });
    }
  }
};

// Call initialization when the module loads
if (typeof window !== 'undefined') {
  // Use setTimeout to avoid blocking initial render
  setTimeout(() => {
    initializeAuth().catch(console.error);
  }, 0);
}