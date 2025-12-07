import Link from "next/link";
import { ArrowRight, CheckCircle2, TrendingUp, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-6 h-16 flex items-center justify-between border-b glass sticky top-0 z-50">
        <div className="font-bold text-xl tracking-tight flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-primary" />
          InfluencerBridge
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
        </nav>
        <div className="flex gap-4">
          <Link href="/login">
            <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
              Sign In
            </button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 px-6 text-center animate-fade-in-up">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 mb-6">
            New: Escrow Payments
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto">
            Connect Business with <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
              World Class Influencers
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            The most secure way to request quotes, manage campaigns, and pay influencers.
            Automated workflows, real-time analytics, and guaranteed safety.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/login">
              <button className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center">
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-20 px-6 bg-secondary/30">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<TrendingUp className="w-10 h-10 text-blue-500" />}
              title="Request Quotes"
              description="Business owners can easily request quotes for social media marketing campaigns from top influencers."
            />
            <FeatureCard
              icon={<CheckCircle2 className="w-10 h-10 text-green-500" />}
              title="Workflows"
              description="Streamlined workflow to analyze quotes, select influencers, and manage work orders."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-10 h-10 text-purple-500" />}
              title="Secure Escrow"
              description="Payments are held in escrow until the work is completed and approved by the business."
            />
          </div>
        </section>
      </main>

      <footer className="py-8 px-6 border-t text-center text-muted-foreground text-sm">
        © 2025 InfluencerBridge. All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-card border hover:shadow-xl transition-shadow">
      <div className="mb-4 bg-background w-16 h-16 rounded-xl flex items-center justify-center border shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
