"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { ArrowLeft, Building2, Calendar, DollarSign, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/app/lib/utils";

interface ProjectDetail {
    id: string;
    title: string;
    description: string;
    budget: number;
    createdAt: string;
    business: {
        name: string;
        avatarUrl?: string;
    };
}

export default function ProjectDetailsPage() {
    const { id } = useParams();
    const { user } = useAuth();
    const router = useRouter();
    const [project, setProject] = useState<ProjectDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        async function fetchProject() {
            if (!id) return;
            try {
                const res = await fetch(`/api/projects/${id}`);
                if (res.ok) setProject(await res.json());
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        fetchProject();
    }, [id]);

    async function handleSubmitProposal(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const proposalData = {
            projectId: id,
            influencerId: user?.id,
            price: parseFloat(formData.get("price") as string),
            message: formData.get("message"),
        };

        try {
            const res = await fetch("/api/proposals", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(proposalData)
            });

            if (res.ok) {
                // Redirect to success or dashboard
                router.push("/dashboard/influencer/proposals");
            }
        } catch (e) {
            console.error("Failed to submit proposal", e);
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;
    if (!project) return <div className="p-8 text-center text-muted-foreground">Project not found.</div>;

    return (
        <div className="max-w-4xl mx-auto py-12 px-6 animate-fade-in-up">
            <Link href="/market" className="flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
                <ArrowLeft size={16} className="mr-2" /> Back to Market
            </Link>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Project Details */}
                <div className="md:col-span-2 space-y-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                {project.business.name[0]}
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Posted by</p>
                                <p className="font-semibold">{project.business.name}</p>
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(project.createdAt).toLocaleDateString()}</span>
                            <span className="flex items-center gap-1"><Building2 size={14} /> Remote</span>
                        </div>
                    </div>

                    <div className="prose dark:prose-invert max-w-none">
                        <h3 className="text-lg font-semibold mb-2">Project Description</h3>
                        <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                            {project.description}
                        </p>
                    </div>
                </div>

                {/* Sidebar / Appeal Action */}
                <div className="space-y-6">
                    <div className="p-6 rounded-xl border bg-card shadow-sm sticky top-24">
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Target Budget</h3>
                        <div className="flex items-center text-3xl font-bold text-emerald-600 mb-6">
                            <DollarSign size={24} strokeWidth={3} />
                            {project.budget.toLocaleString()}
                        </div>

                        {user?.role === "INFLUENCER" ? (
                            <form onSubmit={handleSubmitProposal} className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Your Quote ($)</label>
                                    <input
                                        name="price"
                                        type="number"
                                        required
                                        placeholder="Enter amount"
                                        defaultValue={project.budget}
                                        className="w-full px-3 py-2 rounded-lg border bg-background"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Cover Message</label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={3}
                                        placeholder="Why are you the best fit?"
                                        className="w-full px-3 py-2 rounded-lg border bg-background resize-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity flex justify-center items-center"
                                >
                                    {submitting ? <Loader2 className="animate-spin" /> : "Submit Proposal"}
                                </button>
                            </form>
                        ) : (
                            <div className="p-4 bg-muted/50 rounded-lg text-center text-sm text-muted-foreground">
                                Log in as an Influencer to submit a proposal.
                            </div>
                        )}

                        <div className="mt-6 pt-6 border-t space-y-3">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <CheckCircle2 className="text-emerald-500 w-4 h-4" />
                                <span>Payment verified</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <CheckCircle2 className="text-emerald-500 w-4 h-4" />
                                <span>Funds held in Escrow</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
