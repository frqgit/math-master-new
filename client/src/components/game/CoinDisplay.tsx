import { motion } from "framer-motion";
import { Coins } from "lucide-react";
import { useAuth } from "@/lib/stores/useAuth";

export default function CoinDisplay() {
  const { profile } = useAuth();
  const totalCoins = profile?.totalCoins || 0;

  return (
    <motion.div
      className="bg-yellow-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      <Coins className="w-6 h-6" />
      <motion.span
        key={totalCoins}
        initial={{ scale: 1.5 }}
        animate={{ scale: 1 }}
        className="font-bold text-lg"
      >
{totalCoins}¢
      </motion.span>
    </motion.div>
  );
}
