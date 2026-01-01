import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, BookOpen, Calculator, CheckCircle, FileText, Lightbulb, Play, Target, X } from "lucide-react";
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
  "algebra-10": {
    "Algebraic Expressions": {
      objective: "Understand and manipulate algebraic expressions including factorization and simplification",
      notes: {
        summary: "Algebraic expressions are mathematical phrases containing variables, constants, and operations. Mastering them is fundamental to all higher mathematics.",
        formulas: [
          { name: "Difference of Squares", formula: "a² - b² = (a + b)(a - b)", description: "Used to factorize expressions with squared terms" },
          { name: "Perfect Square Trinomial", formula: "a² + 2ab + b² = (a + b)²", description: "Recognizing and factorizing perfect squares" },
          { name: "Sum of Cubes", formula: "a³ + b³ = (a + b)(a² - ab + b²)", description: "Factorizing cubic expressions" },
          { name: "Difference of Cubes", formula: "a³ - b³ = (a - b)(a² + ab + b²)", description: "Factorizing cubic expressions" },
        ],
        keyPoints: [
          "Like terms have the same variable raised to the same power",
          "When multiplying expressions, use FOIL for binomials",
          "Always check factorization by expanding back",
          "Look for common factors first before other methods",
        ],
        reminders: [
          "Remember: You can only add/subtract like terms",
          "When dividing, cancel common factors in numerator and denominator",
          "Check your signs when factorizing!",
        ],
      },
      examples: [
        {
          problem: "Factorize: x² - 9",
          solution: [
            "Step 1: Recognize this is a difference of squares (a² - b²)",
            "Step 2: Identify a = x and b = 3 (since 9 = 3²)",
            "Step 3: Apply formula: a² - b² = (a + b)(a - b)",
            "Step 4: x² - 9 = (x + 3)(x - 3)",
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
            "Step 6: Combine: 2x² - 8x + 3x - 12 = 2x² - 5x - 12",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Factorize: x² - 16", answer: "(x + 4)(x - 4)" },
            { question: "Simplify: 3x + 5x - 2x", answer: "6x" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "Factorize: x² + 6x + 9", answer: "(x + 3)²" },
            { question: "Expand: (x - 2)(x + 5)", answer: "x² + 3x - 10" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "Factorize: 2x² + 7x + 3", answer: "(2x + 1)(x + 3)" },
            { question: "Simplify: (x² - 4)/(x + 2)", answer: "x - 2" },
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
      objective: "Apply laws of exponents to simplify and solve expressions",
      notes: {
        summary: "Exponents represent repeated multiplication. Understanding exponent laws is crucial for simplifying complex expressions.",
        formulas: [
          { name: "Product Rule", formula: "aᵐ × aⁿ = aᵐ⁺ⁿ", description: "When multiplying same bases, add exponents" },
          { name: "Quotient Rule", formula: "aᵐ ÷ aⁿ = aᵐ⁻ⁿ", description: "When dividing same bases, subtract exponents" },
          { name: "Power Rule", formula: "(aᵐ)ⁿ = aᵐˣⁿ", description: "When raising power to power, multiply exponents" },
          { name: "Zero Exponent", formula: "a⁰ = 1 (a ≠ 0)", description: "Any non-zero number to power 0 equals 1" },
          { name: "Negative Exponent", formula: "a⁻ⁿ = 1/aⁿ", description: "Negative exponent means reciprocal" },
        ],
        keyPoints: [
          "Exponent laws only apply to the same base",
          "Negative exponents move terms between numerator and denominator",
          "Fractional exponents relate to roots: a^(1/n) = ⁿ√a",
        ],
        reminders: [
          "Always simplify negative exponents",
          "0⁰ is undefined",
          "Check if bases can be made the same before applying laws",
        ],
      },
      examples: [
        {
          problem: "Simplify: 2³ × 2⁴",
          solution: [
            "Step 1: Both terms have base 2",
            "Step 2: Apply product rule: aᵐ × aⁿ = aᵐ⁺ⁿ",
            "Step 3: 2³ × 2⁴ = 2³⁺⁴ = 2⁷",
            "Step 4: 2⁷ = 128",
          ],
        },
        {
          problem: "Simplify: (x³)⁴ ÷ x⁵",
          solution: [
            "Step 1: Apply power rule to numerator: (x³)⁴ = x¹²",
            "Step 2: Apply quotient rule: x¹² ÷ x⁵ = x¹²⁻⁵",
            "Step 3: x¹²⁻⁵ = x⁷",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Simplify: 3² × 3³", answer: "3⁵ = 243" },
            { question: "Evaluate: 5⁰", answer: "1" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "Simplify: x⁵ ÷ x²", answer: "x³" },
            { question: "Simplify: (2³)²", answer: "2⁶ = 64" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "Simplify: 8^(2/3)", answer: "4" },
            { question: "Simplify: (x⁻²y³)⁻¹", answer: "x²/y³" },
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
  },
  "functions-10": {
    "Linear Functions": {
      objective: "Understand and graph linear functions, find gradients and intercepts",
      notes: {
        summary: "Linear functions produce straight-line graphs. They have the form y = mx + c where m is the gradient and c is the y-intercept.",
        formulas: [
          { name: "Slope-Intercept Form", formula: "y = mx + c", description: "m = gradient, c = y-intercept" },
          { name: "Gradient Formula", formula: "m = (y₂ - y₁)/(x₂ - x₁)", description: "Calculate gradient from two points" },
          { name: "Standard Form", formula: "ax + by + c = 0", description: "Alternative way to express linear equations" },
        ],
        keyPoints: [
          "Positive gradient: line slopes upward left to right",
          "Negative gradient: line slopes downward left to right",
          "Zero gradient: horizontal line",
          "Undefined gradient: vertical line",
          "x-intercept: set y = 0 and solve for x",
          "y-intercept: set x = 0 and solve for y (or read c from equation)",
        ],
        reminders: [
          "Parallel lines have equal gradients",
          "Perpendicular lines: m₁ × m₂ = -1",
          "Always label axes and mark intercepts when graphing",
        ],
      },
      examples: [
        {
          problem: "Find the gradient and y-intercept of y = 3x - 5",
          solution: [
            "Step 1: Compare with y = mx + c",
            "Step 2: m (gradient) = 3",
            "Step 3: c (y-intercept) = -5",
            "Step 4: The line crosses the y-axis at (0, -5)",
          ],
        },
        {
          problem: "Find the equation of a line passing through (1, 2) and (3, 8)",
          solution: [
            "Step 1: Find gradient: m = (8 - 2)/(3 - 1) = 6/2 = 3",
            "Step 2: Use point-gradient form: y - y₁ = m(x - x₁)",
            "Step 3: y - 2 = 3(x - 1)",
            "Step 4: y - 2 = 3x - 3",
            "Step 5: y = 3x - 1",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Find the gradient of y = 2x + 7", answer: "m = 2" },
            { question: "What is the y-intercept of y = -x + 4?", answer: "c = 4, point (0, 4)" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "Find the x-intercept of y = 2x - 6", answer: "x = 3" },
            { question: "Find gradient through (0, 1) and (4, 9)", answer: "m = 2" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "Line perpendicular to y = 2x + 1, through (4, 3)", answer: "y = -½x + 5" },
            { question: "Parallel to y = 3x - 2, passing through (1, 5)", answer: "y = 3x + 2" },
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
      objective: "Analyze and graph quadratic functions, find turning points and roots",
      notes: {
        summary: "Quadratic functions have the form y = ax² + bx + c and produce parabolic graphs. The sign of 'a' determines if the parabola opens up or down.",
        formulas: [
          { name: "Standard Form", formula: "y = ax² + bx + c", description: "General form of quadratic" },
          { name: "Vertex Form", formula: "y = a(x - p)² + q", description: "Turning point at (p, q)" },
          { name: "Quadratic Formula", formula: "x = (-b ± √(b² - 4ac))/2a", description: "Find roots/x-intercepts" },
          { name: "Axis of Symmetry", formula: "x = -b/2a", description: "Vertical line through vertex" },
          { name: "Discriminant", formula: "Δ = b² - 4ac", description: "Determines number of roots" },
        ],
        keyPoints: [
          "If a > 0: parabola opens upward (minimum turning point)",
          "If a < 0: parabola opens downward (maximum turning point)",
          "Δ > 0: two distinct real roots",
          "Δ = 0: one repeated real root",
          "Δ < 0: no real roots",
        ],
        reminders: [
          "Always find the turning point when sketching",
          "Mark x and y intercepts on your graph",
          "The larger |a|, the narrower the parabola",
        ],
      },
      examples: [
        {
          problem: "Find the turning point of y = x² - 4x + 3",
          solution: [
            "Step 1: Use x = -b/2a to find x-coordinate",
            "Step 2: x = -(-4)/2(1) = 4/2 = 2",
            "Step 3: Substitute x = 2 into equation",
            "Step 4: y = (2)² - 4(2) + 3 = 4 - 8 + 3 = -1",
            "Step 5: Turning point is (2, -1)",
          ],
        },
        {
          problem: "Solve x² - 5x + 6 = 0",
          solution: [
            "Step 1: Try factorizing: find two numbers that multiply to 6 and add to -5",
            "Step 2: Numbers are -2 and -3",
            "Step 3: x² - 5x + 6 = (x - 2)(x - 3) = 0",
            "Step 4: x = 2 or x = 3",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Does y = -x² + 4 open up or down?", answer: "Down (a = -1 < 0)" },
            { question: "Find the y-intercept of y = 2x² - 3x + 5", answer: "c = 5, point (0, 5)" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "Solve: x² - 9 = 0", answer: "x = ±3" },
            { question: "Find axis of symmetry for y = x² + 6x + 8", answer: "x = -3" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "Find discriminant of 2x² - 4x + 2 = 0", answer: "Δ = 0 (one repeated root)" },
            { question: "Write y = x² - 6x + 5 in vertex form", answer: "y = (x - 3)² - 4" },
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
  },
  "trig-10": {
    "Trigonometric Ratios": {
      objective: "Understand and apply sine, cosine, and tangent ratios in right-angled triangles",
      notes: {
        summary: "Trigonometric ratios relate the angles and sides of right-angled triangles. They are fundamental to solving problems in geometry and real-world applications.",
        formulas: [
          { name: "Sine", formula: "sin θ = opposite/hypotenuse", description: "SOH - Sine is Opposite over Hypotenuse" },
          { name: "Cosine", formula: "cos θ = adjacent/hypotenuse", description: "CAH - Cosine is Adjacent over Hypotenuse" },
          { name: "Tangent", formula: "tan θ = opposite/adjacent", description: "TOA - Tangent is Opposite over Adjacent" },
          { name: "Pythagoras", formula: "a² + b² = c²", description: "c is hypotenuse (longest side)" },
        ],
        keyPoints: [
          "Remember SOH-CAH-TOA to recall the ratios",
          "The hypotenuse is always opposite the 90° angle",
          "Special angles: 30°, 45°, 60° have exact values",
          "sin²θ + cos²θ = 1 (Pythagorean identity)",
        ],
        reminders: [
          "Label sides relative to the angle you're working with",
          "Use inverse functions (sin⁻¹, cos⁻¹, tan⁻¹) to find angles",
          "Check your calculator is in degree mode!",
        ],
      },
      examples: [
        {
          problem: "In a right triangle, the opposite side is 3 and hypotenuse is 5. Find sin θ.",
          solution: [
            "Step 1: Identify: opposite = 3, hypotenuse = 5",
            "Step 2: Use sin θ = opposite/hypotenuse",
            "Step 3: sin θ = 3/5 = 0.6",
          ],
        },
        {
          problem: "Find angle θ if tan θ = 1",
          solution: [
            "Step 1: Use inverse tangent: θ = tan⁻¹(1)",
            "Step 2: θ = 45°",
            "Step 3: This is a special angle where opposite = adjacent",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Find sin 30°", answer: "1/2 or 0.5" },
            { question: "If opp = 4, adj = 3, find tan θ", answer: "4/3" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "Find cos 60°", answer: "1/2 or 0.5" },
            { question: "Hyp = 10, adj = 8, find cos θ", answer: "4/5 or 0.8" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "sin θ = 0.5, find θ (0° ≤ θ ≤ 90°)", answer: "30°" },
            { question: "tan 45° × cos 60°", answer: "1 × 0.5 = 0.5" },
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
  },
  "calculus-12": {
    "Differentiation from First Principles": {
      objective: "Understand the concept of limits and derive the derivative using first principles",
      notes: {
        summary: "Differentiation from first principles uses limits to find the instantaneous rate of change of a function. This fundamental approach helps understand what derivatives truly represent.",
        formulas: [
          { name: "First Principles", formula: "f'(x) = lim(h→0) [f(x+h) - f(x)]/h", description: "Definition of the derivative" },
          { name: "Alternative Form", formula: "f'(a) = lim(x→a) [f(x) - f(a)]/(x-a)", description: "Derivative at a specific point" },
        ],
        keyPoints: [
          "The derivative gives the gradient of the tangent at any point",
          "h represents a small change in x that approaches zero",
          "This method works for any differentiable function",
          "The limit must exist for the derivative to exist",
        ],
        reminders: [
          "Always expand and simplify before taking the limit",
          "Cancel h from numerator and denominator before substituting h = 0",
          "f'(x), dy/dx, and Df(x) all mean the derivative",
        ],
      },
      examples: [
        {
          problem: "Differentiate f(x) = x² from first principles",
          solution: [
            "Step 1: f(x+h) = (x+h)² = x² + 2xh + h²",
            "Step 2: f(x+h) - f(x) = x² + 2xh + h² - x² = 2xh + h²",
            "Step 3: [f(x+h) - f(x)]/h = (2xh + h²)/h = 2x + h",
            "Step 4: lim(h→0)[2x + h] = 2x",
            "Step 5: Therefore f'(x) = 2x",
          ],
        },
        {
          problem: "Differentiate f(x) = 3x + 5 from first principles",
          solution: [
            "Step 1: f(x+h) = 3(x+h) + 5 = 3x + 3h + 5",
            "Step 2: f(x+h) - f(x) = 3x + 3h + 5 - (3x + 5) = 3h",
            "Step 3: [f(x+h) - f(x)]/h = 3h/h = 3",
            "Step 4: lim(h→0)[3] = 3",
            "Step 5: Therefore f'(x) = 3",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Differentiate f(x) = 5x from first principles", answer: "f'(x) = 5" },
            { question: "Differentiate f(x) = 7 from first principles", answer: "f'(x) = 0" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "Differentiate f(x) = x² + 3x from first principles", answer: "f'(x) = 2x + 3" },
            { question: "Differentiate f(x) = 2x² from first principles", answer: "f'(x) = 4x" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "Differentiate f(x) = x³ from first principles", answer: "f'(x) = 3x²" },
            { question: "Differentiate f(x) = 1/x from first principles", answer: "f'(x) = -1/x²" },
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
      objective: "Apply power rule, product rule, quotient rule, and chain rule to differentiate functions",
      notes: {
        summary: "Differentiation rules allow us to find derivatives quickly without using first principles. These rules handle polynomials, products, quotients, and composite functions.",
        formulas: [
          { name: "Power Rule", formula: "d/dx[xⁿ] = nxⁿ⁻¹", description: "Bring power down, reduce by 1" },
          { name: "Constant Multiple", formula: "d/dx[cf(x)] = c·f'(x)", description: "Constants factor out" },
          { name: "Sum Rule", formula: "d/dx[f + g] = f' + g'", description: "Differentiate term by term" },
          { name: "Product Rule", formula: "d/dx[fg] = f'g + fg'", description: "First times derivative of second plus second times derivative of first" },
          { name: "Quotient Rule", formula: "d/dx[f/g] = (f'g - fg')/g²", description: "Low d-high minus high d-low over low squared" },
          { name: "Chain Rule", formula: "d/dx[f(g(x))] = f'(g(x))·g'(x)", description: "Derivative of outer times derivative of inner" },
        ],
        keyPoints: [
          "Power rule works for any real exponent",
          "Product rule: 'First × d(Second) + Second × d(First)'",
          "Quotient rule: 'Lo d-Hi minus Hi d-Lo over Lo Lo'",
          "Chain rule: work from outside in",
        ],
        reminders: [
          "Rewrite roots and fractions as powers before differentiating",
          "√x = x^(1/2), 1/x = x^(-1)",
          "Practice identifying which rule to use",
        ],
      },
      examples: [
        {
          problem: "Differentiate y = 3x⁴ - 2x² + 5x - 7",
          solution: [
            "Step 1: Apply power rule to each term",
            "Step 2: d/dx(3x⁴) = 12x³",
            "Step 3: d/dx(-2x²) = -4x",
            "Step 4: d/dx(5x) = 5",
            "Step 5: d/dx(-7) = 0",
            "Step 6: dy/dx = 12x³ - 4x + 5",
          ],
        },
        {
          problem: "Differentiate y = (2x + 1)³ using chain rule",
          solution: [
            "Step 1: Let u = 2x + 1, so y = u³",
            "Step 2: dy/du = 3u²",
            "Step 3: du/dx = 2",
            "Step 4: dy/dx = dy/du × du/dx = 3u² × 2 = 6u²",
            "Step 5: Substitute back: dy/dx = 6(2x + 1)²",
          ],
        },
      ],
      exercises: [
        {
          level: "Easy",
          questions: [
            { question: "Differentiate: y = x⁵", answer: "dy/dx = 5x⁴" },
            { question: "Differentiate: y = 4x³ - x", answer: "dy/dx = 12x² - 1" },
          ],
        },
        {
          level: "Medium",
          questions: [
            { question: "Differentiate: y = √x", answer: "dy/dx = 1/(2√x)" },
            { question: "Differentiate: y = (x² + 1)⁴", answer: "dy/dx = 8x(x² + 1)³" },
          ],
        },
        {
          level: "Hard",
          questions: [
            { question: "Differentiate: y = x²·sin(x)", answer: "dy/dx = 2x·sin(x) + x²·cos(x)" },
            { question: "Differentiate: y = (3x - 1)/(x + 2)", answer: "dy/dx = 7/(x + 2)²" },
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
                      <div key={stepIdx} className="flex items-start gap-2 p-2 bg-background rounded border border-border">
                        <Badge variant="outline" className="shrink-0">{stepIdx + 1}</Badge>
                        <span className="text-foreground">{step.replace(/^Step \d+: /, '')}</span>
                      </div>
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
                    Exercises
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {level.questions.map((q, qIdx) => {
                      const key = `${levelIdx}-${qIdx}`;
                      return (
                        <div key={qIdx} className="p-4 bg-muted/50 rounded-lg">
                          <p className="font-medium text-foreground mb-3">
                            {qIdx + 1}. {q.question}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleExerciseAnswer(key)}
                          >
                            {showExerciseAnswers[key] ? "Hide" : "Show"} Answer
                          </Button>
                          {showExerciseAnswers[key] && (
                            <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded">
                              <p className="text-green-500 font-medium">Answer: {q.answer}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Quiz Tab */}
          <TabsContent value="quiz" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Play className="h-5 w-5 text-primary" />
                    Quick Quiz
                  </span>
                  {showResults && (
                    <Button variant="outline" size="sm" onClick={resetQuiz}>
                      Retry
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {content.quiz.map((q, idx) => (
                  <div key={idx} className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-medium text-foreground mb-3">
                      {idx + 1}. {q.question}
                    </p>
                    <div className="grid gap-2">
                      {q.options.map((option, optIdx) => {
                        const isSelected = quizAnswers[idx] === optIdx;
                        const isCorrect = q.correct === optIdx;
                        let optionClass = "p-3 rounded border cursor-pointer transition-colors ";
                        
                        if (showResults) {
                          if (isCorrect) {
                            optionClass += "bg-green-500/20 border-green-500 text-green-500";
                          } else if (isSelected && !isCorrect) {
                            optionClass += "bg-red-500/20 border-red-500 text-red-500";
                          } else {
                            optionClass += "bg-background border-border text-muted-foreground";
                          }
                        } else {
                          optionClass += isSelected 
                            ? "bg-primary/20 border-primary text-primary" 
                            : "bg-background border-border hover:border-primary/50";
                        }

                        return (
                          <button
                            key={optIdx}
                            className={optionClass}
                            onClick={() => !showResults && setQuizAnswers({ ...quizAnswers, [idx]: optIdx })}
                            disabled={showResults}
                          >
                            <span className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full border flex items-center justify-center text-sm">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              {option}
                              {showResults && isCorrect && <CheckCircle className="h-4 w-4 ml-auto text-green-500" />}
                              {showResults && isSelected && !isCorrect && <X className="h-4 w-4 ml-auto text-red-500" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {!showResults && (
                  <Button 
                    onClick={handleQuizSubmit} 
                    className="w-full"
                    disabled={Object.keys(quizAnswers).length < content.quiz.length}
                  >
                    Submit Quiz
                  </Button>
                )}

                {showResults && (
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-lg font-bold text-primary">
                      Score: {content.quiz.filter((q, idx) => quizAnswers[idx] === q.correct).length}/{content.quiz.length}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {Math.round((content.quiz.filter((q, idx) => quizAnswers[idx] === q.correct).length / content.quiz.length) * 100)}% correct
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default LessonContent;
