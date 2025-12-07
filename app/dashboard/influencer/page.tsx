"use client";

import Link from "next/link";
import { Search, DollarSign, Star, Briefcase } from "lucide-react";

export default function InfluencerDashboard() {
    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Creator Hub</h1>
                    <p className="text-muted-foreground">Track your proposals and earnings.</p>
                </div>
                <Link href="/market">
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg transition-all">
                        <Search size={18} />
                        Find Opportunities
                    </button>
                </Link>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-4">
                <StatCard title="Active Jobs" value="2" icon={<Briefcase className="text-blue-500" />} />
                <StatCard title="Total Earnings" value="$12.5k" icon={<DollarSign className="text-emerald-500" />} />
                <StatCard title="Avg Rating" value="4.9" icon={<Star className="text-yellow-500" />} />
                <StatCard title="Profile Views" value="842" icon={<Search className="text-violet-500" />} />
            </div>

            {/* Profile Complete Prompt */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-violet-500/10 to-blue-500/10 border border-violet-500/20 flex justify-between items-center">
                <div>
                    <h3 className="font-semibold text-lg">Complete your Profile</h3>
                    <p className="text-muted-foreground text-sm">Add your social media stats to appear in more searches.</p>
                </div>
                <Link href="/dashboard/influencer/profile">
                    <button className="px-4 py-2 bg-card border rounded-lg hover:bg-muted transition-colors text-sm font-medium">
                        Edit Profile
                    </button>
                </Link>
            </div>

            {/* Active Jobs */}
            <div className="rounded-xl border bg-card/50 glass p-6">
                <h2 className="text-xl font-semibold mb-4">Active Jobs</h2>
                <div className="space-y-4">
                    {/* Mock Job */}
                    <div className="flex items-center justify-between p-4 rounded-lg bg-background border">
                        <div>
                            <h3 className="font-medium">Tech Review Video (YouTube)</h3>
                            <p className="text-sm text-muted-foreground">Acme Corp • Due in 2 days</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold">$2,500</p>
                            <span className="text-xs text-emerald-600 font-medium bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">In Progress</span>
                        </div>
                    </div>
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
