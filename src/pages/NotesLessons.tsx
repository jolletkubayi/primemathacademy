import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, BookOpen, Calculator, FileText, Play, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const capsContent = {
  "10": {
    grade: "Grade 10",
    topics: [
      {
        id: "algebra-10",
        name: "Algebra",
        icon: Calculator,
        subtopics: [
          { name: "Algebraic Expressions", lessons: 5, duration: "2 hours" },
          { name: "Exponents", lessons: 4, duration: "1.5 hours" },
          { name: "Number Patterns", lessons: 3, duration: "1 hour" },
          { name: "Equations & Inequalities", lessons: 6, duration: "2.5 hours" },
        ]
      },
      {
        id: "functions-10",
        name: "Functions",
        icon: FileText,
        subtopics: [
          { name: "Linear Functions", lessons: 4, duration: "1.5 hours" },
          { name: "Quadratic Functions", lessons: 5, duration: "2 hours" },
          { name: "Hyperbolic Functions", lessons: 3, duration: "1 hour" },
          { name: "Exponential Functions", lessons: 4, duration: "1.5 hours" },
        ]
      },
      {
        id: "geometry-10",
        name: "Euclidean Geometry",
        icon: BookOpen,
        subtopics: [
          { name: "Properties of Triangles", lessons: 4, duration: "1.5 hours" },
          { name: "Quadrilaterals", lessons: 3, duration: "1 hour" },
          { name: "Circle Geometry Basics", lessons: 5, duration: "2 hours" },
        ]
      },
      {
        id: "trig-10",
        name: "Trigonometry",
        icon: Calculator,
        subtopics: [
          { name: "Trigonometric Ratios", lessons: 4, duration: "1.5 hours" },
          { name: "Solving Triangles", lessons: 5, duration: "2 hours" },
          { name: "Trigonometric Graphs", lessons: 4, duration: "1.5 hours" },
        ]
      },
      {
        id: "stats-10",
        name: "Statistics",
        icon: FileText,
        subtopics: [
          { name: "Measures of Central Tendency", lessons: 3, duration: "1 hour" },
          { name: "Measures of Dispersion", lessons: 3, duration: "1 hour" },
          { name: "Representing Data", lessons: 4, duration: "1.5 hours" },
        ]
      },
    ]
  },
  "11": {
    grade: "Grade 11",
    topics: [
      {
        id: "algebra-11",
        name: "Algebra",
        icon: Calculator,
        subtopics: [
          { name: "Quadratic Equations & Inequalities", lessons: 5, duration: "2 hours" },
          { name: "Nature of Roots", lessons: 3, duration: "1 hour" },
          { name: "Surds", lessons: 4, duration: "1.5 hours" },
          { name: "Simultaneous Equations", lessons: 4, duration: "1.5 hours" },
        ]
      },
      {
        id: "functions-11",
        name: "Functions",
        icon: FileText,
        subtopics: [
          { name: "Inverse Functions", lessons: 4, duration: "1.5 hours" },
          { name: "Logarithmic Functions", lessons: 5, duration: "2 hours" },
          { name: "Graph Transformations", lessons: 4, duration: "1.5 hours" },
        ]
      },
      {
        id: "geometry-11",
        name: "Euclidean Geometry",
        icon: BookOpen,
        subtopics: [
          { name: "Circle Theorems", lessons: 6, duration: "2.5 hours" },
          { name: "Proportionality Theorems", lessons: 4, duration: "1.5 hours" },
          { name: "Similar Triangles", lessons: 4, duration: "1.5 hours" },
        ]
      },
      {
        id: "trig-11",
        name: "Trigonometry",
        icon: Calculator,
        subtopics: [
          { name: "Compound Angles", lessons: 5, duration: "2 hours" },
          { name: "Double Angles", lessons: 4, duration: "1.5 hours" },
          { name: "Trigonometric Equations", lessons: 5, duration: "2 hours" },
          { name: "Sine & Cosine Rules", lessons: 4, duration: "1.5 hours" },
        ]
      },
      {
        id: "analytical-11",
        name: "Analytical Geometry",
        icon: FileText,
        subtopics: [
          { name: "Distance & Midpoint", lessons: 3, duration: "1 hour" },
          { name: "Gradient & Inclination", lessons: 3, duration: "1 hour" },
          { name: "Equation of a Line", lessons: 4, duration: "1.5 hours" },
        ]
      },
      {
        id: "stats-11",
        name: "Statistics",
        icon: FileText,
        subtopics: [
          { name: "Regression & Correlation", lessons: 4, duration: "1.5 hours" },
          { name: "Standard Deviation", lessons: 3, duration: "1 hour" },
        ]
      },
    ]
  },
  "12": {
    grade: "Grade 12",
    topics: [
      {
        id: "patterns-12",
        name: "Patterns & Sequences",
        icon: Calculator,
        subtopics: [
          { name: "Arithmetic Sequences", lessons: 4, duration: "1.5 hours" },
          { name: "Geometric Sequences", lessons: 4, duration: "1.5 hours" },
          { name: "Sigma Notation", lessons: 3, duration: "1 hour" },
          { name: "Convergent Series", lessons: 3, duration: "1 hour" },
        ]
      },
      {
        id: "functions-12",
        name: "Functions",
        icon: FileText,
        subtopics: [
          { name: "Polynomial Functions", lessons: 4, duration: "1.5 hours" },
          { name: "Exponential & Log Applications", lessons: 5, duration: "2 hours" },
          { name: "Function Compositions", lessons: 3, duration: "1 hour" },
        ]
      },
      {
        id: "calculus-12",
        name: "Calculus",
        icon: Calculator,
        subtopics: [
          { name: "Limits & Continuity", lessons: 4, duration: "1.5 hours" },
          { name: "Differentiation from First Principles", lessons: 3, duration: "1 hour" },
          { name: "Rules of Differentiation", lessons: 5, duration: "2 hours" },
          { name: "Applications of Derivatives", lessons: 6, duration: "2.5 hours" },
          { name: "Cubic Functions", lessons: 4, duration: "1.5 hours" },
        ]
      },
      {
        id: "geometry-12",
        name: "Euclidean Geometry",
        icon: BookOpen,
        subtopics: [
          { name: "Circle Geometry Proofs", lessons: 5, duration: "2 hours" },
          { name: "Proportionality & Similarity", lessons: 4, duration: "1.5 hours" },
        ]
      },
      {
        id: "trig-12",
        name: "Trigonometry",
        icon: Calculator,
        subtopics: [
          { name: "Advanced Identities", lessons: 4, duration: "1.5 hours" },
          { name: "3D Trigonometry", lessons: 4, duration: "1.5 hours" },
          { name: "Mixed Trigonometric Problems", lessons: 5, duration: "2 hours" },
        ]
      },
      {
        id: "stats-12",
        name: "Statistics & Probability",
        icon: FileText,
        subtopics: [
          { name: "Counting Principles", lessons: 4, duration: "1.5 hours" },
          { name: "Probability", lessons: 5, duration: "2 hours" },
        ]
      },
    ]
  }
};

const NotesLessons = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedGrade, setSelectedGrade] = useState("10");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }

    const { data: subData } = await supabase
      .from("subscriptions")
      .select("status")
      .eq("user_id", user.id)
      .maybeSingle();

    setIsSubscribed(subData?.status === "active");
    setLoading(false);
  };

  const handleStartLesson = (topicName: string, subtopicName: string) => {
    if (!isSubscribed) {
      toast({
        title: "Subscription Required",
        description: "Please activate your subscription to access lessons.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Coming Soon",
      description: `${subtopicName} lessons will be available soon!`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const currentContent = capsContent[selectedGrade as keyof typeof capsContent];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground">Notes & Lessons</h1>
                <p className="text-sm text-muted-foreground">CAPS-aligned Mathematics curriculum</p>
              </div>
            </div>
            {!isSubscribed && (
              <Badge variant="secondary" className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                <Lock className="h-3 w-3 mr-1" />
                Limited Access
              </Badge>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Grade Selection */}
        <Tabs value={selectedGrade} onValueChange={setSelectedGrade} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-6 md:mb-8">
            <TabsTrigger value="10">Grade 10</TabsTrigger>
            <TabsTrigger value="11">Grade 11</TabsTrigger>
            <TabsTrigger value="12">Grade 12</TabsTrigger>
          </TabsList>

          {["10", "11", "12"].map((grade) => (
            <TabsContent key={grade} value={grade} className="space-y-4 md:space-y-6">
              <div className="grid gap-4 md:gap-6">
                {capsContent[grade as keyof typeof capsContent].topics.map((topic) => (
                  <Card key={topic.id} className="bg-card border-border">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <topic.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg md:text-xl">{topic.name}</CardTitle>
                          <CardDescription>
                            {topic.subtopics.length} subtopics • {topic.subtopics.reduce((acc, s) => acc + s.lessons, 0)} lessons
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {topic.subtopics.map((subtopic, idx) => (
                          <AccordionItem key={idx} value={`${topic.id}-${idx}`} className="border-border/50">
                            <AccordionTrigger className="hover:no-underline py-3">
                              <div className="flex items-center justify-between w-full pr-4">
                                <span className="text-sm md:text-base text-foreground">{subtopic.name}</span>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs hidden sm:inline-flex">
                                    {subtopic.lessons} lessons
                                  </Badge>
                                  <Badge variant="secondary" className="text-xs">
                                    {subtopic.duration}
                                  </Badge>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleStartLesson(topic.name, subtopic.name)}
                                  className="flex-1"
                                >
                                  <Play className="h-4 w-4 mr-2" />
                                  Start Learning
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleStartLesson(topic.name, subtopic.name)}
                                  className="flex-1"
                                >
                                  <FileText className="h-4 w-4 mr-2" />
                                  View Notes
                                </Button>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default NotesLessons;