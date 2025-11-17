import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useMultiplicationGame } from "@/lib/stores/useMultiplicationGame";
import { useAuth } from "@/lib/stores/useAuth";
import { motion } from "framer-motion";
import { Trophy, Star, Coins, RotateCcw, Home, Award } from "lucide-react";
import { getScoreMessage } from "@/lib/gameUtils";

export default function CelebrationEffect() {
  const { stats, setPhase, startNewRound, resetGame, difficulty } = useMultiplicationGame();
  const { completeGame, profile } = useAuth();
  const [showConfetti, setShowConfetti] = useState(true);
  const [newAchievements, setNewAchievements] = useState<any[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const percentage = stats.totalQuestions > 0 
    ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100)
    : 0;

  // Submit game results to backend when component mounts
  useEffect(() => {
    const submitGameResults = async () => {
      if (!isSubmitted) {
        setIsSubmitted(true);
        const achievements = await completeGame(
          difficulty,
          stats.totalQuestions,
          stats.correctAnswers,
          stats.coinsEarned
        );
        setNewAchievements(achievements);
      }
    };

    submitGameResults();
  }, []);

  // Hide confetti after animation
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Generate confetti particles
  const confettiParticles = Array.from({ length: 50 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute w-3 h-3 bg-yellow-400 rounded-full"
      initial={{
        x: Math.random() * window.innerWidth,
        y: -20,
        rotate: 0,
        scale: Math.random() * 0.5 + 0.5
      }}
      animate={{
        y: window.innerHeight + 20,
        rotate: 360,
        transition: {
          duration: Math.random() * 3 + 2,
          ease: "linear",
          delay: Math.random() * 2
        }
      }}
    />
  ));

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 relative">
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {confettiParticles}
        </div>
      )}

      <Card className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl max-w-md w-full text-center z-20">
        {/* Trophy animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-6"
        >
          <Trophy className="w-20 h-20 text-yellow-500 mx-auto" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-gray-800 mb-4"
        >
          Round Complete!
        </motion.h1>

        {/* Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <div className="text-6xl font-bold text-purple-600 mb-2">
            {percentage}%
          </div>
          <div className="text-lg text-gray-600">
            {stats.correctAnswers} out of {stats.totalQuestions} correct
          </div>
        </motion.div>

        {/* Coins earned */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-yellow-100 p-4 rounded-2xl mb-6"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Coins className="w-6 h-6 text-yellow-600" />
            <span className="text-xl font-bold text-yellow-700">
              +{stats.coinsEarned} Cent{stats.coinsEarned !== 1 ? 's' : ''} Earned!
            </span>
          </div>
          <div className="text-sm text-yellow-600">
            Total: {profile?.totalCoins || 0} cent{(profile?.totalCoins || 0) !== 1 ? 's' : ''}
          </div>
          <div className="flex justify-center mt-2">
            {Array.from({ length: Math.min(stats.coinsEarned, 5) }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
              >
                <Star className="w-6 h-6 text-yellow-500" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* New achievements */}
        {newAchievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0 }}
            className="bg-purple-100 p-4 rounded-2xl mb-6"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Award className="w-6 h-6 text-purple-600" />
              <span className="text-lg font-bold text-purple-700">
                New Achievement{newAchievements.length > 1 ? 's' : ''} Unlocked!
              </span>
            </div>
            <div className="space-y-2">
              {newAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.2 }}
                  className="bg-white p-3 rounded-xl flex items-center gap-3"
                >
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="font-bold text-purple-700">{achievement.name}</div>
                    <div className="text-sm text-purple-600">{achievement.description}</div>
                  </div>
                  {achievement.coinReward > 0 && (
                    <div className="text-yellow-600 font-bold">+{achievement.coinReward} 🪙</div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Encouragement message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-lg text-gray-600 mb-8"
        >
          {getScoreMessage(percentage)}
        </motion.p>

        {/* Action buttons - Always visible */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3 mt-6 border-t pt-6 border-gray-200"
        >
          <Button
            onClick={startNewRound}
            className="w-full py-3 text-lg font-bold bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-2xl"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Play Again
          </Button>
          
          <Button
            onClick={() => setPhase("difficulty")}
            variant="outline"
            className="w-full py-3 text-lg font-bold rounded-2xl"
          >
            Choose New Level
          </Button>
          
          <Button
            onClick={resetGame}
            variant="ghost"
            className="w-full py-2 text-gray-600 hover:text-gray-800"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Menu
          </Button>
        </motion.div>
      </Card>
    </div>
  );
}
