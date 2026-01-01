import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BookOpen, Calculator, CheckCircle, FileText, Lightbulb, Play, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LessonContentProps {
  grade: string;
  topicId: string;
  subtopicName: string;
  onClose: () => void;
}

// Comprehensive CAPS-aligned lesson content
const lessonData: Record<string, Record<string, {
  objective: string;
  notes: {
    summary: string;
    formulas: { name: string; formula: string; description: string }[];
    keyPoints: string[];
    reminders: string[];
  };
  examples: { problem: string; solution: string[] }[];
  exercises: { level: string; questions: { question: string; answer: string }[] }[];
  quiz: { question: string; options: string[]; correct: number }[];
}>> = {
  // ==================== GRADE 10 CONTENT ====================
  "algebra-10": {
    "Algebraic Expressions": {
      objective: "Understand and manipulate algebraic expressions including factorization and simplification",
      notes: {
        summary: "Algebraic expressions are mathematical phrases containing variables, constants, and operations. Mastering them is fundamental to all higher mathematics. In Grade 10, we focus on factorization techniques including common factors, difference of squares, trinomials, and sum/difference of cubes.",
        formulas: [
          { name: "Difference of Squares", formula: "a² - b² = (a + b)(a - b)", description: "Used to factorize expressions with squared terms subtracted" },
          { name: "Perfect Square Trinomial", formula: "a² + 2ab + b² = (a + b)²", description: "Recognizing and factorizing perfect squares" },
          { name: "Sum of Cubes", formula: "a³ + b³ = (a + b)(a² - ab + b²)", description: "Factorizing sum of two cubed terms" },
          { name: "Difference of Cubes", formula: "a³ - b³ = (a - b)(a² + ab + b²)", description: "Factorizing difference of two cubed terms" },
          { name: "Trinomial (split middle)", formula: "ax² + bx + c → find factors of ac that sum to b", description: "For factorizing quadratic trinomials" },
        ],
        keyPoints: [
          "Like terms have the same variable(s) raised to the same power(s)",
          "When multiplying expressions, use FOIL for binomials: First, Outer, Inner, Last",
          "Always check factorization by expanding back to verify",
          "Look for common factors FIRST before attempting other factorization methods",
          "For trinomials ax² + bx + c: find two numbers that multiply to ac and add to b",
        ],
        reminders: [
          "You can only add/subtract like terms (same variables, same powers)",
          "When dividing, cancel common factors in numerator and denominator only",
          "Check your signs carefully when factorizing - sign errors are common!",
          "The order of factors doesn't matter: (x+3)(x-2) = (x-2)(x+3)",
        ],
      },
      examples: [
        {
          problem: "Factorize: x² - 9",
          solution: [
            "Step 1: Recognize this is a difference of squares (a² - b²)",
            "Step 2: Identify a = x and b = 3 (since 9 = 3²)",
            "Step 3: Apply formula: a² - b² = (a + b)(a - b)",
            "Step 4: x² - 9 = (x + 3)(x - 3) ✓",
          ],
        },
        {
          problem: "Simplify: (2x + 3)(x - 4)",
          solution: [
            "Step 1: Use FOIL method (First, Outer, Inner, Last)",
            "Step 2: First: 2x × x = 2x²",
            "Step 3: Outer: 2x × (-4) = -8x",
            "Step 4: Inner: 3 × x = 3x",
            "Step 5: Last: 3 × (-4) = -12",
            "Step 6: Combine like terms: 2x² - 8x + 3x - 12 = 2x² - 5x - 12 ✓",
          ],
        },
        {
          problem: "Factorize: x² + 5x + 6",
          solution: [
            "Step 1: Find two numbers that multiply to 6 and add to 5",
            "Step 2: The numbers are 2 and 3 (2 × 3 = 6, 2 + 3 = 5)",
            "Step 3: Write as: x² + 2x + 3x + 6",
            "Step 4: Group: (x² + 2x) + (3x + 6)",
            "Step 5: Factor each group: x(x + 2) + 3(x + 2)",
            "Step 6: Final answer: (x + 2)(x + 3) ✓",
          ],
        },
        {
          problem: "Factorize: 8x³ - 27",
          solution: [
            "Step 1: Recognize this as difference of cubes: a³ - b³",
            "Step 2: 8x³ = (2x)³ so a = 2x; 27 = 3³ so b = 3",
            "Step 3: Apply formula: a³ - b³ = (a - b)(a² + ab + b²)",
            "Step 4: = (2x - 3)((2x)² + (2x)(3) + 3²)",
            "Step 5: = (2x - 3)(4x² + 6x + 9) ✓",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Factorize: x² - 16", answer: "(x + 4)(x - 4)" },
            { question: "Simplify: 3x + 5x - 2x", answer: "6x" },
            { question: "Expand: (x + 5)(x + 2)", answer: "x² + 7x + 10" },
            { question: "Factorize: x² - 25", answer: "(x + 5)(x - 5)" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "Factorize: x² + 6x + 9", answer: "(x + 3)²" },
            { question: "Expand: (x - 2)(x + 5)", answer: "x² + 3x - 10" },
            { question: "Factorize: x² - x - 12", answer: "(x - 4)(x + 3)" },
            { question: "Simplify: (x² - 4)/(x - 2)", answer: "x + 2" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "Factorize: 2x² + 7x + 3", answer: "(2x + 1)(x + 3)" },
            { question: "Factorize: 27x³ + 8", answer: "(3x + 2)(9x² - 6x + 4)" },
            { question: "Simplify: (x² - 9)/(x² + 6x + 9)", answer: "(x - 3)/(x + 3)" },
            { question: "Factorize completely: 3x³ - 12x", answer: "3x(x + 2)(x - 2)" },
          ],
        },
      ],
      quiz: [
        { question: "What is the factored form of x² - 25?", options: ["(x - 5)²", "(x + 5)(x - 5)", "(x + 25)(x - 1)", "(x - 5)(x - 5)"], correct: 1 },
        { question: "Simplify: 4x² ÷ 2x", options: ["2x", "2x²", "2", "4x"], correct: 0 },
        { question: "Expand (a + b)²", options: ["a² + b²", "a² + 2ab + b²", "a² - b²", "2a + 2b"], correct: 1 },
        { question: "Which expression equals 8x³ + 27?", options: ["(2x + 3)(4x² - 6x + 9)", "(2x - 3)(4x² + 6x + 9)", "(2x + 3)³", "(8x + 27)(x² - 1)"], correct: 0 },
        { question: "Factor: x² - 7x + 12", options: ["(x - 3)(x - 4)", "(x + 3)(x + 4)", "(x - 2)(x - 6)", "(x - 1)(x - 12)"], correct: 0 },
      ],
    },
    "Exponents": {
      objective: "Apply laws of exponents to simplify and solve expressions with integer and rational exponents",
      notes: {
        summary: "Exponents represent repeated multiplication. Understanding exponent laws is crucial for simplifying complex expressions. In Grade 10, we work with integer exponents, rational exponents, and learn to convert between exponential and surd (radical) form.",
        formulas: [
          { name: "Product Rule", formula: "aᵐ × aⁿ = aᵐ⁺ⁿ", description: "When multiplying same bases, add the exponents" },
          { name: "Quotient Rule", formula: "aᵐ ÷ aⁿ = aᵐ⁻ⁿ", description: "When dividing same bases, subtract the exponents" },
          { name: "Power Rule", formula: "(aᵐ)ⁿ = aᵐⁿ", description: "When raising a power to another power, multiply exponents" },
          { name: "Zero Exponent", formula: "a⁰ = 1 (a ≠ 0)", description: "Any non-zero number raised to power 0 equals 1" },
          { name: "Negative Exponent", formula: "a⁻ⁿ = 1/aⁿ", description: "Negative exponent means take the reciprocal" },
          { name: "Fractional Exponent", formula: "a^(m/n) = ⁿ√(aᵐ)", description: "Denominator is root, numerator is power" },
          { name: "Product to Power", formula: "(ab)ⁿ = aⁿbⁿ", description: "Distribute the exponent to each factor" },
          { name: "Quotient to Power", formula: "(a/b)ⁿ = aⁿ/bⁿ", description: "Distribute the exponent to numerator and denominator" },
        ],
        keyPoints: [
          "Exponent laws only apply when bases are the SAME",
          "Negative exponents move terms between numerator and denominator",
          "Fractional exponents: a^(1/n) = ⁿ√a (the nth root of a)",
          "To solve exponential equations, make the bases the same",
          "When simplifying, leave answers with positive exponents",
        ],
        reminders: [
          "Always express final answers with positive exponents",
          "0⁰ is undefined - avoid this in calculations",
          "When in doubt, write out the meaning: 2³ = 2 × 2 × 2",
          "Convert to same base before applying laws: 4 = 2², 8 = 2³",
        ],
      },
      examples: [
        {
          problem: "Simplify: 2³ × 2⁴",
          solution: [
            "Step 1: Both terms have base 2",
            "Step 2: Apply product rule: aᵐ × aⁿ = aᵐ⁺ⁿ",
            "Step 3: 2³ × 2⁴ = 2³⁺⁴ = 2⁷",
            "Step 4: 2⁷ = 128 ✓",
          ],
        },
        {
          problem: "Simplify: (x³)⁴ ÷ x⁵",
          solution: [
            "Step 1: Apply power rule to numerator: (x³)⁴ = x³ˣ⁴ = x¹²",
            "Step 2: Apply quotient rule: x¹² ÷ x⁵ = x¹²⁻⁵",
            "Step 3: x¹²⁻⁵ = x⁷ ✓",
          ],
        },
        {
          problem: "Simplify: 8^(2/3)",
          solution: [
            "Step 1: Use fractional exponent rule: a^(m/n) = ⁿ√(aᵐ)",
            "Step 2: 8^(2/3) = ³√(8²) OR (³√8)²",
            "Step 3: Method 1: ³√8 = 2, then 2² = 4",
            "Step 4: Answer: 8^(2/3) = 4 ✓",
          ],
        },
        {
          problem: "Simplify: (3x⁻²y³)²",
          solution: [
            "Step 1: Apply power rule to each factor: (ab)ⁿ = aⁿbⁿ",
            "Step 2: = 3² × (x⁻²)² × (y³)²",
            "Step 3: = 9 × x⁻⁴ × y⁶",
            "Step 4: Write with positive exponents: = 9y⁶/x⁴ ✓",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Simplify: 3² × 3³", answer: "3⁵ = 243" },
            { question: "Evaluate: 5⁰", answer: "1" },
            { question: "Simplify: x⁷ × x³", answer: "x¹⁰" },
            { question: "Write with positive exponent: x⁻³", answer: "1/x³" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "Simplify: x⁵ ÷ x²", answer: "x³" },
            { question: "Simplify: (2³)²", answer: "2⁶ = 64" },
            { question: "Evaluate: 16^(1/2)", answer: "4" },
            { question: "Simplify: 2⁻³ × 2⁵", answer: "2² = 4" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "Simplify: 27^(2/3)", answer: "9" },
            { question: "Simplify: (x⁻²y³)⁻¹", answer: "x²/y³" },
            { question: "Solve: 2ˣ = 32", answer: "x = 5" },
            { question: "Simplify: (9x⁴)^(1/2)", answer: "3x²" },
          ],
        },
      ],
      quiz: [
        { question: "What is 2⁻³ equal to?", options: ["-8", "-6", "1/8", "8"], correct: 2 },
        { question: "Simplify: x⁴ × x⁻² ", options: ["x²", "x⁶", "x⁻⁸", "x⁸"], correct: 0 },
        { question: "What is 27^(1/3)?", options: ["9", "3", "27", "81"], correct: 1 },
        { question: "(ab)³ equals:", options: ["a³b", "ab³", "a³b³", "3ab"], correct: 2 },
        { question: "Simplify: (3²)³ ÷ 3⁴", options: ["3", "3²", "3⁴", "3⁶"], correct: 1 },
      ],
    },
    "Number Patterns": {
      objective: "Identify, describe, and extend linear and quadratic number patterns using the general term",
      notes: {
        summary: "Number patterns are sequences that follow a specific rule. In Grade 10, we analyze linear patterns (constant first difference) and quadratic patterns (constant second difference). Finding the general term allows us to predict any term in the sequence.",
        formulas: [
          { name: "Linear Pattern", formula: "Tₙ = a + (n-1)d = dn + (a-d)", description: "a = first term, d = common difference, n = term number" },
          { name: "Quadratic Pattern", formula: "Tₙ = an² + bn + c", description: "When second difference is constant = 2a" },
          { name: "First Difference", formula: "d₁ = T₂ - T₁, d₂ = T₃ - T₂, ...", description: "Difference between consecutive terms" },
          { name: "Second Difference", formula: "2nd diff = d₂ - d₁, d₃ - d₂, ...", description: "Difference between first differences" },
        ],
        keyPoints: [
          "Linear patterns have a CONSTANT first difference",
          "Quadratic patterns have a CONSTANT second difference",
          "For quadratic: if second difference = 2a, then coefficient of n² is 'a'",
          "To find b and c, substitute known terms and solve simultaneous equations",
          "The general term Tₙ lets you find ANY term without listing all terms",
        ],
        reminders: [
          "Always calculate first differences, then second differences",
          "For quadratic patterns: 2a = second difference",
          "Check your formula by substituting n = 1, 2, 3 to verify",
          "Pattern problems often require forming and solving equations",
        ],
      },
      examples: [
        {
          problem: "Find the general term for: 3, 7, 11, 15, ...",
          solution: [
            "Step 1: Find first differences: 7-3=4, 11-7=4, 15-11=4",
            "Step 2: First difference is constant (d = 4), so it's linear",
            "Step 3: Use formula Tₙ = a + (n-1)d",
            "Step 4: a = 3 (first term), d = 4",
            "Step 5: Tₙ = 3 + (n-1)(4) = 3 + 4n - 4 = 4n - 1",
            "Step 6: Check: T₁ = 4(1)-1 = 3 ✓, T₂ = 4(2)-1 = 7 ✓",
          ],
        },
        {
          problem: "Find the general term for: 2, 6, 12, 20, 30, ...",
          solution: [
            "Step 1: First differences: 4, 6, 8, 10 (not constant)",
            "Step 2: Second differences: 2, 2, 2 (constant!)",
            "Step 3: Pattern is quadratic with 2a = 2, so a = 1",
            "Step 4: Tₙ = n² + bn + c",
            "Step 5: T₁ = 1 + b + c = 2, so b + c = 1",
            "Step 6: T₂ = 4 + 2b + c = 6, so 2b + c = 2",
            "Step 7: Solving: b = 1, c = 0",
            "Step 8: Tₙ = n² + n = n(n + 1) ✓",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Find T₁₀ for: 5, 8, 11, 14, ...", answer: "T₁₀ = 32 (using Tₙ = 3n + 2)" },
            { question: "What is the common difference of: 2, 7, 12, 17?", answer: "d = 5" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "Find Tₙ for: 1, 4, 9, 16, 25, ...", answer: "Tₙ = n²" },
            { question: "Find T₂₀ for: 3, 5, 7, 9, ...", answer: "T₂₀ = 41" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "Find Tₙ for: 0, 3, 8, 15, 24, ...", answer: "Tₙ = n² - 1" },
            { question: "If Tₙ = 2n² - 3n + 1, find T₅", answer: "T₅ = 36" },
          ],
        },
      ],
      quiz: [
        { question: "A pattern with constant first difference is:", options: ["Quadratic", "Linear", "Exponential", "Geometric"], correct: 1 },
        { question: "For pattern 2, 5, 8, 11..., what is d?", options: ["2", "3", "5", "8"], correct: 1 },
        { question: "If second difference = 6, what is 'a' in Tₙ = an² + bn + c?", options: ["6", "3", "12", "2"], correct: 1 },
        { question: "The 15th term of 4, 7, 10, 13... is:", options: ["46", "43", "49", "40"], correct: 0 },
        { question: "Which is the general term for 1, 4, 7, 10...?", options: ["3n - 2", "3n + 1", "n + 3", "4n - 3"], correct: 0 },
      ],
    },
    "Equations & Inequalities": {
      objective: "Solve linear equations, quadratic equations, and linear inequalities algebraically and graphically",
      notes: {
        summary: "Equations are mathematical statements where two expressions are equal. Inequalities compare expressions using <, >, ≤, or ≥. Solving means finding all values of the variable that make the statement true.",
        formulas: [
          { name: "Quadratic Formula", formula: "x = (-b ± √(b² - 4ac))/2a", description: "Solves ax² + bx + c = 0" },
          { name: "Discriminant", formula: "Δ = b² - 4ac", description: "Determines nature and number of roots" },
          { name: "Linear Equation", formula: "ax + b = c → x = (c-b)/a", description: "Isolate x by inverse operations" },
        ],
        keyPoints: [
          "Whatever you do to one side of an equation, do to the other",
          "When multiplying/dividing an inequality by a NEGATIVE number, FLIP the sign",
          "Quadratic equations can have 2, 1, or 0 real solutions",
          "Check solutions by substituting back into original equation",
          "For inequalities, represent solutions on a number line",
        ],
        reminders: [
          "Always check for extraneous solutions, especially with fractions",
          "Inequality sign REVERSES when multiplying/dividing by negative",
          "When factorizing to solve, set each factor = 0",
          "Open circle ○ for < or >, closed circle ● for ≤ or ≥",
        ],
      },
      examples: [
        {
          problem: "Solve: 3x - 7 = 2x + 5",
          solution: [
            "Step 1: Get all x terms on one side: 3x - 2x = 5 + 7",
            "Step 2: Simplify: x = 12",
            "Step 3: Check: 3(12) - 7 = 29, 2(12) + 5 = 29 ✓",
          ],
        },
        {
          problem: "Solve: x² - 5x + 6 = 0",
          solution: [
            "Step 1: Factorize: find numbers that multiply to 6, add to -5",
            "Step 2: Numbers are -2 and -3",
            "Step 3: (x - 2)(x - 3) = 0",
            "Step 4: x - 2 = 0 or x - 3 = 0",
            "Step 5: x = 2 or x = 3 ✓",
          ],
        },
        {
          problem: "Solve: -2x + 3 > 9",
          solution: [
            "Step 1: Subtract 3: -2x > 6",
            "Step 2: Divide by -2 (FLIP the sign!): x < -3",
            "Step 3: Solution: x < -3 (all numbers less than -3)",
            "Step 4: Number line: open circle at -3, arrow pointing left ✓",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Solve: 2x + 5 = 13", answer: "x = 4" },
            { question: "Solve: x - 3 > 7", answer: "x > 10" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "Solve: x² - 9 = 0", answer: "x = ±3" },
            { question: "Solve: 3(x - 2) = 2x + 1", answer: "x = 7" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "Solve: 2x² + 5x - 3 = 0", answer: "x = 1/2 or x = -3" },
            { question: "Solve: -3x + 1 ≤ 10", answer: "x ≥ -3" },
          ],
        },
      ],
      quiz: [
        { question: "If -2x > 6, then:", options: ["x > -3", "x < -3", "x > 3", "x < 3"], correct: 1 },
        { question: "The solutions of x² = 16 are:", options: ["x = 4", "x = -4", "x = ±4", "x = 8"], correct: 2 },
        { question: "Solving 3x + 2 = 14 gives:", options: ["x = 4", "x = 6", "x = 5", "x = 16"], correct: 0 },
        { question: "If (x-2)(x+3) = 0, then x =", options: ["2 and 3", "-2 and 3", "2 and -3", "-2 and -3"], correct: 2 },
        { question: "For x² - 4x + 4 = 0, the discriminant is:", options: ["0", "32", "8", "-32"], correct: 0 },
      ],
    },
  },
  "functions-10": {
    "Linear Functions": {
      objective: "Understand and graph linear functions, find gradients, intercepts, and equations of lines",
      notes: {
        summary: "Linear functions produce straight-line graphs. They have the form y = mx + c where m is the gradient (slope) and c is the y-intercept. Understanding linear functions is essential for coordinate geometry and real-world applications like rates of change.",
        formulas: [
          { name: "Slope-Intercept Form", formula: "y = mx + c", description: "m = gradient, c = y-intercept" },
          { name: "Gradient Formula", formula: "m = (y₂ - y₁)/(x₂ - x₁)", description: "Calculate gradient from two points" },
          { name: "Standard Form", formula: "ax + by + c = 0", description: "Alternative way to express linear equations" },
          { name: "Point-Gradient Form", formula: "y - y₁ = m(x - x₁)", description: "Equation through point (x₁, y₁) with gradient m" },
          { name: "Perpendicular Gradients", formula: "m₁ × m₂ = -1", description: "Product of perpendicular gradients is -1" },
        ],
        keyPoints: [
          "Positive gradient: line rises from left to right",
          "Negative gradient: line falls from left to right",
          "Zero gradient: horizontal line (y = c)",
          "Undefined gradient: vertical line (x = a)",
          "x-intercept: set y = 0 and solve for x",
          "y-intercept: set x = 0 (or read c from y = mx + c)",
          "Parallel lines have EQUAL gradients",
        ],
        reminders: [
          "Parallel lines: m₁ = m₂",
          "Perpendicular lines: m₁ × m₂ = -1 (negative reciprocals)",
          "Always label axes and mark intercepts when sketching",
          "The gradient represents the rate of change of y with respect to x",
        ],
      },
      examples: [
        {
          problem: "Find the gradient and y-intercept of y = 3x - 5",
          solution: [
            "Step 1: Compare with y = mx + c",
            "Step 2: m (gradient) = 3",
            "Step 3: c (y-intercept) = -5",
            "Step 4: The line crosses the y-axis at (0, -5) ✓",
          ],
        },
        {
          problem: "Find the equation of a line passing through (1, 2) and (3, 8)",
          solution: [
            "Step 1: Find gradient: m = (8 - 2)/(3 - 1) = 6/2 = 3",
            "Step 2: Use point-gradient form: y - y₁ = m(x - x₁)",
            "Step 3: y - 2 = 3(x - 1)",
            "Step 4: y - 2 = 3x - 3",
            "Step 5: y = 3x - 1 ✓",
          ],
        },
        {
          problem: "Find the equation of a line perpendicular to y = 2x + 1, passing through (4, 3)",
          solution: [
            "Step 1: Original gradient m₁ = 2",
            "Step 2: Perpendicular gradient: m₂ = -1/m₁ = -1/2",
            "Step 3: Use point-gradient form with (4, 3):",
            "Step 4: y - 3 = -1/2(x - 4)",
            "Step 5: y - 3 = -1/2x + 2",
            "Step 6: y = -1/2x + 5 ✓",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Find the gradient of y = 2x + 7", answer: "m = 2" },
            { question: "What is the y-intercept of y = -x + 4?", answer: "c = 4, point (0, 4)" },
            { question: "Is y = 5 horizontal or vertical?", answer: "Horizontal" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "Find the x-intercept of y = 2x - 6", answer: "x = 3, point (3, 0)" },
            { question: "Find gradient through (0, 1) and (4, 9)", answer: "m = 2" },
            { question: "Write 2x + y - 5 = 0 in slope-intercept form", answer: "y = -2x + 5" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "Line perpendicular to y = 2x + 1, through (4, 3)", answer: "y = -1/2x + 5" },
            { question: "Parallel to y = 3x - 2, passing through (1, 5)", answer: "y = 3x + 2" },
            { question: "Find where y = 2x + 1 and y = -x + 7 intersect", answer: "(2, 5)" },
          ],
        },
      ],
      quiz: [
        { question: "What is the gradient of y = -4x + 2?", options: ["2", "-4", "4", "-2"], correct: 1 },
        { question: "If two lines are perpendicular and one has gradient 3, what's the other's gradient?", options: ["3", "-3", "1/3", "-1/3"], correct: 3 },
        { question: "The y-intercept of 2x + y = 6 is:", options: ["2", "6", "3", "-6"], correct: 1 },
        { question: "A horizontal line has gradient:", options: ["1", "-1", "0", "undefined"], correct: 2 },
        { question: "The line y = 5 is:", options: ["Vertical", "Horizontal", "Diagonal", "Curved"], correct: 1 },
      ],
    },
    "Quadratic Functions": {
      objective: "Analyze and graph quadratic functions, find turning points, roots, and understand transformations",
      notes: {
        summary: "Quadratic functions have the form y = ax² + bx + c and produce parabolic graphs. The sign of 'a' determines if the parabola opens upward (minimum) or downward (maximum). These functions model many real-world phenomena like projectile motion.",
        formulas: [
          { name: "Standard Form", formula: "y = ax² + bx + c", description: "General form of quadratic" },
          { name: "Vertex Form", formula: "y = a(x - p)² + q", description: "Turning point at (p, q)" },
          { name: "Quadratic Formula", formula: "x = (-b ± √(b² - 4ac))/2a", description: "Find roots/x-intercepts" },
          { name: "Axis of Symmetry", formula: "x = -b/2a", description: "Vertical line through vertex" },
          { name: "Discriminant", formula: "Δ = b² - 4ac", description: "Determines number and nature of roots" },
          { name: "Completing the Square", formula: "x² + bx = (x + b/2)² - (b/2)²", description: "Convert to vertex form" },
        ],
        keyPoints: [
          "If a > 0: parabola opens upward (has a MINIMUM turning point)",
          "If a < 0: parabola opens downward (has a MAXIMUM turning point)",
          "Δ > 0: two distinct real roots (parabola crosses x-axis twice)",
          "Δ = 0: one repeated real root (parabola touches x-axis once)",
          "Δ < 0: no real roots (parabola doesn't cross x-axis)",
          "The larger |a|, the narrower the parabola",
        ],
        reminders: [
          "Always find the turning point when sketching",
          "Mark x-intercepts (if real) and y-intercept on your graph",
          "The axis of symmetry passes through the turning point",
          "Domain is all real numbers unless context restricts it",
        ],
      },
      examples: [
        {
          problem: "Find the turning point of y = x² - 4x + 3",
          solution: [
            "Step 1: Use x = -b/2a to find x-coordinate",
            "Step 2: a = 1, b = -4, so x = -(-4)/2(1) = 4/2 = 2",
            "Step 3: Substitute x = 2 into equation",
            "Step 4: y = (2)² - 4(2) + 3 = 4 - 8 + 3 = -1",
            "Step 5: Turning point is (2, -1) (minimum since a > 0) ✓",
          ],
        },
        {
          problem: "Solve x² - 5x + 6 = 0",
          solution: [
            "Step 1: Try factorizing: find two numbers that multiply to 6 and add to -5",
            "Step 2: Numbers are -2 and -3 ((-2) × (-3) = 6, (-2) + (-3) = -5)",
            "Step 3: x² - 5x + 6 = (x - 2)(x - 3) = 0",
            "Step 4: x - 2 = 0 → x = 2, or x - 3 = 0 → x = 3",
            "Step 5: Solutions: x = 2 or x = 3 ✓",
          ],
        },
        {
          problem: "Write y = x² - 6x + 5 in vertex form",
          solution: [
            "Step 1: Complete the square on x² - 6x",
            "Step 2: Take half of -6: (-6)/2 = -3",
            "Step 3: (x - 3)² = x² - 6x + 9",
            "Step 4: So x² - 6x = (x - 3)² - 9",
            "Step 5: y = (x - 3)² - 9 + 5 = (x - 3)² - 4",
            "Step 6: Vertex form: y = (x - 3)² - 4, vertex at (3, -4) ✓",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Does y = -x² + 4 open up or down?", answer: "Down (a = -1 < 0)" },
            { question: "Find the y-intercept of y = 2x² - 3x + 5", answer: "c = 5, point (0, 5)" },
            { question: "What is the axis of symmetry for y = x² - 8x + 15?", answer: "x = 4" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "Solve: x² - 9 = 0", answer: "x = ±3" },
            { question: "Find axis of symmetry for y = x² + 6x + 8", answer: "x = -3" },
            { question: "Find the turning point of y = x² + 4x + 3", answer: "(-2, -1)" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "Find discriminant of 2x² - 4x + 2 = 0, state nature of roots", answer: "Δ = 0, one repeated real root" },
            { question: "Write y = x² + 8x + 12 in vertex form", answer: "y = (x + 4)² - 4" },
            { question: "Find the range of y = -(x - 2)² + 5", answer: "y ≤ 5 or (-∞, 5]" },
          ],
        },
      ],
      quiz: [
        { question: "If Δ < 0, the quadratic has:", options: ["Two roots", "One root", "No real roots", "Infinite roots"], correct: 2 },
        { question: "The turning point of y = (x - 2)² + 3 is:", options: ["(2, 3)", "(-2, 3)", "(2, -3)", "(-2, -3)"], correct: 0 },
        { question: "For y = -2x² + 4x - 1, the parabola:", options: ["Opens up", "Opens down", "Is horizontal", "Is a straight line"], correct: 1 },
        { question: "The roots of x² - 4 = 0 are:", options: ["x = 4", "x = ±2", "x = ±4", "x = 2"], correct: 1 },
        { question: "If a = 1, b = -6, c = 9, then Δ =", options: ["0", "36", "9", "-36"], correct: 0 },
      ],
    },
    "Hyperbolic Functions": {
      objective: "Understand and sketch hyperbolic functions of the form y = a/(x+p) + q",
      notes: {
        summary: "Hyperbolic functions (rectangular hyperbolas) have the form y = a/(x+p) + q. They have two branches that never touch the asymptotes - the horizontal asymptote y = q and the vertical asymptote x = -p.",
        formulas: [
          { name: "Standard Form", formula: "y = a/x", description: "Basic hyperbola with asymptotes at x = 0 and y = 0" },
          { name: "General Form", formula: "y = a/(x + p) + q", description: "Shifted hyperbola" },
          { name: "Vertical Asymptote", formula: "x = -p", description: "Graph approaches but never touches this vertical line" },
          { name: "Horizontal Asymptote", formula: "y = q", description: "Graph approaches but never touches this horizontal line" },
        ],
        keyPoints: [
          "If a > 0: branches in quadrants 1 and 3 (relative to asymptotes)",
          "If a < 0: branches in quadrants 2 and 4",
          "The graph NEVER crosses its asymptotes",
          "Domain: all real x except x = -p",
          "Range: all real y except y = q",
          "Larger |a| stretches the graph away from asymptotes",
        ],
        reminders: [
          "Always draw asymptotes as dashed lines first",
          "Plot a few points in each branch",
          "The graph has rotational symmetry about the point (-p, q)",
          "Find x and y intercepts by setting y = 0 and x = 0",
        ],
      },
      examples: [
        {
          problem: "Sketch y = 2/x and state asymptotes, domain, and range",
          solution: [
            "Step 1: Vertical asymptote: x = 0 (y-axis)",
            "Step 2: Horizontal asymptote: y = 0 (x-axis)",
            "Step 3: a = 2 > 0, so branches in quadrants 1 and 3",
            "Step 4: Points: (1, 2), (2, 1), (-1, -2), (-2, -1)",
            "Step 5: Domain: x ∈ ℝ, x ≠ 0",
            "Step 6: Range: y ∈ ℝ, y ≠ 0 ✓",
          ],
        },
        {
          problem: "Find the asymptotes of y = 3/(x - 2) + 1",
          solution: [
            "Step 1: Rewrite as y = 3/(x - 2) + 1, comparing with y = a/(x + p) + q",
            "Step 2: Here p = -2 (since x + p = x - 2), q = 1",
            "Step 3: Vertical asymptote: x = -p = 2",
            "Step 4: Horizontal asymptote: y = q = 1 ✓",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "State the asymptotes of y = 1/x", answer: "x = 0 and y = 0" },
            { question: "What is the domain of y = 5/x?", answer: "x ∈ ℝ, x ≠ 0" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "Find asymptotes of y = 2/(x + 3) - 1", answer: "x = -3 and y = -1" },
            { question: "What is the range of y = 4/(x - 1) + 2?", answer: "y ∈ ℝ, y ≠ 2" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "Find the x-intercept of y = 6/(x + 2) - 3", answer: "x = 0" },
            { question: "Write the equation of a hyperbola with asymptotes x = 1, y = -2, passing through (2, 1)", answer: "y = 3/(x - 1) - 2" },
          ],
        },
      ],
      quiz: [
        { question: "The vertical asymptote of y = 4/(x - 5) is:", options: ["x = 4", "x = 5", "x = -5", "y = 5"], correct: 1 },
        { question: "For y = -2/x, the branches are in quadrants:", options: ["1 and 3", "2 and 4", "1 and 2", "3 and 4"], correct: 1 },
        { question: "The horizontal asymptote of y = 3/(x + 1) + 7 is:", options: ["y = 3", "y = 1", "y = 7", "x = 7"], correct: 2 },
        { question: "What is the domain of y = 1/(x + 4)?", options: ["x ≠ 0", "x ≠ 4", "x ≠ -4", "All real numbers"], correct: 2 },
        { question: "A hyperbola has how many branches?", options: ["1", "2", "3", "4"], correct: 1 },
      ],
    },
    "Exponential Functions": {
      objective: "Understand and sketch exponential functions, including growth, decay, and transformations",
      notes: {
        summary: "Exponential functions have the form y = abˣ + q (or y = a·bˣ⁺ᵖ + q). They model growth when b > 1 and decay when 0 < b < 1. The horizontal asymptote is y = q, and the y-intercept helps locate the graph.",
        formulas: [
          { name: "Basic Form", formula: "y = bˣ", description: "Base b, passes through (0, 1)" },
          { name: "General Form", formula: "y = a·bˣ + q", description: "a = stretch, q = vertical shift" },
          { name: "Growth Condition", formula: "b > 1", description: "Graph increases as x increases" },
          { name: "Decay Condition", formula: "0 < b < 1", description: "Graph decreases as x increases" },
          { name: "Horizontal Asymptote", formula: "y = q", description: "Graph approaches but never reaches this value" },
        ],
        keyPoints: [
          "For y = bˣ: always passes through (0, 1)",
          "Horizontal asymptote for y = a·bˣ + q is y = q",
          "If a > 0 and b > 1: increasing function above asymptote",
          "If a > 0 and 0 < b < 1: decreasing function above asymptote",
          "If a < 0: graph is reflected in the x-axis",
          "Domain is always all real numbers",
        ],
        reminders: [
          "The base b must be positive and not equal to 1",
          "y-intercept is at x = 0: y = a·b⁰ + q = a + q",
          "The range depends on the sign of a and value of q",
          "Exponential growth is much faster than linear growth",
        ],
      },
      examples: [
        {
          problem: "Sketch y = 2ˣ, stating key features",
          solution: [
            "Step 1: b = 2 > 1, so this is exponential GROWTH",
            "Step 2: Horizontal asymptote: y = 0",
            "Step 3: y-intercept: when x = 0, y = 2⁰ = 1, point (0, 1)",
            "Step 4: Other points: (1, 2), (2, 4), (-1, 0.5), (-2, 0.25)",
            "Step 5: Domain: x ∈ ℝ; Range: y > 0 ✓",
          ],
        },
        {
          problem: "Find asymptote and y-intercept of y = 3·(1/2)ˣ - 2",
          solution: [
            "Step 1: Horizontal asymptote: y = q = -2",
            "Step 2: y-intercept: x = 0",
            "Step 3: y = 3·(1/2)⁰ - 2 = 3(1) - 2 = 1",
            "Step 4: y-intercept is (0, 1)",
            "Step 5: Since 0 < 1/2 < 1, this is decay ✓",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Is y = 3ˣ growth or decay?", answer: "Growth (b = 3 > 1)" },
            { question: "Find the y-intercept of y = 5ˣ", answer: "(0, 1)" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "State the asymptote of y = 2ˣ + 3", answer: "y = 3" },
            { question: "Find the y-intercept of y = 4·2ˣ - 1", answer: "(0, 3)" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "Find the range of y = -2ˣ + 5", answer: "y < 5" },
            { question: "Solve 2ˣ = 16", answer: "x = 4" },
          ],
        },
      ],
      quiz: [
        { question: "For y = (1/3)ˣ, the function shows:", options: ["Growth", "Decay", "Neither", "Both"], correct: 1 },
        { question: "The asymptote of y = 4ˣ - 5 is:", options: ["y = 4", "y = -5", "y = 0", "x = -5"], correct: 1 },
        { question: "y = 2ˣ always passes through:", options: ["(1, 0)", "(0, 1)", "(2, 0)", "(0, 2)"], correct: 1 },
        { question: "The domain of y = 5ˣ is:", options: ["x > 0", "x ≥ 0", "All real x", "x ≤ 5"], correct: 2 },
        { question: "If y = 3·2ˣ, the y-intercept is:", options: ["(0, 2)", "(0, 3)", "(0, 6)", "(0, 1)"], correct: 1 },
      ],
    },
  },
  "geometry-10": {
    "Properties of Triangles": {
      objective: "Understand and apply properties of triangles including congruence and similarity",
      notes: {
        summary: "Triangles are classified by sides (scalene, isosceles, equilateral) and angles (acute, right, obtuse). Understanding triangle properties is fundamental to Euclidean geometry and problem-solving.",
        formulas: [
          { name: "Angle Sum", formula: "∠A + ∠B + ∠C = 180°", description: "Interior angles of a triangle sum to 180°" },
          { name: "Exterior Angle", formula: "Ext ∠ = sum of interior opposite angles", description: "Exterior angle theorem" },
          { name: "Isosceles Triangle", formula: "If AB = AC, then ∠B = ∠C", description: "Equal sides opposite equal angles" },
          { name: "Pythagoras", formula: "a² + b² = c² (right triangle)", description: "For right-angled triangles, c = hypotenuse" },
        ],
        keyPoints: [
          "Equilateral: all sides equal, all angles = 60°",
          "Isosceles: two sides equal, two angles equal",
          "Scalene: no equal sides, no equal angles",
          "The longest side is opposite the largest angle",
          "Congruent triangles: SSS, SAS, AAS, RHS conditions",
          "Similar triangles: same shape, angles equal, sides proportional",
        ],
        reminders: [
          "Always mark equal sides and angles on diagrams",
          "Use Pythagoras only for RIGHT-angled triangles",
          "Similar triangles have equal corresponding angles",
          "For congruence, you need to match the correct vertices",
        ],
      },
      examples: [
        {
          problem: "In triangle ABC, ∠A = 50° and ∠B = 70°. Find ∠C.",
          solution: [
            "Step 1: Use angle sum property: ∠A + ∠B + ∠C = 180°",
            "Step 2: 50° + 70° + ∠C = 180°",
            "Step 3: 120° + ∠C = 180°",
            "Step 4: ∠C = 180° - 120° = 60° ✓",
          ],
        },
        {
          problem: "An isosceles triangle has a vertex angle of 40°. Find the base angles.",
          solution: [
            "Step 1: Let base angles each be x (they're equal in isosceles)",
            "Step 2: x + x + 40° = 180°",
            "Step 3: 2x = 140°",
            "Step 4: x = 70°",
            "Step 5: Each base angle is 70° ✓",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Find ∠C if ∠A = 60° and ∠B = 80°", answer: "∠C = 40°" },
            { question: "What are all angles of an equilateral triangle?", answer: "All 60°" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "In right triangle with legs 3 and 4, find hypotenuse", answer: "5" },
            { question: "Isosceles triangle with base angles 65° each. Find vertex angle.", answer: "50°" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "Exterior angle is 110°. One interior opposite angle is 40°. Find the other.", answer: "70°" },
            { question: "Triangle with sides 5, 12, 13. Is it right-angled?", answer: "Yes (5² + 12² = 13²)" },
          ],
        },
      ],
      quiz: [
        { question: "The sum of angles in a triangle is:", options: ["90°", "180°", "270°", "360°"], correct: 1 },
        { question: "An equilateral triangle has:", options: ["2 equal sides", "No equal sides", "3 equal sides", "1 right angle"], correct: 2 },
        { question: "In an isosceles triangle, the base angles are:", options: ["Different", "Equal", "90° each", "60° each"], correct: 1 },
        { question: "If a triangle has angles 60°, 60°, 60°, it is:", options: ["Scalene", "Isosceles", "Equilateral", "Right-angled"], correct: 2 },
        { question: "The exterior angle equals:", options: ["Adjacent interior angle", "Sum of interior opposite angles", "180°", "Half the sum of all angles"], correct: 1 },
      ],
    },
    "Quadrilaterals": {
      objective: "Identify and apply properties of quadrilaterals including parallelograms, rectangles, rhombi, and squares",
      notes: {
        summary: "Quadrilaterals are four-sided polygons. Each type has specific properties related to sides, angles, and diagonals. Understanding these properties helps solve geometric problems and proofs.",
        formulas: [
          { name: "Angle Sum", formula: "Sum of interior angles = 360°", description: "All quadrilaterals have angles summing to 360°" },
          { name: "Parallelogram Area", formula: "A = base × height", description: "Height is perpendicular distance between parallel sides" },
          { name: "Rectangle Area", formula: "A = length × width", description: "Special case of parallelogram" },
          { name: "Rhombus Area", formula: "A = (d₁ × d₂)/2", description: "Using the diagonals" },
        ],
        keyPoints: [
          "Parallelogram: opposite sides parallel and equal, opposite angles equal",
          "Rectangle: parallelogram with all angles 90°, diagonals equal",
          "Rhombus: parallelogram with all sides equal, diagonals bisect at right angles",
          "Square: rectangle with all sides equal (also a rhombus)",
          "Trapezium: only one pair of parallel sides",
          "Kite: two pairs of adjacent sides equal",
        ],
        reminders: [
          "A square is both a rectangle AND a rhombus",
          "Diagonals of a parallelogram bisect each other",
          "Diagonals of a rhombus are perpendicular bisectors",
          "Mark all properties on your diagram when solving problems",
        ],
      },
      examples: [
        {
          problem: "Find the fourth angle of a quadrilateral with angles 80°, 100°, 95°",
          solution: [
            "Step 1: Sum of angles in quadrilateral = 360°",
            "Step 2: Let fourth angle = x",
            "Step 3: 80° + 100° + 95° + x = 360°",
            "Step 4: 275° + x = 360°",
            "Step 5: x = 85° ✓",
          ],
        },
        {
          problem: "In parallelogram ABCD, ∠A = 70°. Find all angles.",
          solution: [
            "Step 1: In parallelogram, opposite angles are equal",
            "Step 2: ∠C = ∠A = 70° (opposite angles)",
            "Step 3: Adjacent angles are supplementary: ∠A + ∠B = 180°",
            "Step 4: ∠B = 180° - 70° = 110°",
            "Step 5: ∠D = ∠B = 110° (opposite angles)",
            "Step 6: Angles: 70°, 110°, 70°, 110° ✓",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Sum of angles in a quadrilateral?", answer: "360°" },
            { question: "How many right angles does a rectangle have?", answer: "4" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "In a rhombus, diagonals are 6 cm and 8 cm. Find area.", answer: "24 cm²" },
            { question: "Parallelogram has one angle 65°. Find adjacent angle.", answer: "115°" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "Rectangle with diagonal 10 and width 6. Find length.", answer: "8" },
            { question: "Name a quadrilateral with perpendicular diagonals", answer: "Rhombus, Square, or Kite" },
          ],
        },
      ],
      quiz: [
        { question: "All sides of a square are:", options: ["Parallel", "Perpendicular", "Equal", "Unequal"], correct: 2 },
        { question: "In a parallelogram, opposite angles are:", options: ["Supplementary", "Complementary", "Equal", "90°"], correct: 2 },
        { question: "Diagonals bisect each other at right angles in a:", options: ["Rectangle", "Parallelogram", "Rhombus", "Trapezium"], correct: 2 },
        { question: "A square has how many lines of symmetry?", options: ["2", "4", "6", "8"], correct: 1 },
        { question: "Which is NOT a property of rectangles?", options: ["4 right angles", "Equal diagonals", "Opposite sides equal", "All sides equal"], correct: 3 },
      ],
    },
    "Circle Geometry Basics": {
      objective: "Understand basic circle terminology and properties including angles and chords",
      notes: {
        summary: "Circle geometry forms the foundation for more advanced theorems in Grade 11 and 12. Understanding the basic terms and properties is essential before tackling circle theorems.",
        formulas: [
          { name: "Circumference", formula: "C = 2πr = πd", description: "Distance around the circle" },
          { name: "Area", formula: "A = πr²", description: "Area enclosed by the circle" },
          { name: "Arc Length", formula: "l = (θ/360°) × 2πr", description: "Length of arc for angle θ at center" },
          { name: "Sector Area", formula: "A = (θ/360°) × πr²", description: "Area of sector for angle θ" },
        ],
        keyPoints: [
          "Radius: line from center to circumference",
          "Diameter: line through center (d = 2r)",
          "Chord: line joining two points on circumference",
          "Arc: part of the circumference",
          "Sector: 'pizza slice' region between two radii",
          "Segment: region between a chord and an arc",
          "Tangent: line touching circle at exactly one point",
        ],
        reminders: [
          "A tangent is perpendicular to the radius at the point of contact",
          "Equal chords are equidistant from the center",
          "The perpendicular from center to a chord bisects the chord",
          "An angle at the center is twice the angle at the circumference (preview)",
        ],
      },
      examples: [
        {
          problem: "Find circumference and area of a circle with radius 7 cm (use π = 22/7)",
          solution: [
            "Step 1: Circumference C = 2πr = 2 × (22/7) × 7 = 44 cm",
            "Step 2: Area A = πr² = (22/7) × 7² = (22/7) × 49 = 154 cm² ✓",
          ],
        },
        {
          problem: "Find the arc length of a 90° arc in a circle of radius 14 cm",
          solution: [
            "Step 1: Arc length = (θ/360°) × 2πr",
            "Step 2: = (90/360) × 2 × (22/7) × 14",
            "Step 3: = (1/4) × 2 × (22/7) × 14",
            "Step 4: = (1/4) × 88 = 22 cm ✓",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Find circumference if r = 10 cm (use π = 3.14)", answer: "62.8 cm" },
            { question: "Find area if r = 5 cm (use π = 3.14)", answer: "78.5 cm²" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "Find sector area for 60° angle, r = 6 cm", answer: "(1/6)π(36) = 6π cm²" },
            { question: "Diameter is 20 cm. Find area.", answer: "100π cm²" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "Arc length is 11 cm, angle is 90°. Find radius.", answer: "7 cm" },
            { question: "Chord is 24 cm, distance from center is 5 cm. Find radius.", answer: "13 cm" },
          ],
        },
      ],
      quiz: [
        { question: "A chord passes through the center. It is called:", options: ["Radius", "Diameter", "Tangent", "Arc"], correct: 1 },
        { question: "The formula for circumference is:", options: ["πr²", "2πr", "πd²", "2πd"], correct: 1 },
        { question: "A tangent meets the radius at:", options: ["45°", "60°", "90°", "180°"], correct: 2 },
        { question: "Area of a circle with r = 3 is:", options: ["6π", "9π", "3π", "12π"], correct: 1 },
        { question: "A sector is like a:", options: ["Circle", "Pizza slice", "Rectangle", "Triangle"], correct: 1 },
      ],
    },
  },
  "trig-10": {
    "Trigonometric Ratios": {
      objective: "Understand and apply sine, cosine, and tangent ratios in right-angled triangles",
      notes: {
        summary: "Trigonometric ratios relate the angles and sides of right-angled triangles. They are fundamental to solving problems in geometry, physics, engineering, and many real-world applications.",
        formulas: [
          { name: "Sine", formula: "sin θ = opposite/hypotenuse", description: "SOH - Sine is Opposite over Hypotenuse" },
          { name: "Cosine", formula: "cos θ = adjacent/hypotenuse", description: "CAH - Cosine is Adjacent over Hypotenuse" },
          { name: "Tangent", formula: "tan θ = opposite/adjacent", description: "TOA - Tangent is Opposite over Adjacent" },
          { name: "Pythagoras", formula: "a² + b² = c²", description: "c is hypotenuse (longest side opposite 90°)" },
          { name: "Reciprocal Ratios", formula: "cosec = 1/sin, sec = 1/cos, cot = 1/tan", description: "Reciprocals of the main ratios" },
        ],
        keyPoints: [
          "Remember SOH-CAH-TOA to recall the ratios",
          "The hypotenuse is ALWAYS opposite the 90° angle (longest side)",
          "Opposite and adjacent are relative to the angle you're working with",
          "Special angles: 30°, 45°, 60° have exact values (memorize these!)",
          "sin²θ + cos²θ = 1 (Pythagorean identity)",
        ],
        reminders: [
          "Label sides relative to the angle you're working with, not just 'a, b, c'",
          "Use inverse functions (sin⁻¹, cos⁻¹, tan⁻¹) to find angles",
          "Check your calculator is in DEGREE mode!",
          "30-60-90 triangle: sides in ratio 1 : √3 : 2",
          "45-45-90 triangle: sides in ratio 1 : 1 : √2",
        ],
      },
      examples: [
        {
          problem: "In a right triangle, the opposite side is 3 and hypotenuse is 5. Find sin θ and the angle θ.",
          solution: [
            "Step 1: Identify: opposite = 3, hypotenuse = 5",
            "Step 2: Use sin θ = opposite/hypotenuse",
            "Step 3: sin θ = 3/5 = 0.6",
            "Step 4: θ = sin⁻¹(0.6) = 36.87° ✓",
          ],
        },
        {
          problem: "Find the exact value of tan 60°",
          solution: [
            "Step 1: In a 30-60-90 triangle, sides are 1, √3, 2",
            "Step 2: For 60°: opposite = √3, adjacent = 1",
            "Step 3: tan 60° = opposite/adjacent = √3/1 = √3 ✓",
          ],
        },
        {
          problem: "A ladder 10 m long leans against a wall at 70°. How high up the wall does it reach?",
          solution: [
            "Step 1: Draw diagram: ladder is hypotenuse, height is opposite to 70°",
            "Step 2: sin 70° = opposite/hypotenuse = h/10",
            "Step 3: h = 10 × sin 70° = 10 × 0.9397 = 9.40 m ✓",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Find sin 30° (exact value)", answer: "1/2 or 0.5" },
            { question: "If opp = 4, adj = 3, find tan θ", answer: "4/3" },
            { question: "Find cos 60° (exact value)", answer: "1/2" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "Hyp = 10, adj = 8, find cos θ and the angle", answer: "cos θ = 0.8, θ ≈ 36.87°" },
            { question: "Find sin 45° (exact value)", answer: "√2/2 or 1/√2" },
            { question: "tan θ = 1, find θ", answer: "θ = 45°" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "sin θ = 0.5, find θ (0° ≤ θ ≤ 90°)", answer: "30°" },
            { question: "Find tan 45° × cos 60°", answer: "1 × 0.5 = 0.5" },
            { question: "In a triangle, opp = 5, θ = 30°. Find hyp.", answer: "hyp = 10" },
          ],
        },
      ],
      quiz: [
        { question: "sin 90° equals:", options: ["0", "1", "-1", "undefined"], correct: 1 },
        { question: "Which ratio uses opposite and adjacent?", options: ["Sine", "Cosine", "Tangent", "Secant"], correct: 2 },
        { question: "cos 0° equals:", options: ["0", "1", "-1", "0.5"], correct: 1 },
        { question: "In SOH-CAH-TOA, 'H' stands for:", options: ["Height", "Horizontal", "Hypotenuse", "Hypothesis"], correct: 2 },
        { question: "tan 45° equals:", options: ["0", "1", "√2", "1/2"], correct: 1 },
      ],
    },
    "Solving Triangles": {
      objective: "Use trigonometric ratios to find unknown sides and angles in right-angled triangles",
      notes: {
        summary: "Solving triangles means finding all unknown sides and angles. For right-angled triangles, we use trigonometric ratios and Pythagoras' theorem. Problems often involve real-world contexts like heights, distances, and angles of elevation/depression.",
        formulas: [
          { name: "Finding a Side", formula: "side = (known side) × trig ratio", description: "Rearrange sin/cos/tan formula" },
          { name: "Finding an Angle", formula: "θ = sin⁻¹(ratio) or cos⁻¹ or tan⁻¹", description: "Use inverse trig functions" },
          { name: "Angle of Elevation", formula: "Angle measured UP from horizontal", description: "Looking up at object" },
          { name: "Angle of Depression", formula: "Angle measured DOWN from horizontal", description: "Looking down at object" },
        ],
        keyPoints: [
          "Always draw a clear diagram first",
          "Label all known and unknown quantities",
          "Choose the ratio that involves one unknown and two knowns",
          "Angle of elevation = angle of depression (alternate angles)",
          "Check your answer makes sense (angles between 0° and 90°)",
        ],
        reminders: [
          "Use Pythagoras when you have two sides and need the third",
          "Use trig ratios when you have an angle and one side",
          "For inverse trig on calculator: use sin⁻¹ (or arcsin)",
          "Read the problem carefully for angles of elevation/depression",
        ],
      },
      examples: [
        {
          problem: "A tree casts a shadow 20 m long when the sun's elevation is 35°. Find the height of the tree.",
          solution: [
            "Step 1: Draw diagram: right triangle with shadow = 20 m (adjacent), height = h (opposite), angle = 35°",
            "Step 2: Choose ratio: tan uses opposite and adjacent",
            "Step 3: tan 35° = h/20",
            "Step 4: h = 20 × tan 35° = 20 × 0.7002 = 14.0 m ✓",
          ],
        },
        {
          problem: "From the top of a 50 m cliff, the angle of depression to a boat is 25°. Find the distance of the boat from the cliff base.",
          solution: [
            "Step 1: Angle of depression = 25°, so angle at boat = 25° (alternate angles)",
            "Step 2: Height (opposite) = 50 m, distance (adjacent) = d",
            "Step 3: tan 25° = 50/d",
            "Step 4: d = 50/tan 25° = 50/0.4663 = 107.2 m ✓",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Right triangle: angle 40°, adjacent = 10. Find opposite.", answer: "opp = 10 × tan 40° = 8.39" },
            { question: "Right triangle: angle 30°, hypotenuse = 12. Find opposite.", answer: "opp = 12 × sin 30° = 6" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "Opposite = 7, hypotenuse = 14. Find the angle.", answer: "sin⁻¹(7/14) = sin⁻¹(0.5) = 30°" },
            { question: "Ladder at 65° to ground, reaches 8 m high. Find ladder length.", answer: "8/sin 65° = 8.83 m" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "From point A, angle of elevation to top of tower is 40°. From point B, 50 m closer, it's 55°. Find tower height.", answer: "h ≈ 83.9 m" },
            { question: "Person 1.7 m tall sees top of building at 32°. Distance from building is 40 m. Find building height.", answer: "h = 1.7 + 40tan32° = 26.7 m" },
          ],
        },
      ],
      quiz: [
        { question: "Angle of elevation is measured from:", options: ["Vertical up", "Vertical down", "Horizontal up", "Horizontal down"], correct: 2 },
        { question: "To find an angle from a ratio, use:", options: ["sin", "cos", "tan", "sin⁻¹/cos⁻¹/tan⁻¹"], correct: 3 },
        { question: "Angle of depression from A to B equals:", options: ["Angle of elevation from A to B", "Angle of elevation from B to A", "90° minus elevation", "Complement of elevation"], correct: 1 },
        { question: "If sin θ = 0.8, θ is approximately:", options: ["37°", "53°", "45°", "60°"], correct: 1 },
        { question: "A 10 m ladder at 60° reaches how high?", options: ["5 m", "8.66 m", "10 m", "7.07 m"], correct: 1 },
      ],
    },
    "Trigonometric Graphs": {
      objective: "Sketch and interpret graphs of sin θ, cos θ, and tan θ, including amplitude and period",
      notes: {
        summary: "Trigonometric functions can be graphed on a coordinate plane. The sine and cosine graphs are smooth waves with specific properties. Understanding these graphs is essential for modeling periodic phenomena.",
        formulas: [
          { name: "Sine Function", formula: "y = a sin(bθ + c) + d", description: "a = amplitude, 360°/b = period, d = vertical shift" },
          { name: "Cosine Function", formula: "y = a cos(bθ + c) + d", description: "Same parameters as sine" },
          { name: "Period Formula", formula: "Period = 360°/b", description: "How often the pattern repeats" },
          { name: "Amplitude", formula: "Amplitude = |a|", description: "Maximum displacement from center" },
        ],
        keyPoints: [
          "sin θ starts at 0, reaches 1 at 90°, 0 at 180°, -1 at 270°, 0 at 360°",
          "cos θ starts at 1, reaches 0 at 90°, -1 at 180°, 0 at 270°, 1 at 360°",
          "tan θ has vertical asymptotes at 90°, 270°, etc. (where cos θ = 0)",
          "Amplitude is half the vertical distance between max and min",
          "Period is the horizontal distance for one complete cycle",
          "-1 ≤ sin θ ≤ 1 and -1 ≤ cos θ ≤ 1 (range)",
        ],
        reminders: [
          "cos θ = sin(θ + 90°) - cosine leads sine by 90°",
          "tan θ = sin θ / cos θ",
          "Mark key points: intercepts, max, min, asymptotes",
          "The period of tan θ is 180°, not 360°",
        ],
      },
      examples: [
        {
          problem: "State amplitude and period of y = 3sin(2θ)",
          solution: [
            "Step 1: Compare with y = a sin(bθ)",
            "Step 2: a = 3, so amplitude = |3| = 3",
            "Step 3: b = 2, so period = 360°/2 = 180°",
            "Step 4: Range: -3 ≤ y ≤ 3 ✓",
          ],
        },
        {
          problem: "Sketch y = cos θ for 0° ≤ θ ≤ 360°",
          solution: [
            "Step 1: Key points: (0°, 1), (90°, 0), (180°, -1), (270°, 0), (360°, 1)",
            "Step 2: Maximum at θ = 0° and 360° (y = 1)",
            "Step 3: Minimum at θ = 180° (y = -1)",
            "Step 4: Zeros at θ = 90° and 270°",
            "Step 5: Draw smooth wave through these points ✓",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "What is sin 0°?", answer: "0" },
            { question: "What is the amplitude of y = 2cos θ?", answer: "2" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "Period of y = sin(3θ)?", answer: "120°" },
            { question: "Where is tan θ undefined in [0°, 360°]?", answer: "90° and 270°" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "Range of y = 2sin θ + 3?", answer: "1 ≤ y ≤ 5" },
            { question: "Period and amplitude of y = 4cos(θ/2)?", answer: "Period = 720°, Amplitude = 4" },
          ],
        },
      ],
      quiz: [
        { question: "The period of y = sin θ is:", options: ["180°", "360°", "90°", "270°"], correct: 1 },
        { question: "cos 180° equals:", options: ["1", "0", "-1", "undefined"], correct: 2 },
        { question: "The amplitude of y = 5sin θ is:", options: ["1", "5", "10", "-5"], correct: 1 },
        { question: "tan θ is undefined when:", options: ["sin θ = 0", "cos θ = 0", "tan θ = 0", "sin θ = 1"], correct: 1 },
        { question: "The range of y = sin θ is:", options: ["0 to 1", "-1 to 1", "0 to 360", "All real"], correct: 1 },
      ],
    },
  },
  "stats-10": {
    "Measures of Central Tendency": {
      objective: "Calculate and interpret mean, median, and mode for ungrouped and grouped data",
      notes: {
        summary: "Measures of central tendency describe the 'center' or typical value of a data set. The mean, median, and mode each give different information about where data values cluster.",
        formulas: [
          { name: "Mean (Average)", formula: "x̄ = Σx/n", description: "Sum of all values divided by number of values" },
          { name: "Grouped Mean", formula: "x̄ = Σ(f × x)/Σf", description: "f = frequency, x = midpoint" },
          { name: "Median Position", formula: "Position = (n+1)/2", description: "Middle value when ordered" },
          { name: "Mode", formula: "Most frequent value", description: "Value that appears most often" },
        ],
        keyPoints: [
          "Mean is affected by extreme values (outliers)",
          "Median is the middle value - not affected by outliers",
          "Mode can be used for non-numerical data",
          "For grouped data, use class midpoints",
          "A distribution can have no mode, one mode, or multiple modes",
        ],
        reminders: [
          "Always order data before finding median",
          "For even number of values, median = average of two middle values",
          "Use appropriate measure: mean for symmetric data, median for skewed",
          "In grouped data, estimated mean uses midpoints",
        ],
      },
      examples: [
        {
          problem: "Find mean, median, mode of: 3, 5, 7, 7, 8, 9, 12",
          solution: [
            "Step 1: Mean = (3+5+7+7+8+9+12)/7 = 51/7 = 7.29",
            "Step 2: Data is ordered. n = 7, so median position = (7+1)/2 = 4th value",
            "Step 3: Median = 7 (the 4th value)",
            "Step 4: Mode = 7 (appears twice, most frequent) ✓",
          ],
        },
        {
          problem: "Find median of: 2, 4, 6, 8, 10, 12",
          solution: [
            "Step 1: n = 6 (even number of values)",
            "Step 2: Middle positions are 3rd and 4th",
            "Step 3: 3rd value = 6, 4th value = 8",
            "Step 4: Median = (6 + 8)/2 = 7 ✓",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Find the mean of 4, 6, 8, 10, 12", answer: "8" },
            { question: "Find the mode of 2, 3, 3, 4, 5, 3, 6", answer: "3" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "Find median of 15, 12, 18, 22, 19, 14", answer: "16.5" },
            { question: "Mean of 5 numbers is 20. Sum of numbers is?", answer: "100" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "If mean of x, x+2, x+4, x+6 is 15, find x", answer: "x = 12" },
            { question: "Data: 3, 5, 7, 9, p. Mean = 6. Find p.", answer: "p = 6" },
          ],
        },
      ],
      quiz: [
        { question: "Which measure is affected by outliers?", options: ["Mode", "Median", "Mean", "Range"], correct: 2 },
        { question: "The mode of 1, 2, 2, 3, 4 is:", options: ["1", "2", "2.4", "3"], correct: 1 },
        { question: "For even n, the median is:", options: ["Middle value", "Average of two middle", "Last value", "First value"], correct: 1 },
        { question: "Mean of 10, 20, 30 is:", options: ["10", "20", "30", "60"], correct: 1 },
        { question: "A data set can have:", options: ["Only one mode", "No mode", "Multiple modes", "All of the above"], correct: 3 },
      ],
    },
    "Measures of Dispersion": {
      objective: "Calculate range, quartiles, interquartile range, and understand variance and standard deviation",
      notes: {
        summary: "Measures of dispersion describe how spread out data values are. While central tendency tells us the typical value, dispersion tells us how much values vary from that center.",
        formulas: [
          { name: "Range", formula: "Range = Maximum - Minimum", description: "Simplest measure of spread" },
          { name: "Interquartile Range", formula: "IQR = Q₃ - Q₁", description: "Range of middle 50% of data" },
          { name: "Variance", formula: "σ² = Σ(x - x̄)²/n", description: "Average squared deviation from mean" },
          { name: "Standard Deviation", formula: "σ = √[Σ(x - x̄)²/n]", description: "Square root of variance" },
        ],
        keyPoints: [
          "Q₁ = 25th percentile (lower quartile)",
          "Q₂ = 50th percentile (median)",
          "Q₃ = 75th percentile (upper quartile)",
          "IQR is resistant to outliers, range is not",
          "Standard deviation has same units as original data",
          "Low standard deviation = data clustered near mean",
        ],
        reminders: [
          "Calculate quartiles after ordering data",
          "IQR = Q₃ - Q₁ (not Q₂ - Q₁)",
          "For standard deviation: find mean first, then deviations",
          "Use calculator for σ on large data sets",
        ],
      },
      examples: [
        {
          problem: "Find range and IQR of: 2, 4, 6, 8, 10, 12, 14, 16",
          solution: [
            "Step 1: Range = 16 - 2 = 14",
            "Step 2: n = 8, so Q₁ is between 2nd and 3rd values: (4+6)/2 = 5",
            "Step 3: Q₃ is between 6th and 7th values: (12+14)/2 = 13",
            "Step 4: IQR = Q₃ - Q₁ = 13 - 5 = 8 ✓",
          ],
        },
        {
          problem: "Calculate standard deviation of: 2, 4, 6, 8, 10",
          solution: [
            "Step 1: Mean = 30/5 = 6",
            "Step 2: Deviations: -4, -2, 0, 2, 4",
            "Step 3: Squared: 16, 4, 0, 4, 16",
            "Step 4: Variance = (16+4+0+4+16)/5 = 40/5 = 8",
            "Step 5: σ = √8 = 2.83 ✓",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Find range of 5, 8, 12, 15, 20", answer: "15" },
            { question: "If Q₁ = 10 and Q₃ = 25, find IQR", answer: "15" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "Find Q₁ for 3, 5, 7, 9, 11, 13, 15", answer: "5" },
            { question: "Find variance if deviations squared sum to 50 with n = 10", answer: "5" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "Data set has σ = 4. What is variance?", answer: "16" },
            { question: "If all values increase by 5, what happens to σ?", answer: "Stays the same" },
          ],
        },
      ],
      quiz: [
        { question: "IQR is:", options: ["Max - Min", "Q₃ - Q₁", "Q₂ - Q₁", "Range/4"], correct: 1 },
        { question: "Standard deviation is:", options: ["√variance", "variance²", "Range/2", "Mean deviation"], correct: 0 },
        { question: "Q₃ is the:", options: ["25th percentile", "50th percentile", "75th percentile", "100th percentile"], correct: 2 },
        { question: "Which is NOT a measure of dispersion?", options: ["Range", "IQR", "Mode", "Standard deviation"], correct: 2 },
        { question: "Low σ means data is:", options: ["Spread out", "Clustered", "All equal", "Negative"], correct: 1 },
      ],
    },
    "Representing Data": {
      objective: "Create and interpret histograms, frequency polygons, ogives, and box-and-whisker plots",
      notes: {
        summary: "Visual representations help us understand data distributions at a glance. Different graphs suit different purposes: histograms for distribution shape, box plots for comparing data sets, ogives for cumulative data.",
        formulas: [
          { name: "Class Width", formula: "Upper boundary - Lower boundary", description: "Width of each interval" },
          { name: "Cumulative Frequency", formula: "Running total of frequencies", description: "Used for ogives" },
          { name: "Five-Number Summary", formula: "Min, Q₁, Median, Q₃, Max", description: "For box-and-whisker plots" },
        ],
        keyPoints: [
          "Histograms: bars touch, area represents frequency",
          "Frequency polygon: line graph using midpoints of classes",
          "Ogive (cumulative frequency): S-shaped curve",
          "Box plot shows: minimum, Q₁, median, Q₃, maximum",
          "Box plot whiskers show range, box shows IQR",
          "Outliers shown as individual points beyond whiskers",
        ],
        reminders: [
          "Use upper class boundaries for ogive x-values",
          "Histograms have no gaps between bars (unlike bar graphs)",
          "Box plot: 50% of data lies in the box",
          "Symmetry and skewness visible in histograms and box plots",
        ],
      },
      examples: [
        {
          problem: "Given data: 2, 3, 5, 6, 7, 8, 9, 10, 12. Draw box plot.",
          solution: [
            "Step 1: Order (already ordered)",
            "Step 2: Min = 2, Max = 12",
            "Step 3: Median (5th value) = 7",
            "Step 4: Q₁ (median of 2,3,5,6) = (3+5)/2 = 4",
            "Step 5: Q₃ (median of 8,9,10,12) = (9+10)/2 = 9.5",
            "Step 6: Draw number line, box from 4 to 9.5, line at 7, whiskers to 2 and 12 ✓",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "What does the box in a box plot represent?", answer: "The interquartile range (middle 50%)" },
            { question: "What type of graph has touching bars?", answer: "Histogram" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "Five-number summary is 10, 15, 20, 30, 40. Find IQR.", answer: "15" },
            { question: "What x-values are used when plotting an ogive?", answer: "Upper class boundaries" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "Box plot has Q₁=25, Q₃=45. A value is an outlier if beyond?", answer: "Below -5 or above 75 (using 1.5×IQR)" },
            { question: "If histogram is right-skewed, how do mean and median compare?", answer: "Mean > Median" },
          ],
        },
      ],
      quiz: [
        { question: "An ogive plots:", options: ["Frequency", "Cumulative frequency", "Relative frequency", "Class width"], correct: 1 },
        { question: "In a box plot, the median is shown as:", options: ["A whisker", "The box", "A line in the box", "A point"], correct: 2 },
        { question: "Histogram bars should:", options: ["Have gaps", "Touch each other", "Be all same height", "Be colored"], correct: 1 },
        { question: "The 'box' contains what % of data?", options: ["25%", "50%", "75%", "100%"], correct: 1 },
        { question: "A frequency polygon uses:", options: ["Class boundaries", "Class midpoints", "Upper limits", "Lower limits"], correct: 1 },
      ],
    },
  },
  // ==================== GRADE 11 CONTENT ====================
  "algebra-11": {
    "Quadratic Equations & Inequalities": {
      objective: "Solve quadratic equations using factorization, completing the square, and the quadratic formula; solve quadratic inequalities",
      notes: {
        summary: "Building on Grade 10, we now explore all methods of solving quadratic equations and extend to quadratic inequalities. Understanding when to use each method and how to interpret solutions graphically is essential.",
        formulas: [
          { name: "Quadratic Formula", formula: "x = (-b ± √(b² - 4ac))/2a", description: "Works for any quadratic ax² + bx + c = 0" },
          { name: "Completing the Square", formula: "x² + bx = (x + b/2)² - (b/2)²", description: "Convert to vertex form" },
          { name: "Discriminant", formula: "Δ = b² - 4ac", description: "Determines nature of roots" },
        ],
        keyPoints: [
          "Try factorization first - it's quickest when it works",
          "Use quadratic formula when factorization is difficult",
          "Completing the square converts to vertex form",
          "For inequalities: find roots, test intervals, sketch parabola",
          "Critical values divide number line into intervals to test",
        ],
        reminders: [
          "Always write in standard form ax² + bx + c = 0 first",
          "Divide by 'a' first when completing the square if a ≠ 1",
          "For inequalities, include boundaries with ≤ or ≥",
          "Read inequality signs carefully: < vs ≤ matters!",
        ],
      },
      examples: [
        {
          problem: "Solve x² - 6x + 5 = 0 by completing the square",
          solution: [
            "Step 1: Move constant: x² - 6x = -5",
            "Step 2: Complete square: (x - 3)² - 9 = -5",
            "Step 3: (x - 3)² = 4",
            "Step 4: x - 3 = ±2",
            "Step 5: x = 3 + 2 = 5 or x = 3 - 2 = 1 ✓",
          ],
        },
        {
          problem: "Solve x² - 2x - 8 > 0",
          solution: [
            "Step 1: Factorize: (x - 4)(x + 2) > 0",
            "Step 2: Roots are x = 4 and x = -2",
            "Step 3: Parabola opens up (a > 0)",
            "Step 4: Positive outside roots (where parabola is above x-axis)",
            "Step 5: Solution: x < -2 or x > 4 ✓",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Solve: x² - 5x + 6 = 0 by factorizing", answer: "x = 2 or x = 3" },
            { question: "Use quadratic formula: x² - 4x + 3 = 0", answer: "x = 1 or x = 3" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "Solve by completing square: x² + 4x - 5 = 0", answer: "x = 1 or x = -5" },
            { question: "Solve: x² - 9 < 0", answer: "-3 < x < 3" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "Solve: 2x² - 7x + 3 = 0", answer: "x = 3 or x = 1/2" },
            { question: "Solve: x² - 4x - 5 ≥ 0", answer: "x ≤ -1 or x ≥ 5" },
          ],
        },
      ],
      quiz: [
        { question: "To complete the square on x² + 6x, add and subtract:", options: ["3", "6", "9", "36"], correct: 2 },
        { question: "If Δ = 0, the quadratic has:", options: ["No roots", "One repeated root", "Two distinct roots", "Complex roots"], correct: 1 },
        { question: "For x² < 9, the solution is:", options: ["x < 3", "x > -3", "-3 < x < 3", "x < -3 or x > 3"], correct: 2 },
        { question: "In the quadratic formula, b² - 4ac is called:", options: ["Coefficient", "Discriminant", "Root", "Factor"], correct: 1 },
        { question: "(x+2)² = 16 gives x =", options: ["2 or -6", "4 or -4", "2 or 6", "-2 or -6"], correct: 0 },
      ],
    },
    "Nature of Roots": {
      objective: "Use the discriminant to determine the nature of roots without solving the equation",
      notes: {
        summary: "The discriminant Δ = b² - 4ac tells us everything about the roots of a quadratic without actually finding them. This is useful in problems involving parameters and proving conditions on roots.",
        formulas: [
          { name: "Discriminant", formula: "Δ = b² - 4ac", description: "From ax² + bx + c = 0" },
          { name: "Two Real Roots", formula: "Δ > 0", description: "Parabola crosses x-axis twice" },
          { name: "Equal Roots", formula: "Δ = 0", description: "Parabola touches x-axis" },
          { name: "No Real Roots", formula: "Δ < 0", description: "Parabola doesn't cross x-axis" },
          { name: "Sum of Roots", formula: "α + β = -b/a", description: "Sum of the two roots" },
          { name: "Product of Roots", formula: "αβ = c/a", description: "Product of the two roots" },
        ],
        keyPoints: [
          "Δ > 0: two different real roots (rational if Δ is a perfect square)",
          "Δ = 0: one repeated real root (the parabola touches the x-axis)",
          "Δ < 0: no real roots (complex conjugate roots)",
          "For equal roots, the vertex is ON the x-axis",
          "Sum and product of roots connect roots to coefficients",
        ],
        reminders: [
          "Write equation in standard form before finding Δ",
          "For parameter problems, set up inequality for Δ",
          "Δ = 0 means tangency (touching) situations",
          "Use sum/product formulas to form equations from root information",
        ],
      },
      examples: [
        {
          problem: "Determine the nature of roots of 2x² - 3x + 5 = 0",
          solution: [
            "Step 1: Identify a = 2, b = -3, c = 5",
            "Step 2: Δ = b² - 4ac = (-3)² - 4(2)(5)",
            "Step 3: Δ = 9 - 40 = -31",
            "Step 4: Δ < 0, so NO REAL ROOTS ✓",
          ],
        },
        {
          problem: "For what value of k does x² + kx + 9 = 0 have equal roots?",
          solution: [
            "Step 1: For equal roots, Δ = 0",
            "Step 2: Δ = k² - 4(1)(9) = 0",
            "Step 3: k² - 36 = 0",
            "Step 4: k² = 36",
            "Step 5: k = ±6 ✓",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Find Δ for x² - 4x + 4 = 0", answer: "Δ = 0 (equal roots)" },
            { question: "If Δ = 25, how many real roots?", answer: "Two distinct real roots" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "For what k does x² - 6x + k = 0 have no real roots?", answer: "k > 9" },
            { question: "Sum of roots of 2x² - 5x + 3 = 0?", answer: "5/2" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "Roots of 3x² - 2x - 1 = 0 are α and β. Find α² + β².", answer: "α² + β² = (α+β)² - 2αβ = 4/9 + 2/3 = 10/9" },
            { question: "Find k if 2x² + (k-2)x + 8 = 0 has equal roots", answer: "k = 10 or k = -6" },
          ],
        },
      ],
      quiz: [
        { question: "Δ < 0 means:", options: ["Two real roots", "Equal roots", "No real roots", "One positive, one negative"], correct: 2 },
        { question: "For equal roots, the parabola:", options: ["Crosses x-axis twice", "Touches x-axis once", "Never touches x-axis", "Is horizontal"], correct: 1 },
        { question: "Product of roots of x² - 5x + 6 = 0 is:", options: ["5", "6", "-5", "-6"], correct: 1 },
        { question: "Sum of roots of 3x² - 9x + 2 = 0 is:", options: ["9", "3", "-3", "2/3"], correct: 1 },
        { question: "If Δ = 49, roots are:", options: ["Equal", "Irrational", "Rational and distinct", "Complex"], correct: 2 },
      ],
    },
    "Surds": {
      objective: "Simplify, add, subtract, multiply, divide, and rationalize expressions containing surds",
      notes: {
        summary: "Surds are irrational numbers expressed as roots (like √2, √3). They cannot be written as exact decimals. Working with surds requires special techniques including simplification and rationalization.",
        formulas: [
          { name: "Simplification", formula: "√(ab) = √a × √b", description: "Split the root" },
          { name: "Division", formula: "√(a/b) = √a/√b", description: "Separate root of fraction" },
          { name: "Rationalize (simple)", formula: "a/√b = (a√b)/b", description: "Multiply by √b/√b" },
          { name: "Rationalize (binomial)", formula: "1/(a+√b) × (a-√b)/(a-√b)", description: "Multiply by conjugate" },
          { name: "Conjugate Surds", formula: "(a + √b)(a - √b) = a² - b", description: "Difference of squares" },
        ],
        keyPoints: [
          "Like surds have the same radicand (number under root)",
          "Only like surds can be added or subtracted",
          "When simplifying, look for perfect square factors",
          "To rationalize: multiply by appropriate form of 1",
          "Conjugate of (a + √b) is (a - √b)",
        ],
        reminders: [
          "√a × √a = a (not √(a²))",
          "√a + √b ≠ √(a + b)",
          "Always simplify surds before adding/subtracting",
          "Rationalize denominators in final answers",
        ],
      },
      examples: [
        {
          problem: "Simplify √72",
          solution: [
            "Step 1: Find largest perfect square factor of 72",
            "Step 2: 72 = 36 × 2",
            "Step 3: √72 = √(36 × 2) = √36 × √2",
            "Step 4: = 6√2 ✓",
          ],
        },
        {
          problem: "Rationalize: 3/(2 + √5)",
          solution: [
            "Step 1: Multiply by conjugate: (2 - √5)/(2 - √5)",
            "Step 2: = 3(2 - √5)/[(2 + √5)(2 - √5)]",
            "Step 3: Denominator: (2)² - (√5)² = 4 - 5 = -1",
            "Step 4: = 3(2 - √5)/(-1) = -3(2 - √5)",
            "Step 5: = -6 + 3√5 or 3√5 - 6 ✓",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Simplify √50", answer: "5√2" },
            { question: "Simplify 3√2 + 5√2", answer: "8√2" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "Simplify √12 + √27", answer: "5√3" },
            { question: "Rationalize 6/√3", answer: "2√3" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "Expand (√3 + √2)²", answer: "5 + 2√6" },
            { question: "Rationalize 1/(√5 - √3)", answer: "(√5 + √3)/2" },
          ],
        },
      ],
      quiz: [
        { question: "√48 simplified is:", options: ["4√3", "2√12", "√48", "6√2"], correct: 0 },
        { question: "√5 × √5 =", options: ["√25", "5", "√10", "25"], correct: 1 },
        { question: "√3 + √3 =", options: ["√6", "2√3", "√9", "6"], correct: 1 },
        { question: "Conjugate of (3 + √2) is:", options: ["3 - √2", "-3 + √2", "√2 - 3", "3 + √2"], correct: 0 },
        { question: "6/√2 rationalized is:", options: ["3√2", "6√2/2", "3√2", "6/√2"], correct: 0 },
      ],
    },
    "Simultaneous Equations": {
      objective: "Solve systems of linear and quadratic equations simultaneously",
      notes: {
        summary: "Simultaneous equations involve finding values that satisfy multiple equations at once. In Grade 11, we solve systems with one linear and one quadratic equation, representing the intersection of a line and a parabola.",
        formulas: [
          { name: "Substitution Method", formula: "Express one variable from linear, substitute into quadratic", description: "Main method for linear-quadratic systems" },
          { name: "Number of Solutions", formula: "Δ of resulting quadratic determines intersections", description: "0, 1, or 2 points of intersection" },
        ],
        keyPoints: [
          "From linear equation, express y (or x) in terms of the other variable",
          "Substitute into quadratic to get a single-variable quadratic",
          "Solve the resulting quadratic for one variable",
          "Substitute back to find the other variable",
          "Two solutions = two intersection points",
        ],
        reminders: [
          "Always use the LINEAR equation for substitution",
          "Match x and y values correctly (keep pairs together)",
          "If Δ < 0: no intersection (line misses parabola)",
          "If Δ = 0: one point (line tangent to parabola)",
        ],
      },
      examples: [
        {
          problem: "Solve: y = x + 1 and y = x² - 3",
          solution: [
            "Step 1: From linear: y = x + 1",
            "Step 2: Substitute into quadratic: x + 1 = x² - 3",
            "Step 3: Rearrange: x² - x - 4 = 0",
            "Step 4: Quadratic formula: x = (1 ± √17)/2",
            "Step 5: x₁ = (1 + √17)/2 ≈ 2.56, x₂ = (1 - √17)/2 ≈ -1.56",
            "Step 6: y₁ = x₁ + 1 ≈ 3.56, y₂ = x₂ + 1 ≈ -0.56 ✓",
          ],
        },
        {
          problem: "Find where y = 2x - 1 meets y = x²",
          solution: [
            "Step 1: Set equal: 2x - 1 = x²",
            "Step 2: Rearrange: x² - 2x + 1 = 0",
            "Step 3: Factor: (x - 1)² = 0",
            "Step 4: x = 1 (repeated root - tangent)",
            "Step 5: y = 2(1) - 1 = 1",
            "Step 6: One intersection point: (1, 1) ✓",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Solve: y = x and y = x²", answer: "(0, 0) and (1, 1)" },
            { question: "Solve: y = 2 and y = x²", answer: "x = ±√2, points (√2, 2) and (-√2, 2)" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "Solve: y = x + 2 and y = x² - 4", answer: "(3, 5) and (-2, 0)" },
            { question: "How many solutions if line y = x + 5 and parabola y = x² + 2?", answer: "Check Δ for x² - x - 3 = 0; Δ > 0 so 2 solutions" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "For what k is y = x + k tangent to y = x²?", answer: "k = 1/4 (set Δ = 0)" },
            { question: "Solve: 2x + y = 5 and xy = 2", answer: "(2, 1) and (1/2, 4)" },
          ],
        },
      ],
      quiz: [
        { question: "To solve linear + quadratic, use:", options: ["Elimination", "Graphing only", "Substitution", "Cross multiplication"], correct: 2 },
        { question: "If Δ = 0 after substitution, the line is:", options: ["Missing parabola", "Tangent to parabola", "Cutting parabola twice", "Parallel to axis"], correct: 1 },
        { question: "y = x and y = x² intersect at:", options: ["One point", "Two points", "No points", "Three points"], correct: 1 },
        { question: "First step in substitution is:", options: ["Factor the quadratic", "Graph both", "Express y from linear", "Find discriminant"], correct: 2 },
        { question: "A line can intersect a parabola at most:", options: ["1 point", "2 points", "3 points", "4 points"], correct: 1 },
      ],
    },
  },
  // Continue with more Grade 11 topics...
  "calculus-12": {
    "Differentiation from First Principles": {
      objective: "Understand the concept of limits and derive the derivative using first principles",
      notes: {
        summary: "Differentiation from first principles uses limits to find the instantaneous rate of change of a function. This fundamental approach helps understand what derivatives truly represent - the gradient of the tangent line at any point.",
        formulas: [
          { name: "First Principles Definition", formula: "f'(x) = lim(h→0) [f(x+h) - f(x)]/h", description: "The definition of the derivative" },
          { name: "Alternative Form", formula: "f'(a) = lim(x→a) [f(x) - f(a)]/(x-a)", description: "Derivative at a specific point a" },
        ],
        keyPoints: [
          "The derivative gives the gradient of the tangent at any point",
          "h represents a small change in x that approaches zero",
          "This method works for any differentiable function",
          "The limit must exist for the derivative to exist",
          "f'(x) notation introduced by Lagrange; dy/dx by Leibniz",
        ],
        reminders: [
          "Always expand f(x+h) fully before simplifying",
          "Cancel h from numerator and denominator BEFORE taking the limit",
          "f'(x), dy/dx, Dx[f(x)] all represent the derivative",
          "The process: substitute, expand, simplify, cancel h, take limit",
        ],
      },
      examples: [
        {
          problem: "Differentiate f(x) = x² from first principles",
          solution: [
            "Step 1: f(x+h) = (x+h)² = x² + 2xh + h²",
            "Step 2: f(x+h) - f(x) = x² + 2xh + h² - x² = 2xh + h²",
            "Step 3: [f(x+h) - f(x)]/h = (2xh + h²)/h = h(2x + h)/h = 2x + h",
            "Step 4: lim(h→0)[2x + h] = 2x + 0 = 2x",
            "Step 5: Therefore f'(x) = 2x ✓",
          ],
        },
        {
          problem: "Differentiate f(x) = 1/x from first principles",
          solution: [
            "Step 1: f(x+h) = 1/(x+h)",
            "Step 2: f(x+h) - f(x) = 1/(x+h) - 1/x = [x - (x+h)]/[x(x+h)] = -h/[x(x+h)]",
            "Step 3: [f(x+h) - f(x)]/h = -h/[hx(x+h)] = -1/[x(x+h)]",
            "Step 4: lim(h→0)[-1/(x(x+h))] = -1/(x·x) = -1/x²",
            "Step 5: Therefore f'(x) = -1/x² ✓",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Differentiate f(x) = 5x from first principles", answer: "f'(x) = 5" },
            { question: "Differentiate f(x) = 7 from first principles", answer: "f'(x) = 0" },
            { question: "Differentiate f(x) = 3x + 2 from first principles", answer: "f'(x) = 3" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "Differentiate f(x) = x² + 3x from first principles", answer: "f'(x) = 2x + 3" },
            { question: "Differentiate f(x) = 2x² from first principles", answer: "f'(x) = 4x" },
            { question: "Differentiate f(x) = x² - 4x + 1 from first principles", answer: "f'(x) = 2x - 4" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "Differentiate f(x) = x³ from first principles", answer: "f'(x) = 3x²" },
            { question: "Differentiate f(x) = √x from first principles", answer: "f'(x) = 1/(2√x)" },
            { question: "Differentiate f(x) = 1/x² from first principles", answer: "f'(x) = -2/x³" },
          ],
        },
      ],
      quiz: [
        { question: "The derivative of a constant is:", options: ["1", "0", "The constant", "undefined"], correct: 1 },
        { question: "f'(x) = lim(h→0) [f(x+h) - f(x)]/h is called:", options: ["Chain rule", "Product rule", "First principles", "Quotient rule"], correct: 2 },
        { question: "If f(x) = x², then f'(x) =", options: ["x", "2x", "x²", "2"], correct: 1 },
        { question: "The derivative represents:", options: ["Area under curve", "Gradient of tangent", "Y-intercept", "Maximum value"], correct: 1 },
        { question: "If f(x) = 4x - 1, then f'(x) =", options: ["4x", "4", "-1", "4x - 1"], correct: 1 },
      ],
    },
    "Rules of Differentiation": {
      objective: "Apply power rule, constant multiple rule, sum/difference rule, and chain rule to differentiate functions efficiently",
      notes: {
        summary: "Differentiation rules allow us to find derivatives quickly without using first principles. The power rule handles polynomial terms, while the chain rule is essential for composite functions.",
        formulas: [
          { name: "Power Rule", formula: "d/dx[xⁿ] = nxⁿ⁻¹", description: "Bring power down, reduce by 1" },
          { name: "Constant Multiple", formula: "d/dx[cf(x)] = c·f'(x)", description: "Constants factor out" },
          { name: "Sum Rule", formula: "d/dx[f + g] = f' + g'", description: "Differentiate term by term" },
          { name: "Difference Rule", formula: "d/dx[f - g] = f' - g'", description: "Differentiate term by term" },
          { name: "Chain Rule", formula: "d/dx[f(g(x))] = f'(g(x))·g'(x)", description: "Derivative of outer × derivative of inner" },
        ],
        keyPoints: [
          "Power rule works for ANY real exponent (including negatives and fractions)",
          "Rewrite roots as fractional powers: √x = x^(1/2)",
          "Rewrite fractions as negative powers: 1/x = x^(-1)",
          "Chain rule: 'derivative of outside, leaving inside alone, times derivative of inside'",
          "Product and quotient rules for Grade 12 extension",
        ],
        reminders: [
          "Simplify expressions BEFORE differentiating when possible",
          "For chain rule, identify the 'inner' and 'outer' functions",
          "d/dx[constant] = 0 always",
          "Write final answers with positive exponents when possible",
        ],
      },
      examples: [
        {
          problem: "Differentiate y = 3x⁴ - 2x² + 5x - 7",
          solution: [
            "Step 1: Apply power rule to each term",
            "Step 2: d/dx(3x⁴) = 3 × 4x³ = 12x³",
            "Step 3: d/dx(-2x²) = -2 × 2x = -4x",
            "Step 4: d/dx(5x) = 5 × 1 = 5",
            "Step 5: d/dx(-7) = 0",
            "Step 6: dy/dx = 12x³ - 4x + 5 ✓",
          ],
        },
        {
          problem: "Differentiate y = (2x + 1)³ using chain rule",
          solution: [
            "Step 1: Identify outer = ( )³, inner = 2x + 1",
            "Step 2: Derivative of outer: 3( )² = 3(2x + 1)²",
            "Step 3: Derivative of inner: d/dx(2x + 1) = 2",
            "Step 4: Chain rule: dy/dx = 3(2x + 1)² × 2",
            "Step 5: dy/dx = 6(2x + 1)² ✓",
          ],
        },
        {
          problem: "Differentiate f(x) = √(3x - 5)",
          solution: [
            "Step 1: Rewrite: f(x) = (3x - 5)^(1/2)",
            "Step 2: Outer: ( )^(1/2), Inner: 3x - 5",
            "Step 3: d/dx[outer] = (1/2)(3x - 5)^(-1/2)",
            "Step 4: d/dx[inner] = 3",
            "Step 5: f'(x) = (1/2)(3x - 5)^(-1/2) × 3 = 3/(2√(3x-5)) ✓",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Differentiate: y = x⁵", answer: "dy/dx = 5x⁴" },
            { question: "Differentiate: y = 4x³ - x", answer: "dy/dx = 12x² - 1" },
            { question: "Differentiate: y = 7x² + 3x + 2", answer: "dy/dx = 14x + 3" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "Differentiate: y = √x = x^(1/2)", answer: "dy/dx = 1/(2√x)" },
            { question: "Differentiate: y = 1/x² = x^(-2)", answer: "dy/dx = -2x^(-3) = -2/x³" },
            { question: "Differentiate: y = (x² + 1)⁴", answer: "dy/dx = 8x(x² + 1)³" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "Differentiate: y = (5x - 2)^(-1)", answer: "dy/dx = -5(5x - 2)^(-2)" },
            { question: "Differentiate: y = √(x² + 4)", answer: "dy/dx = x/√(x² + 4)" },
            { question: "Find f'(2) if f(x) = x³ - 4x² + 2x", answer: "f'(x) = 3x² - 8x + 2, f'(2) = -2" },
          ],
        },
      ],
      quiz: [
        { question: "d/dx(x⁷) =", options: ["7x⁷", "7x⁶", "x⁶", "6x⁷"], correct: 1 },
        { question: "d/dx(x^(-2)) =", options: ["-2x^(-3)", "2x^(-1)", "-2x^(-1)", "2x^(-3)"], correct: 0 },
        { question: "For y = (3x)², dy/dx =", options: ["6x", "18x", "9x²", "6"], correct: 1 },
        { question: "The chain rule is used when:", options: ["Adding functions", "Multiplying functions", "Function inside function", "Dividing functions"], correct: 2 },
        { question: "d/dx(√x) =", options: ["1/√x", "2√x", "1/(2√x)", "√x/2"], correct: 2 },
      ],
    },
    "Applications of Derivatives": {
      objective: "Apply derivatives to find gradients, tangent equations, rates of change, and optimize functions",
      notes: {
        summary: "Derivatives have many practical applications: finding gradients of curves, equations of tangents and normals, rates of change, and determining maximum/minimum values. These skills are essential for optimization problems.",
        formulas: [
          { name: "Gradient at a Point", formula: "m = f'(a)", description: "Substitute x = a into derivative" },
          { name: "Tangent Line", formula: "y - y₁ = f'(a)(x - a)", description: "Line touching curve at (a, f(a))" },
          { name: "Normal Line", formula: "y - y₁ = -1/f'(a)(x - a)", description: "Line perpendicular to tangent" },
          { name: "Stationary Points", formula: "f'(x) = 0", description: "Where gradient is zero" },
          { name: "Second Derivative Test", formula: "f''(x) > 0: min; f''(x) < 0: max", description: "Determine nature of turning point" },
        ],
        keyPoints: [
          "Stationary points occur where f'(x) = 0",
          "Local maximum: f''(x) < 0 (concave down)",
          "Local minimum: f''(x) > 0 (concave up)",
          "Point of inflection: f''(x) = 0 AND concavity changes",
          "Rate of change = derivative with respect to time",
        ],
        reminders: [
          "For tangent: find point first, then gradient",
          "Normal gradient = -1/(tangent gradient)",
          "In optimization: set derivative = 0 to find critical points",
          "Check endpoints for global max/min on closed intervals",
        ],
      },
      examples: [
        {
          problem: "Find the equation of the tangent to y = x² - 3x + 2 at x = 2",
          solution: [
            "Step 1: Find y-coordinate: y = (2)² - 3(2) + 2 = 4 - 6 + 2 = 0",
            "Step 2: Point of tangency: (2, 0)",
            "Step 3: Find dy/dx = 2x - 3",
            "Step 4: Gradient at x = 2: m = 2(2) - 3 = 1",
            "Step 5: Tangent equation: y - 0 = 1(x - 2)",
            "Step 6: y = x - 2 ✓",
          ],
        },
        {
          problem: "Find the turning points of f(x) = x³ - 3x + 2 and determine their nature",
          solution: [
            "Step 1: f'(x) = 3x² - 3",
            "Step 2: Set f'(x) = 0: 3x² - 3 = 0 → x² = 1 → x = ±1",
            "Step 3: f''(x) = 6x",
            "Step 4: At x = 1: f''(1) = 6 > 0 → local minimum",
            "Step 5: At x = -1: f''(-1) = -6 < 0 → local maximum",
            "Step 6: Max at (-1, 4), Min at (1, 0) ✓",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Find gradient of y = x² at x = 3", answer: "dy/dx = 2x, so m = 6" },
            { question: "For f(x) = x³, find f'(2)", answer: "f'(x) = 3x², f'(2) = 12" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "Find equation of tangent to y = x³ at (1, 1)", answer: "y = 3x - 2" },
            { question: "Find stationary points of y = x² - 4x + 3", answer: "x = 2 (minimum at (2, -1))" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "Rectangle has perimeter 20. Find dimensions for max area.", answer: "5 × 5 (square)" },
            { question: "Find point of inflection of y = x³ - 3x² + 2", answer: "(1, 0)" },
          ],
        },
      ],
      quiz: [
        { question: "A stationary point occurs when:", options: ["f(x) = 0", "f'(x) = 0", "f''(x) = 0", "x = 0"], correct: 1 },
        { question: "If f''(a) > 0, point is:", options: ["Maximum", "Minimum", "Inflection", "Saddle"], correct: 1 },
        { question: "Normal line is:", options: ["Same as tangent", "Parallel to tangent", "Perpendicular to tangent", "Horizontal"], correct: 2 },
        { question: "Gradient of curve y = x² at origin is:", options: ["0", "1", "2", "undefined"], correct: 0 },
        { question: "To find maximum of function:", options: ["Set f(x) = 0", "Set f'(x) = 0", "Set f''(x) = 0", "Substitute x = 0"], correct: 1 },
      ],
    },
    "Limits & Continuity": {
      objective: "Understand the concept of limits, evaluate limits, and determine continuity of functions",
      notes: {
        summary: "Limits describe the behavior of a function as the input approaches a particular value. They are the foundation of calculus, enabling us to define derivatives and integrals precisely.",
        formulas: [
          { name: "Limit Notation", formula: "lim(x→a) f(x) = L", description: "f(x) approaches L as x approaches a" },
          { name: "Direct Substitution", formula: "If f(a) exists, lim(x→a) f(x) = f(a)", description: "For continuous functions" },
          { name: "Factoring Method", formula: "Factor and cancel common factors", description: "For 0/0 indeterminate forms" },
        ],
        keyPoints: [
          "A limit describes behavior, not necessarily the function value",
          "Left limit (x→a⁻) and right limit (x→a⁺) must be equal for limit to exist",
          "0/0 is indeterminate - needs algebraic manipulation",
          "A function is continuous if lim(x→a) f(x) = f(a)",
          "Limits enable the definition of the derivative",
        ],
        reminders: [
          "Try direct substitution first",
          "If you get 0/0, factor and simplify",
          "Check if the function is defined at the point",
          "For piecewise functions, check both sides",
        ],
      },
      examples: [
        {
          problem: "Evaluate lim(x→2) (x² - 4)/(x - 2)",
          solution: [
            "Step 1: Try direct substitution: (4 - 4)/(2 - 2) = 0/0 (indeterminate)",
            "Step 2: Factor numerator: x² - 4 = (x + 2)(x - 2)",
            "Step 3: lim(x→2) [(x + 2)(x - 2)]/(x - 2)",
            "Step 4: Cancel (x - 2): lim(x→2) (x + 2)",
            "Step 5: Now substitute: 2 + 2 = 4 ✓",
          ],
        },
        {
          problem: "Evaluate lim(x→3) (x² - 9)/(x - 3)",
          solution: [
            "Step 1: Direct substitution gives 0/0",
            "Step 2: Factor: (x² - 9) = (x + 3)(x - 3)",
            "Step 3: lim(x→3) [(x + 3)(x - 3)]/(x - 3) = lim(x→3) (x + 3)",
            "Step 4: = 3 + 3 = 6 ✓",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Evaluate lim(x→4) (x + 1)", answer: "5" },
            { question: "Evaluate lim(x→0) x²", answer: "0" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "Evaluate lim(x→5) (x² - 25)/(x - 5)", answer: "10" },
            { question: "Evaluate lim(x→-2) (x² + x - 2)/(x + 2)", answer: "-3" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "Evaluate lim(x→1) (x³ - 1)/(x - 1)", answer: "3" },
            { question: "Evaluate lim(h→0) [(2+h)² - 4]/h", answer: "4" },
          ],
        },
      ],
      quiz: [
        { question: "lim(x→3) (x² - 9)/(x - 3) =", options: ["0", "6", "undefined", "3"], correct: 1 },
        { question: "0/0 is called:", options: ["Zero", "Undefined", "Indeterminate", "Infinity"], correct: 2 },
        { question: "A function is continuous at a if:", options: ["f(a) exists", "Limit exists", "Limit = f(a)", "All of the above"], correct: 3 },
        { question: "lim(x→2) 5 =", options: ["2", "5", "10", "undefined"], correct: 1 },
        { question: "To evaluate 0/0 limits, we:", options: ["Stop", "Factor and simplify", "Write undefined", "Use L'Hopital"], correct: 1 },
      ],
    },
    "Cubic Functions": {
      objective: "Sketch and analyze cubic functions, find turning points, points of inflection, and solve cubic equations",
      notes: {
        summary: "Cubic functions have the form f(x) = ax³ + bx² + cx + d. They have at most two turning points and exactly one point of inflection. Understanding their shape is essential for curve sketching.",
        formulas: [
          { name: "Standard Form", formula: "f(x) = ax³ + bx² + cx + d", description: "General cubic function" },
          { name: "Stationary Points", formula: "f'(x) = 0", description: "Solve 3ax² + 2bx + c = 0" },
          { name: "Point of Inflection", formula: "f''(x) = 0", description: "Where concavity changes" },
        ],
        keyPoints: [
          "If a > 0: rises on right, falls on left",
          "If a < 0: falls on right, rises on left",
          "Maximum of 2 turning points, exactly 1 point of inflection",
          "A cubic always has at least one real root",
          "Point of inflection: midpoint between turning points",
        ],
        reminders: [
          "Find y-intercept: substitute x = 0",
          "Find x-intercepts: solve f(x) = 0 (factor if possible)",
          "Turning points: solve f'(x) = 0",
          "Nature of turning points: use f''(x) or sign of f'(x)",
        ],
      },
      examples: [
        {
          problem: "Sketch f(x) = x³ - 3x, showing all key features",
          solution: [
            "Step 1: f'(x) = 3x² - 3 = 0 → x² = 1 → x = ±1",
            "Step 2: f(1) = 1 - 3 = -2; f(-1) = -1 + 3 = 2",
            "Step 3: Turning points: (-1, 2) max, (1, -2) min",
            "Step 4: f''(x) = 6x = 0 → x = 0 (point of inflection)",
            "Step 5: f(0) = 0, so inflection at origin",
            "Step 6: x-intercepts: x³ - 3x = x(x² - 3) = 0 → x = 0, ±√3 ✓",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Find y-intercept of f(x) = x³ - 2x² + x - 5", answer: "(0, -5)" },
            { question: "Does f(x) = -x³ rise or fall as x → ∞?", answer: "Falls (a < 0)" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "Find turning points of f(x) = x³ - 3x²", answer: "(0, 0) and (2, -4)" },
            { question: "Find point of inflection of f(x) = x³ - 6x² + 9x", answer: "(2, 2)" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "Sketch f(x) = x³ - 3x + 2. Find max, min, and inflection.", answer: "Max (-1, 4), Min (1, 0), Inflection (0, 2)" },
            { question: "For what values of k does x³ - 3x = k have 3 solutions?", answer: "-2 < k < 2" },
          ],
        },
      ],
      quiz: [
        { question: "A cubic can have at most how many turning points?", options: ["1", "2", "3", "0"], correct: 1 },
        { question: "A cubic always has at least:", options: ["0 real roots", "1 real root", "2 real roots", "3 real roots"], correct: 1 },
        { question: "Point of inflection is where:", options: ["f(x) = 0", "f'(x) = 0", "f''(x) = 0 and concavity changes", "Maximum occurs"], correct: 2 },
        { question: "For f(x) = x³, the origin is:", options: ["Maximum", "Minimum", "Point of inflection", "Not on the curve"], correct: 2 },
        { question: "If a > 0 for ax³, as x → ∞:", options: ["f(x) → -∞", "f(x) → +∞", "f(x) → 0", "f(x) oscillates"], correct: 1 },
      ],
    },
  },
};

// Generate default content for topics not explicitly defined
const generateDefaultContent = (subtopicName: string) => ({
  objective: `Master the concepts and applications of ${subtopicName}`,
  notes: {
    summary: `This topic covers the fundamental concepts of ${subtopicName} as per the CAPS curriculum. Understanding these principles is essential for success in mathematics.`,
    formulas: [
      { name: "Key Formula 1", formula: "To be covered in lesson", description: "Primary formula for this topic" },
      { name: "Key Formula 2", formula: "To be covered in lesson", description: "Secondary formula for applications" },
    ],
    keyPoints: [
      "Understand the basic definitions and terminology",
      "Practice with a variety of problem types",
      "Connect concepts to real-world applications",
      "Build on prior knowledge from previous grades",
    ],
    reminders: [
      "Review prerequisites before starting",
      "Work through examples step by step",
      "Practice regularly for mastery",
    ],
  },
  examples: [
    {
      problem: `Example problem for ${subtopicName}`,
      solution: [
        "Step 1: Identify what is given and what is required",
        "Step 2: Choose the appropriate method or formula",
        "Step 3: Apply the method systematically",
        "Step 4: Check your answer",
      ],
    },
  ],
  exercises: [
    {
      level: "Easy",
      questions: [
        { question: "Basic application question", answer: "To be practiced" },
      ],
    },
    {
      level: "Medium",
      questions: [
        { question: "Intermediate application question", answer: "To be practiced" },
      ],
    },
    {
      level: "Hard",
      questions: [
        { question: "Advanced application question", answer: "To be practiced" },
      ],
    },
  ],
  quiz: [
    { question: "Understanding question 1", options: ["Option A", "Option B", "Option C", "Option D"], correct: 0 },
    { question: "Understanding question 2", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { question: "Application question 3", options: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
  ],
});

const LessonContent = ({ grade, topicId, subtopicName, onClose }: LessonContentProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("notes");
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [showExerciseAnswers, setShowExerciseAnswers] = useState<Record<string, boolean>>({});

  // Get content for this topic/subtopic or generate default
  const content = lessonData[topicId]?.[subtopicName] || generateDefaultContent(subtopicName);

  const handleQuizSubmit = () => {
    const totalQuestions = content.quiz.length;
    const correctAnswers = content.quiz.filter((q, idx) => quizAnswers[idx] === q.correct).length;
    setShowResults(true);
    
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    toast({
      title: percentage >= 60 ? "Well done! 🎉" : "Keep practicing! 💪",
      description: `You scored ${correctAnswers}/${totalQuestions} (${percentage}%)`,
      variant: percentage >= 60 ? "default" : "destructive",
    });
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setShowResults(false);
  };

  const toggleExerciseAnswer = (key: string) => {
    setShowExerciseAnswers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-auto">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg md:text-xl font-bold text-foreground">{subtopicName}</h1>
              <p className="text-sm text-muted-foreground">Grade {grade} • {topicId.split('-')[0]}</p>
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/30">
              <BookOpen className="h-3 w-3 mr-1" />
              CAPS Aligned
            </Badge>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Learning Objective */}
        <Card className="mb-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <Target className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-primary mb-1">Learning Objective</p>
                <p className="text-foreground">{content.objective}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="notes" className="text-xs sm:text-sm">
              <FileText className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Notes</span>
            </TabsTrigger>
            <TabsTrigger value="examples" className="text-xs sm:text-sm">
              <Lightbulb className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Examples</span>
            </TabsTrigger>
            <TabsTrigger value="exercises" className="text-xs sm:text-sm">
              <Calculator className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Exercises</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="text-xs sm:text-sm">
              <Play className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Quiz</span>
            </TabsTrigger>
          </TabsList>

          {/* Notes Tab */}
          <TabsContent value="notes" className="space-y-6">
            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{content.notes.summary}</p>
              </CardContent>
            </Card>

            {/* Formulas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Key Formulas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {content.notes.formulas.map((formula, idx) => (
                    <div key={idx} className="p-4 bg-muted/50 rounded-lg border border-border">
                      <p className="font-medium text-foreground mb-1">{formula.name}</p>
                      <p className="text-lg font-mono text-primary mb-2">{formula.formula}</p>
                      <p className="text-sm text-muted-foreground">{formula.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Points */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Key Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {content.notes.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Reminders */}
            <Card className="bg-amber-500/10 border-amber-500/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-amber-500">
                  <Lightbulb className="h-5 w-5" />
                  Remember!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {content.notes.reminders.map((reminder, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-500">⚡</span>
                      <span className="text-foreground">{reminder}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Examples Tab */}
          <TabsContent value="examples" className="space-y-6">
            {content.examples.map((example, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-lg">Example {idx + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-medium text-foreground">{example.problem}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-primary">Solution:</p>
                    {example.solution.map((step, stepIdx) => (
                      <p key={stepIdx} className="text-foreground pl-4 border-l-2 border-primary/30">
                        {step}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Exercises Tab */}
          <TabsContent value="exercises" className="space-y-6">
            {content.exercises.map((level, levelIdx) => (
              <Card key={levelIdx}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Badge 
                      variant={level.level === "Easy" ? "secondary" : level.level === "Medium" ? "default" : "destructive"}
                    >
                      {level.level}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {level.questions.map((q, qIdx) => {
                    const key = `${levelIdx}-${qIdx}`;
                    return (
                      <div key={qIdx} className="p-4 bg-muted/30 rounded-lg space-y-2">
                        <p className="font-medium text-foreground">{qIdx + 1}. {q.question}</p>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleExerciseAnswer(key)}
                        >
                          {showExerciseAnswers[key] ? "Hide Answer" : "Show Answer"}
                        </Button>
                        {showExerciseAnswers[key] && (
                          <div className="mt-2 p-3 bg-primary/10 rounded border border-primary/20">
                            <p className="text-primary font-medium">Answer: {q.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Quiz Tab */}
          <TabsContent value="quiz" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Test Your Knowledge</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {content.quiz.map((q, idx) => (
                  <div key={idx} className="space-y-3">
                    <p className="font-medium text-foreground">{idx + 1}. {q.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((option, optIdx) => (
                        <Button
                          key={optIdx}
                          variant={quizAnswers[idx] === optIdx ? "default" : "outline"}
                          className={`justify-start h-auto py-2 px-4 ${
                            showResults && optIdx === q.correct
                              ? "bg-green-500/20 border-green-500 text-green-600"
                              : showResults && quizAnswers[idx] === optIdx && optIdx !== q.correct
                              ? "bg-red-500/20 border-red-500 text-red-600"
                              : ""
                          }`}
                          onClick={() => !showResults && setQuizAnswers(prev => ({ ...prev, [idx]: optIdx }))}
                          disabled={showResults}
                        >
                          <span className="mr-2 font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex gap-4 pt-4">
                  {!showResults ? (
                    <Button 
                      onClick={handleQuizSubmit}
                      disabled={Object.keys(quizAnswers).length !== content.quiz.length}
                    >
                      Submit Quiz
                    </Button>
                  ) : (
                    <Button onClick={resetQuiz} variant="outline">
                      Try Again
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default LessonContent;
