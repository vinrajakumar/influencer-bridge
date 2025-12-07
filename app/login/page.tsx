"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { Users, Briefcase, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";

export default function LoginPage() {
    const { login, isLoading } = useAuth();
    const router = useRouter();

    const handleLogin = async (role: "BUSINESS" | "INFLUENCER") => {
        await login(role);
        router.push(role === "BUSINESS" ? "/dashboard/business" : "/dashboard/influencer");
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background via-muted/30 to-muted">

            <div className="text-center mb-12 animate-fade-in-up">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                    Welcome to <span className="text-primary">Influencer Bridge</span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-lg mx-auto">
                    The premium marketplace connecting visionary businesses with influential content creators.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                {/* Business Card */}
                <button
                    onClick={() => handleLogin("BUSINESS")}
                    disabled={isLoading}
                    className={cn(
                        "group relative flex flex-col items-center p-8 rounded-2xl border bg-card hover:border-primary/50 hover:shadow-2xl transition-all duration-300 text-left",
                        "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                    <div className="p-4 rounded-full bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform">
                        <Briefcase size={32} />
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">I'm a Business</h2>
                    <p className="text-muted-foreground mb-6 text-center">
                        Find the perfect influencer to promote your brand and manage campaigns.
                    </p>
                    <div className="flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform">
                        Get Started <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                </button>

                {/* Influencer Card */}
                <button
                    onClick={() => handleLogin("INFLUENCER")}
                    disabled={isLoading}
                    className={cn(
                        "group relative flex flex-col items-center p-8 rounded-2xl border bg-card hover:border-violet-500/50 hover:shadow-2xl transition-all duration-300 text-left",
                        "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                    <div className="p-4 rounded-full bg-violet-100 text-violet-600 mb-6 group-hover:scale-110 transition-transform">
                        <Users size={32} />
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">I'm an Influencer</h2>
                    <p className="text-muted-foreground mb-6 text-center">
                        Find sponsorship opportunities and monetize your audience.
                    </p>
                    <div className="flex items-center text-violet-600 font-medium group-hover:translate-x-1 transition-transform">
                        Join Platform <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                </button>
            </div>

            {isLoading && (
                <div className="mt-8 text-muted-foreground animate-pulse">
                    Signing in...
                </div>
            )}
        </main>
    );
}
