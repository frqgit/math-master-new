import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, BookOpen, Play, CheckCircle2, Star } from "lucide-react";
import { useAuth } from "@/lib/stores/useAuth";
import SkillPractice from "./SkillPractice";

interface SkillCategory {
  letter: string;
  title: string;
  skills: string[];
}

// Authentic Year 7 Maths Curriculum scraped from IXL
export const year7MathsCurriculum: SkillCategory[] = [
  {
    letter: "A",
    title: "Number theory",
    skills: [
      "Prime or composite",
      "Prime factorisation",
      "Multiplicative inverses",
      "Divisibility rules",
      "Highest common factor",
      "Lowest common multiple",
      "HCF and LCM: word problems",
      "Classify numbers"
    ]
  },
  {
    letter: "B",
    title: "Integers",
    skills: [
      "Understanding integers",
      "Integers on number lines",
      "Graph integers on horizontal and vertical number lines",
      "Compare integers",
      "Order integers"
    ]
  },
  {
    letter: "C",
    title: "Operations with integers",
    skills: [
      "Integer addition rules",
      "Add integers using counters",
      "Add integers using number lines",
      "Add integers",
      "Integer subtraction rules",
      "Subtract integers using counters",
      "Subtract integers using number lines",
      "Subtract integers",
      "Integer addition and subtraction rules",
      "Add and subtract integers using counters",
      "Add and subtract integers",
      "Complete addition and subtraction number sentences with integers",
      "Add and subtract integers: word problems",
      "Integer multiplication rules",
      "Multiply integers",
      "Integer division rules",
      "Divide integers",
      "Evaluate numerical expressions involving integers"
    ]
  },
  {
    letter: "D",
    title: "Decimals",
    skills: [
      "Decimal numbers review",
      "Compare and order decimals",
      "Decimal number lines",
      "Round decimals"
    ]
  },
  {
    letter: "E",
    title: "Operations with decimals",
    skills: [
      "Add and subtract decimals",
      "Add and subtract decimals: word problems",
      "Estimate sums and differences of decimals",
      "Multiply decimals and whole numbers",
      "Multiply decimals and whole numbers: word problems",
      "Multiply decimals using grids",
      "Multiply decimals",
      "Estimate products of decimals",
      "Divide decimals by whole numbers",
      "Divide decimals by whole numbers: word problems",
      "Divide decimals",
      "Estimate quotients of decimals",
      "Multiply and divide decimals: word problems",
      "Add, subtract, multiply and divide decimals: word problems",
      "Multi-step inequalities with decimals",
      "Maps with decimal distances",
      "Evaluate numerical expressions involving decimals"
    ]
  },
  {
    letter: "F",
    title: "Fractions and mixed numbers",
    skills: [
      "Understanding fractions: word problems",
      "Graph equivalent fractions on number lines",
      "Equivalent fractions",
      "Write fractions in lowest terms",
      "Fractions: word problems with graphs and tables",
      "Lowest common denominator",
      "Compare and order fractions",
      "Compare fractions: word problems",
      "Convert between mixed numbers and improper fractions",
      "Compare mixed numbers and improper fractions",
      "Round mixed numbers"
    ]
  },
  {
    letter: "G",
    title: "Add and subtract fractions",
    skills: [
      "Add and subtract fractions with like denominators",
      "Add and subtract fractions with like denominators: word problems",
      "Add fractions with unlike denominators using models",
      "Add fractions with unlike denominators",
      "Subtract fractions with unlike denominators using models",
      "Subtract fractions with unlike denominators",
      "Add and subtract fractions with unlike denominators: word problems",
      "Add and subtract mixed numbers",
      "Add and subtract mixed numbers: word problems",
      "Inequalities with addition and subtraction of fractions and mixed numbers",
      "Estimate sums and differences of mixed numbers"
    ]
  },
  {
    letter: "H",
    title: "Multiply and divide fractions",
    skills: [
      "Multiply unit fractions by whole numbers using number lines",
      "Multiply unit fractions by whole numbers using models",
      "Multiples of fractions",
      "Multiply fractions by whole numbers using arrays",
      "Multiply fractions by whole numbers using number lines",
      "Multiplying fractions by whole numbers: choose the model",
      "Multiply fractions and whole numbers",
      "Multiply fractions and whole numbers: word problems",
      "Multiply two unit fractions using models",
      "Multiply two fractions using models",
      "Multiply fractions",
      "Multiply fractions: word problems",
      "Multiply three or more fractions and whole numbers",
      "Divide unit fractions by whole numbers using models",
      "Divide whole numbers by unit fractions using models",
      "Divide whole numbers and unit fractions using area models",
      "Reciprocals",
      "Divide whole numbers and unit fractions",
      "Divide fractions by whole numbers",
      "Divide whole numbers by fractions",
      "Divide fractions",
      "Divide fractions: word problems",
      "Estimate products and quotients of fractions and mixed numbers",
      "Add, subtract, multiply and divide fractions and mixed numbers: word problems",
      "Evaluate numerical expressions involving fractions"
    ]
  },
  {
    letter: "I",
    title: "Rational numbers",
    skills: [
      "Fractions on number lines",
      "Convert between decimals and fractions or mixed numbers",
      "Compare rational numbers",
      "Put rational numbers in order",
      "Add and subtract rational numbers",
      "Apply addition and subtraction rules",
      "Multiply and divide rational numbers",
      "Apply multiplication and division rules"
    ]
  },
  {
    letter: "J",
    title: "Exponents and square roots",
    skills: [
      "Understanding exponents",
      "Evaluate powers",
      "Solve equations with variable exponents",
      "Powers of ten",
      "Powers with decimal and fractional bases",
      "Evaluate numerical expressions involving exponents",
      "Square roots of perfect squares",
      "Estimate square roots"
    ]
  },
  {
    letter: "K",
    title: "Ratios, rates and proportions",
    skills: [
      "Write a ratio",
      "Write a ratio: word problems",
      "Identify equivalent ratios",
      "Write an equivalent ratio",
      "Equivalent ratios: word problems",
      "Unit rates",
      "Compare ratios: word problems",
      "Compare rates: word problems",
      "Ratios and rates: word problems",
      "Do the ratios form a proportion?",
      "Do the ratios form a proportion: word problems",
      "Solve proportions",
      "Solve proportions: word problems",
      "Estimate population size using proportions"
    ]
  },
  {
    letter: "L",
    title: "Percents",
    skills: [
      "What percentage is illustrated?",
      "Convert fractions to percents using grid models",
      "Convert between percents, fractions and decimals",
      "Convert between percents, fractions and decimals: word problems",
      "Compare percents to fractions and decimals",
      "Estimate percents of numbers",
      "Solve percent problems using grid models",
      "Solve percent problems using strip models",
      "Percents of numbers and money amounts",
      "Percents of numbers: word problems",
      "Find what percent one number is of another",
      "Find what percent one number is of another: word problems",
      "Solve percent equations",
      "Solve percent equations: word problems"
    ]
  },
  {
    letter: "M",
    title: "Consumer maths",
    skills: [
      "Which is the better coupon?",
      "Add, subtract, multiply and divide money amounts: word problems",
      "Price lists",
      "Unit prices",
      "Unit prices: find the total price",
      "Percent of a number: GST, discount and more",
      "Find the percent: discount and mark-up",
      "Sale prices: find the original price",
      "Multi-step problems with percents"
    ]
  },
  {
    letter: "N",
    title: "Problem solving and estimation",
    skills: [
      "Estimate to solve word problems",
      "Multi-step word problems",
      "Guess-and-check word problems",
      "Use Venn diagrams to solve problems",
      "Find the number of each type of coin",
      "Elapsed time word problems"
    ]
  },
  {
    letter: "O",
    title: "Units of measurement",
    skills: [
      "Estimate metric measurements",
      "Compare and convert metric units",
      "Metric mixed units",
      "Convert between square metres and hectares",
      "Convert square and cubic units of length",
      "Convert between cubic metres and litres",
      "Precision"
    ]
  },
  {
    letter: "P",
    title: "Coordinate plane",
    skills: [
      "Coordinate plane review",
      "Graph points from a table",
      "Quadrants and axes",
      "Follow directions on a coordinate plane"
    ]
  },
  {
    letter: "Q",
    title: "Number sequences",
    skills: [
      "Identify arithmetic and geometric sequences",
      "Arithmetic sequences",
      "Geometric sequences",
      "Number sequences: mixed review",
      "Number sequences: word problems",
      "Evaluate variable expressions for number sequences",
      "Write variable expressions for arithmetic sequences"
    ]
  },
  {
    letter: "R",
    title: "Expressions and properties",
    skills: [
      "Write variable expressions: one operation",
      "Write variable expressions: two or three operations",
      "Write variable expressions: word problems",
      "Evaluate linear expressions",
      "Evaluate multi-variable expressions",
      "Evaluate nonlinear expressions",
      "Identify terms and coefficients",
      "Sort factors of expressions",
      "Properties of addition and multiplication",
      "Add using properties",
      "Multiply using properties",
      "Multiply using the distributive property",
      "Solve equations using properties",
      "Write equivalent expressions using properties",
      "Add and subtract like terms",
      "Add, subtract and multiply linear expressions",
      "Factors of linear expressions",
      "Identify equivalent linear expressions using algebra tiles",
      "Identify equivalent linear expressions"
    ]
  },
  {
    letter: "S",
    title: "One-variable equations",
    skills: [
      "Which x satisfies an equation?",
      "Write an equation from words",
      "Model and solve equations using algebra tiles",
      "Write and solve equations that represent diagrams",
      "Solve one-step equations",
      "Solve two-step equations",
      "Solve equations: complete the solution",
      "Solve equations: word problems"
    ]
  },
  {
    letter: "T",
    title: "Two-variable equations",
    skills: [
      "Does (x, y) satisfy the equation?",
      "Solve word problems involving two-variable equations",
      "Complete a table for a two-variable relationship",
      "Write a two-variable equation",
      "Identify the graph of an equation",
      "Interpret a graph: word problems",
      "Identify graphs: word problems",
      "Rate of change",
      "Constant rate of change"
    ]
  },
  {
    letter: "U",
    title: "Two-dimensional figures",
    skills: [
      "Identify and classify polygons",
      "Lines, intervals and rays",
      "Parallel, perpendicular and intersecting lines",
      "Name, measure and classify angles",
      "Acute, obtuse and right triangles",
      "Scalene, isosceles and equilateral triangles",
      "Classify triangles",
      "Parallel sides in quadrilaterals",
      "Identify parallelograms",
      "Identify trapeziums",
      "Identify rectangles",
      "Identify rhombuses",
      "Classify quadrilaterals I",
      "Classify quadrilaterals II",
      "Graph triangles and quadrilaterals",
      "Find missing angles in triangles and quadrilaterals",
      "Sums of angles in polygons",
      "Identify complementary, supplementary, vertical, adjacent and congruent angles",
      "Find measures of complementary, supplementary, vertical and adjacent angles",
      "Transversal of parallel lines",
      "Find lengths and measures of bisected intervals and angles",
      "Parts of a circle",
      "Construct parallel lines",
      "Construct the midpoint or perpendicular bisector of an interval",
      "Construct a perpendicular line"
    ]
  },
  {
    letter: "V",
    title: "Symmetry and transformations",
    skills: [
      "Symmetry",
      "Identify reflections, rotations and translations",
      "Translations: graph the image",
      "Translations: find the coordinates",
      "Reflections: graph the image",
      "Reflections: find the coordinates",
      "Rotations: graph the image",
      "Rotations: find the coordinates",
      "Sequences of transformations: graph the image"
    ]
  },
  {
    letter: "W",
    title: "Three-dimensional figures",
    skills: [
      "Bases of three-dimensional figures",
      "Nets of three-dimensional figures",
      "Front, side and top view"
    ]
  },
  {
    letter: "X",
    title: "Geometric measurement",
    skills: [
      "Perimeter",
      "Multiply to find the area of a rectangle made of unit squares",
      "Area of rectangles and squares",
      "Understanding area of a parallelogram",
      "Area of parallelograms",
      "Understanding area of a triangle",
      "Area of triangles",
      "Area between two shapes",
      "Area and perimeter: word problems",
      "Surface area of cubes and rectangular prisms",
      "Surface area of triangular prisms",
      "Surface area of pyramids",
      "Volume of cubes and rectangular prisms",
      "Volume of cubes and rectangular prisms: word problems",
      "Volume of triangular prisms"
    ]
  },
  {
    letter: "Y",
    title: "Data and graphs",
    skills: [
      "Interpret tables",
      "Interpret dot plots",
      "Create dot plots",
      "Interpret stem-and-leaf plots",
      "Create stem-and-leaf plots",
      "Interpret bar graphs",
      "Create bar graphs",
      "Create frequency tables",
      "Interpret circle graphs",
      "Circle graphs and central angles",
      "Interpret line graphs",
      "Create line graphs",
      "Choose the best type of graph"
    ]
  },
  {
    letter: "Z",
    title: "Statistics",
    skills: [
      "Calculate mean, median, mode and range",
      "Interpret charts to find mean, median, mode and range",
      "Mean, median, mode and range: find the missing number",
      "Changes in mean, median, mode and range",
      "Identify an outlier",
      "Identify an outlier and describe the effect of removing it",
      "Measures of centre and spread",
      "Identify representative, random and biased samples"
    ]
  },
  {
    letter: "AA",
    title: "Probability",
    skills: [
      "More, less and equally likely",
      "Sample space of simple events",
      "Probability of simple events",
      "Probability of opposite, mutually exclusive and overlapping events",
      "Experimental probability",
      "Make predictions",
      "Identify independent and dependent events"
    ]
  }
];

interface SkillProgress {
  [skillId: string]: {
    practiced: boolean;
    mastered: boolean;
    attempts: number;
    correct: number;
  };
}

export default function Year7Curriculum() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [practicingSkill, setPracticingSkill] = useState<{ name: string; category: string } | null>(null);
  const { isAuthenticated } = useAuth();

  // Mock skill progress - in real app, this would come from the backend
  const [skillProgress, setSkillProgress] = useState<SkillProgress>(() => {
    const progress: SkillProgress = {};
    year7MathsCurriculum.forEach(category => {
      category.skills.forEach((skill, index) => {
        const skillId = `${category.letter}-${index}`;
        // Randomly mark some skills as practiced/mastered for demo
        progress[skillId] = {
          practiced: Math.random() > 0.7,
          mastered: Math.random() > 0.9,
          attempts: Math.floor(Math.random() * 10),
          correct: Math.floor(Math.random() * 8)
        };
      });
    });
    return progress;
  });

  const toggleCategory = (letter: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(letter)) {
      newExpanded.delete(letter);
    } else {
      newExpanded.add(letter);
    }
    setExpandedCategories(newExpanded);
  };

  const handleSkillClick = (categoryLetter: string, skillIndex: number, skillName: string) => {
    console.log("Skill clicked:", { categoryLetter, skillIndex, skillName, isAuthenticated });
    
    if (!isAuthenticated) {
      // Show auth screen - this will be handled by parent component
      window.location.href = '/#auth';
      return;
    }

    const skillId = `${categoryLetter}-${skillIndex}`;
    setSelectedSkill(skillId);
    
    // Find category name
    const category = year7MathsCurriculum.find(cat => cat.letter === categoryLetter);
    const categoryName = category?.title || '';
    
    console.log("Starting practice:", { skillName, categoryName });
    
    // Start practice session
    setPracticingSkill({ name: skillName, category: categoryName });
  };

  const handlePracticeComplete = (categoryLetter: string, skillIndex: number, correct: number, total: number) => {
    const skillId = `${categoryLetter}-${skillIndex}`;
    const accuracy = Math.round((correct / total) * 100);
    
    // Update progress
    setSkillProgress(prev => ({
      ...prev,
      [skillId]: {
        practiced: true,
        mastered: accuracy >= 80,
        attempts: (prev[skillId]?.attempts || 0) + total,
        correct: (prev[skillId]?.correct || 0) + correct
      }
    }));
    
    setPracticingSkill(null);
  };

  const getSkillProgress = (categoryLetter: string, skillIndex: number) => {
    const skillId = `${categoryLetter}-${skillIndex}`;
    return skillProgress[skillId] || { practiced: false, mastered: false, attempts: 0, correct: 0 };
  };

  const getSkillAccuracy = (categoryLetter: string, skillIndex: number) => {
    const progress = getSkillProgress(categoryLetter, skillIndex);
    if (progress.attempts === 0) return 0;
    return Math.round((progress.correct / progress.attempts) * 100);
  };

  const totalSkills = year7MathsCurriculum.reduce((sum, cat) => sum + cat.skills.length, 0);
  const practicedSkills = Object.values(skillProgress).filter(p => p.practiced).length;
  const masteredSkills = Object.values(skillProgress).filter(p => p.mastered).length;

  return (
    <>
      {practicingSkill && (
        <SkillPractice
          skillName={practicingSkill.name}
          category={practicingSkill.category}
          onClose={() => setPracticingSkill(null)}
          onComplete={(correct, total) => {
            const categoryLetter = selectedSkill?.split('-')[0] || '';
            const skillIndex = parseInt(selectedSkill?.split('-')[1] || '0');
            handlePracticeComplete(categoryLetter, skillIndex, correct, total);
          }}
        />
      )}
      <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Year 7 Maths</h1>
        <p className="text-xl text-gray-600 mb-6">
          Table Trek offers hundreds of Year 7 maths skills to explore and learn!
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 rounded-full">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span className="text-lg font-semibold text-blue-900">
              {totalSkills}+ Skills Available
            </span>
          </div>
          {isAuthenticated && (
            <>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 rounded-full">
                <Play className="w-5 h-5 text-green-600" />
                <span className="text-lg font-semibold text-green-900">
                  {practicedSkills} Practiced
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-purple-50 rounded-full">
                <Star className="w-5 h-5 text-purple-600" />
                <span className="text-lg font-semibold text-purple-900">
                  {masteredSkills} Mastered
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {year7MathsCurriculum.map((category) => {
          const isExpanded = expandedCategories.has(category.letter);
          return (
            <Card key={category.letter} className="overflow-hidden border-2 hover:border-blue-300 transition-colors">
              <button
                onClick={() => toggleCategory(category.letter)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl font-bold text-blue-600">{category.letter}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                    <p className="text-sm text-gray-600">{category.skills.length} skills</p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </button>
              
              {isExpanded && (
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {category.skills.map((skill, index) => {
                      const progress = getSkillProgress(category.letter, index);
                      const accuracy = getSkillAccuracy(category.letter, index);
                      const skillId = `${category.letter}-${index}`;
                      const isSelected = selectedSkill === skillId;
                      
                      return (
                        <div
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSkillClick(category.letter, index, skill);
                          }}
                          className={`p-4 bg-white rounded-lg border-2 transition-all cursor-pointer group ${
                            isSelected 
                              ? 'border-blue-500 shadow-lg scale-105' 
                              : progress.mastered
                              ? 'border-green-400 hover:border-green-500'
                              : progress.practiced
                              ? 'border-blue-300 hover:border-blue-400'
                              : 'border-gray-200 hover:border-blue-400'
                          } hover:shadow-md`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2 flex-1">
                              <span className="text-sm font-semibold text-blue-600">
                                {index + 1}.
                              </span>
                              <span className={`text-sm font-medium ${
                                progress.mastered ? 'text-green-700' : 'text-gray-700'
                              }`}>
                                {skill}
                              </span>
                            </div>
                            {progress.mastered && (
                              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                            )}
                            {progress.practiced && !progress.mastered && (
                              <Star className="w-5 h-5 text-blue-400 flex-shrink-0" />
                            )}
                          </div>

                          {progress.practiced && (
                            <div className="mt-2 space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-600">Accuracy</span>
                                <span className={`font-semibold ${
                                  accuracy >= 80 ? 'text-green-600' :
                                  accuracy >= 60 ? 'text-yellow-600' : 'text-red-600'
                                }`}>
                                  {accuracy}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                  className={`h-1.5 rounded-full transition-all ${
                                    accuracy >= 80 ? 'bg-green-500' :
                                    accuracy >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${accuracy}%` }}
                                />
                              </div>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>{progress.attempts} attempts</span>
                                <span>{progress.correct} correct</span>
                              </div>
                            </div>
                          )}

                          {!progress.practiced && (
                            <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                              <Play className="w-3 h-3" />
                              <span>Click to practice</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-6">
          Not sure where to start? Go to your personalised Recommendations wall to find a skill
          that looks interesting, or select a skill plan that aligns to your textbook, territory
          curriculum, or standardised test.
        </p>
        {!isAuthenticated ? (
          <Button
            size="lg"
            onClick={() => window.location.href = '/#auth'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
          >
            Sign In to Start Learning
          </Button>
        ) : (
          <Button
            size="lg"
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
          >
            Continue Learning
          </Button>
        )}
      </div>
      </div>
    </>
  );
}
