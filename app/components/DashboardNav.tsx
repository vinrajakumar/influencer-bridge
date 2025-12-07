"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import {
    LayoutDashboard,
    PlusCircle,
    Search,
    MessageSquare,
    Settings,
    LogOut,
    Briefcase
} from "lucide-react";
import { cn } from "../lib/utils";

export default function DashboardNav() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    if (!user) return null;

    const businessLinks = [
        { href: "/dashboard/business", label: "Overview", icon: LayoutDashboard },
        { href: "/requests/create", label: "New Campaign", icon: PlusCircle },
        { href: "/dashboard/business/projects", label: "My Projects", icon: Briefcase },
    ];

    const influencerLinks = [
        { href: "/dashboard/influencer", label: "Overview", icon: LayoutDashboard },
        { href: "/market", label: "Find Jobs", icon: Search },
        { href: "/dashboard/influencer/proposals", label: "My Proposals", icon: MessageSquare },
    ];

    const links = user.role === "BUSINESS" ? businessLinks : influencerLinks;

    return (
        <aside className="w-64 bg-card border-r hidden md:flex flex-col">
            <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                    <LayoutDashboard className="w-6 h-6" />
                    {user.role === "BUSINESS" ? "BizPortal" : "CreatorHub"}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                    Welcome, {user.name.split(' ')[0]}
                </p>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <Icon size={18} />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 w-full transition-colors"
                >
                    <LogOut size={18} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
