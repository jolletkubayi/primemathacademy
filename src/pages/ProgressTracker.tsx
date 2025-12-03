import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Trophy, 
  Clock, 
  CheckCircle2, 
  Target, 
  TrendingUp,
  BookOpen,
  Calculator,
  Flame,
  Star
} from "lucide-react";

// Mock data - in production this would come from the database
const mockProgressData = {
  overview: {
    problemsSolved: 47,
    totalProblems: 200,
    studyHours: 12.5,
    currentStreak: 5,
    longestStreak: 12,
    averageAccuracy: 78,
  },
  masteryLevels: [
    { topic: "Algebra", level: 4, maxLevel: 5, progress: 80, color: "bg-emerald-500" },
    { topic: "Functions", level: 3, maxLevel: 5, progress: 65, color: "bg-blue-500" },
    { topic: "Trigonometry", level: 2, maxLevel: 5, progress: 45, color: "bg-amber-500" },
    { topic: "Geometry", level: 3, maxLevel: 5, progress: 60, color: "bg-purple-500" },
    { topic: "Calculus", level: 1, maxLevel: 5, progress: 25, color: "bg-rose-500" },
    { topic: "Statistics", level: 2, maxLevel: 5, progress: 40, color: "bg-teal-500" },
  ],
  recentActivity: [
    { date: "Today", topic: "Quadratic Equations", problems: 5, accuracy: 80 },
    { date: "Yesterday", topic: "Trigonometric Identities", problems: 8, accuracy: 75 },
    { date: "2 days ago", topic: "Circle Geometry", problems: 6, accuracy: 83 },
    { date: "3 days ago", topic: "Linear Functions", problems: 10, accuracy: 90 },
    { date: "4 days ago", topic: "Exponents", problems: 7, accuracy: 71 },
  ],
  achievements: [
    { name: "First Steps", description: "Solve your first problem", unlocked: true, icon: Star },
    { name: "Problem Solver", description: "Solve 50 problems", unlocked: false, icon: CheckCircle2, progress: 47, target: 50 },
    { name: "Week Warrior", description: "7-day study streak", unlocked: false, icon: Flame, progress: 5, target: 7 },
    { name: "Algebra Master", description: "Reach Level 5 in Algebra", unlocked: false, icon: Calculator, progress: 4, target: 5 },
    { name: "Bookworm", description: "Study for 20 hours", unlocked: false, icon: BookOpen, progress: 12.5, target: 20 },
    { name: "Perfectionist", description: "Get 100% on 5 quizzes", unlocked: false, icon: Trophy, progress: 2, target: 5 },
  ],
  weeklyGoals: {
    problemsTarget: 30,
    problemsCurrent: 18,
    hoursTarget: 10,
    hoursCurrent: 6.5,
    topicsTarget: 5,
    topicsCurrent: 3,
  }
};

const ProgressTracker = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const { overview, masteryLevels, recentActivity, achievements, weeklyGoals } = mockProgressData;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground">Progress Tracker</h1>
              <p className="text-sm text-muted-foreground">Monitor your learning journey</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="mastery">Mastery</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-card border-border">
                <CardContent className="p-4 text-center">
                  <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-emerald-500" />
                  <p className="text-2xl md:text-3xl font-bold text-foreground">{overview.problemsSolved}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Problems Solved</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-4 text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <p className="text-2xl md:text-3xl font-bold text-foreground">{overview.studyHours}h</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Study Hours</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-4 text-center">
                  <Flame className="h-8 w-8 mx-auto mb-2 text-amber-500" />
                  <p className="text-2xl md:text-3xl font-bold text-foreground">{overview.currentStreak}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Day Streak</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-4 text-center">
                  <Target className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <p className="text-2xl md:text-3xl font-bold text-foreground">{overview.averageAccuracy}%</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Accuracy</p>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Goals */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Weekly Goals
                </CardTitle>
                <CardDescription>Track your progress this week</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Problems</span>
                    <span className="text-sm font-medium">{weeklyGoals.problemsCurrent}/{weeklyGoals.problemsTarget}</span>
                  </div>
                  <Progress value={(weeklyGoals.problemsCurrent / weeklyGoals.problemsTarget) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Study Hours</span>
                    <span className="text-sm font-medium">{weeklyGoals.hoursCurrent}/{weeklyGoals.hoursTarget}h</span>
                  </div>
                  <Progress value={(weeklyGoals.hoursCurrent / weeklyGoals.hoursTarget) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Topics Covered</span>
                    <span className="text-sm font-medium">{weeklyGoals.topicsCurrent}/{weeklyGoals.topicsTarget}</span>
                  </div>
                  <Progress value={(weeklyGoals.topicsCurrent / weeklyGoals.topicsTarget) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div>
                        <p className="font-medium text-sm md:text-base text-foreground">{activity.topic}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">{activity.problems} problems</p>
                        <Badge variant={activity.accuracy >= 80 ? "default" : "secondary"} className="text-xs">
                          {activity.accuracy}% accuracy
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mastery Tab */}
          <TabsContent value="mastery" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Topic Mastery Levels</CardTitle>
                <CardDescription>Your proficiency across different mathematics topics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {masteryLevels.map((topic, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{topic.topic}</span>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {[...Array(topic.maxLevel)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < topic.level ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'}`}
                            />
                          ))}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Level {topic.level}
                        </Badge>
                      </div>
                    </div>
                    <div className="relative">
                      <Progress value={topic.progress} className="h-3" />
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pr-2">
                        {topic.progress}%
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Mastery Legend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    <span className="text-muted-foreground">Level 1: Beginner</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex">
                      {[...Array(2)].map((_, i) => <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />)}
                    </div>
                    <span className="text-muted-foreground">Level 2: Familiar</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex">
                      {[...Array(3)].map((_, i) => <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />)}
                    </div>
                    <span className="text-muted-foreground">Level 3: Proficient</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex">
                      {[...Array(4)].map((_, i) => <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />)}
                    </div>
                    <span className="text-muted-foreground">Level 4: Advanced</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm sm:col-span-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />)}
                    </div>
                    <span className="text-muted-foreground">Level 5: Master</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {achievements.map((achievement, idx) => (
                <Card 
                  key={idx} 
                  className={`bg-card border-border ${!achievement.unlocked ? 'opacity-70' : ''}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full ${achievement.unlocked ? 'bg-amber-500/20' : 'bg-muted'}`}>
                        <achievement.icon className={`h-6 w-6 ${achievement.unlocked ? 'text-amber-500' : 'text-muted-foreground'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{achievement.name}</h3>
                          {achievement.unlocked && (
                            <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30">
                              Unlocked
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                        {!achievement.unlocked && achievement.progress !== undefined && (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                              <span>Progress</span>
                              <span>{achievement.progress}/{achievement.target}</span>
                            </div>
                            <Progress 
                              value={(achievement.progress / (achievement.target || 1)) * 100} 
                              className="h-1.5" 
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ProgressTracker;