import { Card } from "@/components/ui/card";
import { GraduationCap, Award, Target, Lightbulb } from "lucide-react";

const TeamSection = () => {
  const qualifications = [
    "PhD in Mathematics – University of the Witwatersrand (WITS)",
    "Master of Science (MSc) Mathematics – WITS",
    "Bachelor of Science Honours (BSc Hons) Mathematical Sciences – WITS",
    "Bachelor of Science (BSc) Mathematics – WITS",
  ];

  const expertise = [
    "Pure & Applied Mathematics",
    "High-school advanced Mathematics (Grade 10–12 CAPS)",
    "Curriculum design, exam preparation & study-route planning",
    "AI-assisted learning and personalised tutoring",
    "Mathematical problem-solving coaching",
  ];

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-xl text-muted-foreground">
            Expert guidance from South Africa's leading mathematics educators
          </p>
        </div>

        <Card className="max-w-4xl mx-auto overflow-hidden bg-gradient-card border-border/50">
          <div className="md:flex">
            {/* Photo Placeholder */}
            <div className="md:w-1/3 bg-gradient-hero p-8 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-32 h-32 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <GraduationCap className="h-16 w-16" />
                </div>
                <h3 className="text-xl font-bold">Dr. Jollet Kubayi</h3>
                <p className="text-sm opacity-90">PhD Mathematics</p>
              </div>
            </div>

            {/* Content */}
            <div className="md:w-2/3 p-8">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold text-lg">Founder & Lead Instructor</h4>
                </div>
                <p className="text-muted-foreground">
                  Dr. Jollet Kubayi is a South African mathematician, educator, and academic mentor 
                  dedicated to transforming how learners understand Mathematics from Grade 10 to Grade 12. 
                  With more than a decade of experience in university-level mathematics, high-school tutoring, 
                  and curriculum development, he brings deep expertise and a passion for simplifying even 
                  the most complex concepts.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="h-5 w-5 text-secondary" />
                    <h5 className="font-semibold">Academic Qualifications</h5>
                  </div>
                  <ul className="space-y-2">
                    {qualifications.map((qual, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-secondary mt-1">•</span>
                        {qual}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="h-5 w-5 text-accent" />
                    <h5 className="font-semibold">Expertise</h5>
                  </div>
                  <ul className="space-y-2">
                    {expertise.map((exp, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        {exp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold mb-1">Our Mission</h5>
                    <p className="text-sm text-muted-foreground">
                      To help every South African learner build confidence, mastery, and excellence 
                      in Mathematics using modern teaching methods and AI-powered personalised support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default TeamSection;