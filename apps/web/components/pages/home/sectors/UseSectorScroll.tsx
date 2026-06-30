"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import type { Sector } from "./SectorCard";

type UseSectorScrollReturn = {
    containerRef: React.RefObject<HTMLDivElement>;
    activeIndex: number;
    sectorProgress: number; // 0–1 progress within the current sector
};

/**
 * useSectorScroll
 *
 * Tracks overall scroll progress across the container and maps it to:
 * - activeIndex  → which sector is currently in view
 * - sectorProgress → how far through that sector (0–1), used to scrub video
 */
export const useSectorScroll = (sectors: Sector[]): UseSectorScrollReturn => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [sectorProgress, setSectorProgress] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const count = sectors.length;

        // Each sector occupies an equal slice of total scroll range
        const sliceSize = 1 / count;
        const rawIndex = latest / sliceSize;
        const index = Math.min(Math.floor(rawIndex), count - 1);

        // Progress within the current slice: 0 → 1
        const progress = (rawIndex - index) / 1;

        setActiveIndex(index);
        setSectorProgress(Math.max(0, Math.min(1, progress)));
    });

    return { containerRef: containerRef as React.RefObject<HTMLDivElement>, activeIndex, sectorProgress };
};