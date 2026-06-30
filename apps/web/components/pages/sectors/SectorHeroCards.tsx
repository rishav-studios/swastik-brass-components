"use client";

import { icons } from "@swastik/ui";
import { motion } from "motion/react";
import { ReactNode } from "react";

type SectorCard = {
    name: string;
    slug: string;
    tag: string;
    icon: ReactNode;
    rotation: number;
    delay: number;
    translateY: number;
};

const SECTOR_CARDS: SectorCard[] = [
    {
        name: "Aerospace",
        slug: "aerospace",
        tag: "Altitude-Grade Precision",
        icon: <icons.plane className="w-8 h-8 text-white/70 group-hover:text-primary transition-colors duration-500" />,
        rotation: -4,
        delay: 0,
        translateY: 0,
    },
    {
        name: "Railway",
        slug: "railway",
        tag: "Heavy-Duty Systems",
        icon: <icons.train className="w-8 h-8 text-white/70 group-hover:text-primary transition-colors duration-500" />,
        rotation: 3,
        delay: 0.6,
        translateY: 28,
    },
    {
        name: "Automobile",
        slug: "automobile",
        tag: "High-Volume Machining",
        icon: <icons.car className="w-8 h-8 text-white/70 group-hover:text-primary transition-colors duration-500" />,
        rotation: -2,
        delay: 1.1,
        translateY: 0,
    },
    {
        name: "Oil & Gas",
        slug: "oilgas",
        tag: "ATEX Zone 1 Rated",
        icon: <icons.flame className="w-8 h-8 text-white/70 group-hover:text-primary transition-colors duration-500" />,
        rotation: 4,
        delay: 0.4,
        translateY: 28,
    },
];

interface SectorHeroCardsProps {
    sectors?: { name: string; slug: string }[];
}

export default function SectorHeroCards({ sectors }: SectorHeroCardsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
            className="hidden lg:flex flex-1 items-center justify-center relative "
        >
            {/* Subtle radial glow behind the cards */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
            </div>

            <div className="grid grid-cols-2 gap-6 relative justify-items-center z-10">
                {SECTOR_CARDS.map((card) => {
                    return (
                        <motion.div
                            key={card.slug}
                            animate={{ y: [0, -10, 0] }}
                            transition={{
                                repeat: Infinity,
                                duration: 4.5,
                                ease: "easeInOut",
                                delay: card.delay,
                            }}
                            style={{
                                rotate: card.rotation,
                                translateY: card.translateY,
                            }}
                            className="w-56 aspect-square flex flex-col items-center justify-center text-center p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-primary/40 hover:bg-white/8 hover:shadow-[0_0_24px_rgba(234,179,8,0.12)] transition-all duration-500 cursor-default group"
                        >
                            {/* Icon container */}
                            <div className="w-16 h-16 rounded-2xl bg-white/8 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-primary/15 group-hover:border-primary/30 group-hover:scale-110 transition-all duration-500 shadow-inner">
                                {card.icon}
                            </div>

                            {/* Sector name */}
                            <h3 className="text-white font-bold text-xl leading-tight mb-3">
                                {card.name}
                            </h3>

                            {/* Tag pill */}
                            <div className="text-white/50 text-[11px] uppercase tracking-wider font-semibold px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
                                {card.tag}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
