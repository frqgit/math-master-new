import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useMultiplicationGame } from "@/lib/stores/useMultiplicationGame";
import { useAuth } from "@/lib/stores/useAuth";
import { Calculator, Star, Trophy, Coins, LogOut, User, Award, BarChart3, Target, BookOpen } from "lucide-react";
import AchievementGallery from "./AchievementGallery";
import Year7Curriculum from "../curriculum/Year7Curriculum";

export default function StartScreen() {
  const setPhase = useMultiplicationGame(state => state.setPhase);
  const { user, profile, logout } = useAuth();
  const totalCoins = profile?.totalCoins || 0;
  const [showAchievements, setShowAchievements] = useState(false);
  const [showCurriculum, setShowCurriculum] = useState(false);

  const accuracy = profile && profile.totalQuestions > 0 
    ? Math.round((profile.totalCorrectAnswers / profile.totalQuestions) * 100) 
    : 0;

  // If curriculum is shown, render it
  if (showCurriculum) {
    return (
      <div className="min-h-screen bg-white">
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <Calculator className="w-8 h-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">Table Trek</span>
              </div>
              <Button
                onClick={() => setShowCurriculum(false)}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Back to Home
              </Button>
            </div>
          </nav>
        </header>
        <Year7Curriculum />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      {/* User info and logout */}
      <div className="absolute top-4 right-4 flex items-center gap-3 z-50">
        <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 border border-gray-200">
          <User className="w-4 h-4 text-blue-600" />
          <span className="font-medium text-gray-800">{user?.username}</span>
        </div>
        <Button
          variant="ghost"
          onClick={logout}
          className="bg-white/95 backdrop-blur-sm hover:bg-white border border-gray-200 rounded-xl p-2"
          title="Sign Out"
        >
          <LogOut className="w-5 h-5 text-gray-600" />
        </Button>
      </div>
      
      <div className="max-w-4xl w-full">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <Calculator className="w-10 h-10 text-blue-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            Welcome to Table Trek
          </h1>
          <p className="text-xl text-gray-600">
            Personalized multiplication learning platform
          </p>
        </div>

        {/* Stats Cards */}
        {profile && profile.gamesPlayed > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-900">{profile.gamesPlayed}</div>
                  <div className="text-sm text-blue-700">Games Played</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-900">{accuracy}%</div>
                  <div className="text-sm text-green-700">Accuracy Rate</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
                  <Coins className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-900">{totalCoins}¢</div>
                  <div className="text-sm text-yellow-700">Total Coins</div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Main Action Card */}
        <Card className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Ready to Master Multiplication?
            </h2>
            <p className="text-gray-600">
              Choose your difficulty level and start practicing your times tables
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-700">Interactive Quiz</p>
            </div>
            <button 
              className="text-center p-4 rounded-xl hover:bg-gray-50 transition-colors"
              onClick={() => setShowAchievements(true)}
            >
              <Trophy className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-700">Achievements</p>
            </button>
            <div className="text-center p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <Coins className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-700">Coin Rewards</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              onClick={() => setShowCurriculum(true)}
              variant="outline"
              className="w-full py-6 text-lg font-semibold border-2 border-green-200 hover:bg-green-50 hover:border-green-300 rounded-xl"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Year 7 Maths Curriculum (A-Z Skills)
            </Button>
            
            <Button
              onClick={() => setShowAchievements(true)}
              variant="outline"
              className="w-full py-6 text-lg font-semibold border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 rounded-xl"
            >
              <Award className="w-5 h-5 mr-2" />
              View Achievements & Progress
            </Button>
            
            <Button
              onClick={() => setPhase("difficulty")}
              className="w-full py-6 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg"
            >
              Start Multiplication Practice
            </Button>
          </div>
        </Card>
      </div>
      
      {/* Achievement Gallery Modal */}
      {showAchievements && (
        <AchievementGallery onClose={() => setShowAchievements(false)} />
      )}
    </div>
  );
}
