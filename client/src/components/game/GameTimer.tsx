import { useEffect } from "react";
import { useMultiplicationGame } from "@/lib/stores/useMultiplicationGame";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function GameTimer() {
  const { stats, decrementTime } = useMultiplicationGame();
  const timeRemaining = stats.timeRemaining;

  useEffect(() => {
    const timer = setInterval(() => {
      decrementTime();
    }, 1000);

    return () => clearInterval(timer);
  }, [decrementTime]);

  const isLowTime = timeRemaining <= 10;

  return (
    <motion.div
      className={`flex items-center gap-2 px-3 py-2 rounded-full ${
        isLowTime ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
      }`}
      animate={isLowTime ? { scale: [1, 1.1, 1] } : {}}
      transition={{ repeat: isLowTime ? Infinity : 0, duration: 1 }}
    >
      <Clock className="w-5 h-5" />
      <span className="font-bold text-lg">
        {timeRemaining}s
      </span>
    </motion.div>
  );
}
