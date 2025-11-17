// Comprehensive question generators for Year 7 Maths skills
export interface SkillQuestion {
  id: string;
  type: string;
  question: string;
  correctAnswer: number | string;
  options: (number | string)[];
  explanation?: string;
}

export class SkillQuestionGenerator {
  // Main question generator - maps skills to appropriate question types
  static generateQuestion(skillName: string, category: string): SkillQuestion {
    const skillLower = skillName.toLowerCase();
    const categoryLower = category.toLowerCase();
    
    // ========== NUMBER THEORY (A) ==========
    if (skillLower.includes('prime or composite')) {
      return this.generatePrimeCompositeQuestion();
    }
    if (skillLower.includes('prime factorisation') || skillLower.includes('prime factorization')) {
      return this.generatePrimeFactorizationQuestion();
    }
    if (skillLower.includes('multiplicative inverse')) {
      return this.generateMultiplicativeInverseQuestion();
    }
    if (skillLower.includes('divisibility rule')) {
      return this.generateDivisibilityRuleQuestion();
    }
    if (skillLower.includes('highest common factor') || skillLower.includes('hcf') || skillLower.includes('greatest common factor') || skillLower.includes('gcf')) {
      return this.generateHCFQuestion();
    }
    if (skillLower.includes('lowest common multiple') || skillLower.includes('lcm')) {
      return this.generateLCMQuestion();
    }
    if (skillLower.includes('classify number')) {
      return this.generateClassifyNumberQuestion();
    }
    
    // ========== INTEGERS (B, C) ==========
    if (skillLower.includes('understanding integer') || skillLower.includes('integer on number line')) {
      return this.generateIntegerOnNumberLineQuestion();
    }
    if (skillLower.includes('compare integer') || skillLower.includes('order integer')) {
      return this.generateCompareIntegersQuestion();
    }
    if (skillLower.includes('add integer') && !skillLower.includes('subtract')) {
      return this.generateIntegerAdditionQuestion();
    }
    if (skillLower.includes('subtract integer') && !skillLower.includes('add')) {
      return this.generateIntegerSubtractionQuestion();
    }
    if (skillLower.includes('multiply integer')) {
      return this.generateIntegerMultiplicationQuestion();
    }
    if (skillLower.includes('divide integer')) {
      return this.generateIntegerDivisionQuestion();
    }
    if (skillLower.includes('evaluate numerical expression') && skillLower.includes('integer')) {
      return this.generateIntegerExpressionQuestion();
    }
    
    // ========== DECIMALS (D, E) ==========
    if (skillLower.includes('compare') && skillLower.includes('decimal')) {
      return this.generateDecimalComparisonQuestion();
    }
    if (skillLower.includes('order') && skillLower.includes('decimal')) {
      return this.generateDecimalOrderingQuestion();
    }
    if (skillLower.includes('round decimal')) {
      return this.generateRoundDecimalQuestion();
    }
    if (skillLower.includes('add') && skillLower.includes('decimal') && !skillLower.includes('subtract')) {
      return this.generateDecimalAdditionQuestion();
    }
    if (skillLower.includes('subtract') && skillLower.includes('decimal') && !skillLower.includes('add')) {
      return this.generateDecimalSubtractionQuestion();
    }
    if (skillLower.includes('multiply') && skillLower.includes('decimal')) {
      return this.generateDecimalMultiplicationQuestion();
    }
    if (skillLower.includes('divide') && skillLower.includes('decimal')) {
      return this.generateDecimalDivisionQuestion();
    }
    if (skillLower.includes('estimate') && skillLower.includes('decimal')) {
      return this.generateDecimalEstimationQuestion();
    }
    
    // ========== FRACTIONS (F, G, H) ==========
    if (skillLower.includes('equivalent fraction')) {
      return this.generateEquivalentFractionQuestion();
    }
    if (skillLower.includes('lowest term') || skillLower.includes('simplify fraction')) {
      return this.generateSimplifyFractionQuestion();
    }
    if (skillLower.includes('lowest common denominator') || skillLower.includes('lcd')) {
      return this.generateLCDQuestion();
    }
    if (skillLower.includes('compare') && skillLower.includes('fraction') && !skillLower.includes('rational')) {
      return this.generateFractionComparisonQuestion();
    }
    if (skillLower.includes('convert') && (skillLower.includes('mixed number') || skillLower.includes('improper fraction'))) {
      return this.generateMixedNumberConversionQuestion();
    }
    if (skillLower.includes('add') && skillLower.includes('fraction') && !skillLower.includes('subtract')) {
      return this.generateFractionAdditionQuestion();
    }
    if (skillLower.includes('subtract') && skillLower.includes('fraction') && !skillLower.includes('add')) {
      return this.generateFractionSubtractionQuestion();
    }
    if (skillLower.includes('multiply') && skillLower.includes('fraction')) {
      return this.generateFractionMultiplicationQuestion();
    }
    if (skillLower.includes('divide') && skillLower.includes('fraction')) {
      return this.generateFractionDivisionQuestion();
    }
    if (skillLower.includes('reciprocal')) {
      return this.generateReciprocalQuestion();
    }
    
    // ========== RATIONAL NUMBERS (I) ==========
    if (skillLower.includes('convert') && skillLower.includes('decimal') && skillLower.includes('fraction')) {
      return this.generateDecimalFractionConversionQuestion();
    }
    if (skillLower.includes('compare rational') || skillLower.includes('put rational number in order')) {
      return this.generateRationalComparisonQuestion();
    }
    
    // ========== EXPONENTS & SQUARE ROOTS (J) ==========
    if (skillLower.includes('exponent') || skillLower.includes('power')) {
      if (skillLower.includes('power of ten')) {
        return this.generatePowerOfTenQuestion();
      }
      return this.generateExponentQuestion();
    }
    if (skillLower.includes('square root')) {
      if (skillLower.includes('estimate')) {
        return this.generateEstimateSquareRootQuestion();
      }
      return this.generateSquareRootQuestion();
    }
    
    // ========== RATIOS & PROPORTIONS (K) ==========
    if (skillLower.includes('ratio')) {
      if (skillLower.includes('equivalent ratio')) {
        return this.generateEquivalentRatioQuestion();
      }
      if (skillLower.includes('proportion')) {
        return this.generateProportionQuestion();
      }
      return this.generateRatioQuestion();
    }
    if (skillLower.includes('unit rate')) {
      return this.generateUnitRateQuestion();
    }
    
    // ========== PERCENTS (L) ==========
    if (skillLower.includes('percent') || skillLower.includes('%')) {
      if (skillLower.includes('convert')) {
        return this.generatePercentConversionQuestion();
      }
      if (skillLower.includes('find what percent')) {
        return this.generateFindPercentQuestion();
      }
      if (skillLower.includes('percent equation')) {
        return this.generatePercentEquationQuestion();
      }
      return this.generatePercentQuestion();
    }
    
    // ========== CONSUMER MATHS (M) ==========
    if (skillLower.includes('unit price') || skillLower.includes('price list')) {
      return this.generateUnitPriceQuestion();
    }
    if (skillLower.includes('discount') || skillLower.includes('mark-up') || skillLower.includes('sale price')) {
      return this.generateDiscountQuestion();
    }
    if (skillLower.includes('gst')) {
      return this.generateGSTQuestion();
    }
    
    // ========== PROBLEM SOLVING & ESTIMATION (N) ==========
    if (skillLower.includes('estimate') && skillLower.includes('word problem')) {
      return this.generateEstimateWordProblemQuestion();
    }
    if (skillLower.includes('multi-step') && skillLower.includes('word problem')) {
      return this.generateMultiStepWordProblemQuestion();
    }
    if (skillLower.includes('guess-and-check') || skillLower.includes('guess and check')) {
      return this.generateGuessAndCheckQuestion();
    }
    if (skillLower.includes('venn diagram')) {
      return this.generateVennDiagramQuestion();
    }
    if (skillLower.includes('coin') && (skillLower.includes('type') || skillLower.includes('number'))) {
      return this.generateCoinProblemQuestion();
    }
    if (skillLower.includes('elapsed time') || skillLower.includes('time word problem')) {
      return this.generateElapsedTimeQuestion();
    }
    
    // ========== ALGEBRA (Q, R, S, T) ==========
    if (skillLower.includes('sequence')) {
      if (skillLower.includes('arithmetic')) {
        return this.generateArithmeticSequenceQuestion();
      }
      if (skillLower.includes('geometric')) {
        return this.generateGeometricSequenceQuestion();
      }
      return this.generateSequenceQuestion();
    }
    if (skillLower.includes('variable expression') || skillLower.includes('write expression')) {
      return this.generateVariableExpressionQuestion();
    }
    if (skillLower.includes('evaluate') && (skillLower.includes('expression') || skillLower.includes('linear'))) {
      return this.generateEvaluateExpressionQuestion();
    }
    if (skillLower.includes('distributive property')) {
      return this.generateDistributivePropertyQuestion();
    }
    if (skillLower.includes('like term')) {
      return this.generateLikeTermsQuestion();
    }
    if (skillLower.includes('solve') && skillLower.includes('equation')) {
      if (skillLower.includes('one-step')) {
        return this.generateOneStepEquationQuestion();
      }
      if (skillLower.includes('two-step')) {
        return this.generateTwoStepEquationQuestion();
      }
      return this.generateEquationQuestion();
    }
    if (skillLower.includes('satisfy the equation') || skillLower.includes('which x satisfies')) {
      return this.generateSatisfyEquationQuestion();
    }
    if (skillLower.includes('rate of change')) {
      return this.generateRateOfChangeQuestion();
    }
    
    // ========== GEOMETRY (U, V, W, X) ==========
    if (skillLower.includes('classify polygon') || skillLower.includes('identify polygon')) {
      return this.generatePolygonClassificationQuestion();
    }
    if (skillLower.includes('parallel') || skillLower.includes('perpendicular')) {
      return this.generateParallelPerpendicularQuestion();
    }
    if (skillLower.includes('classify angle') || skillLower.includes('measure angle')) {
      return this.generateAngleQuestion();
    }
    if (skillLower.includes('classify triangle')) {
      return this.generateTriangleClassificationQuestion();
    }
    if (skillLower.includes('classify quadrilateral') || skillLower.includes('identify parallelogram') || skillLower.includes('identify rectangle') || skillLower.includes('identify rhombus') || skillLower.includes('identify trapezium')) {
      return this.generateQuadrilateralClassificationQuestion();
    }
    if (skillLower.includes('missing angle')) {
      return this.generateMissingAngleQuestion();
    }
    if (skillLower.includes('complementary') || skillLower.includes('supplementary')) {
      return this.generateComplementarySupplementaryQuestion();
    }
    if (skillLower.includes('area')) {
      if (skillLower.includes('rectangle') || skillLower.includes('square')) {
        return this.generateRectangleAreaQuestion();
      }
      if (skillLower.includes('parallelogram')) {
        return this.generateParallelogramAreaQuestion();
      }
      if (skillLower.includes('triangle')) {
        return this.generateTriangleAreaQuestion();
      }
      return this.generateAreaQuestion();
    }
    if (skillLower.includes('perimeter')) {
      return this.generatePerimeterQuestion();
    }
    if (skillLower.includes('surface area')) {
      return this.generateSurfaceAreaQuestion();
    }
    if (skillLower.includes('volume')) {
      return this.generateVolumeQuestion();
    }
    if (skillLower.includes('transformation') || skillLower.includes('reflection') || skillLower.includes('rotation') || skillLower.includes('translation')) {
      return this.generateTransformationQuestion();
    }
    
    // ========== STATISTICS & PROBABILITY (Y, Z, AA) ==========
    if (skillLower.includes('mean') || skillLower.includes('median') || skillLower.includes('mode') || skillLower.includes('range')) {
      return this.generateMeanMedianModeQuestion();
    }
    if (skillLower.includes('outlier')) {
      return this.generateOutlierQuestion();
    }
    if (skillLower.includes('probability')) {
      if (skillLower.includes('experimental')) {
        return this.generateExperimentalProbabilityQuestion();
      }
      if (skillLower.includes('simple event')) {
        return this.generateProbabilityQuestion();
      }
      return this.generateProbabilityQuestion();
    }
    if (skillLower.includes('sample space')) {
      return this.generateSampleSpaceQuestion();
    }
    if (skillLower.includes('more') && (skillLower.includes('likely') || skillLower.includes('equally'))) {
      return this.generateLikelihoodQuestion();
    }
    if (skillLower.includes('independent') || skillLower.includes('dependent')) {
      return this.generateIndependentDependentQuestion();
    }
    if (skillLower.includes('predict')) {
      return this.generatePredictionQuestion();
    }
    if (skillLower.includes('representative') || skillLower.includes('random') || skillLower.includes('biased') || skillLower.includes('sample')) {
      return this.generateSampleTypeQuestion();
    }
    
    // ========== DATA & GRAPHS (Y) ==========
    if (skillLower.includes('dot plot') || skillLower.includes('interpret dot')) {
      return this.generateDotPlotQuestion();
    }
    if (skillLower.includes('create dot plot')) {
      return this.generateCreateDotPlotQuestion();
    }
    if (skillLower.includes('stem') && skillLower.includes('leaf')) {
      return this.generateStemLeafQuestion();
    }
    if (skillLower.includes('bar graph') || skillLower.includes('bar chart')) {
      if (skillLower.includes('create') || skillLower.includes('make')) {
        return this.generateCreateBarGraphQuestion();
      }
      return this.generateBarGraphQuestion();
    }
    if (skillLower.includes('line graph')) {
      if (skillLower.includes('create') || skillLower.includes('make')) {
        return this.generateCreateLineGraphQuestion();
      }
      return this.generateLineGraphQuestion();
    }
    if (skillLower.includes('circle graph') || skillLower.includes('pie chart')) {
      return this.generateCircleGraphQuestion();
    }
    if (skillLower.includes('frequency table')) {
      return this.generateFrequencyTableQuestion();
    }
    if (skillLower.includes('interpret table') || skillLower.includes('interpret chart')) {
      return this.generateTableQuestion();
    }
    if (skillLower.includes('best type of graph') || skillLower.includes('choose graph')) {
      return this.generateBestGraphTypeQuestion();
    }
    
    // ========== MEASUREMENT (O) ==========
    if (skillLower.includes('convert') && skillLower.includes('metric')) {
      return this.generateMetricConversionQuestion();
    }
    if (skillLower.includes('estimate metric')) {
      return this.generateEstimateMetricQuestion();
    }
    if (skillLower.includes('metric mixed')) {
      return this.generateMetricMixedQuestion();
    }
    if (skillLower.includes('square metre') || skillLower.includes('hectare')) {
      return this.generateAreaConversionQuestion();
    }
    if (skillLower.includes('cubic metre') || skillLower.includes('litre')) {
      return this.generateVolumeConversionQuestion();
    }
    if (skillLower.includes('precision')) {
      return this.generatePrecisionQuestion();
    }
    
    // ========== COORDINATE PLANE (P) ==========
    if (skillLower.includes('coordinate') || skillLower.includes('quadrant')) {
      return this.generateCoordinateQuestion();
    }
    if (skillLower.includes('graph point') || skillLower.includes('plot point')) {
      return this.generateGraphPointQuestion();
    }
    if (skillLower.includes('follow direction') || skillLower.includes('coordinate plane')) {
      return this.generateCoordinateDirectionQuestion();
    }
    
    // ========== GEOMETRY ADDITIONAL (U, V, W) ==========
    if (skillLower.includes('symmetry')) {
      return this.generateSymmetryQuestion();
    }
    if (skillLower.includes('net') || skillLower.includes('three-dimensional')) {
      return this.generateNetQuestion();
    }
    if (skillLower.includes('front') && (skillLower.includes('side') || skillLower.includes('top view'))) {
      return this.generateViewQuestion();
    }
    if (skillLower.includes('circle') && (skillLower.includes('part') || skillLower.includes('radius') || skillLower.includes('diameter'))) {
      return this.generateCirclePartsQuestion();
    }
    if (skillLower.includes('construct')) {
      return this.generateConstructionQuestion();
    }
    if (skillLower.includes('transversal') || skillLower.includes('parallel line')) {
      return this.generateTransversalQuestion();
    }
    
    // ========== CONSUMER MATHS ADDITIONAL (M) ==========
    if (skillLower.includes('better coupon') || skillLower.includes('coupon')) {
      return this.generateCouponQuestion();
    }
    if (skillLower.includes('money') && skillLower.includes('word problem')) {
      return this.generateMoneyWordProblemQuestion();
    }
    if (skillLower.includes('sale price') || skillLower.includes('original price')) {
      return this.generateSalePriceQuestion();
    }
    if (skillLower.includes('multi-step') && skillLower.includes('percent')) {
      return this.generateMultiStepPercentQuestion();
    }
    
    // ========== RATIONAL NUMBERS (I) ==========
    if (skillLower.includes('rational number')) {
      if (skillLower.includes('compare') || skillLower.includes('order')) {
        return this.generateRationalComparisonQuestion();
      }
      if (skillLower.includes('add') || skillLower.includes('subtract')) {
        return this.generateRationalOperationQuestion();
      }
      if (skillLower.includes('multiply') || skillLower.includes('divide')) {
        return this.generateRationalOperationQuestion();
      }
      return this.generateRationalNumberQuestion();
    }
    
    // ========== EXPONENTS (J) ==========
    if (skillLower.includes('exponent') || skillLower.includes('power')) {
      if (skillLower.includes('evaluate')) {
        return this.generateEvaluatePowerQuestion();
      }
      if (skillLower.includes('power of ten')) {
        return this.generatePowerOfTenQuestion();
      }
      return this.generateExponentQuestion();
    }
    if (skillLower.includes('square root')) {
      if (skillLower.includes('perfect square')) {
        return this.generatePerfectSquareRootQuestion();
      }
      return this.generateEstimateSquareRootQuestion();
    }
    
    // ========== RATIOS & PROPORTIONS ADDITIONAL (K) ==========
    if (skillLower.includes('unit rate')) {
      return this.generateUnitRateQuestion();
    }
    if (skillLower.includes('proportion')) {
      if (skillLower.includes('form')) {
        return this.generateProportionFormQuestion();
      }
      if (skillLower.includes('solve')) {
        return this.generateSolveProportionQuestion();
      }
      return this.generateProportionQuestion();
    }
    if (skillLower.includes('population size')) {
      return this.generatePopulationEstimateQuestion();
    }
    
    // ========== PERCENTS ADDITIONAL (L) ==========
    if (skillLower.includes('percentage illustrated') || skillLower.includes('what percentage')) {
      return this.generatePercentageIllustratedQuestion();
    }
    if (skillLower.includes('grid model') || skillLower.includes('strip model')) {
      return this.generatePercentModelQuestion();
    }
    if (skillLower.includes('find what percent')) {
      return this.generateFindPercentQuestion();
    }
    
    // ========== FRACTIONS ADDITIONAL (F, G, H) ==========
    if (skillLower.includes('understanding fraction') && skillLower.includes('word problem')) {
      return this.generateFractionWordProblemQuestion();
    }
    if (skillLower.includes('graph equivalent fraction')) {
      return this.generateGraphEquivalentFractionQuestion();
    }
    if (skillLower.includes('fraction') && skillLower.includes('graph') && skillLower.includes('table')) {
      return this.generateFractionGraphTableQuestion();
    }
    if (skillLower.includes('round mixed number')) {
      return this.generateRoundMixedNumberQuestion();
    }
    if (skillLower.includes('inequality') && (skillLower.includes('fraction') || skillLower.includes('decimal'))) {
      return this.generateInequalityQuestion();
    }
    if (skillLower.includes('map') && skillLower.includes('decimal')) {
      return this.generateMapDecimalQuestion();
    }
    
    // ========== NUMBER SEQUENCES ADDITIONAL (Q) ==========
    if (skillLower.includes('identify') && (skillLower.includes('arithmetic') || skillLower.includes('geometric'))) {
      return this.generateIdentifySequenceQuestion();
    }
    if (skillLower.includes('variable expression') && skillLower.includes('sequence')) {
      return this.generateSequenceExpressionQuestion();
    }
    
    // ========== EXPRESSIONS ADDITIONAL (R) ==========
    if (skillLower.includes('term') && skillLower.includes('coefficient')) {
      return this.generateTermCoefficientQuestion();
    }
    if (skillLower.includes('factor') && skillLower.includes('expression')) {
      return this.generateFactorExpressionQuestion();
    }
    if (skillLower.includes('equivalent expression')) {
      return this.generateEquivalentExpressionQuestion();
    }
    if (skillLower.includes('algebra tile')) {
      return this.generateAlgebraTileQuestion();
    }
    
    // ========== EQUATIONS ADDITIONAL (S, T) ==========
    if (skillLower.includes('write equation') || skillLower.includes('equation from word')) {
      return this.generateWriteEquationQuestion();
    }
    if (skillLower.includes('model') && skillLower.includes('equation')) {
      return this.generateModelEquationQuestion();
    }
    if (skillLower.includes('complete') && (skillLower.includes('solution') || skillLower.includes('table'))) {
      return this.generateCompleteSolutionQuestion();
    }
    if (skillLower.includes('two-variable') || skillLower.includes('two variable')) {
      return this.generateTwoVariableEquationQuestion();
    }
    if (skillLower.includes('interpret graph') && skillLower.includes('word problem')) {
      return this.generateGraphInterpretationQuestion();
    }
    if (skillLower.includes('constant rate')) {
      return this.generateConstantRateQuestion();
    }
    
    // Default fallback - try to infer from category
    if (categoryLower.includes('integer')) {
      return this.generateIntegerAdditionQuestion();
    }
    if (categoryLower.includes('decimal')) {
      return this.generateDecimalAdditionQuestion();
    }
    if (categoryLower.includes('fraction')) {
      return this.generateFractionAdditionQuestion();
    }
    if (categoryLower.includes('ratio') || categoryLower.includes('proportion')) {
      return this.generateRatioQuestion();
    }
    if (categoryLower.includes('percent')) {
      return this.generatePercentQuestion();
    }
    if (categoryLower.includes('geometry') || categoryLower.includes('geometric')) {
      return this.generateAreaQuestion();
    }
    if (categoryLower.includes('statistic') || categoryLower.includes('data')) {
      return this.generateMeanMedianModeQuestion();
    }
    if (categoryLower.includes('probability')) {
      return this.generateProbabilityQuestion();
    }
    if (categoryLower.includes('measurement')) {
      return this.generateMetricConversionQuestion();
    }
    if (categoryLower.includes('algebra') || categoryLower.includes('expression') || categoryLower.includes('equation')) {
      return this.generateEvaluateExpressionQuestion();
    }
    
    // Last resort - return a generic math question
    return this.generateGenericMathQuestion();
  }
  
  // ========== NUMBER THEORY GENERATORS ==========
  
  static generatePrimeCompositeQuestion(): SkillQuestion {
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
    const composites = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25];
    const isPrime = Math.random() > 0.5;
    const number = isPrime 
      ? primes[Math.floor(Math.random() * primes.length)]
      : composites[Math.floor(Math.random() * composites.length)];
    
    return {
      id: `prime-${Date.now()}`,
      type: 'prime-composite',
      question: `Is ${number} prime or composite?`,
      correctAnswer: isPrime ? 'prime' : 'composite',
      options: ['prime', 'composite', 'neither', 'both'].sort(() => Math.random() - 0.5),
      explanation: `${number} is ${isPrime ? 'prime' : 'composite'}`
    };
  }
  
  static generatePrimeFactorizationQuestion(): SkillQuestion {
    const numbers = [12, 18, 24, 30, 36, 48, 60, 72];
    const number = numbers[Math.floor(Math.random() * numbers.length)];
    const factors = this.primeFactors(number);
    const correct = factors.join(' × ');
    
    const wrongOptions = [
      factors.slice(0, -1).join(' × '),
      factors.slice(1).join(' × '),
      factors.reverse().join(' × ')
    ].filter(opt => opt !== correct);
    
    return {
      id: `prime-fact-${Date.now()}`,
      type: 'prime-factorization',
      question: `What is the prime factorisation of ${number}?`,
      correctAnswer: correct,
      options: [correct, ...wrongOptions.slice(0, 3)].sort(() => Math.random() - 0.5),
      explanation: `${number} = ${correct}`
    };
  }
  
  static generateMultiplicativeInverseQuestion(): SkillQuestion {
    const fractions = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    const num = fractions[Math.floor(Math.random() * fractions.length)];
    const correct = `1/${num}`;
    
    const wrongOptions = [
      `${num}`,
      `-${num}`,
      `${num}/1`
    ];
    
    return {
      id: `mult-inv-${Date.now()}`,
      type: 'multiplicative-inverse',
      question: `What is the multiplicative inverse of ${num}?`,
      correctAnswer: correct,
      options: [correct, ...wrongOptions].sort(() => Math.random() - 0.5),
      explanation: `The multiplicative inverse of ${num} is ${correct} because ${num} × ${correct} = 1`
    };
  }
  
  static generateDivisibilityRuleQuestion(): SkillQuestion {
    const rules = [
      { num: 12, divisibleBy: 3, rule: 'sum of digits' },
      { num: 15, divisibleBy: 5, rule: 'ends in 0 or 5' },
      { num: 18, divisibleBy: 9, rule: 'sum of digits divisible by 9' },
      { num: 24, divisibleBy: 4, rule: 'last two digits divisible by 4' }
    ];
    const rule = rules[Math.floor(Math.random() * rules.length)];
    
    return {
      id: `divis-${Date.now()}`,
      type: 'divisibility',
      question: `Is ${rule.num} divisible by ${rule.divisibleBy}?`,
      correctAnswer: 'yes',
      options: ['yes', 'no'].sort(() => Math.random() - 0.5),
      explanation: `Yes, ${rule.num} is divisible by ${rule.divisibleBy} (${rule.rule})`
    };
  }
  
  static generateClassifyNumberQuestion(): SkillQuestion {
    const numbers = [
      { num: 7, type: 'prime' },
      { num: 9, type: 'composite' },
      { num: 16, type: 'square' },
      { num: 8, type: 'cube' }
    ];
    const item = numbers[Math.floor(Math.random() * numbers.length)];
    
    return {
      id: `classify-${Date.now()}`,
      type: 'classify-number',
      question: `What type of number is ${item.num}?`,
      correctAnswer: item.type,
      options: ['prime', 'composite', 'square', 'cube'].sort(() => Math.random() - 0.5),
      explanation: `${item.num} is a ${item.type} number`
    };
  }
  
  // ========== INTEGER GENERATORS ==========
  
  static generateIntegerOnNumberLineQuestion(): SkillQuestion {
    const num = Math.floor(Math.random() * 20) - 10;
    return {
      id: `int-numline-${Date.now()}`,
      type: 'integer-number-line',
      question: `Which point on the number line represents ${num}?`,
      correctAnswer: num,
      options: [num, num - 1, num + 1, num - 2].sort(() => Math.random() - 0.5),
      explanation: `${num} is located ${num} units from zero`
    };
  }
  
  static generateCompareIntegersQuestion(): SkillQuestion {
    const a = Math.floor(Math.random() * 20) - 10;
    const b = Math.floor(Math.random() * 20) - 10;
    const correct = a > b ? '>' : a < b ? '<' : '=';
    
    return {
      id: `compare-int-${Date.now()}`,
      type: 'compare-integers',
      question: `Compare: ${a} ? ${b}`,
      correctAnswer: correct,
      options: ['>', '<', '=', '≠'].sort(() => Math.random() - 0.5),
      explanation: `${a} ${correct} ${b}`
    };
  }
  
  static generateIntegerAdditionQuestion(): SkillQuestion {
    const a = Math.floor(Math.random() * 50) - 25;
    const b = Math.floor(Math.random() * 50) - 25;
    const correct = a + b;
    
    const wrongAnswers = new Set<number>();
    while (wrongAnswers.size < 3) {
      const offset = Math.floor(Math.random() * 20) - 10;
      const wrong = correct + offset;
      if (wrong !== correct) wrongAnswers.add(wrong);
    }
    
    return {
      id: `int-add-${Date.now()}`,
      type: 'integer-addition',
      question: `${a} + ${b} = ?`,
      correctAnswer: correct,
      options: [correct, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5),
      explanation: `${a} + ${b} = ${correct}`
    };
  }
  
  static generateIntegerSubtractionQuestion(): SkillQuestion {
    const a = Math.floor(Math.random() * 50) - 25;
    const b = Math.floor(Math.random() * 50) - 25;
    const correct = a - b;
    
    const wrongAnswers = new Set<number>();
    while (wrongAnswers.size < 3) {
      const offset = Math.floor(Math.random() * 20) - 10;
      const wrong = correct + offset;
      if (wrong !== correct) wrongAnswers.add(wrong);
    }
    
    return {
      id: `int-sub-${Date.now()}`,
      type: 'integer-subtraction',
      question: `${a} - ${b} = ?`,
      correctAnswer: correct,
      options: [correct, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5),
      explanation: `${a} - ${b} = ${correct}`
    };
  }
  
  static generateIntegerMultiplicationQuestion(): SkillQuestion {
    const a = Math.floor(Math.random() * 20) - 10;
    const b = Math.floor(Math.random() * 20) - 10;
    const correct = a * b;
    
    const wrongAnswers = new Set<number>();
    while (wrongAnswers.size < 3) {
      const offset = Math.floor(Math.random() * 30) - 15;
      const wrong = correct + offset;
      if (wrong !== correct) wrongAnswers.add(wrong);
    }
    
    return {
      id: `int-mult-${Date.now()}`,
      type: 'integer-multiplication',
      question: `${a} × ${b} = ?`,
      correctAnswer: correct,
      options: [correct, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5),
      explanation: `${a} × ${b} = ${correct}`
    };
  }
  
  static generateIntegerDivisionQuestion(): SkillQuestion {
    const divisor = Math.floor(Math.random() * 12) + 2;
    const quotient = Math.floor(Math.random() * 10) - 5;
    const dividend = divisor * quotient;
    const correct = quotient;
    
    const wrongAnswers = new Set<number>();
    while (wrongAnswers.size < 3) {
      const wrong = quotient + Math.floor(Math.random() * 10) - 5;
      if (wrong !== correct) wrongAnswers.add(wrong);
    }
    
    return {
      id: `int-div-${Date.now()}`,
      type: 'integer-division',
      question: `${dividend} ÷ ${divisor} = ?`,
      correctAnswer: correct,
      options: [correct, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5),
      explanation: `${dividend} ÷ ${divisor} = ${quotient}`
    };
  }
  
  static generateIntegerExpressionQuestion(): SkillQuestion {
    const a = Math.floor(Math.random() * 10) - 5;
    const b = Math.floor(Math.random() * 10) - 5;
    const c = Math.floor(Math.random() * 10) - 5;
    const correct = a + b * c;
    
    const wrongAnswers = new Set<number>();
    wrongAnswers.add((a + b) * c);
    wrongAnswers.add(a * b + c);
    wrongAnswers.add(a + b + c);
    
    return {
      id: `int-expr-${Date.now()}`,
      type: 'integer-expression',
      question: `Evaluate: ${a} + ${b} × ${c}`,
      correctAnswer: correct,
      options: [correct, ...Array.from(wrongAnswers).filter(x => x !== correct)].sort(() => Math.random() - 0.5),
      explanation: `${a} + ${b} × ${c} = ${a} + ${b * c} = ${correct}`
    };
  }
  
  // ========== DECIMAL GENERATORS ==========
  
  static generateDecimalComparisonQuestion(): SkillQuestion {
    const a = Math.round((Math.random() * 100) * 100) / 100;
    const b = Math.round((Math.random() * 100) * 100) / 100;
    const correct = a > b ? '>' : a < b ? '<' : '=';
    
    return {
      id: `dec-comp-${Date.now()}`,
      type: 'decimal-comparison',
      question: `Compare: ${a} ? ${b}`,
      correctAnswer: correct,
      options: ['>', '<', '=', '≠'].sort(() => Math.random() - 0.5),
      explanation: `${a} ${correct} ${b}`
    };
  }
  
  static generateDecimalOrderingQuestion(): SkillQuestion {
    const decimals = [
      Math.round((Math.random() * 10) * 100) / 100,
      Math.round((Math.random() * 10) * 100) / 100,
      Math.round((Math.random() * 10) * 100) / 100
    ].sort((a, b) => a - b);
    
    return {
      id: `dec-order-${Date.now()}`,
      type: 'decimal-ordering',
      question: `Order these decimals from least to greatest: ${decimals.reverse().join(', ')}`,
      correctAnswer: decimals.reverse().join(', '),
      options: [
        decimals.join(', '),
        decimals.reverse().join(', '),
        decimals.sort(() => Math.random() - 0.5).join(', '),
        decimals.sort(() => Math.random() - 0.5).join(', ')
      ].sort(() => Math.random() - 0.5),
      explanation: `Ordered from least to greatest: ${decimals.join(', ')}`
    };
  }
  
  static generateRoundDecimalQuestion(): SkillQuestion {
    const num = Math.round((Math.random() * 100 + 1) * 1000) / 1000;
    const place = ['tenths', 'hundredths'][Math.floor(Math.random() * 2)];
    const correct = place === 'tenths' 
      ? Math.round(num * 10) / 10 
      : Math.round(num * 100) / 100;
    
    const wrongAnswers = new Set<number>();
    while (wrongAnswers.size < 3) {
      const wrong = correct + (Math.random() * 0.2 - 0.1);
      if (Math.abs(wrong - correct) > 0.01) wrongAnswers.add(Math.round(wrong * 100) / 100);
    }
    
    return {
      id: `round-dec-${Date.now()}`,
      type: 'round-decimal',
      question: `Round ${num} to the nearest ${place}`,
      correctAnswer: correct,
      options: [correct, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5),
      explanation: `${num} rounded to the nearest ${place} is ${correct}`
    };
  }
  
  static generateDecimalAdditionQuestion(): SkillQuestion {
    const a = Math.round((Math.random() * 100) * 100) / 100;
    const b = Math.round((Math.random() * 100) * 100) / 100;
    const correct = Math.round((a + b) * 100) / 100;
    
    const wrongAnswers = new Set<number>();
    while (wrongAnswers.size < 3) {
      const offset = (Math.random() * 2 - 1) * 5;
      const wrong = Math.round((correct + offset) * 100) / 100;
      if (wrong !== correct) wrongAnswers.add(wrong);
    }
    
    return {
      id: `dec-add-${Date.now()}`,
      type: 'decimal-addition',
      question: `${a} + ${b} = ?`,
      correctAnswer: correct,
      options: [correct, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5),
      explanation: `${a} + ${b} = ${correct}`
    };
  }
  
  static generateDecimalSubtractionQuestion(): SkillQuestion {
    const a = Math.round((Math.random() * 100) * 100) / 100;
    const b = Math.round((Math.random() * 100) * 100) / 100;
    const correct = Math.round((a - b) * 100) / 100;
    
    const wrongAnswers = new Set<number>();
    while (wrongAnswers.size < 3) {
      const offset = (Math.random() * 2 - 1) * 5;
      const wrong = Math.round((correct + offset) * 100) / 100;
      if (wrong !== correct) wrongAnswers.add(wrong);
    }
    
    return {
      id: `dec-sub-${Date.now()}`,
      type: 'decimal-subtraction',
      question: `${a} - ${b} = ?`,
      correctAnswer: correct,
      options: [correct, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5),
      explanation: `${a} - ${b} = ${correct}`
    };
  }
  
  static generateDecimalMultiplicationQuestion(): SkillQuestion {
    const a = Math.round((Math.random() * 20 + 1) * 10) / 10;
    const b = Math.round((Math.random() * 10 + 1) * 10) / 10;
    const correct = Math.round((a * b) * 100) / 100;
    
    const wrongAnswers = new Set<number>();
    while (wrongAnswers.size < 3) {
      const offset = (Math.random() * 2 - 1) * 10;
      const wrong = Math.round((correct + offset) * 100) / 100;
      if (wrong !== correct && wrong > 0) wrongAnswers.add(wrong);
    }
    
    return {
      id: `dec-mult-${Date.now()}`,
      type: 'decimal-multiplication',
      question: `${a} × ${b} = ?`,
      correctAnswer: correct,
      options: [correct, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5),
      explanation: `${a} × ${b} = ${correct}`
    };
  }
  
  static generateDecimalDivisionQuestion(): SkillQuestion {
    const divisor = Math.round((Math.random() * 10 + 1) * 10) / 10;
    const quotient = Math.round((Math.random() * 10 + 1) * 10) / 10;
    const dividend = Math.round((divisor * quotient) * 100) / 100;
    const correct = quotient;
    
    const wrongAnswers = new Set<number>();
    while (wrongAnswers.size < 3) {
      const wrong = Math.round((quotient + (Math.random() * 2 - 1) * 3) * 10) / 10;
      if (wrong !== correct && wrong > 0) wrongAnswers.add(wrong);
    }
    
    return {
      id: `dec-div-${Date.now()}`,
      type: 'decimal-division',
      question: `${dividend} ÷ ${divisor} = ?`,
      correctAnswer: correct,
      options: [correct, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5),
      explanation: `${dividend} ÷ ${divisor} = ${quotient}`
    };
  }
  
  static generateDecimalEstimationQuestion(): SkillQuestion {
    const a = Math.round((Math.random() * 100) * 100) / 100;
    const b = Math.round((Math.random() * 100) * 100) / 100;
    const sum = a + b;
    const correct = Math.round(sum);
    
    return {
      id: `dec-est-${Date.now()}`,
      type: 'decimal-estimation',
      question: `Estimate: ${a} + ${b}`,
      correctAnswer: correct,
      options: [correct, correct + 1, correct - 1, correct + 2].sort(() => Math.random() - 0.5),
      explanation: `${a} + ${b} ≈ ${correct}`
    };
  }
  
  // ========== FRACTION GENERATORS ==========
  
  static generateEquivalentFractionQuestion(): SkillQuestion {
    const num = Math.floor(Math.random() * 8) + 2;
    const den = Math.floor(Math.random() * 8) + 2;
    const multiplier = Math.floor(Math.random() * 3) + 2;
    const correct = `${num * multiplier}/${den * multiplier}`;
    
    const wrongOptions = [
      `${num}/${den * multiplier}`,
      `${num * multiplier}/${den}`,
      `${num + 1}/${den + 1}`
    ];
    
    return {
      id: `equiv-frac-${Date.now()}`,
      type: 'equivalent-fraction',
      question: `Which fraction is equivalent to ${num}/${den}?`,
      correctAnswer: correct,
      options: [correct, ...wrongOptions].sort(() => Math.random() - 0.5),
      explanation: `${num}/${den} = ${correct}`
    };
  }
  
  static generateSimplifyFractionQuestion(): SkillQuestion {
    const simplified = { num: 2, den: 3 };
    const multiplier = Math.floor(Math.random() * 4) + 2;
    const num = simplified.num * multiplier;
    const den = simplified.den * multiplier;
    const correct = `${simplified.num}/${simplified.den}`;
    
    return {
      id: `simplify-${Date.now()}`,
      type: 'simplify-fraction',
      question: `Simplify ${num}/${den}`,
      correctAnswer: correct,
      options: [correct, `${num}/${den}`, `${num + 1}/${den + 1}`, `${num - 1}/${den - 1}`].sort(() => Math.random() - 0.5),
      explanation: `${num}/${den} = ${correct}`
    };
  }
  
  static generateLCDQuestion(): SkillQuestion {
    const den1 = Math.floor(Math.random() * 5) + 2;
    const den2 = Math.floor(Math.random() * 5) + 2;
    const lcm = this.lcm(den1, den2);
    
    const wrongAnswers = new Set<number>();
    wrongAnswers.add(den1 * den2);
    wrongAnswers.add(Math.max(den1, den2));
    wrongAnswers.add(Math.min(den1, den2));
    
    return {
      id: `lcd-${Date.now()}`,
      type: 'lcd',
      question: `What is the lowest common denominator of ${den1} and ${den2}?`,
      correctAnswer: lcm,
      options: [lcm, ...Array.from(wrongAnswers).filter(x => x !== lcm)].sort(() => Math.random() - 0.5),
      explanation: `LCD of ${den1} and ${den2} is ${lcm}`
    };
  }
  
  static generateFractionComparisonQuestion(): SkillQuestion {
    const den = Math.floor(Math.random() * 10) + 2;
    const num1 = Math.floor(Math.random() * (den - 1)) + 1;
    const num2 = Math.floor(Math.random() * (den - 1)) + 1;
    const correct = num1 > num2 ? '>' : num1 < num2 ? '<' : '=';
    
    return {
      id: `frac-comp-${Date.now()}`,
      type: 'fraction-comparison',
      question: `Compare: ${num1}/${den} ? ${num2}/${den}`,
      correctAnswer: correct,
      options: ['>', '<', '=', '≠'].sort(() => Math.random() - 0.5),
      explanation: `${num1}/${den} ${correct} ${num2}/${den}`
    };
  }
  
  static generateMixedNumberConversionQuestion(): SkillQuestion {
    const whole = Math.floor(Math.random() * 5) + 1;
    const num = Math.floor(Math.random() * 4) + 1;
    const den = Math.floor(Math.random() * 5) + 2;
    const improperNum = whole * den + num;
    const correct = `${improperNum}/${den}`;
    
    const wrongOptions = [
      `${whole}/${den}`,
      `${num}/${den}`,
      `${whole + num}/${den}`
    ];
    
    return {
      id: `mixed-conv-${Date.now()}`,
      type: 'mixed-conversion',
      question: `Convert ${whole} ${num}/${den} to an improper fraction`,
      correctAnswer: correct,
      options: [correct, ...wrongOptions].sort(() => Math.random() - 0.5),
      explanation: `${whole} ${num}/${den} = ${correct}`
    };
  }
  
  static generateFractionAdditionQuestion(): SkillQuestion {
    const denom = Math.floor(Math.random() * 10) + 2;
    const num1 = Math.floor(Math.random() * (denom - 1)) + 1;
    const num2 = Math.floor(Math.random() * (denom - 1)) + 1;
    const numSum = num1 + num2;
    const correct = numSum > denom ? `${Math.floor(numSum / denom)} ${numSum % denom}/${denom}` : `${numSum}/${denom}`;
    
    const wrongAnswers = new Set<string>();
    while (wrongAnswers.size < 3) {
      const wrongNum = numSum + Math.floor(Math.random() * 5) - 2;
      if (wrongNum > 0) {
        const wrong = wrongNum > denom ? `${Math.floor(wrongNum / denom)} ${wrongNum % denom}/${denom}` : `${wrongNum}/${denom}`;
        if (wrong !== correct) wrongAnswers.add(wrong);
      }
    }
    
    return {
      id: `frac-add-${Date.now()}`,
      type: 'fraction-addition',
      question: `${num1}/${denom} + ${num2}/${denom} = ?`,
      correctAnswer: correct,
      options: [correct, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5),
      explanation: `${num1}/${denom} + ${num2}/${denom} = ${correct}`
    };
  }
  
  static generateFractionSubtractionQuestion(): SkillQuestion {
    const denom = Math.floor(Math.random() * 10) + 2;
    const num1 = Math.floor(Math.random() * (denom - 1)) + 2;
    const num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
    const numDiff = num1 - num2;
    const correct = `${numDiff}/${denom}`;
    
    const wrongAnswers = new Set<string>();
    while (wrongAnswers.size < 3) {
      const wrongNum = numDiff + Math.floor(Math.random() * 5) - 2;
      if (wrongNum > 0 && wrongNum !== numDiff) {
        wrongAnswers.add(`${wrongNum}/${denom}`);
      }
    }
    
    return {
      id: `frac-sub-${Date.now()}`,
      type: 'fraction-subtraction',
      question: `${num1}/${denom} - ${num2}/${denom} = ?`,
      correctAnswer: correct,
      options: [correct, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5),
      explanation: `${num1}/${denom} - ${num2}/${denom} = ${correct}`
    };
  }
  
  static generateFractionMultiplicationQuestion(): SkillQuestion {
    const num1 = Math.floor(Math.random() * 8) + 1;
    const den1 = Math.floor(Math.random() * 8) + 2;
    const num2 = Math.floor(Math.random() * 8) + 1;
    const den2 = Math.floor(Math.random() * 8) + 2;
    const numProd = num1 * num2;
    const denProd = den1 * den2;
    const gcd = this.gcd(numProd, denProd);
    const correct = `${numProd / gcd}/${denProd / gcd}`;
    
    const wrongAnswers = new Set<string>();
    while (wrongAnswers.size < 3) {
      const wrongNum = numProd + Math.floor(Math.random() * 5) - 2;
      const wrongDen = denProd + Math.floor(Math.random() * 5) - 2;
      if (wrongNum > 0 && wrongDen > 0) {
        const wrong = `${wrongNum}/${wrongDen}`;
        if (wrong !== correct) wrongAnswers.add(wrong);
      }
    }
    
    return {
      id: `frac-mult-${Date.now()}`,
      type: 'fraction-multiplication',
      question: `${num1}/${den1} × ${num2}/${den2} = ?`,
      correctAnswer: correct,
      options: [correct, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5),
      explanation: `${num1}/${den1} × ${num2}/${den2} = ${correct}`
    };
  }
  
  static generateFractionDivisionQuestion(): SkillQuestion {
    const num1 = Math.floor(Math.random() * 8) + 1;
    const den1 = Math.floor(Math.random() * 8) + 2;
    const num2 = Math.floor(Math.random() * 8) + 1;
    const den2 = Math.floor(Math.random() * 8) + 2;
    const numProd = num1 * den2;
    const denProd = den1 * num2;
    const gcd = this.gcd(numProd, denProd);
    const correct = `${numProd / gcd}/${denProd / gcd}`;
    
    const wrongAnswers = new Set<string>();
    while (wrongAnswers.size < 3) {
      const wrongNum = numProd + Math.floor(Math.random() * 5) - 2;
      const wrongDen = denProd + Math.floor(Math.random() * 5) - 2;
      if (wrongNum > 0 && wrongDen > 0) {
        const wrong = `${wrongNum}/${wrongDen}`;
        if (wrong !== correct) wrongAnswers.add(wrong);
      }
    }
    
    return {
      id: `frac-div-${Date.now()}`,
      type: 'fraction-division',
      question: `${num1}/${den1} ÷ ${num2}/${den2} = ?`,
      correctAnswer: correct,
      options: [correct, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5),
      explanation: `${num1}/${den1} ÷ ${num2}/${den2} = ${correct}`
    };
  }
  
  static generateReciprocalQuestion(): SkillQuestion {
    const num = Math.floor(Math.random() * 8) + 2;
    const den = Math.floor(Math.random() * 8) + 2;
    const correct = `${den}/${num}`;
    
    return {
      id: `reciprocal-${Date.now()}`,
      type: 'reciprocal',
      question: `What is the reciprocal of ${num}/${den}?`,
      correctAnswer: correct,
      options: [correct, `${num}/${den}`, `${-num}/${den}`, `${num}/${-den}`].sort(() => Math.random() - 0.5),
      explanation: `The reciprocal of ${num}/${den} is ${correct}`
    };
  }
  
  // ========== RATIONAL NUMBERS GENERATORS ==========
  
  static generateDecimalFractionConversionQuestion(): SkillQuestion {
    const decimals = [0.5, 0.25, 0.75, 0.2, 0.4, 0.6, 0.8];
    const decimal = decimals[Math.floor(Math.random() * decimals.length)];
    const correct = decimal === 0.5 ? '1/2' : 
                   decimal === 0.25 ? '1/4' :
                   decimal === 0.75 ? '3/4' :
                   decimal === 0.2 ? '1/5' :
                   decimal === 0.4 ? '2/5' :
                   decimal === 0.6 ? '3/5' : '4/5';
    
    return {
      id: `dec-frac-conv-${Date.now()}`,
      type: 'decimal-fraction-conversion',
      question: `Convert ${decimal} to a fraction`,
      correctAnswer: correct,
      options: [correct, '1/10', '1/3', '2/3'].sort(() => Math.random() - 0.5),
      explanation: `${decimal} = ${correct}`
    };
  }
  
  static generateRationalComparisonQuestion(): SkillQuestion {
    const a = Math.round((Math.random() * 2) * 10) / 10;
    const b = Math.round((Math.random() * 2) * 10) / 10;
    const correct = a > b ? '>' : a < b ? '<' : '=';
    
    return {
      id: `rational-comp-${Date.now()}`,
      type: 'rational-comparison',
      question: `Compare: ${a} ? ${b}`,
      correctAnswer: correct,
      options: ['>', '<', '=', '≠'].sort(() => Math.random() - 0.5),
      explanation: `${a} ${correct} ${b}`
    };
  }
  
  // ========== EXPONENTS & SQUARE ROOTS GENERATORS ==========
  
  static generateExponentQuestion(): SkillQuestion {
    const base = Math.floor(Math.random() * 8) + 2;
    const exponent = Math.floor(Math.random() * 4) + 2;
    const correct = Math.pow(base, exponent);
    
    const wrongAnswers = new Set<number>();
    while (wrongAnswers.size < 3) {
      const wrong = correct + Math.floor(Math.random() * 50) - 25;
      if (wrong !== correct && wrong > 0) wrongAnswers.add(wrong);
    }
    
    return {
      id: `exp-${Date.now()}`,
      type: 'exponent',
      question: `${base}^${exponent} = ?`,
      correctAnswer: correct,
      options: [correct, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5),
      explanation: `${base}^${exponent} = ${correct}`
    };
  }
  
  static generatePowerOfTenQuestion(): SkillQuestion {
    const exponent = Math.floor(Math.random() * 5) + 1;
    const correct = Math.pow(10, exponent);
    
    return {
      id: `power-ten-${Date.now()}`,
      type: 'power-of-ten',
      question: `10^${exponent} = ?`,
      correctAnswer: correct,
      options: [correct, correct * 10, correct / 10, correct * 100].sort(() => Math.random() - 0.5),
      explanation: `10^${exponent} = ${correct}`
    };
  }
  
  static generateSquareRootQuestion(): SkillQuestion {
    const number = Math.floor(Math.random() * 10) + 1;
    const correct = number * number;
    
    const wrongAnswers = new Set<number>();
    while (wrongAnswers.size < 3) {
      const wrong = correct + Math.floor(Math.random() * 20) - 10;
      if (wrong !== correct && wrong > 0) wrongAnswers.add(wrong);
    }
    
    return {
      id: `sqrt-${Date.now()}`,
      type: 'square-root',
      question: `√${correct} = ?`,
      correctAnswer: number,
      options: [number, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5),
      explanation: `√${correct} = ${number}`
    };
  }
  
  static generateEstimateSquareRootQuestion(): SkillQuestion {
    const perfectSquares = [4, 9, 16, 25, 36, 49, 64, 81, 100];
    const square = perfectSquares[Math.floor(Math.random() * perfectSquares.length)];
    const num = square + Math.floor(Math.random() * 5) + 1;
    const root = Math.sqrt(square);
    const correct = root;
    
    return {
      id: `est-sqrt-${Date.now()}`,
      type: 'estimate-square-root',
      question: `Estimate √${num}`,
      correctAnswer: correct,
      options: [correct, correct + 1, correct - 1, correct + 2].sort(() => Math.random() - 0.5),
      explanation: `√${num} ≈ ${correct}`
    };
  }
  
  // ========== RATIOS & PROPORTIONS GENERATORS ==========
  
  static generateRatioQuestion(): SkillQuestion {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const correct = `${a}:${b}`;
    
    const wrongAnswers = new Set<string>();
    while (wrongAnswers.size < 3) {
      const wrongA = a + Math.floor(Math.random() * 5) - 2;
      const wrongB = b + Math.floor(Math.random() * 5) - 2;
      if (wrongA > 0 && wrongB > 0) {
        const wrong = `${wrongA}:${wrongB}`;
        if (wrong !== correct) wrongAnswers.add(wrong);
      }
    }
    
    return {
      id: `ratio-${Date.now()}`,
      type: 'ratio',
      question: `Simplify the ratio ${a * 2}:${b * 2}`,
      correctAnswer: correct,
      options: [correct, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5),
      explanation: `${a * 2}:${b * 2} simplifies to ${correct}`
    };
  }
  
  static generateEquivalentRatioQuestion(): SkillQuestion {
    const a = Math.floor(Math.random() * 5) + 1;
    const b = Math.floor(Math.random() * 5) + 1;
    const multiplier = Math.floor(Math.random() * 3) + 2;
    const correct = `${a * multiplier}:${b * multiplier}`;
    
    return {
      id: `equiv-ratio-${Date.now()}`,
      type: 'equivalent-ratio',
      question: `Which ratio is equivalent to ${a}:${b}?`,
      correctAnswer: correct,
      options: [correct, `${a}:${b * multiplier}`, `${a * multiplier}:${b}`, `${a + 1}:${b + 1}`].sort(() => Math.random() - 0.5),
      explanation: `${a}:${b} = ${correct}`
    };
  }
  
  static generateProportionQuestion(): SkillQuestion {
    const a = Math.floor(Math.random() * 5) + 2;
    const b = Math.floor(Math.random() * 5) + 2;
    const c = Math.floor(Math.random() * 5) + 2;
    const correct = (b * c) / a;
    
    return {
      id: `proportion-${Date.now()}`,
      type: 'proportion',
      question: `Solve: ${a}/${b} = ${c}/x`,
      correctAnswer: correct,
      options: [correct, correct + 1, correct - 1, correct * 2].sort(() => Math.random() - 0.5),
      explanation: `${a}/${b} = ${c}/${correct}`
    };
  }
  
  static generateUnitRateQuestion(): SkillQuestion {
    const amount = Math.floor(Math.random() * 50) + 10;
    const units = Math.floor(Math.random() * 10) + 2;
    const correct = Math.round((amount / units) * 10) / 10;
    
    return {
      id: `unit-rate-${Date.now()}`,
      type: 'unit-rate',
      question: `Find the unit rate: ${amount} in ${units} units`,
      correctAnswer: correct,
      options: [correct, amount / (units + 1), amount * units, amount + units].sort(() => Math.random() - 0.5),
      explanation: `Unit rate = ${amount} ÷ ${units} = ${correct}`
    };
  }
  
  // ========== PERCENT GENERATORS ==========
  
  static generatePercentQuestion(): SkillQuestion {
    const number = Math.floor(Math.random() * 100) + 10;
    const percent = Math.floor(Math.random() * 50) + 10;
    const correct = Math.round((number * percent) / 100);
    
    const wrongAnswers = new Set<number>();
    while (wrongAnswers.size < 3) {
      const wrong = correct + Math.floor(Math.random() * 20) - 10;
      if (wrong !== correct && wrong > 0) wrongAnswers.add(wrong);
    }
    
    return {
      id: `percent-${Date.now()}`,
      type: 'percent',
      question: `What is ${percent}% of ${number}?`,
      correctAnswer: correct,
      options: [correct, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5),
      explanation: `${percent}% of ${number} = ${correct}`
    };
  }
  
  static generatePercentConversionQuestion(): SkillQuestion {
    const fractions = [
      { frac: '1/2', percent: 50 },
      { frac: '1/4', percent: 25 },
      { frac: '3/4', percent: 75 },
      { frac: '1/5', percent: 20 },
      { frac: '2/5', percent: 40 }
    ];
    const item = fractions[Math.floor(Math.random() * fractions.length)];
    const isFracToPercent = Math.random() > 0.5;
    
    return {
      id: `percent-conv-${Date.now()}`,
      type: 'percent-conversion',
      question: isFracToPercent ? `Convert ${item.frac} to a percent` : `Convert ${item.percent}% to a fraction`,
      correctAnswer: isFracToPercent ? `${item.percent}%` : item.frac,
      options: isFracToPercent 
        ? [`${item.percent}%`, `${item.percent + 10}%`, `${item.percent - 10}%`, `${item.percent * 2}%`].sort(() => Math.random() - 0.5)
        : [item.frac, `${item.percent}/100`, `${item.percent}/10`, `${item.percent}/1`].sort(() => Math.random() - 0.5),
      explanation: isFracToPercent ? `${item.frac} = ${item.percent}%` : `${item.percent}% = ${item.frac}`
    };
  }
  
  static generateFindPercentQuestion(): SkillQuestion {
    const part = Math.floor(Math.random() * 40) + 10;
    const whole = Math.floor(Math.random() * 40) + part + 10;
    const correct = Math.round((part / whole) * 100);
    
    return {
      id: `find-percent-${Date.now()}`,
      type: 'find-percent',
      question: `What percent of ${whole} is ${part}?`,
      correctAnswer: correct,
      options: [correct, correct + 5, correct - 5, correct * 2].sort(() => Math.random() - 0.5),
      explanation: `${part}/${whole} = ${correct}%`
    };
  }
  
  static generatePercentEquationQuestion(): SkillQuestion {
    const percent = Math.floor(Math.random() * 50) + 10;
    const whole = Math.floor(Math.random() * 100) + 20;
    const part = Math.round((whole * percent) / 100);
    const correct = part;
    
    return {
      id: `percent-eq-${Date.now()}`,
      type: 'percent-equation',
      question: `Solve: ${percent}% of ${whole} = ?`,
      correctAnswer: correct,
      options: [correct, correct + 5, correct - 5, whole - correct].sort(() => Math.random() - 0.5),
      explanation: `${percent}% of ${whole} = ${correct}`
    };
  }
  
  // ========== PROBLEM SOLVING & ESTIMATION GENERATORS ==========
  
  static generateEstimateWordProblemQuestion(): SkillQuestion {
    const scenarios: Array<{ item: string; price?: number; quantity?: number; price1?: number; price2?: number; operation: 'multiply' | 'add' }> = [
      { item: 'books', price: 12, quantity: 8, operation: 'multiply' },
      { item: 'pencils', price: 2, quantity: 15, operation: 'multiply' },
      { item: 'apples', price: 3, quantity: 7, operation: 'multiply' },
      { item: 'total cost', price1: 45, price2: 28, operation: 'add' }
    ];
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    
    let question: string;
    let correct: number;
    
    if (scenario.operation === 'multiply' && scenario.price !== undefined && scenario.quantity !== undefined) {
      const exact = scenario.price * scenario.quantity;
      correct = Math.round(exact / 10) * 10; // Round to nearest 10
      question = `Sarah buys ${scenario.quantity} ${scenario.item} at $${scenario.price} each. Estimate the total cost.`;
    } else if (scenario.operation === 'add' && scenario.price1 !== undefined && scenario.price2 !== undefined) {
      const exact = scenario.price1 + scenario.price2;
      correct = Math.round(exact / 10) * 10;
      question = `A shirt costs $${scenario.price1} and pants cost $${scenario.price2}. Estimate the total cost.`;
    } else {
      // Fallback
      question = `Estimate: 10 × 8`;
      correct = 80;
    }
    
    const wrongAnswers = new Set<number>();
    wrongAnswers.add(correct + 10);
    wrongAnswers.add(correct - 10);
    wrongAnswers.add(correct + 20);
    
    return {
      id: `est-word-${Date.now()}`,
      type: 'estimate-word-problem',
      question: question,
      correctAnswer: `$${correct}`,
      options: [`$${correct}`, `$${correct + 10}`, `$${correct - 10}`, `$${correct + 20}`].sort(() => Math.random() - 0.5),
      explanation: `Estimated total ≈ $${correct}`
    };
  }
  
  static generateMultiStepWordProblemQuestion(): SkillQuestion {
    const problems = [
      {
        question: `Tom has $50. He spends $15 on lunch and $12 on a book. How much does he have left?`,
        correct: 50 - 15 - 12
      },
      {
        question: `A box contains 24 apples. Sarah takes 8 apples and John takes 6 apples. How many apples are left?`,
        correct: 24 - 8 - 6
      },
      {
        question: `A train travels 120 km in the first hour and 95 km in the second hour. What is the total distance?`,
        correct: 120 + 95
      },
      {
        question: `Emma saves $5 each week for 8 weeks, then spends $20. How much does she have left?`,
        correct: 5 * 8 - 20
      }
    ];
    const problem = problems[Math.floor(Math.random() * problems.length)];
    
    const wrongAnswers = new Set<number>();
    wrongAnswers.add(problem.correct + 5);
    wrongAnswers.add(problem.correct - 5);
    wrongAnswers.add(problem.correct + 10);
    
    return {
      id: `multi-step-${Date.now()}`,
      type: 'multi-step-word-problem',
      question: problem.question,
      correctAnswer: problem.correct,
      options: [problem.correct, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5),
      explanation: `Answer: ${problem.correct}`
    };
  }
  
  static generateGuessAndCheckQuestion(): SkillQuestion {
    const problems = [
      {
        question: `Two numbers add up to 15. One number is 3 more than the other. What are the numbers?`,
        correct: '6 and 9',
        check: '6 + 9 = 15, and 9 - 6 = 3'
      },
      {
        question: `A number multiplied by 3, then added to 5, equals 20. What is the number?`,
        correct: '5',
        check: '5 × 3 + 5 = 20'
      },
      {
        question: `The sum of two consecutive numbers is 17. What are the numbers?`,
        correct: '8 and 9',
        check: '8 + 9 = 17'
      }
    ];
    const problem = problems[Math.floor(Math.random() * problems.length)];
    
    return {
      id: `guess-check-${Date.now()}`,
      type: 'guess-and-check',
      question: problem.question,
      correctAnswer: problem.correct,
      options: [problem.correct, '4 and 5', '7 and 8', '10 and 11'].sort(() => Math.random() - 0.5),
      explanation: problem.check
    };
  }
  
  static generateVennDiagramQuestion(): SkillQuestion {
    const problems = [
      {
        question: `In a class of 30 students, 18 like math and 15 like science. If 8 like both, how many like only math?`,
        correct: 18 - 8
      },
      {
        question: `In a survey, 25 people like pizza and 20 like burgers. If 12 like both, how many like only pizza?`,
        correct: 25 - 12
      },
      {
        question: `Out of 40 students, 22 play soccer and 18 play basketball. If 10 play both, how many play only soccer?`,
        correct: 22 - 10
      }
    ];
    const problem = problems[Math.floor(Math.random() * problems.length)];
    
    const wrongAnswers = new Set<number>();
    wrongAnswers.add(problem.correct + 5);
    wrongAnswers.add(problem.correct - 3);
    wrongAnswers.add(problem.correct + 8);
    
    return {
      id: `venn-${Date.now()}`,
      type: 'venn-diagram',
      question: problem.question,
      correctAnswer: problem.correct,
      options: [problem.correct, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5),
      explanation: `Use Venn diagram: Only = Total in set - Both = ${problem.correct}`
    };
  }
  
  static generateCoinProblemQuestion(): SkillQuestion {
    const problems = [
      {
        question: `There are 12 coins worth $1.80. If there are only 10-cent and 20-cent coins, how many 10-cent coins are there?`,
        correct: 6,
        setup: '6 × 10c + 6 × 20c = 60c + 120c = 180c = $1.80'
      },
      {
        question: `You have 20 coins totaling $2.50. If you have only 10-cent and 20-cent coins, how many 20-cent coins do you have?`,
        correct: 5,
        setup: '5 × 20c + 15 × 10c = 100c + 150c = 250c = $2.50'
      },
      {
        question: `There are 15 coins worth $2.10. If there are only 10-cent and 20-cent coins, how many 10-cent coins are there?`,
        correct: 9,
        setup: '9 × 10c + 6 × 20c = 90c + 120c = 210c = $2.10'
      }
    ];
    const problem = problems[Math.floor(Math.random() * problems.length)];
    
    return {
      id: `coin-${Date.now()}`,
      type: 'coin-problem',
      question: problem.question,
      correctAnswer: problem.correct,
      options: [problem.correct, problem.correct + 2, problem.correct - 2, problem.correct + 4].sort(() => Math.random() - 0.5),
      explanation: problem.setup
    };
  }
  
  static generateElapsedTimeQuestion(): SkillQuestion {
    const problems = [
      {
        start: { hour: 9, minute: 15 },
        duration: { hour: 2, minute: 30 },
        question: `If a movie starts at 9:15 AM and lasts 2 hours 30 minutes, what time does it end?`,
        correct: '11:45 AM'
      },
      {
        start: { hour: 2, minute: 20 },
        duration: { hour: 1, minute: 45 },
        question: `A class starts at 2:20 PM and lasts 1 hour 45 minutes. What time does it end?`,
        correct: '4:05 PM'
      },
      {
        start: { hour: 10, minute: 0 },
        duration: { hour: 3, minute: 25 },
        question: `A journey starts at 10:00 AM and takes 3 hours 25 minutes. What time does it end?`,
        correct: '1:25 PM'
      },
      {
        start: { hour: 7, minute: 45 },
        duration: { hour: 0, minute: 50 },
        question: `Breakfast starts at 7:45 AM and takes 50 minutes. What time does it end?`,
        correct: '8:35 AM'
      }
    ];
    const problem = problems[Math.floor(Math.random() * problems.length)];
    
    return {
      id: `elapsed-${Date.now()}`,
      type: 'elapsed-time',
      question: problem.question,
      correctAnswer: problem.correct,
      options: [problem.correct, '12:00 PM', '3:00 PM', '5:00 PM'].sort(() => Math.random() - 0.5),
      explanation: `Start time + Duration = ${problem.correct}`
    };
  }
  
  // ========== CONSUMER MATHS GENERATORS ==========
  
  static generateUnitPriceQuestion(): SkillQuestion {
    const price = Math.floor(Math.random() * 50) + 5;
    const quantity = Math.floor(Math.random() * 10) + 2;
    const correct = Math.round((price / quantity) * 100) / 100;
    
    return {
      id: `unit-price-${Date.now()}`,
      type: 'unit-price',
      question: `Find the unit price: $${price} for ${quantity} items`,
      correctAnswer: `$${correct}`,
      options: [`$${correct}`, `$${correct + 1}`, `$${correct - 1}`, `$${price}`].sort(() => Math.random() - 0.5),
      explanation: `Unit price = $${price} ÷ ${quantity} = $${correct}`
    };
  }
  
  static generateDiscountQuestion(): SkillQuestion {
    const original = Math.floor(Math.random() * 100) + 20;
    const discountPercent = Math.floor(Math.random() * 40) + 10;
    const discount = Math.round((original * discountPercent) / 100);
    const correct = original - discount;
    
    return {
      id: `discount-${Date.now()}`,
      type: 'discount',
      question: `A $${original} item is ${discountPercent}% off. What is the sale price?`,
      correctAnswer: `$${correct}`,
      options: [`$${correct}`, `$${original}`, `$${discount}`, `$${original + discount}`].sort(() => Math.random() - 0.5),
      explanation: `Sale price = $${original} - $${discount} = $${correct}`
    };
  }
  
  static generateGSTQuestion(): SkillQuestion {
    const price = Math.floor(Math.random() * 100) + 10;
    const gst = Math.round((price * 0.1) * 100) / 100;
    const correct = price + gst;
    
    return {
      id: `gst-${Date.now()}`,
      type: 'gst',
      question: `What is the price including 10% GST if the original price is $${price}?`,
      correctAnswer: `$${correct}`,
      options: [`$${correct}`, `$${price}`, `$${gst}`, `$${price - gst}`].sort(() => Math.random() - 0.5),
      explanation: `Price with GST = $${price} + $${gst} = $${correct}`
    };
  }
  
  // ========== ALGEBRA GENERATORS ==========
  
  static generateArithmeticSequenceQuestion(): SkillQuestion {
    const first = Math.floor(Math.random() * 10) + 1;
    const diff = Math.floor(Math.random() * 5) + 1;
    const term = Math.floor(Math.random() * 5) + 3;
    const correct = first + (term - 1) * diff;
    
    return {
      id: `arith-seq-${Date.now()}`,
      type: 'arithmetic-sequence',
      question: `Find the ${term}${this.getOrdinalSuffix(term)} term: ${first}, ${first + diff}, ${first + 2 * diff}, ...`,
      correctAnswer: correct,
      options: [correct, correct + diff, correct - diff, first + term].sort(() => Math.random() - 0.5),
      explanation: `Term ${term} = ${first} + (${term} - 1) × ${diff} = ${correct}`
    };
  }
  
  static generateGeometricSequenceQuestion(): SkillQuestion {
    const first = Math.floor(Math.random() * 5) + 1;
    const ratio = Math.floor(Math.random() * 3) + 2;
    const term = Math.floor(Math.random() * 4) + 3;
    const correct = first * Math.pow(ratio, term - 1);
    
    return {
      id: `geo-seq-${Date.now()}`,
      type: 'geometric-sequence',
      question: `Find the ${term}${this.getOrdinalSuffix(term)} term: ${first}, ${first * ratio}, ${first * ratio * ratio}, ...`,
      correctAnswer: correct,
      options: [correct, correct * ratio, correct / ratio, first * term].sort(() => Math.random() - 0.5),
      explanation: `Term ${term} = ${first} × ${ratio}^${term - 1} = ${correct}`
    };
  }
  
  static generateSequenceQuestion(): SkillQuestion {
    return this.generateArithmeticSequenceQuestion();
  }
  
  static generateVariableExpressionQuestion(): SkillQuestion {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const x = Math.floor(Math.random() * 5) + 1;
    const correct = a * x + b;
    
    return {
      id: `var-expr-${Date.now()}`,
      type: 'variable-expression',
      question: `Evaluate ${a}x + ${b} when x = ${x}`,
      correctAnswer: correct,
      options: [correct, a + b, a * x, b * x].sort(() => Math.random() - 0.5),
      explanation: `${a}(${x}) + ${b} = ${correct}`
    };
  }
  
  static generateEvaluateExpressionQuestion(): SkillQuestion {
    return this.generateVariableExpressionQuestion();
  }
  
  static generateDistributivePropertyQuestion(): SkillQuestion {
    const a = Math.floor(Math.random() * 5) + 2;
    const b = Math.floor(Math.random() * 5) + 1;
    const c = Math.floor(Math.random() * 5) + 1;
    const correct = `${a * b} + ${a * c}`;
    
    return {
      id: `distrib-${Date.now()}`,
      type: 'distributive-property',
      question: `Use the distributive property: ${a}(${b} + ${c})`,
      correctAnswer: correct,
      options: [correct, `${a + b + c}`, `${a * b * c}`, `${b + c}`].sort(() => Math.random() - 0.5),
      explanation: `${a}(${b} + ${c}) = ${correct}`
    };
  }
  
  static generateLikeTermsQuestion(): SkillQuestion {
    const a = Math.floor(Math.random() * 5) + 1;
    const b = Math.floor(Math.random() * 5) + 1;
    const correct = a + b;
    
    return {
      id: `like-terms-${Date.now()}`,
      type: 'like-terms',
      question: `Simplify: ${a}x + ${b}x`,
      correctAnswer: `${correct}x`,
      options: [`${correct}x`, `${a + b + 1}x`, `${a * b}x`, `${a}x + ${b}`].sort(() => Math.random() - 0.5),
      explanation: `${a}x + ${b}x = ${correct}x`
    };
  }
  
  static generateOneStepEquationQuestion(): SkillQuestion {
    const x = Math.floor(Math.random() * 20) - 10;
    const a = Math.floor(Math.random() * 10) + 1;
    const b = a * x;
    const correct = x;
    
    return {
      id: `one-step-eq-${Date.now()}`,
      type: 'one-step-equation',
      question: `Solve: ${a}x = ${b}`,
      correctAnswer: correct,
      options: [correct, correct + 1, correct - 1, a].sort(() => Math.random() - 0.5),
      explanation: `x = ${b} ÷ ${a} = ${correct}`
    };
  }
  
  static generateTwoStepEquationQuestion(): SkillQuestion {
    const x = Math.floor(Math.random() * 10) + 1;
    const a = Math.floor(Math.random() * 5) + 2;
    const b = Math.floor(Math.random() * 10) + 1;
    const c = a * x + b;
    const correct = x;
    
    return {
      id: `two-step-eq-${Date.now()}`,
      type: 'two-step-equation',
      question: `Solve: ${a}x + ${b} = ${c}`,
      correctAnswer: correct,
      options: [correct, correct + 1, correct - 1, a + b].sort(() => Math.random() - 0.5),
      explanation: `${a}x = ${c} - ${b} = ${a * x}, so x = ${correct}`
    };
  }
  
  static generateEquationQuestion(): SkillQuestion {
    return this.generateOneStepEquationQuestion();
  }
  
  static generateSatisfyEquationQuestion(): SkillQuestion {
    const x = Math.floor(Math.random() * 10) + 1;
    const y = 2 * x + 3;
    const wrongY = y + 2;
    
    return {
      id: `satisfy-eq-${Date.now()}`,
      type: 'satisfy-equation',
      question: `Which point satisfies y = 2x + 3?`,
      correctAnswer: `(${x}, ${y})`,
      options: [`(${x}, ${y})`, `(${x}, ${wrongY})`, `(${x + 1}, ${y})`, `(${x}, ${y - 1})`].sort(() => Math.random() - 0.5),
      explanation: `(${x}, ${y}) satisfies y = 2(${x}) + 3 = ${y}`
    };
  }
  
  static generateRateOfChangeQuestion(): SkillQuestion {
    const x1 = Math.floor(Math.random() * 5) + 1;
    const x2 = x1 + Math.floor(Math.random() * 5) + 1;
    const y1 = Math.floor(Math.random() * 10) + 1;
    const y2 = y1 + Math.floor(Math.random() * 10) + 1;
    const correct = Math.round(((y2 - y1) / (x2 - x1)) * 10) / 10;
    
    return {
      id: `rate-change-${Date.now()}`,
      type: 'rate-of-change',
      question: `Find the rate of change from (${x1}, ${y1}) to (${x2}, ${y2})`,
      correctAnswer: correct,
      options: [correct, correct + 1, correct - 1, (y2 - y1)].sort(() => Math.random() - 0.5),
      explanation: `Rate of change = (${y2} - ${y1}) / (${x2} - ${x1}) = ${correct}`
    };
  }
  
  // ========== GEOMETRY GENERATORS ==========
  
  static generatePolygonClassificationQuestion(): SkillQuestion {
    const polygons: { name: string; sides: number }[] = [
      { name: 'triangle', sides: 3 },
      { name: 'square', sides: 4 },
      { name: 'pentagon', sides: 5 },
      { name: 'hexagon', sides: 6 },
      { name: 'octagon', sides: 8 }
    ];
    const polygon = polygons[Math.floor(Math.random() * polygons.length)];
    
    return {
      id: `polygon-${Date.now()}`,
      type: 'polygon-classification',
      question: `How many sides does a ${polygon.name} have?`,
      correctAnswer: polygon.sides,
      options: [polygon.sides, polygon.sides + 1, polygon.sides - 1, polygon.sides * 2].sort(() => Math.random() - 0.5),
      explanation: `A ${polygon.name} has ${polygon.sides} sides`
    };
  }
  
  static generateParallelPerpendicularQuestion(): SkillQuestion {
    const isParallel = Math.random() > 0.5;
    const correct = isParallel ? 'parallel' : 'perpendicular';
    
    return {
      id: `parallel-${Date.now()}`,
      type: 'parallel-perpendicular',
      question: `Are these lines ${correct}?`,
      correctAnswer: 'yes',
      options: ['yes', 'no'].sort(() => Math.random() - 0.5),
      explanation: `Yes, these lines are ${correct}`
    };
  }
  
  static generateAngleQuestion(): SkillQuestion {
    const angles = [30, 45, 60, 90, 120, 135, 150];
    const angle = angles[Math.floor(Math.random() * angles.length)];
    const type = angle < 90 ? 'acute' : angle === 90 ? 'right' : angle < 180 ? 'obtuse' : 'straight';
    
    return {
      id: `angle-${Date.now()}`,
      type: 'angle',
      question: `What type of angle is ${angle}°?`,
      correctAnswer: type,
      options: ['acute', 'right', 'obtuse', 'straight'].sort(() => Math.random() - 0.5),
      explanation: `A ${angle}° angle is ${type}`
    };
  }
  
  static generateTriangleClassificationQuestion(): SkillQuestion {
    const types = ['scalene', 'isosceles', 'equilateral'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    return {
      id: `triangle-${Date.now()}`,
      type: 'triangle-classification',
      question: `What type of triangle has ${type === 'equilateral' ? 'all equal' : type === 'isosceles' ? 'two equal' : 'no equal'} sides?`,
      correctAnswer: type,
      options: ['scalene', 'isosceles', 'equilateral'].sort(() => Math.random() - 0.5),
      explanation: `A ${type} triangle`
    };
  }
  
  static generateQuadrilateralClassificationQuestion(): SkillQuestion {
    const types = ['parallelogram', 'rectangle', 'rhombus', 'square', 'trapezium'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    return {
      id: `quad-${Date.now()}`,
      type: 'quadrilateral-classification',
      question: `What type of quadrilateral is this?`,
      correctAnswer: type,
      options: ['parallelogram', 'rectangle', 'rhombus', 'square', 'trapezium'].sort(() => Math.random() - 0.5),
      explanation: `This is a ${type}`
    };
  }
  
  static generateMissingAngleQuestion(): SkillQuestion {
    const angle1 = Math.floor(Math.random() * 60) + 30;
    const angle2 = Math.floor(Math.random() * 60) + 30;
    const correct = 180 - angle1 - angle2;
    
    return {
      id: `missing-angle-${Date.now()}`,
      type: 'missing-angle',
      question: `Find the missing angle: ${angle1}°, ${angle2}°, ?°`,
      correctAnswer: correct,
      options: [correct, correct + 10, correct - 10, 180].sort(() => Math.random() - 0.5),
      explanation: `Missing angle = 180° - ${angle1}° - ${angle2}° = ${correct}°`
    };
  }
  
  static generateComplementarySupplementaryQuestion(): SkillQuestion {
    const isComplementary = Math.random() > 0.5;
    const angle1 = Math.floor(Math.random() * 40) + 20;
    const angle2 = isComplementary ? 90 - angle1 : 180 - angle1;
    const correct = isComplementary ? 'complementary' : 'supplementary';
    
    return {
      id: `comp-supp-${Date.now()}`,
      type: 'complementary-supplementary',
      question: `Are ${angle1}° and ${angle2}° ${correct}?`,
      correctAnswer: 'yes',
      options: ['yes', 'no'].sort(() => Math.random() - 0.5),
      explanation: `Yes, ${angle1}° + ${angle2}° = ${angle1 + angle2}°, so they are ${correct}`
    };
  }
  
  static generateRectangleAreaQuestion(): SkillQuestion {
    const length = Math.floor(Math.random() * 10) + 2;
    const width = Math.floor(Math.random() * 10) + 2;
    const correct = length * width;
    
    return {
      id: `rect-area-${Date.now()}`,
      type: 'rectangle-area',
      question: `Find the area: length = ${length}, width = ${width}`,
      correctAnswer: correct,
      options: [correct, length + width, length * 2 + width * 2, length - width].sort(() => Math.random() - 0.5),
      explanation: `Area = length × width = ${length} × ${width} = ${correct}`
    };
  }
  
  static generateParallelogramAreaQuestion(): SkillQuestion {
    const base = Math.floor(Math.random() * 10) + 2;
    const height = Math.floor(Math.random() * 10) + 2;
    const correct = base * height;
    
    return {
      id: `para-area-${Date.now()}`,
      type: 'parallelogram-area',
      question: `Find the area: base = ${base}, height = ${height}`,
      correctAnswer: correct,
      options: [correct, base + height, base * 2 + height * 2, base - height].sort(() => Math.random() - 0.5),
      explanation: `Area = base × height = ${base} × ${height} = ${correct}`
    };
  }
  
  static generateTriangleAreaQuestion(): SkillQuestion {
    const base = Math.floor(Math.random() * 10) + 2;
    const height = Math.floor(Math.random() * 10) + 2;
    const correct = Math.round((base * height) / 2);
    
    return {
      id: `tri-area-${Date.now()}`,
      type: 'triangle-area',
      question: `Find the area: base = ${base}, height = ${height}`,
      correctAnswer: correct,
      options: [correct, base * height, base + height, base - height].sort(() => Math.random() - 0.5),
      explanation: `Area = (base × height) ÷ 2 = (${base} × ${height}) ÷ 2 = ${correct}`
    };
  }
  
  static generateAreaQuestion(): SkillQuestion {
    return this.generateRectangleAreaQuestion();
  }
  
  static generatePerimeterQuestion(): SkillQuestion {
    const length = Math.floor(Math.random() * 10) + 2;
    const width = Math.floor(Math.random() * 10) + 2;
    const correct = 2 * (length + width);
    
    return {
      id: `perimeter-${Date.now()}`,
      type: 'perimeter',
      question: `Find the perimeter: length = ${length}, width = ${width}`,
      correctAnswer: correct,
      options: [correct, length + width, length * width, length - width].sort(() => Math.random() - 0.5),
      explanation: `Perimeter = 2 × (length + width) = 2 × (${length} + ${width}) = ${correct}`
    };
  }
  
  static generateSurfaceAreaQuestion(): SkillQuestion {
    const length = Math.floor(Math.random() * 5) + 2;
    const width = Math.floor(Math.random() * 5) + 2;
    const height = Math.floor(Math.random() * 5) + 2;
    const correct = 2 * (length * width + length * height + width * height);
    
    return {
      id: `surface-area-${Date.now()}`,
      type: 'surface-area',
      question: `Find the surface area: ${length} × ${width} × ${height}`,
      correctAnswer: correct,
      options: [correct, length * width * height, length + width + height, length * width].sort(() => Math.random() - 0.5),
      explanation: `Surface area = 2(lw + lh + wh) = ${correct}`
    };
  }
  
  static generateVolumeQuestion(): SkillQuestion {
    const length = Math.floor(Math.random() * 5) + 2;
    const width = Math.floor(Math.random() * 5) + 2;
    const height = Math.floor(Math.random() * 5) + 2;
    const correct = length * width * height;
    
    return {
      id: `volume-${Date.now()}`,
      type: 'volume',
      question: `Find the volume: ${length} × ${width} × ${height}`,
      correctAnswer: correct,
      options: [correct, length + width + height, 2 * (length + width + height), length * width].sort(() => Math.random() - 0.5),
      explanation: `Volume = length × width × height = ${length} × ${width} × ${height} = ${correct}`
    };
  }
  
  static generateTransformationQuestion(): SkillQuestion {
    const types = ['translation', 'reflection', 'rotation'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    return {
      id: `transform-${Date.now()}`,
      type: 'transformation',
      question: `What type of transformation is this?`,
      correctAnswer: type,
      options: ['translation', 'reflection', 'rotation'].sort(() => Math.random() - 0.5),
      explanation: `This is a ${type}`
    };
  }
  
  // ========== STATISTICS & PROBABILITY GENERATORS ==========
  
  static generateMeanMedianModeQuestion(): SkillQuestion {
    const numbers = [2, 3, 4, 5, 5, 6, 7];
    const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    const median = numbers[Math.floor(numbers.length / 2)];
    const mode = 5;
    const measures = ['mean', 'median', 'mode'];
    const measure = measures[Math.floor(Math.random() * measures.length)];
    const correct = measure === 'mean' ? Math.round(mean) : measure === 'median' ? median : mode;
    
    return {
      id: `mean-median-${Date.now()}`,
      type: 'mean-median-mode',
      question: `Find the ${measure} of: ${numbers.join(', ')}`,
      correctAnswer: correct,
      options: [correct, correct + 1, correct - 1, numbers[0]].sort(() => Math.random() - 0.5),
      explanation: `The ${measure} is ${correct}`
    };
  }
  
  static generateOutlierQuestion(): SkillQuestion {
    const numbers = [2, 3, 4, 5, 6, 20];
    const outlier = 20;
    
    return {
      id: `outlier-${Date.now()}`,
      type: 'outlier',
      question: `Identify the outlier: ${numbers.join(', ')}`,
      correctAnswer: outlier,
      options: [outlier, numbers[0], numbers[1], numbers[2]].sort(() => Math.random() - 0.5),
      explanation: `${outlier} is the outlier because it's much larger than the other numbers`
    };
  }
  
  static generateProbabilityQuestion(): SkillQuestion {
    const total = Math.floor(Math.random() * 10) + 5;
    const favorable = Math.floor(Math.random() * total) + 1;
    const correct = `${favorable}/${total}`;
    
    return {
      id: `prob-${Date.now()}`,
      type: 'probability',
      question: `What is the probability of selecting ${favorable} out of ${total}?`,
      correctAnswer: correct,
      options: [correct, `${total}/${favorable}`, `${favorable}/${total - favorable}`, `${total - favorable}/${total}`].sort(() => Math.random() - 0.5),
      explanation: `Probability = ${favorable}/${total}`
    };
  }
  
  static generateSampleSpaceQuestion(): SkillQuestion {
    const outcomes = ['heads', 'tails'];
    const correct = '2';
    
    return {
      id: `sample-space-${Date.now()}`,
      type: 'sample-space',
      question: `How many outcomes are in the sample space when flipping a coin?`,
      correctAnswer: correct,
      options: ['2', '4', '6', '8'].sort(() => Math.random() - 0.5),
      explanation: `The sample space has 2 outcomes: ${outcomes.join(' and ')}`
    };
  }
  
  // ========== MEASUREMENT GENERATORS ==========
  
  static generateMetricConversionQuestion(): SkillQuestion {
    const conversions = [
      { from: 1000, to: 1, unit: 'metres', target: 'kilometres' },
      { from: 100, to: 1, unit: 'centimetres', target: 'metres' },
      { from: 1000, to: 1, unit: 'millilitres', target: 'litres' }
    ];
    const conv = conversions[Math.floor(Math.random() * conversions.length)];
    const correct = conv.to;
    
    return {
      id: `metric-conv-${Date.now()}`,
      type: 'metric-conversion',
      question: `Convert ${conv.from} ${conv.unit} to ${conv.target}`,
      correctAnswer: correct,
      options: [correct, conv.from, conv.from / 10, conv.from * 10].sort(() => Math.random() - 0.5),
      explanation: `${conv.from} ${conv.unit} = ${correct} ${conv.target}`
    };
  }
  
  // ========== COORDINATE PLANE GENERATORS ==========
  
  static generateCoordinateQuestion(): SkillQuestion {
    const x = Math.floor(Math.random() * 10) - 5;
    const y = Math.floor(Math.random() * 10) - 5;
    const quadrant = x > 0 && y > 0 ? 'I' : x < 0 && y > 0 ? 'II' : x < 0 && y < 0 ? 'III' : 'IV';
    
    return {
      id: `coord-${Date.now()}`,
      type: 'coordinate',
      question: `In which quadrant is (${x}, ${y})?`,
      correctAnswer: quadrant,
      options: ['I', 'II', 'III', 'IV'].sort(() => Math.random() - 0.5),
      explanation: `(${x}, ${y}) is in quadrant ${quadrant}`
    };
  }
  
  // ========== HELPER METHODS ==========
  
  static generateHCFQuestion(): SkillQuestion {
    const a = Math.floor(Math.random() * 20) + 5;
    const b = Math.floor(Math.random() * 20) + 5;
    const hcf = this.gcd(a, b);
    
    const wrongAnswers = new Set<number>();
    while (wrongAnswers.size < 3) {
      const wrong = hcf + Math.floor(Math.random() * 5) - 2;
      if (wrong !== hcf && wrong > 0 && wrong <= Math.min(a, b)) wrongAnswers.add(wrong);
    }
    
    return {
      id: `hcf-${Date.now()}`,
      type: 'hcf',
      question: `What is the HCF of ${a} and ${b}?`,
      correctAnswer: hcf,
      options: [hcf, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5),
      explanation: `HCF of ${a} and ${b} is ${hcf}`
    };
  }
  
  static generateLCMQuestion(): SkillQuestion {
    const a = Math.floor(Math.random() * 10) + 2;
    const b = Math.floor(Math.random() * 10) + 2;
    const lcm = this.lcm(a, b);
    
    const wrongAnswers = new Set<number>();
    while (wrongAnswers.size < 3) {
      const wrong = lcm + Math.floor(Math.random() * 20) - 10;
      if (wrong !== lcm && wrong > 0) wrongAnswers.add(wrong);
    }
    
    return {
      id: `lcm-${Date.now()}`,
      type: 'lcm',
      question: `What is the LCM of ${a} and ${b}?`,
      correctAnswer: lcm,
      options: [lcm, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5),
      explanation: `LCM of ${a} and ${b} is ${lcm}`
    };
  }
  
  static generateFactorQuestion(): SkillQuestion {
    const number = Math.floor(Math.random() * 30) + 10;
    const factors = [];
    for (let i = 1; i <= number; i++) {
      if (number % i === 0) factors.push(i);
    }
    const correct = factors[Math.floor(Math.random() * factors.length)];
    
    const wrongAnswers = new Set<number>();
    while (wrongAnswers.size < 3) {
      const wrong = Math.floor(Math.random() * number) + 1;
      if (!factors.includes(wrong) && wrong !== correct) wrongAnswers.add(wrong);
    }
    
    return {
      id: `factor-${Date.now()}`,
      type: 'factor',
      question: `Which is a factor of ${number}?`,
      correctAnswer: correct,
      options: [correct, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5),
      explanation: `${correct} is a factor of ${number} because ${number} ÷ ${correct} = ${number / correct}`
    };
  }
  
  static generateGenericMathQuestion(): SkillQuestion {
    // Last resort - return a simple addition question
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 20) + 1;
    const correct = a + b;
    
    return {
      id: `generic-${Date.now()}`,
      type: 'generic',
      question: `${a} + ${b} = ?`,
      correctAnswer: correct,
      options: [correct, correct + 1, correct - 1, correct + 2].sort(() => Math.random() - 0.5),
      explanation: `${a} + ${b} = ${correct}`
    };
  }
  
  // Helper functions
  static gcd(a: number, b: number): number {
    return b === 0 ? a : this.gcd(b, a % b);
  }
  
  static lcm(a: number, b: number): number {
    return (a * b) / this.gcd(a, b);
  }
  
  // ========== ADDITIONAL GENERATORS FOR MISSING SKILLS ==========
  
  static generateExperimentalProbabilityQuestion(): SkillQuestion {
    const outcomes = [10, 20, 30, 50];
    const favorable = Math.floor(Math.random() * outcomes.length);
    const total = outcomes[favorable];
    const success = Math.floor(total * (0.3 + Math.random() * 0.4));
    const correct = Math.round((success / total) * 100) / 100;
    
    return {
      id: `exp-prob-${Date.now()}`,
      type: 'experimental-probability',
      question: `In an experiment with ${total} trials, ${success} were successful. What is the experimental probability?`,
      correctAnswer: correct,
      options: [correct, correct + 0.1, correct - 0.1, correct + 0.2].sort(() => Math.random() - 0.5),
      explanation: `Experimental probability = ${success}/${total} = ${correct}`
    };
  }
  
  static generateLikelihoodQuestion(): SkillQuestion {
    const scenarios = [
      { event: 'rolling a 6 on a die', answer: 'less likely' },
      { event: 'flipping heads on a coin', answer: 'equally likely' },
      { event: 'drawing a red card from a deck', answer: 'equally likely' }
    ];
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    
    return {
      id: `likelihood-${Date.now()}`,
      type: 'likelihood',
      question: `Is ${scenario.event} more likely, less likely, or equally likely?`,
      correctAnswer: scenario.answer,
      options: ['more likely', 'less likely', 'equally likely'].sort(() => Math.random() - 0.5),
      explanation: `${scenario.event} is ${scenario.answer}`
    };
  }
  
  static generateIndependentDependentQuestion(): SkillQuestion {
    const events = [
      { desc: 'flipping a coin and rolling a die', answer: 'independent' },
      { desc: 'drawing a card and drawing another without replacement', answer: 'dependent' },
      { desc: 'spinning a spinner twice', answer: 'independent' }
    ];
    const event = events[Math.floor(Math.random() * events.length)];
    
    return {
      id: `indep-dep-${Date.now()}`,
      type: 'independent-dependent',
      question: `Are these events independent or dependent: ${event.desc}?`,
      correctAnswer: event.answer,
      options: ['independent', 'dependent'].sort(() => Math.random() - 0.5),
      explanation: `These events are ${event.answer}`
    };
  }
  
  static generatePredictionQuestion(): SkillQuestion {
    const prob = 0.3 + Math.random() * 0.4;
    const trials = [50, 100, 200];
    const total = trials[Math.floor(Math.random() * trials.length)];
    const correct = Math.round(prob * total);
    
    return {
      id: `predict-${Date.now()}`,
      type: 'prediction',
      question: `If the probability is ${prob.toFixed(2)}, predict the number of successes in ${total} trials`,
      correctAnswer: correct,
      options: [correct, correct + 5, correct - 5, correct + 10].sort(() => Math.random() - 0.5),
      explanation: `Prediction = ${prob.toFixed(2)} × ${total} ≈ ${correct}`
    };
  }
  
  static generateSampleTypeQuestion(): SkillQuestion {
    const samples = [
      { desc: 'surveying every 10th person', type: 'random' },
      { desc: 'surveying only your friends', type: 'biased' },
      { desc: 'surveying a diverse group', type: 'representative' }
    ];
    const sample = samples[Math.floor(Math.random() * samples.length)];
    
    return {
      id: `sample-type-${Date.now()}`,
      type: 'sample-type',
      question: `What type of sample is this: ${sample.desc}?`,
      correctAnswer: sample.type,
      options: ['random', 'biased', 'representative'].sort(() => Math.random() - 0.5),
      explanation: `This is a ${sample.type} sample`
    };
  }
  
  static generateDotPlotQuestion(): SkillQuestion {
    const values = [2, 3, 4, 5, 6, 7];
    const value = values[Math.floor(Math.random() * values.length)];
    const count = Math.floor(Math.random() * 5) + 1;
    
    return {
      id: `dot-plot-${Date.now()}`,
      type: 'dot-plot',
      question: `In a dot plot, how many dots represent the value ${value}?`,
      correctAnswer: count,
      options: [count, count + 1, count - 1, count + 2].sort(() => Math.random() - 0.5),
      explanation: `The value ${value} appears ${count} times`
    };
  }
  
  static generateCreateDotPlotQuestion(): SkillQuestion {
    return this.generateDotPlotQuestion();
  }
  
  static generateStemLeafQuestion(): SkillQuestion {
    const stem = Math.floor(Math.random() * 5) + 1;
    const leaf = Math.floor(Math.random() * 10);
    const value = stem * 10 + leaf;
    
    return {
      id: `stem-leaf-${Date.now()}`,
      type: 'stem-leaf',
      question: `In a stem-and-leaf plot, what is the value with stem ${stem} and leaf ${leaf}?`,
      correctAnswer: value,
      options: [value, value + 10, value - 10, value + 1].sort(() => Math.random() - 0.5),
      explanation: `Stem ${stem} | Leaf ${leaf} = ${value}`
    };
  }
  
  static generateBarGraphQuestion(): SkillQuestion {
    const categories = ['Math', 'Science', 'English', 'History'];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const value = Math.floor(Math.random() * 50) + 10;
    
    return {
      id: `bar-graph-${Date.now()}`,
      type: 'bar-graph',
      question: `In a bar graph, what is the value for ${category}?`,
      correctAnswer: value,
      options: [value, value + 5, value - 5, value + 10].sort(() => Math.random() - 0.5),
      explanation: `${category} has a value of ${value}`
    };
  }
  
  static generateCreateBarGraphQuestion(): SkillQuestion {
    return this.generateBarGraphQuestion();
  }
  
  static generateLineGraphQuestion(): SkillQuestion {
    const time = ['Monday', 'Tuesday', 'Wednesday', 'Thursday'];
    const day = time[Math.floor(Math.random() * time.length)];
    const value = Math.floor(Math.random() * 100) + 20;
    
    return {
      id: `line-graph-${Date.now()}`,
      type: 'line-graph',
      question: `In a line graph, what is the value on ${day}?`,
      correctAnswer: value,
      options: [value, value + 10, value - 10, value + 20].sort(() => Math.random() - 0.5),
      explanation: `On ${day}, the value is ${value}`
    };
  }
  
  static generateCreateLineGraphQuestion(): SkillQuestion {
    return this.generateLineGraphQuestion();
  }
  
  static generateCircleGraphQuestion(): SkillQuestion {
    const percent = [25, 30, 40, 50];
    const p = percent[Math.floor(Math.random() * percent.length)];
    const angle = p * 3.6; // 360 / 100
    
    return {
      id: `circle-graph-${Date.now()}`,
      type: 'circle-graph',
      question: `In a circle graph, what is the central angle for ${p}%?`,
      correctAnswer: angle,
      options: [angle, angle + 10, angle - 10, angle + 20].sort(() => Math.random() - 0.5),
      explanation: `Central angle = ${p}% × 360° = ${angle}°`
    };
  }
  
  static generateFrequencyTableQuestion(): SkillQuestion {
    const value = Math.floor(Math.random() * 10) + 1;
    const frequency = Math.floor(Math.random() * 5) + 1;
    
    return {
      id: `freq-table-${Date.now()}`,
      type: 'frequency-table',
      question: `In a frequency table, what is the frequency of ${value}?`,
      correctAnswer: frequency,
      options: [frequency, frequency + 1, frequency - 1, frequency + 2].sort(() => Math.random() - 0.5),
      explanation: `The frequency of ${value} is ${frequency}`
    };
  }
  
  static generateTableQuestion(): SkillQuestion {
    return this.generateFrequencyTableQuestion();
  }
  
  static generateBestGraphTypeQuestion(): SkillQuestion {
    const scenarios = [
      { data: 'changes over time', answer: 'line graph' },
      { data: 'comparing categories', answer: 'bar graph' },
      { data: 'parts of a whole', answer: 'circle graph' }
    ];
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    
    return {
      id: `best-graph-${Date.now()}`,
      type: 'best-graph-type',
      question: `What is the best graph type for showing ${scenario.data}?`,
      correctAnswer: scenario.answer,
      options: ['line graph', 'bar graph', 'circle graph', 'dot plot'].sort(() => Math.random() - 0.5),
      explanation: `For ${scenario.data}, use a ${scenario.answer}`
    };
  }
  
  static generateEstimateMetricQuestion(): SkillQuestion {
    const items = [
      { item: 'length of a pencil', estimate: '15 cm' },
      { item: 'height of a door', estimate: '2 m' },
      { item: 'weight of an apple', estimate: '150 g' }
    ];
    const item = items[Math.floor(Math.random() * items.length)];
    
    return {
      id: `est-metric-${Date.now()}`,
      type: 'estimate-metric',
      question: `Estimate the ${item.item}`,
      correctAnswer: item.estimate,
      options: [item.estimate, '10 cm', '5 m', '500 g'].sort(() => Math.random() - 0.5),
      explanation: `Estimated ${item.item}: ${item.estimate}`
    };
  }
  
  static generateMetricMixedQuestion(): SkillQuestion {
    const conversions = [
      { from: '2 km 500 m', to: '2500 m' },
      { from: '1 m 50 cm', to: '150 cm' }
    ];
    const conv = conversions[Math.floor(Math.random() * conversions.length)];
    
    return {
      id: `metric-mixed-${Date.now()}`,
      type: 'metric-mixed',
      question: `Convert ${conv.from} to a single unit`,
      correctAnswer: conv.to,
      options: [conv.to, '2000 m', '100 cm', '3000 m'].sort(() => Math.random() - 0.5),
      explanation: `${conv.from} = ${conv.to}`
    };
  }
  
  static generateAreaConversionQuestion(): SkillQuestion {
    const hectares = [1, 2, 5];
    const h = hectares[Math.floor(Math.random() * hectares.length)];
    const sqm = h * 10000;
    
    return {
      id: `area-conv-${Date.now()}`,
      type: 'area-conversion',
      question: `Convert ${h} hectare to square metres`,
      correctAnswer: sqm,
      options: [sqm, sqm / 10, sqm * 10, sqm / 100].sort(() => Math.random() - 0.5),
      explanation: `${h} hectare = ${sqm} m²`
    };
  }
  
  static generateVolumeConversionQuestion(): SkillQuestion {
    const litres = [1, 2, 5];
    const l = litres[Math.floor(Math.random() * litres.length)];
    const cum = l / 1000;
    
    return {
      id: `vol-conv-${Date.now()}`,
      type: 'volume-conversion',
      question: `Convert ${l} litres to cubic metres`,
      correctAnswer: cum,
      options: [cum, cum * 10, cum / 10, cum * 100].sort(() => Math.random() - 0.5),
      explanation: `${l} L = ${cum} m³`
    };
  }
  
  static generatePrecisionQuestion(): SkillQuestion {
    const measurements = [
      { value: '15.2 cm', precision: '0.1 cm' },
      { value: '150 m', precision: '1 m' },
      { value: '2.50 kg', precision: '0.01 kg' }
    ];
    const meas = measurements[Math.floor(Math.random() * measurements.length)];
    
    return {
      id: `precision-${Date.now()}`,
      type: 'precision',
      question: `What is the precision of ${meas.value}?`,
      correctAnswer: meas.precision,
      options: [meas.precision, '0.1', '1', '0.01'].sort(() => Math.random() - 0.5),
      explanation: `Precision = ${meas.precision}`
    };
  }
  
  static generateGraphPointQuestion(): SkillQuestion {
    const x = Math.floor(Math.random() * 10) - 5;
    const y = Math.floor(Math.random() * 10) - 5;
    
    return {
      id: `graph-point-${Date.now()}`,
      type: 'graph-point',
      question: `What are the coordinates of the point at (${x}, ${y})?`,
      correctAnswer: `(${x}, ${y})`,
      options: [`(${x}, ${y})`, `(${x+1}, ${y})`, `(${x}, ${y+1})`, `(${x-1}, ${y-1})`].sort(() => Math.random() - 0.5),
      explanation: `Coordinates: (${x}, ${y})`
    };
  }
  
  static generateCoordinateDirectionQuestion(): SkillQuestion {
    return this.generateGraphPointQuestion();
  }
  
  static generateSymmetryQuestion(): SkillQuestion {
    const shapes = ['square', 'rectangle', 'circle', 'triangle'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const lines = shape === 'circle' ? 'infinite' : shape === 'square' ? '4' : shape === 'rectangle' ? '2' : '0';
    
    return {
      id: `symmetry-${Date.now()}`,
      type: 'symmetry',
      question: `How many lines of symmetry does a ${shape} have?`,
      correctAnswer: lines,
      options: [lines, '1', '2', '4'].sort(() => Math.random() - 0.5),
      explanation: `A ${shape} has ${lines} lines of symmetry`
    };
  }
  
  static generateNetQuestion(): SkillQuestion {
    const shapes = ['cube', 'rectangular prism', 'triangular prism'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const faces = shape === 'cube' ? '6 squares' : shape === 'rectangular prism' ? '6 rectangles' : '5 faces';
    
    return {
      id: `net-${Date.now()}`,
      type: 'net',
      question: `How many faces does a ${shape} have?`,
      correctAnswer: faces,
      options: [faces, '4', '5', '8'].sort(() => Math.random() - 0.5),
      explanation: `A ${shape} has ${faces}`
    };
  }
  
  static generateViewQuestion(): SkillQuestion {
    return {
      id: `view-${Date.now()}`,
      type: 'view',
      question: `What shape do you see in the front view of a cube?`,
      correctAnswer: 'square',
      options: ['square', 'rectangle', 'circle', 'triangle'].sort(() => Math.random() - 0.5),
      explanation: 'The front view of a cube is a square'
    };
  }
  
  static generateCirclePartsQuestion(): SkillQuestion {
    const radius = Math.floor(Math.random() * 10) + 2;
    const diameter = radius * 2;
    
    return {
      id: `circle-parts-${Date.now()}`,
      type: 'circle-parts',
      question: `If the radius is ${radius}, what is the diameter?`,
      correctAnswer: diameter,
      options: [diameter, radius, radius * 3, radius / 2].sort(() => Math.random() - 0.5),
      explanation: `Diameter = 2 × radius = 2 × ${radius} = ${diameter}`
    };
  }
  
  static generateConstructionQuestion(): SkillQuestion {
    return {
      id: `construct-${Date.now()}`,
      type: 'construction',
      question: `What tool is used to construct a perpendicular bisector?`,
      correctAnswer: 'compass and straightedge',
      options: ['compass and straightedge', 'ruler', 'protractor', 'calculator'].sort(() => Math.random() - 0.5),
      explanation: 'Use a compass and straightedge to construct a perpendicular bisector'
    };
  }
  
  static generateTransversalQuestion(): SkillQuestion {
    const angles = ['corresponding', 'alternate interior', 'alternate exterior'];
    const angle = angles[Math.floor(Math.random() * angles.length)];
    const measure = angle.includes('corresponding') ? 'equal' : 'equal';
    
    return {
      id: `transversal-${Date.now()}`,
      type: 'transversal',
      question: `What is the relationship between ${angle} angles?`,
      correctAnswer: 'equal',
      options: ['equal', 'supplementary', 'complementary', 'different'].sort(() => Math.random() - 0.5),
      explanation: `${angle} angles are equal`
    };
  }
  
  static generateCouponQuestion(): SkillQuestion {
    const coupon1 = { discount: 20, min: 50 };
    const coupon2 = { discount: 15, min: 0 };
    const price = Math.floor(Math.random() * 50) + 30;
    const save1 = price >= coupon1.min ? coupon1.discount : 0;
    const save2 = coupon2.discount;
    const better = save1 > save2 ? 'Coupon 1' : 'Coupon 2';
    
    return {
      id: `coupon-${Date.now()}`,
      type: 'coupon',
      question: `Item costs $${price}. Coupon 1: $${coupon1.discount} off if spend $${coupon1.min}+. Coupon 2: $${coupon2.discount} off. Which is better?`,
      correctAnswer: better,
      options: ['Coupon 1', 'Coupon 2'].sort(() => Math.random() - 0.5),
      explanation: `${better} saves more money`
    };
  }
  
  static generateMoneyWordProblemQuestion(): SkillQuestion {
    const problems = [
      { q: 'Tom has $50 and spends $15. How much left?', a: 35 },
      { q: 'Sarah buys 3 items at $5 each. Total?', a: 15 },
      { q: 'Emma saves $10/week for 4 weeks. Total?', a: 40 }
    ];
    const p = problems[Math.floor(Math.random() * problems.length)];
    
    return {
      id: `money-word-${Date.now()}`,
      type: 'money-word',
      question: p.q,
      correctAnswer: p.a,
      options: [p.a, p.a + 5, p.a - 5, p.a + 10].sort(() => Math.random() - 0.5),
      explanation: `Answer: $${p.a}`
    };
  }
  
  static generateSalePriceQuestion(): SkillQuestion {
    const original = Math.floor(Math.random() * 100) + 50;
    const discount = Math.floor(Math.random() * 30) + 10;
    const sale = Math.round(original * (1 - discount / 100));
    
    return {
      id: `sale-price-${Date.now()}`,
      type: 'sale-price',
      question: `Original price $${original}, ${discount}% off. Sale price?`,
      correctAnswer: sale,
      options: [sale, original - discount, original, sale + 10].sort(() => Math.random() - 0.5),
      explanation: `Sale price = $${original} × (1 - ${discount}%) = $${sale}`
    };
  }
  
  static generateMultiStepPercentQuestion(): SkillQuestion {
    const price = 100;
    const tax = 10;
    const discount = 20;
    const final = Math.round(price * 0.8 * 1.1);
    
    return {
      id: `multi-percent-${Date.now()}`,
      type: 'multi-step-percent',
      question: `Item $${price}, ${discount}% off, then ${tax}% tax. Final price?`,
      correctAnswer: final,
      options: [final, price, price - discount + tax, final + 10].sort(() => Math.random() - 0.5),
      explanation: `After discount: $${price * 0.8}, after tax: $${final}`
    };
  }
  
  static generateRationalOperationQuestion(): SkillQuestion {
    return this.generateFractionAdditionQuestion();
  }
  
  static generateRationalNumberQuestion(): SkillQuestion {
    return this.generateRationalComparisonQuestion();
  }
  
  static generateEvaluatePowerQuestion(): SkillQuestion {
    return this.generateExponentQuestion();
  }
  
  static generatePerfectSquareRootQuestion(): SkillQuestion {
    const squares = [4, 9, 16, 25, 36, 49, 64, 81, 100];
    const square = squares[Math.floor(Math.random() * squares.length)];
    const root = Math.sqrt(square);
    
    return {
      id: `perfect-sqrt-${Date.now()}`,
      type: 'perfect-square-root',
      question: `What is √${square}?`,
      correctAnswer: root,
      options: [root, root + 1, root - 1, root * 2].sort(() => Math.random() - 0.5),
      explanation: `√${square} = ${root}`
    };
  }
  
  static generateProportionFormQuestion(): SkillQuestion {
    return {
      id: `prop-form-${Date.now()}`,
      type: 'proportion-form',
      question: `Do 2:3 and 4:6 form a proportion?`,
      correctAnswer: 'yes',
      options: ['yes', 'no'].sort(() => Math.random() - 0.5),
      explanation: 'Yes, 2:3 = 4:6 (both equal 2/3)'
    };
  }
  
  static generateSolveProportionQuestion(): SkillQuestion {
    const a = 2;
    const b = 3;
    const c = 4;
    const d = (b * c) / a;
    
    return {
      id: `solve-prop-${Date.now()}`,
      type: 'solve-proportion',
      question: `Solve: ${a}/${b} = ${c}/x`,
      correctAnswer: d,
      options: [d, d + 1, d - 1, d * 2].sort(() => Math.random() - 0.5),
      explanation: `x = (${b} × ${c}) / ${a} = ${d}`
    };
  }
  
  static generatePopulationEstimateQuestion(): SkillQuestion {
    const tagged = 50;
    const caught = 100;
    const taggedInCaught = 10;
    const estimate = Math.round((tagged * caught) / taggedInCaught);
    
    return {
      id: `pop-est-${Date.now()}`,
      type: 'population-estimate',
      question: `${tagged} tagged, ${caught} caught, ${taggedInCaught} tagged. Estimate population?`,
      correctAnswer: estimate,
      options: [estimate, estimate + 50, estimate - 50, estimate * 2].sort(() => Math.random() - 0.5),
      explanation: `Estimate = (${tagged} × ${caught}) / ${taggedInCaught} = ${estimate}`
    };
  }
  
  static generatePercentageIllustratedQuestion(): SkillQuestion {
    const shaded = Math.floor(Math.random() * 8) + 1;
    const total = 10;
    const percent = (shaded / total) * 100;
    
    return {
      id: `pct-illus-${Date.now()}`,
      type: 'percentage-illustrated',
      question: `${shaded} out of ${total} squares shaded. What percentage?`,
      correctAnswer: `${percent}%`,
      options: [`${percent}%`, `${percent + 10}%`, `${percent - 10}%`, `${percent + 20}%`].sort(() => Math.random() - 0.5),
      explanation: `${shaded}/${total} = ${percent}%`
    };
  }
  
  static generatePercentModelQuestion(): SkillQuestion {
    return this.generatePercentageIllustratedQuestion();
  }
  
  static generateFractionWordProblemQuestion(): SkillQuestion {
    return this.generateMultiStepWordProblemQuestion();
  }
  
  static generateGraphEquivalentFractionQuestion(): SkillQuestion {
    return this.generateEquivalentFractionQuestion();
  }
  
  static generateFractionGraphTableQuestion(): SkillQuestion {
    return this.generateFractionWordProblemQuestion();
  }
  
  static generateRoundMixedNumberQuestion(): SkillQuestion {
    const whole = Math.floor(Math.random() * 5) + 1;
    const num = Math.floor(Math.random() * 3) + 1;
    const den = 4;
    const rounded = num / den >= 0.5 ? whole + 1 : whole;
    
    return {
      id: `round-mixed-${Date.now()}`,
      type: 'round-mixed',
      question: `Round ${whole} ${num}/${den} to the nearest whole number`,
      correctAnswer: rounded,
      options: [rounded, whole, whole + 1, whole - 1].sort(() => Math.random() - 0.5),
      explanation: `${whole} ${num}/${den} rounds to ${rounded}`
    };
  }
  
  static generateInequalityQuestion(): SkillQuestion {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const correct = a > b ? '>' : '<';
    
    return {
      id: `inequality-${Date.now()}`,
      type: 'inequality',
      question: `Compare: ${a} ? ${b}`,
      correctAnswer: correct,
      options: ['>', '<', '='].sort(() => Math.random() - 0.5),
      explanation: `${a} ${correct} ${b}`
    };
  }
  
  static generateMapDecimalQuestion(): SkillQuestion {
    const scale = [0.5, 1, 2];
    const s = scale[Math.floor(Math.random() * scale.length)];
    const mapDist = Math.floor(Math.random() * 10) + 1;
    const actual = mapDist / s;
    
    return {
      id: `map-decimal-${Date.now()}`,
      type: 'map-decimal',
      question: `Map scale 1 cm = ${s} km. Map distance ${mapDist} cm. Actual distance?`,
      correctAnswer: `${actual} km`,
      options: [`${actual} km`, `${actual * 2} km`, `${actual / 2} km`, `${actual + 1} km`].sort(() => Math.random() - 0.5),
      explanation: `Actual = ${mapDist} × ${s} = ${actual} km`
    };
  }
  
  static generateIdentifySequenceQuestion(): SkillQuestion {
    const sequences = [
      { seq: [2, 5, 8, 11], type: 'arithmetic' },
      { seq: [2, 4, 8, 16], type: 'geometric' }
    ];
    const s = sequences[Math.floor(Math.random() * sequences.length)];
    
    return {
      id: `identify-seq-${Date.now()}`,
      type: 'identify-sequence',
      question: `What type of sequence is ${s.seq.join(', ')}?`,
      correctAnswer: s.type,
      options: ['arithmetic', 'geometric', 'neither'].sort(() => Math.random() - 0.5),
      explanation: `This is an ${s.type} sequence`
    };
  }
  
  static generateSequenceExpressionQuestion(): SkillQuestion {
    return this.generateArithmeticSequenceQuestion();
  }
  
  static generateTermCoefficientQuestion(): SkillQuestion {
    return {
      id: `term-coeff-${Date.now()}`,
      type: 'term-coefficient',
      question: `In 3x + 5, what is the coefficient of x?`,
      correctAnswer: '3',
      options: ['3', '5', 'x', '8'].sort(() => Math.random() - 0.5),
      explanation: 'The coefficient of x is 3'
    };
  }
  
  static generateFactorExpressionQuestion(): SkillQuestion {
    return {
      id: `factor-expr-${Date.now()}`,
      type: 'factor-expression',
      question: `Factor: 2x + 4`,
      correctAnswer: '2(x + 2)',
      options: ['2(x + 2)', '2x + 4', 'x + 2', '4x'].sort(() => Math.random() - 0.5),
      explanation: '2x + 4 = 2(x + 2)'
    };
  }
  
  static generateEquivalentExpressionQuestion(): SkillQuestion {
    return {
      id: `equiv-expr-${Date.now()}`,
      type: 'equivalent-expression',
      question: `Which is equivalent to 2x + 3?`,
      correctAnswer: '3 + 2x',
      options: ['3 + 2x', '2x - 3', '5x', '2x'].sort(() => Math.random() - 0.5),
      explanation: '2x + 3 = 3 + 2x (commutative property)'
    };
  }
  
  static generateAlgebraTileQuestion(): SkillQuestion {
    return this.generateEquivalentExpressionQuestion();
  }
  
  static generateWriteEquationQuestion(): SkillQuestion {
    return {
      id: `write-eq-${Date.now()}`,
      type: 'write-equation',
      question: `Write an equation: 5 more than x is 12`,
      correctAnswer: 'x + 5 = 12',
      options: ['x + 5 = 12', 'x - 5 = 12', '5x = 12', 'x = 12'].sort(() => Math.random() - 0.5),
      explanation: 'x + 5 = 12'
    };
  }
  
  static generateModelEquationQuestion(): SkillQuestion {
    return this.generateWriteEquationQuestion();
  }
  
  static generateCompleteSolutionQuestion(): SkillQuestion {
    return {
      id: `complete-sol-${Date.now()}`,
      type: 'complete-solution',
      question: `Complete: x + 3 = 8, so x = ?`,
      correctAnswer: '5',
      options: ['5', '11', '3', '8'].sort(() => Math.random() - 0.5),
      explanation: 'x + 3 = 8, so x = 8 - 3 = 5'
    };
  }
  
  static generateTwoVariableEquationQuestion(): SkillQuestion {
    return {
      id: `two-var-${Date.now()}`,
      type: 'two-variable-equation',
      question: `Does (2, 3) satisfy y = x + 1?`,
      correctAnswer: 'yes',
      options: ['yes', 'no'].sort(() => Math.random() - 0.5),
      explanation: 'Yes, 3 = 2 + 1'
    };
  }
  
  static generateGraphInterpretationQuestion(): SkillQuestion {
    return {
      id: `graph-interp-${Date.now()}`,
      type: 'graph-interpretation',
      question: `A line graph shows temperature increasing. What does this mean?`,
      correctAnswer: 'temperature is rising',
      options: ['temperature is rising', 'temperature is falling', 'temperature is constant', 'no change'].sort(() => Math.random() - 0.5),
      explanation: 'An increasing line graph means the value is rising'
    };
  }
  
  static generateConstantRateQuestion(): SkillQuestion {
    return {
      id: `const-rate-${Date.now()}`,
      type: 'constant-rate',
      question: `If speed is constant, what type of graph?`,
      correctAnswer: 'straight line',
      options: ['straight line', 'curve', 'zigzag', 'circle'].sort(() => Math.random() - 0.5),
      explanation: 'Constant rate gives a straight line graph'
    };
  }
  
  static primeFactors(n: number): number[] {
    const factors = [];
    let d = 2;
    while (d * d <= n) {
      while (n % d === 0) {
        factors.push(d);
        n /= d;
      }
      d++;
    }
    if (n > 1) factors.push(n);
    return factors;
  }
  
  static getOrdinalSuffix(n: number): string {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  }
}
