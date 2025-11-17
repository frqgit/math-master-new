import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type GamePhase = "start" | "difficulty" | "time_selection" | "playing" | "celebration" | "gameOver";
export type Difficulty = 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19;

interface Question {
  id: string;
  multiplicand: number;
  multiplier: number;
  correctAnswer: number;
  options: number[];
}

interface GameStats {
  totalQuestions: number;
  correctAnswers: number;
  coinsEarned: number;
  timeRemaining: number;
}

interface MultiplicationGameState {
  phase: GamePhase;
  difficulty: Difficulty;
  currentQuestion: Question | null;
  questionIndex: number;
  totalCoins: number;
  stats: GameStats;
  timePerQuestion: number;
  questionsPerRound: number;
  
  // Actions
  setPhase: (phase: GamePhase) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setTimePerQuestion: (time: number) => void;
  generateQuestion: () => void;
  answerQuestion: (answer: number) => boolean;
  nextQuestion: () => void;
  addCoins: (amount: number) => void;
  resetGame: () => void;
  startNewRound: () => void;
  decrementTime: () => void;
}

export const useMultiplicationGame = create<MultiplicationGameState>()(
  subscribeWithSelector((set, get) => ({
    phase: "start",
    difficulty: 3,
    currentQuestion: null,
    questionIndex: 0,
    totalCoins: 0,
    stats: {
      totalQuestions: 0,
      correctAnswers: 0,
      coinsEarned: 0,
      timeRemaining: 30
    },
    timePerQuestion: 30,
    questionsPerRound: 10,
    
    setPhase: (phase) => set({ phase }),
    
    setDifficulty: (difficulty) => set({ difficulty }),
    
    setTimePerQuestion: (time) => set({ timePerQuestion: time }),
    
    generateQuestion: () => {
      const { difficulty } = get();
      const multiplicand = Math.floor(Math.random() * 12) + 1;
      const multiplier = difficulty;
      const correctAnswer = multiplicand * multiplier;
      
      // Generate 3 wrong answers and 1 correct answer
      const wrongAnswers = new Set<number>();
      while (wrongAnswers.size < 3) {
        const offset = Math.floor(Math.random() * 20) - 10;
        const wrongAnswer = correctAnswer + offset;
        if (wrongAnswer !== correctAnswer && wrongAnswer > 0) {
          wrongAnswers.add(wrongAnswer);
        }
      }
      
      const options = [correctAnswer, ...Array.from(wrongAnswers)];
      // Shuffle options
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      
      const question: Question = {
        id: `${multiplicand}x${multiplier}-${Date.now()}`,
        multiplicand,
        multiplier,
        correctAnswer,
        options
      };
      
      set({ 
        currentQuestion: question,
        stats: { ...get().stats, timeRemaining: get().timePerQuestion }
      });
    },
    
    answerQuestion: (answer) => {
      const { currentQuestion, stats } = get();
      if (!currentQuestion) return false;
      
      const isCorrect = answer === currentQuestion.correctAnswer;
      const coinsEarned = isCorrect ? 1 : 0;
      
      set({
        stats: {
          ...stats,
          totalQuestions: stats.totalQuestions + 1,
          correctAnswers: stats.correctAnswers + (isCorrect ? 1 : 0),
          coinsEarned: stats.coinsEarned + coinsEarned
        }
      });
      
      if (isCorrect) {
        get().addCoins(coinsEarned);
      }
      
      return isCorrect;
    },
    
    nextQuestion: () => {
      const { questionIndex, questionsPerRound } = get();
      const newIndex = questionIndex + 1;
      
      if (newIndex >= questionsPerRound) {
        set({ phase: "celebration" });
      } else {
        set({ questionIndex: newIndex });
        get().generateQuestion();
      }
    },
    
    addCoins: (amount) => {
      set(state => ({ totalCoins: state.totalCoins + amount }));
    },
    
    resetGame: () => {
      const { timePerQuestion } = get();
      set({
        phase: "start",
        currentQuestion: null,
        questionIndex: 0,
        stats: {
          totalQuestions: 0,
          correctAnswers: 0,
          coinsEarned: 0,
          timeRemaining: timePerQuestion
        }
      });
    },
    
    startNewRound: () => {
      const { timePerQuestion } = get();
      set({
        phase: "playing",
        questionIndex: 0,
        currentQuestion: null,
        stats: {
          totalQuestions: 0,
          correctAnswers: 0,
          coinsEarned: 0,
          timeRemaining: timePerQuestion
        }
      });
      get().generateQuestion();
    },
    
    decrementTime: () => {
      const { stats } = get();
      if (stats.timeRemaining > 0) {
        set({
          stats: { ...stats, timeRemaining: stats.timeRemaining - 1 }
        });
      } else {
        // Time's up, move to next question
        get().nextQuestion();
      }
    }
  }))
);
