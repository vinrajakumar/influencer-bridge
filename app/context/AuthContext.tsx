"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Mock User Types
export type UserRole = "BUSINESS" | "INFLUENCER";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatarUrl?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (role: UserRole) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check local storage on mount
        const storedUser = localStorage.getItem("influencer_app_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (role: UserRole) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        const mockUser: User = {
            id: role === "BUSINESS" ? "biz-123" : "inf-456",
            name: role === "BUSINESS" ? "Acme Corp" : "Alice Influencer",
            email: role === "BUSINESS" ? "business@acme.com" : "alice@social.com",
            role: role,
            avatarUrl: role === "BUSINESS" ? "https://ui-avatars.com/api/?name=Acme+Corp" : "https://ui-avatars.com/api/?name=Alice+Inspire",
        };

        setUser(mockUser);
        localStorage.setItem("influencer_app_user", JSON.stringify(mockUser));
        setIsLoading(false);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("influencer_app_user");
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
