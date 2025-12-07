"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, DollarSign, Calendar, Building2, Search } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface Project {
    id: string;
    title: string;
    description: string;
    budget: number;
    createdAt: string;
    business: {
        name: string;
    };
}

export default function MarketplacePage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const res = await fetch("/api/projects");
                if (res.ok) {
                    const data = await res.json();
                    setProjects(data);
                }
            } catch (error) {
                console.error("Failed to fetch projects", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-muted/20">

            {/* Search Header */}
            <header className="bg-background border-b py-8 px-6">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl font-bold tracking-tight mb-4">Find Opportunities</h1>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search campaigns by keyword, brand, or category..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl border bg-secondary/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                        />
                    </div>
                </div>
            </header>

            <main className="flex-1 p-6">
                <div className="max-w-5xl mx-auto space-y-4">
                    {loading ? (
                        <div className="text-center py-12 text-muted-foreground animate-pulse">Loading opportunities...</div>
                    ) : projects.length === 0 ? (
                        <div className="text-center py-12 bg-card rounded-xl border">
                            <p className="text-muted-foreground text-lg">No active campaigns found right now.</p>
                        </div>
                    ) : (
                        projects.map((project, i) => (
                            <div
                                key={project.id}
                                className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-card border rounded-xl hover:shadow-lg hover:border-primary/30 transition-all animate-fade-in-up"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                <div className="mb-4 md:mb-0 space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Building2 size={14} />
                                        <span>{project.business.name}</span>
                                        <span>•</span>
                                        <Calendar size={14} />
                                        <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">{project.title}</h2>
                                    <p className="text-muted-foreground line-clamp-2 max-w-2xl text-sm">{project.description}</p>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="text-sm text-muted-foreground">Budget</p>
                                        <div className="flex items-center font-bold text-lg text-emerald-600">
                                            <DollarSign size={16} strokeWidth={3} />
                                            {project.budget.toLocaleString()}
                                        </div>
                                    </div>
                                    <Link href={`/market/${project.id}`}>
                                        <button className="px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center">
                                            View Details <ArrowRight size={16} className="ml-2" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
