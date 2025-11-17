import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useMultiplicationGame } from "@/lib/stores/useMultiplicationGame";
import { ArrowLeft } from "lucide-react";

export default function DifficultySelector() {
  const { setPhase, setDifficulty, startNewRound } = useMultiplicationGame();

  const difficulties = [
    { level: 3, label: "3× Table", color: "bg-green-500", description: "Easy" },
    { level: 4, label: "4× Table", color: "bg-blue-500", description: "Easy" },
    { level: 5, label: "5× Table", color: "bg-purple-500", description: "Medium" },
    { level: 6, label: "6× Table", color: "bg-pink-500", description: "Medium" },
    { level: 7, label: "7× Table", color: "bg-yellow-500", description: "Medium" },
    { level: 8, label: "8× Table", color: "bg-orange-500", description: "Hard" },
    { level: 9, label: "9× Table", color: "bg-red-500", description: "Hard" },
    { level: 10, label: "10× Table", color: "bg-indigo-500", description: "Very Hard" },
    { level: 11, label: "11× Table", color: "bg-teal-500", description: "Very Hard" },
    { level: 12, label: "12× Table", color: "bg-cyan-500", description: "Expert" },
    { level: 13, label: "13× Table", color: "bg-emerald-500", description: "Expert" },
    { level: 14, label: "14× Table", color: "bg-rose-500", description: "Expert" },
    { level: 15, label: "15× Table", color: "bg-violet-500", description: "Master" },
    { level: 16, label: "16× Table", color: "bg-slate-500", description: "Master" },
    { level: 17, label: "17× Table", color: "bg-stone-500", description: "Master" },
    { level: 18, label: "18× Table", color: "bg-zinc-500", description: "Expert+" },
    { level: 19, label: "19× Table", color: "bg-neutral-500", description: "Genius!" },
  ];

  const handleSelectDifficulty = (level: number) => {
    setDifficulty(level as any);
    setPhase("time_selection");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <Card className="bg-white/95 backdrop-blur-sm p-6 rounded-3xl shadow-2xl max-w-4xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => setPhase("start")}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <h2 className="text-3xl font-bold text-gray-800">Choose Your Challenge</h2>
          <div className="w-20"></div> {/* Spacer */}
        </div>

        {/* Difficulty grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {difficulties.map((diff) => (
            <Button
              key={diff.level}
              onClick={() => handleSelectDifficulty(diff.level)}
              className={`${diff.color} hover:opacity-90 text-white font-bold py-6 px-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200 flex flex-col items-center gap-2`}
            >
              <span className="text-2xl">{diff.level}</span>
              <span className="text-sm">{diff.label}</span>
              <span className="text-xs opacity-90">{diff.description}</span>
            </Button>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-lg">
            Select a times table to practice! 🎯
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Next, you'll choose how much time per question!
          </p>
        </div>
      </Card>
    </div>
  );
}
