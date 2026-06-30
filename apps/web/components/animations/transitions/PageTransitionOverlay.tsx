"use client";

import { motion } from "motion/react";
import { usePageTransition } from "@/components/providers/PageTransitionProvider";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const COLUMNS = 12;

export const PageTransitionOverlay = () => {
    const { phase } = usePageTransition();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    
    return createPortal(
        <div 
            className="fixed inset-0 z-[9998] flex pointer-events-none"
        >
            {[...Array(COLUMNS)].map((_, i) => {
                const isEnter = phase === "enter";
                const isExit = phase === "exit";
                const isIdle = phase === "idle";
                
                let yPosition = "101%";
                if (isEnter) yPosition = "0%";
                else if (isExit) yPosition = "-101%";

                return (
                    <motion.div
                        key={i}
                        className="h-full w-1/12 bg-background will-change-transform pointer-events-auto"
                        initial={{ y: "101%" }}
                        animate={{ y: yPosition }}
                        transition={{
                            duration: isEnter ? 0.5 : isExit ? 0.45 : 0,
                            delay: isIdle ? 0 : i * 0.05,
                            ease: [0.76, 0, 0.24, 1],
                        }}
                    />
                );
            })}
        </div>,
        document.body
    );
};
