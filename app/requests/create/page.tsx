"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/app/lib/utils";

export default function CreateRequestPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get("title"),
            description: formData.get("description"),
            budget: formData.get("budget"),
            businessId: user?.id,
        };

        try {
            const res = await fetch("/api/projects", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) throw new Error("Failed to create request");

            router.push("/dashboard/business");
            router.refresh();
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto py-12 px-4 animate-fade-in-up">
            <Link href="/dashboard/business" className="flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
                <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
            </Link>

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">New Campaign Request</h1>
                    <p className="text-muted-foreground">Describe your campaign to attract top influencers.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-xl border shadow-sm">
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">Campaign Title</label>
                        <input
                            name="title"
                            id="title"
                            required
                            placeholder="e.g. Summer Awareness Campaign"
                            className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">Description & Requirements</label>
                        <textarea
                            name="description"
                            id="description"
                            required
                            rows={5}
                            placeholder="Describe the deliverables, timeline, and brand guidelines..."
                            className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="budget" className="text-sm font-medium">Budget ($)</label>
                        <input
                            type="number"
                            name="budget"
                            id="budget"
                            required
                            min="0"
                            placeholder="1000"
                            className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        />
                    </div>

                    {error && <p className="text-destructive text-sm">{error}</p>}

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className={cn(
                                "px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:shadow-lg transition-all flex items-center",
                                loading && "opacity-70 cursor-not-allowed"
                            )}
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {loading ? "Publishing..." : "Publish Request"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
