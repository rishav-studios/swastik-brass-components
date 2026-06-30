"use client";

import { useTransitionRouter } from "next-view-transitions";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useLenis } from "lenis/react";

interface PageTransitionContextType {
    triggerTransition: (href: string) => void;
    isTransitioning: boolean;
    phase: "idle" | "enter" | "exit";
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined);

export const usePageTransition = () => {
    const context = useContext(PageTransitionContext);
    if (!context) {
        throw new Error("usePageTransition must be used within a PageTransitionProvider");
    }
    return context;
};

export const PageTransitionProvider = ({ children }: { children: ReactNode }) => {
    const router = useTransitionRouter();
    const lenis = useLenis();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [phase, setPhase] = useState<"idle" | "enter" | "exit">("idle");

    const triggerTransition = async (href: string) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setPhase("enter");
        
        // Stop Lenis scrolling during transition
        lenis?.stop();

        // Total enter animation time = duration (0.5s) + max delay (11 * 0.05s = 0.55s) = 1.05s.
        // We add a tiny buffer.
        await new Promise(resolve => setTimeout(resolve, 1100));

        // Start route change with view transition
        router.push(href);

        // Wait a small amount of time for page swap to complete
        await new Promise(resolve => setTimeout(resolve, 100));

        setPhase("exit");

        // Total exit animation time = 0.45s + 0.55s = 1.00s.
        await new Promise(resolve => setTimeout(resolve, 1100));

        setPhase("idle");
        setIsTransitioning(false);
        lenis?.start();
    };

    return (
        <PageTransitionContext.Provider value={{ triggerTransition, isTransitioning, phase }}>
            {children}
        </PageTransitionContext.Provider>
    );
};
