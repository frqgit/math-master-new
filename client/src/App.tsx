import { Suspense, useEffect } from "react";
import { useAudio } from "./lib/stores/useAudio";
import MultiplicationGame from "./components/game/MultiplicationGame";
import ProfessionalLanding from "./components/landing/ProfessionalLanding";
import { useAuth } from "./lib/stores/useAuth";
import "@fontsource/inter";

// Main App component
function App() {
  const { setBackgroundMusic, setHitSound, setSuccessSound } = useAudio();
  const { isAuthenticated } = useAuth();

  // Initialize audio on app load
  useEffect(() => {
    const bgMusic = new Audio("/sounds/background.mp3");
    const hitAudio = new Audio("/sounds/hit.mp3");
    const successAudio = new Audio("/sounds/success.mp3");
    
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    
    setBackgroundMusic(bgMusic);
    setHitSound(hitAudio);
    setSuccessSound(successAudio);
  }, [setBackgroundMusic, setHitSound, setSuccessSound]);

  // Show landing page if not authenticated, otherwise show the game
  return (
    <div style={{ 
      width: '100vw', 
      minHeight: '100vh',
      fontFamily: 'Inter, sans-serif'
    }}>
      <Suspense fallback={
        <div className="flex items-center justify-center h-screen text-gray-700 text-xl">
          Loading...
        </div>
      }>
        {!isAuthenticated ? (
          <ProfessionalLanding />
        ) : (
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            minHeight: '100vh'
          }}>
            <MultiplicationGame />
          </div>
        )}
      </Suspense>
    </div>
  );
}

export default App;
