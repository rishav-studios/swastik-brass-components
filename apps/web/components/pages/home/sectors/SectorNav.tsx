"use client";

import { motion } from "motion/react";
import type { Sector } from "./SectorCard";

type SectorNavProps = {
    sectors: Sector[];
    activeIndex: number;
};

/**
 * SectorNav
 *
 * Vertical pill-dot navigation on the right edge.
 * Shows the sector label on hover, highlights the active one.
 */
export const SectorNav = ({ sectors, activeIndex }: SectorNavProps) => {
    return (
        <div className="absolute hidden sm:flex right-8 top-1/2 -translate-y-1/2 z-20 flex-col gap-4">
            {sectors.map((sector, i) => {
                const isActive = i === activeIndex;
                return (
                    <div key={sector.id} className="group flex items-center gap-3 justify-end">
                        {/* Label — visible on hover */}
                        <span className="text-xs font-semibold uppercase tracking-widest text-background opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            {sector.label}
                        </span>

                        {/* Dot */}
                        <motion.div
                            animate={{
                                height: isActive ? 28 : 8,
                                backgroundColor: isActive ? "#F15E32" : "#fff",
                            }}
                            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                            className="w-1.5 rounded-full"
                        />
                    </div>
                );
            })}
        </div>
    );
};