"use client";

import Link from "next/link";
import { Plus, TrendingUp, Users, DollarSign } from "lucide-react";

export default function BusinessDashboard() {
    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Manage your campaigns and influence.</p>
                </div>
                <Link href="/requests/create">
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg transition-all">
                        <Plus size={18} />
                        Post New Request
                    </button>
                </Link>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-3">
                <StatCard title="Active Campaigns" value="3" icon={<TrendingUp className="text-blue-500" />} />
                <StatCard title="Total Proposals" value="12" icon={<Users className="text-violet-500" />} />
                <StatCard title="Escrow Balance" value="$4,250" icon={<DollarSign className="text-emerald-500" />} />
            </div>

            {/* Recent Activity / Projects */}
            <div className="rounded-xl border bg-card/50 glass p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-background border hover:border-primary/50 transition-colors">
                            <div>
                                <h3 className="font-medium">Summer Campaign 2025 #{i}</h3>
                                <p className="text-sm text-muted-foreground">Budget: $1,500 • Proposals: 4</p>
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                Open for Proposals
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
    return (
        <div className="p-6 rounded-xl border bg-card shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-muted-foreground">{title}</p>
                <h3 className="text-2xl font-bold mt-1">{value}</h3>
            </div>
            <div className="p-3 rounded-full bg-muted/50">
                {icon}
            </div>
        </div>
    );
}
