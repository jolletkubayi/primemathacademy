import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NavLink } from "@/components/NavLink";
import { BookOpen, Brain, Target, Shield, Zap, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/hero-math.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              PrimeMath Academy
            </span>
          </div>
          <div className="flex items-center gap-4">
            <NavLink to="/auth">
              <Button variant="ghost">Sign In</Button>
            </NavLink>
            <NavLink to="/auth">
              <Button className="bg-gradient-hero hover:opacity-90 transition-opacity">
                Get Started
              </Button>
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-block">
                <span className="px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-semibold">
                  🇿🇦 CAPS Curriculum Aligned
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Master Maths with
                <span className="block bg-gradient-hero bg-clip-text text-transparent">
                  AI-Powered Tutoring
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Get instant step-by-step solutions, personalized learning paths, and expert guidance for Grades 10-12. 
                Your path to maths excellence starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <NavLink to="/auth">
                  <Button size="lg" className="bg-gradient-hero hover:opacity-90 transition-opacity text-lg px-8">
                    Start Learning Free
                  </Button>
                </NavLink>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-muted-foreground">Problems Solved</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary">95%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">24/7</div>
                  <div className="text-sm text-muted-foreground">AI Support</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-hero opacity-20 blur-3xl rounded-full"></div>
              <img 
                src={heroImage} 
                alt="AI Maths Tutoring Platform" 
                className="relative rounded-2xl shadow-elevated w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Excel</h2>
            <p className="text-xl text-muted-foreground">Comprehensive tools designed for South African students</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Instant Solutions",
                description: "Upload any maths problem and get step-by-step solutions within seconds",
                color: "text-primary"
              },
              {
                icon: <BookOpen className="h-8 w-8" />,
                title: "Smart Notes",
                description: "Auto-generated notes aligned with CAPS curriculum for all topics",
                color: "text-secondary"
              },
              {
                icon: <Target className="h-8 w-8" />,
                title: "Personalized Paths",
                description: "Custom learning routes based on your grade and goals",
                color: "text-accent"
              },
              {
                icon: <Brain className="h-8 w-8" />,
                title: "AI Chatbot",
                description: "24/7 friendly tutor that adapts to your learning style",
                color: "text-primary"
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Exam Mode",
                description: "Practice with hints-only mode to prepare for real exams",
                color: "text-secondary"
              },
              {
                icon: <CheckCircle2 className="h-8 w-8" />,
                title: "Progress Tracking",
                description: "Monitor your improvement and identify weak areas",
                color: "text-accent"
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-elevated transition-shadow bg-gradient-card border-border/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`${feature.color} mb-4`}>{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="bg-gradient-card rounded-2xl p-12 border border-border/50 shadow-elevated">
            <div className="text-center max-w-3xl mx-auto">
              <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Secure & Subscription Protected</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Your account is protected with enterprise-grade security. One device login ensures 
                your subscription stays personal and secure.
              </p>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">One Device Policy</h4>
                    <p className="text-sm text-muted-foreground">
                      Only one device active at a time for your security
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Subscription Verification</h4>
                    <p className="text-sm text-muted-foreground">
                      Access restricted to active subscribers only
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Encrypted Data</h4>
                    <p className="text-sm text-muted-foreground">
                      All your learning data is encrypted and private
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Instant Access</h4>
                    <p className="text-sm text-muted-foreground">
                      Start learning immediately after signup
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="bg-gradient-hero rounded-2xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Maths Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of South African students achieving their academic goals
            </p>
            <NavLink to="/auth">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 text-lg px-8"
              >
                Start Your Free Trial
              </Button>
            </NavLink>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="container mx-auto text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-6 w-6 text-primary" />
            <span className="font-semibold text-foreground">PrimeMath Academy</span>
          </div>
          <p>© 2024 PrimeMath Academy. Empowering South African students.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;