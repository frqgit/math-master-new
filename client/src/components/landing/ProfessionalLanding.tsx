import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Calculator, 
  Award, 
  BarChart3, 
  BookOpen,
  Target,
  Zap,
  Star,
  ArrowRight,
  Play,
  Menu,
  X
} from "lucide-react";
import AuthScreen from "../auth/AuthScreen";
import Year7Curriculum, { year7MathsCurriculum } from "../curriculum/Year7Curriculum";

export default function ProfessionalLanding() {
  const [showAuth, setShowAuth] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCurriculum, setShowCurriculum] = useState(false);

  if (showAuth) {
    return <AuthScreen />;
  }

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
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Calculator className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Table Trek</span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#curriculum" className="text-gray-700 hover:text-blue-600 transition-colors">Curriculum</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">Testimonials</a>
              <Button 
                onClick={() => setShowAuth(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => setShowAuth(true)}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Join Now
              </Button>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col gap-4">
                <a 
                  href="#features" 
                  className="text-gray-700 hover:text-blue-600 transition-colors px-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#curriculum" 
                  className="text-gray-700 hover:text-blue-600 transition-colors px-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Curriculum
                </a>
                <a 
                  href="#testimonials" 
                  className="text-gray-700 hover:text-blue-600 transition-colors px-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Testimonials
                </a>
                <div className="flex flex-col gap-2 px-4 pt-2">
                  <Button 
                    onClick={() => {
                      setShowAuth(true);
                      setMobileMenuOpen(false);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                  >
                    Sign In
                  </Button>
                  <Button 
                    onClick={() => {
                      setShowAuth(true);
                      setMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 w-full"
                  >
                    Join Now
                  </Button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Table Trek is <span className="text-blue-600">personalised learning</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Master multiplication tables with interactive games, real-time analytics, 
            and achievement rewards. Trusted by educators and parents worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => setShowAuth(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Learning
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => setShowAuth(true)}
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg"
            >
              Join Now
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">160+ Billion</div>
              <div className="text-gray-600">Questions Answered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">17+ Million</div>
              <div className="text-gray-600">Students Worldwide</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">99%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by educators and parents
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive curriculum • Real-time analytics • Achievement rewards
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-white hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Comprehensive Curriculum</h3>
              <p className="text-gray-600 mb-4">
                Master multiplication tables from 1x1 to 12x12 with interactive quizzes 
                and adaptive difficulty levels.
              </p>
              <a href="#curriculum" className="text-blue-600 font-semibold flex items-center gap-2">
                Browse Skills <ArrowRight className="w-4 h-4" />
              </a>
            </Card>

            <Card className="p-8 bg-white hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-Time Analytics</h3>
              <p className="text-gray-600 mb-4">
                Track progress with detailed statistics, accuracy rates, and personalized 
                recommendations for improvement.
              </p>
              <a href="#analytics" className="text-blue-600 font-semibold flex items-center gap-2">
                View Analytics <ArrowRight className="w-4 h-4" />
              </a>
            </Card>

            <Card className="p-8 bg-white hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Achievement Rewards</h3>
              <p className="text-gray-600 mb-4">
                Earn coins, unlock achievements, and compete on leaderboards. 
                Gamified learning that keeps students engaged.
              </p>
              <a href="#achievements" className="text-blue-600 font-semibold flex items-center gap-2">
                Explore Awards <ArrowRight className="w-4 h-4" />
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Curriculum</h2>
            <p className="text-xl text-gray-600 mb-6">
              Master multiplication tables • Adaptive difficulty • Progress tracking
            </p>
            <Button
              onClick={() => setShowCurriculum(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              View Full Year 7 Maths Curriculum
            </Button>
          </div>

          {/* Quick Preview - Multiplication Tables */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Multiplication Tables (1x - 12x)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((level) => (
                <Card 
                  key={level}
                  className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-500"
                  onClick={() => setShowAuth(true)}
                >
                  <div className="text-3xl font-bold text-blue-600 mb-2">{level}x Tables</div>
                  <div className="text-sm text-gray-600">12 skills</div>
                  <div className="mt-4 text-xs text-gray-500">
                    {level === 1 && "Basic multiplication"}
                    {level === 2 && "Doubles and pairs"}
                    {level === 3 && "Triple patterns"}
                    {level === 4 && "Even numbers"}
                    {level === 5 && "Fives pattern"}
                    {level === 6 && "Sixes mastery"}
                    {level === 7 && "Sevens challenge"}
                    {level === 8 && "Eights expertise"}
                    {level === 9 && "Nines trick"}
                    {level === 10 && "Tens mastery"}
                    {level === 11 && "Elevens pattern"}
                    {level === 12 && "Twelves mastery"}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Curriculum Categories Preview */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Explore Hundreds of Skills Across All Topics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {year7MathsCurriculum.slice(0, 12).map((category) => (
                <Card
                  key={category.letter}
                  className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer border hover:border-blue-300"
                  onClick={() => setShowCurriculum(true)}
                >
                  <div className="text-2xl font-bold text-blue-600 mb-1">{category.letter}</div>
                  <div className="text-xs text-gray-600">{category.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{category.skills.length} skills</div>
                </Card>
              ))}
            </div>
            <div className="text-center mt-6">
              <Button
                onClick={() => setShowCurriculum(true)}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                View All {year7MathsCurriculum.length} Categories
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Discover how Table Trek supports success for every learner
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Table Trek gives teachers everything they need to personalise instruction
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Comprehensive Curriculum</h4>
                    <p className="text-gray-600">
                      Find content to support nearly any lesson, with multiplication tables 
                      covering all difficulty levels from beginner to advanced.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Real-Time Diagnostic</h4>
                    <p className="text-gray-600">
                      Pinpoint what your students know and exactly what to do next 
                      to help them improve.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Personalised Guidance</h4>
                    <p className="text-gray-600">
                      See skill recommendations that help each student fill knowledge 
                      gaps and grow from where they are.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Actionable Analytics</h4>
                    <p className="text-gray-600">
                      Get real-time insights that help you make effective instructional 
                      decisions every day.
                    </p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => setShowAuth(true)}
                className="mt-8 bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
              >
                Join Now
              </Button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <span className="font-semibold text-gray-900">Questions Answered</span>
                  <span className="text-2xl font-bold text-blue-600">1,234,567</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <span className="font-semibold text-gray-900">Accuracy Rate</span>
                  <span className="text-2xl font-bold text-green-600">94%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <span className="font-semibold text-gray-900">Achievements Unlocked</span>
                  <span className="text-2xl font-bold text-purple-600">23</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                  <span className="font-semibold text-gray-900">Coins Earned</span>
                  <span className="text-2xl font-bold text-orange-600">5,678¢</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">See the impact Table Trek has made!</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-white">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Proven Effective</h4>
              <p className="text-gray-600 text-sm">
                Research has shown over and over that Table Trek produces real results 
                in multiplication mastery.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-white">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Trusted by Top Teachers</h4>
              <p className="text-gray-600 text-sm">
                Educators share why they turn to Table Trek to help their students grow 
                and master multiplication.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-50 to-white">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Newsworthy Learning</h4>
              <p className="text-gray-600 text-sm">
                Table Trek is making headlines! Get the latest buzz about our platform 
                and student achievements.
              </p>
            </Card>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 italic mb-6">
                "Currently, I have about 35-45 active students who answer a total of over 
                100,000 questions every 30 days. There are several various reports that help 
                me monitor my students' progress thoroughly."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  SM
                </div>
                <div>
                  <div className="font-bold text-gray-900">Sarah Mitchell</div>
                  <div className="text-sm text-gray-600">Maths and English Teacher, Sydney, New South Wales</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">
            Table Trek is personalised learning
          </h2>
          <p className="text-xl mb-8 opacity-90">
            With a comprehensive curriculum, individualised guidance and real-time analytics, 
            Table Trek meets the unique needs of each learner.
          </p>
          <div className="text-3xl font-bold mb-8">
            186,783,553,128 questions answered!
          </div>
          <Button 
            onClick={() => setShowAuth(true)}
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-bold"
          >
            Join Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold text-white">Table Trek</span>
              </div>
              <p className="text-sm">
                Personalized multiplication learning platform trusted by educators worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">What we offer</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">For families</a></li>
                <li><a href="#" className="hover:text-white">For schools</a></li>
                <li><a href="#" className="hover:text-white">Curriculum</a></li>
                <li><a href="#" className="hover:text-white">Analytics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Help centre</a></li>
                <li><a href="#" className="hover:text-white">User guides</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">About</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Company</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Privacy policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2025 Table Trek. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

