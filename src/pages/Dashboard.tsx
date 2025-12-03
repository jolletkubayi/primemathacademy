import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, LogOut, MessageSquare, BookOpen, TrendingUp, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { NavLink } from "@/components/NavLink";
import AdminPanel from "@/components/AdminPanel";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session) {
          navigate("/auth");
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate("/auth");
      } else {
        // Defer Supabase calls with setTimeout
        setTimeout(() => {
          fetchUserData(session.user.id);
        }, 0);
      }
    });

    return () => authSubscription.unsubscribe();
  }, [navigate]);

  const fetchUserData = async (userId: string) => {
    try {
      // Fetch subscription
      const { data: subData } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();
      
      setSubscription(subData);

      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();
      
      setProfile(profileData);

      // Check if user is admin
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();
      
      setIsAdmin(!!roleData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              PrimeMath Academy
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold">{profile?.full_name || user?.email}</p>
              <p className="text-xs text-muted-foreground">
                {subscription?.status === "active" ? "Active Subscription" : "Inactive"}
              </p>
            </div>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {profile?.full_name?.split(" ")[0] || "Student"}!</h1>
          <p className="text-muted-foreground">Ready to master some maths today?</p>
        </div>

        {/* Subscription Status Card */}
        {subscription?.status !== "active" && (
          <Card className="p-6 mb-8 bg-accent/10 border-accent">
            <div className="flex items-start gap-4">
              <Shield className="h-8 w-8 text-accent flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Subscription Required</h3>
                <p className="text-muted-foreground mb-4">
                  To access AI tutoring features, you need an active subscription. 
                  Upgrade now to unlock unlimited maths support!
                </p>
                <Button className="bg-accent hover:bg-accent/90">
                  Activate Subscription
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Main Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
          <NavLink to="/tutor" className="block">
            <Card className="p-4 sm:p-6 hover:shadow-elevated transition-all cursor-pointer group h-full">
              <MessageSquare className="h-10 w-10 sm:h-12 sm:w-12 text-primary mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">AI Tutor Chat</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Ask questions, upload problems, and get instant solutions
              </p>
            </Card>
          </NavLink>

          <Card 
            className="p-4 sm:p-6 hover:shadow-elevated transition-all cursor-pointer group h-full"
            onClick={() => toast({ title: "Coming Soon", description: "Notes & Lessons feature is under development." })}
          >
            <BookOpen className="h-10 w-10 sm:h-12 sm:w-12 text-secondary mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Notes & Lessons</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Access curriculum-aligned notes and learning materials
            </p>
            <span className="inline-block mt-2 text-xs bg-secondary/20 text-secondary px-2 py-1 rounded">Coming Soon</span>
          </Card>

          <Card 
            className="p-4 sm:p-6 hover:shadow-elevated transition-all cursor-pointer group h-full sm:col-span-2 lg:col-span-1"
            onClick={() => toast({ title: "Coming Soon", description: "Progress Tracker feature is under development." })}
          >
            <TrendingUp className="h-10 w-10 sm:h-12 sm:w-12 text-accent mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Progress Tracker</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Monitor your learning journey and achievements
            </p>
            <span className="inline-block mt-2 text-xs bg-accent/20 text-accent px-2 py-1 rounded">Coming Soon</span>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          <Card className="p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">0</div>
            <p className="text-xs sm:text-sm text-muted-foreground">Problems Solved</p>
          </Card>
          <Card className="p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-secondary mb-1 sm:mb-2">0</div>
            <p className="text-xs sm:text-sm text-muted-foreground">Study Hours</p>
          </Card>
          <Card className="p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-accent mb-1 sm:mb-2">0</div>
            <p className="text-xs sm:text-sm text-muted-foreground">Topics Mastered</p>
          </Card>
          <Card className="p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">
              {profile?.grade || "-"}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">Current Grade</p>
          </Card>
        </div>

        {/* Admin Panel */}
        {isAdmin && (
          <div className="mt-12 pt-12 border-t border-border">
            <AdminPanel />
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;