"use client";

import Container from "@/components/layout/Container";
import { StickyItem } from "@/components/shared/Sticky";
import { SectorBackground } from "./SectorBackground";
import { SectorCard, type Sector } from "./SectorCard";
import { SectorNav } from "./SectorNav";
import { useSectorScroll } from "./UseSectorScroll";

type SectorsSectionProps = {
    sectors: Sector[];
    /**
     * scrollHeightPerSector controls how much vertical scroll space
     * each sector gets. Increase for slower, more deliberate scrubbing.
     * Default: "150vh" per sector.
     */
    scrollHeightPerSector?: string;
};

/**
 * SectorsSection
 *
 * Orchestrator — owns no visual logic itself.
 * Composes: SectorBackground + SectorCard + SectorNav
 * Driven by: useSectorScroll hook
 *
 * Usage:
 *   <SectorsSection sectors={SECTORS_DATA} />
 */
export const SectorsSection = ({
    sectors,
    scrollHeightPerSector = "150vh",
}: SectorsSectionProps) => {
    const { containerRef, activeIndex, sectorProgress } = useSectorScroll(sectors);

    const activeSector = sectors[activeIndex]!;

    // Total scroll height = per-sector height × number of sectors
    const totalHeight = `calc(${scrollHeightPerSector} * ${sectors.length})`;

    return (
        <section
            ref={containerRef}
            style={{ height: totalHeight }}
            className="relative w-full"
            aria-label="Industries we serve"
        >
            {/* Sticky viewport — everything inside stays fixed while outer div scrolls */}
            <StickyItem className="overflow-hidden">

                {/* ── Layer 1: Video background ── */}
                <SectorBackground
                    key={activeSector.id}          // forces remount = triggers enter animation
                    sectorKey={activeSector.id}
                    src={activeSector.videoSrc}
                    scrollProgress={sectorProgress}
                />

                {/* ── Layer 2: Content card ── */}
                <div className="absolute inset-0 flex items-center bg-black/60 md:bg-transparent md:bg-linear-to-r from-black/70 via-black/20 to-transparent">
                    <Container>

                        <SectorCard
                            sector={activeSector}
                            isVisible={true}
                        />
                    </Container>
                </div>

                {/* ── Layer 3: Right-edge dot nav ── */}
                <SectorNav sectors={sectors} activeIndex={activeIndex} />

                {/* ── Layer 4: Sector counter bottom-left ── */}
                <div className="absolute bottom-10 left-12 md:left-20 z-10 flex items-baseline gap-2">
                    <span className="font-display text-5xl text-background leading-none">
                        {String(activeIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="text-background/80 text-sm">
                        / {String(sectors.length).padStart(2, "0")}
                    </span>
                </div>

                {/* ── Layer 5: Scroll progress bar bottom ── */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10">
                    <div
                        className="h-full bg-brass transition-all duration-100"
                        style={{
                            width: `${((activeIndex + sectorProgress) / sectors.length) * 100}%`,
                        }}
                    />
                </div>
            </StickyItem>
        </section>
    );
};