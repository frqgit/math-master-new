import { useEffect } from "react";
import { useMultiplicationGame } from "@/lib/stores/useMultiplicationGame";
import { useAuth } from "@/lib/stores/useAuth";
import { useAudio } from "@/lib/stores/useAudio";
import AuthScreen from "../auth/AuthScreen";
import StartScreen from "./StartScreen";
import DifficultySelector from "./DifficultySelector";
import TimeSelector from "./TimeSelector";
import QuizQuestion from "./QuizQuestion";
import CelebrationEffect from "./CelebrationEffect";
import CoinDisplay from "./CoinDisplay";

export default function MultiplicationGame() {
  const { backgroundMusic, isMuted } = useAudio();
  const { isAuthenticated } = useAuth();
  const gamePhase = useMultiplicationGame(state => state.phase);

  // Start background music when game starts - this hook must be called before any early returns
  useEffect(() => {
    if (backgroundMusic && !isMuted && gamePhase === "playing") {
      backgroundMusic.play().catch(console.log);
    }
    
    return () => {
      if (backgroundMusic) {
        backgroundMusic.pause();
      }
    };
  }, [backgroundMusic, isMuted, gamePhase]);

  // Show authentication screen if user is not logged in
  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Coin display - always visible when not on start screen */}
      {gamePhase !== "start" && (
        <div className="absolute top-4 right-4 z-50">
          <CoinDisplay />
        </div>
      )}

      {/* Game phases */}
      {gamePhase === "start" && <StartScreen />}
      {gamePhase === "difficulty" && <DifficultySelector />}
      {gamePhase === "time_selection" && <TimeSelector />}
      {gamePhase === "playing" && <QuizQuestion />}
      {gamePhase === "celebration" && <CelebrationEffect />}
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating numbers background */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-white/10 text-6xl font-bold animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            {Math.floor(Math.random() * 12) + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
