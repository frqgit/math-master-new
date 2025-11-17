export const generateRandomColor = (): string => {
  const colors = [
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7",
    "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const getScoreMessage = (percentage: number): string => {
  if (percentage >= 90) return "Amazing! You're a multiplication master! 🌟";
  if (percentage >= 80) return "Excellent work! Keep it up! 🎉";
  if (percentage >= 70) return "Great job! You're getting better! 👏";
  if (percentage >= 60) return "Good effort! Practice makes perfect! 💪";
  return "Keep practicing! You can do it! 🚀";
};

export const coinAnimation = {
  initial: { scale: 0, rotate: 0, y: 0 },
  animate: { 
    scale: [0, 1.2, 1], 
    rotate: [0, 180, 360],
    y: [0, -20, 0],
    transition: { duration: 0.6, ease: "easeOut" }
  }
};
