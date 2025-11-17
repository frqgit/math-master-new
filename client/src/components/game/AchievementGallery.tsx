import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/lib/stores/useAuth";
import { motion } from "framer-motion";
import { Award, Lock, Coins, ArrowLeft, Trophy, Target, Star, Crown, Gem, Diamond, Zap, Flame } from "lucide-react";

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

interface AchievementGalleryProps {
  onClose: () => void;
}

const categoryColors: Record<string, string> = {
  games: "bg-blue-100 text-blue-700 border-blue-200",
  coins: "bg-yellow-100 text-yellow-700 border-yellow-200",
  streak: "bg-red-100 text-red-700 border-red-200",
  accuracy: "bg-green-100 text-green-700 border-green-200",
  difficulty: "bg-purple-100 text-purple-700 border-purple-200",
  speed: "bg-orange-100 text-orange-700 border-orange-200",
  perfect_game: "bg-pink-100 text-pink-700 border-pink-200",
  consistency: "bg-indigo-100 text-indigo-700 border-indigo-200",
  daily_streak: "bg-teal-100 text-teal-700 border-teal-200",
};

const categoryIcons: Record<string, any> = {
  games: Trophy,
  coins: Coins,
  streak: Zap,
  accuracy: Target,
  difficulty: Crown,
  speed: Flame,
  perfect_game: Star,
  consistency: Award,
  daily_streak: Diamond,
};

export default function AchievementGallery({ onClose }: AchievementGalleryProps) {
  const { profile } = useAuth();
  const [allAchievements, setAllAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const [allResponse, userResponse] = await Promise.all([
          fetch('/api/achievements', { credentials: 'include' }),
          fetch('/api/achievements/user', { credentials: 'include' })
        ]);

        if (allResponse.ok && userResponse.ok) {
          const all = await allResponse.json();
          const user = await userResponse.json();
          setAllAchievements(all);
          setUserAchievements(user);
        }
      } catch (error) {
        console.error('Failed to fetch achievements:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const unlockedIds = new Set(userAchievements.map(ua => ua.achievementId));
  const categories = Array.from(new Set(allAchievements.map(a => a.category)));
  
  const filteredAchievements = selectedCategory 
    ? allAchievements.filter(a => a.category === selectedCategory)
    : allAchievements;

  const getProgress = (achievement: Achievement) => {
    if (!profile) return 0;
    
    switch (achievement.category) {
      case "games":
        return Math.min((profile.gamesPlayed / achievement.requirement) * 100, 100);
      case "coins":
        return Math.min((profile.totalCoins / achievement.requirement) * 100, 100);
      case "streak":
        return Math.min((profile.highestStreak / achievement.requirement) * 100, 100);
      case "accuracy":
        const accuracy = profile.totalQuestions > 0 ? (profile.totalCorrectAnswers / profile.totalQuestions) * 100 : 0;
        return Math.min((accuracy / achievement.requirement) * 100, 100);
      case "difficulty":
        // For difficulty achievements, estimate based on games played across different levels
        const estimatedLevels = Math.min(Math.floor(profile.gamesPlayed / 5), achievement.requirement);
        return Math.min((estimatedLevels / achievement.requirement) * 100, 100);
      case "speed":
        // Speed achievements based on correct answers (simplified for now)
        return Math.min((profile.totalCorrectAnswers / achievement.requirement) * 100, 100);
      case "perfect_game":
        // Binary achievement - either achieved or not, show as partial progress
        return profile.gamesPlayed >= 5 ? 80 : (profile.gamesPlayed / 5) * 50;
      case "consistency":
        // Show progress towards consistency requirement
        const recentGameEstimate = Math.min(profile.gamesPlayed, achievement.requirement);
        return Math.min((recentGameEstimate / achievement.requirement) * 100, 100);
      case "daily_streak":
        // Simplified as games played for now
        return Math.min((profile.gamesPlayed / achievement.requirement) * 100, 100);
      default:
        return 0;
    }
  };

  const formatCategoryName = (category: string) => {
    return category.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getProgressText = (achievement: Achievement) => {
    if (!profile) return `Need: ${achievement.requirement}`;
    
    switch (achievement.category) {
      case "games":
        return `${profile.gamesPlayed}/${achievement.requirement} games played`;
      case "coins":
        return `${profile.totalCoins}/${achievement.requirement} coins earned`;
      case "streak":
        return `${profile.highestStreak}/${achievement.requirement} streak record`;
      case "accuracy":
        const accuracy = profile.totalQuestions > 0 ? Math.round((profile.totalCorrectAnswers / profile.totalQuestions) * 100) : 0;
        return `${accuracy}%/${achievement.requirement}% accuracy`;
      case "difficulty":
        const estimatedLevels = Math.min(Math.floor(profile.gamesPlayed / 5), achievement.requirement);
        return `${estimatedLevels}/${achievement.requirement} difficulty levels`;
      case "speed":
        return `${profile.totalCorrectAnswers}/${achievement.requirement} fast answers`;
      case "perfect_game":
        return `Need: Perfect game (100% accuracy)`;
      case "consistency":
        return `Need: ${achievement.requirement} consistent games`;
      case "daily_streak":
        return `${Math.min(profile.gamesPlayed, achievement.requirement)}/${achievement.requirement} daily sessions`;
      default:
        return `Requirement: ${achievement.requirement}`;
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading achievements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-6 w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-800">Achievement Gallery</h2>
          </div>
          <Button onClick={onClose} variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Game
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            onClick={() => setSelectedCategory(null)}
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            className="text-xs"
          >
            All Categories
          </Button>
          {categories.map(category => {
            const IconComponent = categoryIcons[category] || Award;
            return (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className="text-xs"
              >
                <IconComponent className="w-3 h-3 mr-1" />
                {formatCategoryName(category)}
              </Button>
            );
          })}
        </div>

        {/* Achievement Grid */}
        <div className="overflow-y-auto max-h-[60vh] pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAchievements.map((achievement, index) => {
              const isUnlocked = unlockedIds.has(achievement.id);
              const progress = getProgress(achievement);
              const categoryColor = categoryColors[achievement.category] || "bg-gray-100 text-gray-700 border-gray-200";
              const IconComponent = categoryIcons[achievement.category] || Award;

              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`p-4 h-full transition-all duration-200 ${
                    isUnlocked 
                      ? 'border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-lg' 
                      : 'border border-gray-200 bg-white hover:shadow-md'
                  }`}>
                    {/* Achievement Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${isUnlocked ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                          {isUnlocked ? (
                            <span className="text-2xl">{achievement.icon}</span>
                          ) : (
                            <Lock className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs border ${categoryColor}`}>
                          <IconComponent className="w-3 h-3 inline mr-1" />
                          {formatCategoryName(achievement.category)}
                        </div>
                      </div>
                      {isUnlocked && (
                        <div className="flex items-center gap-1 text-yellow-600 text-sm font-bold">
                          <Coins className="w-4 h-4" />
                          +{achievement.coinReward}
                        </div>
                      )}
                    </div>

                    {/* Achievement Info */}
                    <div className="mb-3">
                      <h3 className={`font-bold mb-1 ${isUnlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                        {achievement.name}
                      </h3>
                      <p className={`text-sm ${isUnlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                        {achievement.description}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    {!isUnlocked && (
                      <div className="mb-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Unlock Status */}
                    {isUnlocked ? (
                      <div className="text-center py-2">
                        <span className="text-green-600 font-bold text-sm">✓ UNLOCKED!</span>
                      </div>
                    ) : (
                      <div className="text-center py-2">
                        <span className="text-gray-400 text-xs">
                          {getProgressText(achievement)}
                        </span>
                      </div>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-2xl">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {userAchievements.length}
              </div>
              <div className="text-sm text-gray-600">Unlocked</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {allAchievements.length - userAchievements.length}
              </div>
              <div className="text-sm text-gray-600">Remaining</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {Math.round((userAchievements.length / allAchievements.length) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}