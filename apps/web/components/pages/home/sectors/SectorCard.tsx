"use client";

import { Arrow, CustomLink } from "@/components/shared/clickables/CustomLink";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useState } from "react";

export type Sector = {
    id: string;
    label: string;
    slug: string;
    description: string;
    stats: { value: string; unit: string }[];
    videoSrc: string;
};

type SectorCardProps = {
    sector: Sector;
    isVisible: boolean;
};

// ── Container: spring-physics entry so it feels physically grounded ──────────
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 55,
            damping: 18,
            staggerChildren: 0.1,
            delayChildren: 0.05,
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.3, ease: "easeIn" },
    },
};

// ── Children: soft fade-up with a natural ease ────────────────────────────────
const childVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] },
    },
};

// ── Accent line: grows in height from 0 ──────────────────────────────────────
const lineVariants: Variants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: {
        scaleY: 1,
        opacity: 1,
        transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1], delay: 0.1 },
    },
    exit: {
        scaleY: 0,
        opacity: 0,
        transition: { duration: 0.25, ease: "easeIn" },
    },
};

/**
 * SectorCard
 *
 * Premium left-hand detail panel for each sector.
 * Slides in with spring physics; children stagger softly.
 */
export const SectorCard = ({ sector, isVisible }: SectorCardProps) => {
    const [isHovered, setIsHovered] = useState(false)
    return (
        <AnimatePresence mode="popLayout">
            {isVisible && (
                <motion.div
                    key={sector.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="relative z-10 flex gap-5 max-w-xl"
                >
                    {/* ── Left accent line ─────────────────────────────── */}
                    <motion.div
                        variants={lineVariants}
                        style={{ originY: 0 }}
                        className="hidden sm:flex shrink-0 w-[2px] self-stretch bg-primary rounded-full mt-1"
                    />

                    {/* ── Content column ───────────────────────────────── */}
                    <div className="flex flex-col text-white">

                        {/* Sector label */}
                        <motion.h2
                            variants={childVariants}
                            className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-none uppercase tracking-tight mb-4"
                            style={{ textShadow: "0 2px 32px rgba(0,0,0,0.45)" }}
                        >
                            {sector.label}
                        </motion.h2>

                        {/* Short divider rule */}
                        <motion.div
                            variants={childVariants}
                            className="w-10 h-px bg-white/35 mb-5"
                        />

                        {/* Description */}
                        <motion.p
                            variants={childVariants}
                            className="text-white/70 text-base leading-relaxed mb-8 max-w-sm"
                        >
                            {sector.description}
                        </motion.p>

                        {/* Stats row */}
                        <motion.div
                            variants={childVariants}
                            className="flex gap-6 mb-9"
                        >
                            {sector.stats.map((stat) => (
                                <div
                                    key={stat.unit}
                                    className="flex flex-col pl-3 border-l border-white/20"
                                >
                                    <span className="font-display text-3xl leading-none text-white">
                                        {stat.value}
                                    </span>
                                    <span className="text-white/45 text-[0.65rem] uppercase tracking-widest mt-1.5">
                                        {stat.unit}
                                    </span>
                                </div>
                            ))}
                        </motion.div>

                        {/* CTA */}
                        <motion.div
                            variants={childVariants}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                            className="w-max"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <CustomLink
                                href={`/sectors/${sector.slug}`}
                                variant="button-white"
                                className="w-max hover:bg-primary hover:text-background  transition-colors duration-300">

                                Explore Sector
                                <Arrow variant={isHovered ? "white" : "primary"} />

                            </CustomLink>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};