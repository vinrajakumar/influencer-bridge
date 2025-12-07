"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, DollarSign, Mail, Star, XCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/app/lib/utils";

interface Proposal {
    id: string;
    price: number;
    message: string;
    status: string;
    influencer: {
        name: string;
        email: string;
        avatarUrl?: string;
        influencerProfile?: {
            instagram: string;
            followers: number;
        }
    }
}

interface ProjectData {
    id: string;
    title: string;
    budget: number;
    status: string;
}

export default function ProjectManagePage() {
    const { id } = useParams();
    const [project, setProject] = useState<ProjectData | null>(null);
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            if (!id) return;
            try {
                // Fetch project details
                const pRes = await fetch(`/api/projects/${id}`);
                const pData = await pRes.json();
                setProject(pData);

                // Fetch proposals
                const propRes = await fetch(`/api/proposals?projectId=${id}`);
                const propData = await propRes.json();
                setProposals(propData);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    const handleAcceptProposal = async (proposalId: string) => {
        // Here we would implement the API call to update proposal status AND create Escrow
        // For visual demo:
        alert(`Accepted proposal ${proposalId}. Redirecting to Escrow deposit...`);
        // In real app: router.push(`/escrow/deposit/${proposalId}`);
    };

    if (loading) return <div className="p-8">Loading...</div>;
    if (!project) return <div className="p-8">Project not found</div>;

    return (
        <div className="space-y-8 animate-fade-in-up">
            <Link href="/dashboard/business/projects" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft size={16} className="mr-2" /> Back to My Projects
            </Link>

            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
                    <div className="flex gap-4 text-muted-foreground">
                        <span>Budget: ${project.budget.toLocaleString()}</span>
                        <span>•</span>
                        <span className={cn(
                            "font-medium",
                            project.status === "OPEN" ? "text-blue-500" : "text-emerald-500"
                        )}>{project.status}</span>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-semibold">Proposals ({proposals.length})</h2>

                {proposals.length === 0 ? (
                    <div className="p-12 border rounded-xl bg-card text-center text-muted-foreground">
                        No proposals received yet. Check back later!
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {proposals.map((proposal) => (
                            <div key={proposal.id} className="group p-6 border rounded-xl bg-card hover:border-primary/30 transition-all flex flex-col md:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-bold text-lg">
                                            {proposal.influencer.name[0]}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{proposal.influencer.name}</h3>
                                            <p className="text-xs text-muted-foreground">
                                                {proposal.influencer.influencerProfile?.instagram || "Social Creator"} • {proposal.influencer.influencerProfile?.followers.toLocaleString() || 0} Followers
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 p-3 bg-muted/30 rounded-lg">
                                        "{proposal.message}"
                                    </p>
                                </div>

                                <div className="md:w-48 flex flex-col justify-between border-l pl-6">
                                    <div>
                                        <p className="text-sm text-secondary-foreground font-medium">Quote Amount</p>
                                        <div className="flex items-center text-2xl font-bold text-emerald-600">
                                            <DollarSign size={20} strokeWidth={3} />
                                            {proposal.price.toLocaleString()}
                                        </div>
                                    </div>

                                    <div className="mt-4 space-y-2">
                                        <button
                                            onClick={() => handleAcceptProposal(proposal.id)}
                                            className="w-full py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:shadow-md transition-all flex items-center justify-center gap-2"
                                        >
                                            <CheckCircle2 size={16} /> Accept
                                        </button>
                                        <button className="w-full py-2 border bg-background text-muted-foreground text-sm font-medium rounded-lg hover:bg-muted transition-colors flex items-center justify-center gap-2">
                                            <Mail size={16} /> Message
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
