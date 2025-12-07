"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { ArrowRight, FileText, Loader2, Users } from "lucide-react";

interface Project {
    id: string;
    title: string;
    status: string;
    createdAt: string;
    _count: {
        proposals: number
    }
}

export default function BusinessProjectsPage() {
    const { user } = useAuth();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, we'd fetch projects belonging specifically to this user
        // For MVP, we'll fetch all and filter client side or mock endpoint
        async function fetchProjects() {
            try {
                // We need a specific endpoint or params for "my projects", 
                // but reusing the general one and filtering for now for simplicity of the mock
                const res = await fetch("/api/projects?includeCount=true");
                if (res.ok) {
                    const data = await res.json();
                    // Filter by current user ID (mock logic)
                    const myProjects = data.filter((p: any) => p.businessId === user?.id);
                    setProjects(myProjects);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        if (user) fetchProjects();
    }, [user]);

    if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">My Projects</h1>
                <Link href="/requests/create">
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium">Create New</button>
                </Link>
            </div>

            <div className="space-y-4">
                {projects.length === 0 ? (
                    <div className="p-12 text-center border rounded-xl bg-card text-muted-foreground">
                        You haven't posted any campaigns yet.
                    </div>
                ) : (
                    projects.map(project => (
                        <div key={project.id} className="p-6 border rounded-xl bg-card flex items-center justify-between hover:border-primary/50 transition-colors">
                            <div>
                                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                                <div className="flex gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1"><FileText size={14} /> {project.status}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1"><Users size={14} /> {project._count?.proposals || 0} Proposals</span>
                                    {/* Note: Prisma count relation not in initial simple fetch, adding real fetch logic later if needed */}
                                </div>
                            </div>
                            <Link href={`/dashboard/business/projects/${project.id}`}>
                                <button className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors flex items-center text-sm font-medium">
                                    Manage <ArrowRight size={16} className="ml-2" />
                                </button>
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
