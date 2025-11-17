import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Star, X } from "lucide-react";
import { motion } from "framer-motion";
import { SkillQuestionGenerator, SkillQuestion } from "@/lib/utils/skillQuestionGenerator";
import { useAudio } from "@/lib/stores/useAudio";

interface SkillPracticeProps {
  skillName: string;
  category: string;
  onClose: () => void;
  onComplete?: (correct: number, total: number) => void;
}

export default function SkillPractice({ skillName, category, onClose, onComplete }: SkillPracticeProps) {
  const [currentQuestion, setCurrentQuestion] = useState<SkillQuestion | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [isComplete, setIsComplete] = useState(false);
  const questionsPerRound = 10;
  
  const { playHit, playSuccess } = useAudio();

  console.log("SkillPractice rendered:", { skillName, category });

  const generateNewQuestion = useCallback(() => {
    try {
      console.log("Generating question for:", { skillName, category });
      const question = SkillQuestionGenerator.generateQuestion(skillName, category);
      console.log("Generated question:", question);
      
      if (!question || !question.options || question.options.length === 0) {
        throw new Error("Invalid question generated");
      }
      setCurrentQuestion(question);
      setSelectedAnswer(null);
      setShowResult(false);
    } catch (error) {
      console.error("Error generating question:", error);
      // Fallback to generic math question
      const fallbackQuestion = SkillQuestionGenerator.generateGenericMathQuestion();
      setCurrentQuestion(fallbackQuestion);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  }, [skillName, category]);

  useEffect(() => {
    console.log("SkillPractice useEffect - generating first question");
    // Reset state when skill changes
    setQuestionIndex(0);
    setScore({ correct: 0, total: 0 });
    setIsComplete(false);
    generateNewQuestion();
  }, [generateNewQuestion]);

  const handleAnswerSelect = (answer: number | string) => {
    if (showResult || !currentQuestion) {
      console.log("Answer select blocked:", { showResult, hasQuestion: !!currentQuestion });
      return;
    }

    console.log("Answer selected:", answer, "Correct answer:", currentQuestion.correctAnswer);
    
    setSelectedAnswer(answer);
    // Compare answers properly (handle both string and number types)
    const correct = String(answer) === String(currentQuestion.correctAnswer);
    setIsCorrect(correct);
    setShowResult(true);
    
    const newScore = {
      correct: score.correct + (correct ? 1 : 0),
      total: score.total + 1
    };
    setScore(newScore);

    console.log("Answer result:", { correct, newScore });

    // Play sound effect
    try {
      if (correct) {
        playSuccess();
      } else {
        playHit();
      }
    } catch (error) {
      console.warn("Audio play failed:", error);
    }

    // Auto advance after 2 seconds
    setTimeout(() => {
      if (questionIndex + 1 >= questionsPerRound) {
        setIsComplete(true);
        if (onComplete) {
          onComplete(newScore.correct, newScore.total);
        }
      } else {
        setQuestionIndex(prev => prev + 1);
        generateNewQuestion();
      }
    }, 2000);
  };

  if (isComplete) {
    const accuracy = Math.round((score.correct / score.total) * 100);
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Practice Complete!</h2>
            <div className="space-y-4 mb-6">
              <div className="text-2xl font-semibold text-blue-600">
                {score.correct} / {score.total} Correct
              </div>
              <div className={`text-xl font-bold ${
                accuracy >= 80 ? 'text-green-600' : 
                accuracy >= 60 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {accuracy}% Accuracy
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={onClose}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setQuestionIndex(0);
                  setScore({ correct: 0, total: 0 });
                  setIsComplete(false);
                  generateNewQuestion();
                }}
                variant="outline"
                className="flex-1"
              >
                Practice Again
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
        <div className="text-white text-xl">Loading question...</div>
      </div>
    );
  }

  const progress = ((questionIndex + 1) / questionsPerRound) * 100;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4"
      onClick={(e) => {
        // Close if clicking outside the card
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <Card 
        className="bg-white p-6 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={onClose}
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
              {skillName}
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <X className="w-5 h-5" />
          </Button>
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
            className="text-5xl font-bold text-gray-800 mb-4"
          >
            {currentQuestion.question}
          </motion.div>
          <p className="text-gray-600 text-lg">Choose the correct answer!</p>
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {currentQuestion.options.map((option, idx) => {
            let buttonClass = "py-6 text-2xl font-bold rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200 ";
            
            if (showResult) {
              // Use string comparison for both number and string answers
              const optionStr = String(option);
              const correctStr = String(currentQuestion.correctAnswer);
              const selectedStr = selectedAnswer !== null ? String(selectedAnswer) : '';
              
              if (optionStr === correctStr) {
                buttonClass += "bg-green-500 text-white";
              } else if (optionStr === selectedStr) {
                buttonClass += "bg-red-500 text-white";
              } else {
                buttonClass += "bg-gray-300 text-gray-500";
              }
            } else {
              buttonClass += "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white";
            }

            return (
              <motion.div key={idx} whileHover={{ scale: showResult ? 1 : 1.05 }}>
                <Button
                  onClick={() => {
                    console.log("Button clicked:", option);
                    handleAnswerSelect(option);
                  }}
                  disabled={showResult}
                  className={buttonClass}
                >
                  {option}
                  {showResult && String(option) === String(currentQuestion.correctAnswer) && (
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
              {isCorrect ? '🎉 Correct! +10 coins!' : '❌ Incorrect!'}
            </div>
            {!isCorrect && (
              <div className="text-gray-600 mt-2">
                The correct answer is {currentQuestion.correctAnswer}
              </div>
            )}
            {currentQuestion.explanation && (
              <div className="text-sm text-gray-600 mt-2 italic">
                {currentQuestion.explanation}
              </div>
            )}
          </motion.div>
        )}

        {/* Stats */}
        <div className="flex justify-between text-sm text-gray-500 mt-4">
          <span>Correct: {score.correct}/{score.total}</span>
          <span>Accuracy: {score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%</span>
        </div>
      </Card>
    </div>
  );
}
