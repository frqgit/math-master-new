import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useMultiplicationGame } from "@/lib/stores/useMultiplicationGame";
import { ArrowLeft, Clock, Zap, Target, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function TimeSelector() {
  const { setTimePerQuestion, setPhase, startNewRound, difficulty } = useMultiplicationGame();

  const timeOptions = [
    { 
      seconds: 10, 
      label: "Fast", 
      color: "bg-red-500", 
      icon: Zap,
      description: "Quick thinking!", 
      difficulty: "Hard" 
    },
    { 
      seconds: 20, 
      label: "Medium", 
      color: "bg-yellow-500", 
      icon: Target,
      description: "Balanced pace", 
      difficulty: "Normal" 
    },
    { 
      seconds: 30, 
      label: "Relaxed", 
      color: "bg-green-500", 
      icon: Star,
      description: "Take your time", 
      difficulty: "Easy" 
    },
  ];

  const handleSelectTime = (seconds: number) => {
    setTimePerQuestion(seconds);
    startNewRound();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <Card className="bg-white/95 backdrop-blur-sm p-6 rounded-3xl shadow-2xl max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => setPhase("difficulty")}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Choose Your Speed</h2>
            <p className="text-gray-600 mt-2">How much time per question?</p>
          </div>
          <div className="w-20"></div> {/* Spacer */}
        </div>

        {/* Current selection info */}
        <div className="text-center mb-8">
          <div className="text-lg text-purple-600 font-bold">
            {difficulty}× Table Selected
          </div>
        </div>

        {/* Time options */}
        <div className="space-y-4 mb-8">
          {timeOptions.map((option, index) => {
            const IconComponent = option.icon;
            
            return (
              <motion.div
                key={option.seconds}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  onClick={() => handleSelectTime(option.seconds)}
                  className={`${option.color} hover:opacity-90 text-white font-bold py-6 px-6 rounded-2xl shadow-lg w-full transform hover:scale-105 transition-all duration-200 flex items-center justify-between`}
                >
                  <div className="flex items-center gap-4">
                    <IconComponent className="w-8 h-8" />
                    <div className="text-left">
                      <div className="text-2xl font-bold">{option.seconds} Seconds</div>
                      <div className="text-lg opacity-90">{option.label}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm opacity-90">{option.description}</div>
                    <div className="text-xs opacity-75">{option.difficulty}</div>
                  </div>
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
            <Clock className="w-5 h-5" />
            <span className="text-lg">Choose your challenge level!</span>
          </div>
          <p className="text-gray-500 text-sm">
            Faster times = Higher difficulty, but same coin rewards!
          </p>
        </div>
      </Card>
    </div>
  );
}