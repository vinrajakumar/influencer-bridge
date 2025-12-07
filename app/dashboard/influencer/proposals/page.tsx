"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { ArrowLeft, Clock, CheckCircle2, XCircle, DollarSign, ExternalLink } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface Proposal {
    id: string;
    price: number;
    status: string; // PENDING, ACCEPTED, REJECTED
    createdAt: string;
    project: {
        id: string;
        title: string;
        business: {
            name: string;
        }
    }
}

export default function InfluencerProposalsPage() {
    const { user } = useAuth();
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        async function fetchProposals() {
            try {
                const res = await fetch(`/api/proposals?influencerId=${user?.id}`);
                if (res.ok) {
                    setProposals(await res.json());
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        fetchProposals();
    }, [user]);

    if (loading) return <div className="p-8 text-center text-muted-foreground">Loading...</div>;

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">My Proposals</h1>
                    <p className="text-muted-foreground">Track the status of your quotes</p>
                </div>
            </div>

            <div className="grid gap-4">
                {proposals.length === 0 ? (
                    <div className="p-12 text-center border rounded-xl bg-card">
                        <p className="text-muted-foreground mb-4">You haven't submitted any proposals yet.</p>
                        <Link href="/market">
                            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">Browse Projects</button>
                        </Link>
                    </div>
                ) : (
                    proposals.map(proposal => (
                        <div key={proposal.id} className="p-6 border rounded-xl bg-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    {proposal.project.title}
                                    <Link href={`/market/${proposal.project.id}`}>
                                        <ExternalLink size={14} className="text-muted-foreground hover:text-primary" />
                                    </Link>
                                </h3>
                                <p className="text-sm text-muted-foreground">{proposal.project.business.name}</p>
                                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Clock size={14} /> {new Date(proposal.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <p className="text-sm text-muted-foreground">Your Quote</p>
                                    <p className="font-bold text-lg">${proposal.price.toLocaleString()}</p>
                                </div>
                                <StatusBadge status={proposal.status} />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    if (status === "ACCEPTED") {
        return (
            <div className="px-3 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-sm font-medium flex items-center gap-2">
                <CheckCircle2 size={14} /> Accepted
            </div>
        );
    }
    if (status === "REJECTED") {
        return (
            <div className="px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full text-sm font-medium flex items-center gap-2">
                <XCircle size={14} /> Rejected
            </div>
        );
    }
    return (
        <div className="px-3 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full text-sm font-medium flex items-center gap-2">
            <Clock size={14} /> Pending
        </div>
    );
}
