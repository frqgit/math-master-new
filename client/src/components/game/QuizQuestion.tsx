import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useMultiplicationGame } from "@/lib/stores/useMultiplicationGame";
import { useAudio } from "@/lib/stores/useAudio";
import GameTimer from "./GameTimer";
import { ArrowLeft, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function QuizQuestion() {
  const {
    currentQuestion,
    questionIndex,
    questionsPerRound,
    difficulty,
    answerQuestion,
    nextQuestion,
    setPhase,
    generateQuestion,
    stats
  } = useMultiplicationGame();

  const { playHit, playSuccess } = useAudio();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Generate first question if none exists
  useEffect(() => {
    if (!currentQuestion) {
      generateQuestion();
    }
  }, [currentQuestion, generateQuestion]);

  const handleAnswerSelect = (answer: number) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    const correct = answerQuestion(answer);
    setIsCorrect(correct);
    setShowResult(true);

    // Play sound effect
    if (correct) {
      playSuccess();
    } else {
      playHit();
    }

    // Auto advance after 2 seconds
    setTimeout(() => {
      setSelectedAnswer(null);
      setShowResult(false);
      nextQuestion();
    }, 2000);
  };

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white text-xl">Loading question...</div>
      </div>
    );
  }

  const progress = ((questionIndex + 1) / questionsPerRound) * 100;

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <Card className="bg-white/95 backdrop-blur-sm p-6 rounded-3xl shadow-2xl max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => setPhase("difficulty")}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <div className="text-center">
            <div className="text-sm text-gray-500">
              Question {questionIndex + 1} of {questionsPerRound}
            </div>
            <div className="text-lg font-bold text-purple-600">
              {difficulty}× Table
            </div>
          </div>
          <GameTimer />
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <motion.div
            key={currentQuestion.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl font-bold text-gray-800 mb-4"
          >
            {currentQuestion.multiplicand} × {currentQuestion.multiplier} = ?
          </motion.div>
          <p className="text-gray-600 text-lg">Choose the correct answer!</p>
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {currentQuestion.options.map((option) => {
            let buttonClass = "py-6 text-2xl font-bold rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200 ";
            
            if (showResult) {
              if (option === currentQuestion.correctAnswer) {
                buttonClass += "bg-green-500 text-white";
              } else if (option === selectedAnswer) {
                buttonClass += "bg-red-500 text-white";
              } else {
                buttonClass += "bg-gray-300 text-gray-500";
              }
            } else {
              buttonClass += "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white";
            }

            return (
              <motion.div key={option} whileHover={{ scale: showResult ? 1 : 1.05 }}>
                <Button
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showResult}
                  className={buttonClass}
                >
                  {option}
                  {showResult && option === currentQuestion.correctAnswer && (
                    <Star className="w-6 h-6 ml-2 text-yellow-300" />
                  )}
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Result feedback */}
        {showResult && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-center p-4 rounded-2xl ${
              isCorrect ? 'bg-green-100' : 'bg-red-100'
            }`}
          >
            <div className={`text-2xl font-bold ${
              isCorrect ? 'text-green-700' : 'text-red-700'
            }`}>
              {isCorrect ? '🎉 Correct! +10 coins!' : '❌ Oops! Try again next time!'}
            </div>
            {!isCorrect && (
              <div className="text-gray-600 mt-2">
                The correct answer is {currentQuestion.correctAnswer}
              </div>
            )}
          </motion.div>
        )}

        {/* Stats */}
        <div className="flex justify-between text-sm text-gray-500 mt-4">
          <span>Correct: {stats.correctAnswers}/{stats.totalQuestions}</span>
          <span>Coins earned: {stats.coinsEarned}</span>
        </div>
      </Card>
    </div>
  );
}
