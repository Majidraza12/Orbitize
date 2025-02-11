import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  Kanban,
  Users,
  Clock,
  BarChart3,
  ArrowRight,
  Calendar,
  MessageSquare,
  GitBranch,
} from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Streamline Your
              <span className="text-primary block">Project Workflow</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-[600px]">
              A powerful project management platform that helps teams
              collaborate, track progress, and deliver results with confidence.
            </p>
            <div className="flex gap-4">
              <Link href="/auth/signup">
                <Button size="lg">
                  Start Managing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border border-border"
            />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Everything You Need for Successful Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Calendar className="h-10 w-10" />}
              title="Project Planning"
              description="Create detailed project plans, set milestones, and manage resources effectively."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10" />}
              title="Team Collaboration"
              description="Work seamlessly with your team, assign tasks, and track progress in real-time."
            />
            <FeatureCard
              icon={<GitBranch className="h-10 w-10" />}
              title="Version Control"
              description="Track changes, manage versions, and maintain a clear history of project evolution."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard number="10K+" label="Active Projects" />
            <StatCard number="50K+" label="Team Members" />
            <StatCard number="99%" label="Task Completion" />
          </div>
        </div>
      </section> */}

      {/* Dashboard Preview */}
      <section className="py-16 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Powerful and Intuitive Interface
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Our dashboard combines powerful features with a clean, modern
            interface that makes project management effortless.
          </p>
          <div className="rounded-lg overflow-hidden shadow-2xl border border-border">
            <img
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1200"
              alt="Dashboard Interface"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Project Management?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of teams who are delivering better projects faster
            with our platform.
          </p>
          <Button size="lg" className="px-8">
            Get Started Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 Project Management Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
      <div className="text-primary">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <Card className="p-6 text-center">
      <p className="text-4xl font-bold text-primary mb-2">{number}</p>
      <p className="text-muted-foreground">{label}</p>
    </Card>
  );
}

export default App;
