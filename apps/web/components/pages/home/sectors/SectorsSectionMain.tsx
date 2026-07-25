"use client"
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import BackgroundNoise, { BackgroundLines } from "@/components/shared/BackgroundNoise";
import { Eyebrow } from "@/components/shared/SectionHeader";
import { TextRevealOnScroll } from "@/components/shared/TextReveal";
import { Sector as DBSector } from "@swastik/types";
import { motion } from "motion/react";
import { useMemo } from "react";
import type { Sector } from "./SectorCard";
import { SectorsSection } from "./SectorSection";

/**
 * Frame counts per sector slug.
 * These are local /public files and don't come from the database.
 */
const FRAME_COUNTS: Record<string, number> = {
    aerospace: 96,
    railway: 96,
    "oil-gas": 121,
    automobile: 73,
};

/** Default frame count for sectors not listed above */
const DEFAULT_FRAME_COUNT = 60;

/**
 * Maps a database Sector to the frontend SectorCard view-model.
 * Frame paths are derived from the slug convention:
 *   /sectors/frames/{slug}/frame_NNNN.webp
 */
function mapToViewSector(dbSector: DBSector): Sector {
    const count = FRAME_COUNTS[dbSector.slug] ?? DEFAULT_FRAME_COUNT;
    return {
        id: String(dbSector.id),
        label: dbSector.name,
        slug: dbSector.slug,
        description: dbSector.home_description,
        frameSrc: {
            dir: `/sectors/frames/${dbSector.slug}`,
            prefix: "frame_",
            count,
            padDigits: 4,
        },
        posterSrc: `/sectors/frames/${dbSector.slug}/frame_0001.webp`,
    };
}

type SectorsProps = {
    dbSectors: DBSector[];
};

export default function Sectors({ dbSectors }: SectorsProps) {
    // Map DB sectors to view-model; only include ones that have local frames
    const sectors = useMemo(
        () =>
            dbSectors
                .filter((s) => s.slug in FRAME_COUNTS)
                .map(mapToViewSector),
        [dbSectors]
    );

    if (sectors.length === 0) return null;

    return (
        <Section className="py-0! bg-background">
            <BackgroundNoise className="z-0" />
            <BackgroundLines className="w-[90%] mx-auto" />

            <Container className="space-y-8 py-16 relative z-10">

                <Eyebrow className="ml-0">who we are</Eyebrow>

                <TextRevealOnScroll as="h2" className="leading-tight whitespace-pre-line">

                    {`Sectors We\nEmpower`}
                </TextRevealOnScroll>
            </Container>

            {/* <div
                className="absolute h-16 w-full bg-background z-100 mask-b-from-5%" /> */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{
                    once: true
                }}
                transition={{
                    duration: 0.7,
                    ease: "easeInOut"
                }}
            >

                <SectorsSection
                    sectors={sectors}
                    scrollHeightPerSector="200vh"   // increase for slower scrubbing
                />
            </motion.div>

            {/* ...other sections below... */}

        </Section>
    );
}


/**
 * tailwind.config.ts additions
 * ─────────────────────────────
 * Add these custom tokens so SectorCard and SectorNav classes resolve:
 *
 * theme: {
 *   extend: {
 *     colors: {
 *       brass:        "#B8860B",
 *       "brass-light":"#D4A017",
 *       "steel-dark": "#0D0D0D",
 *       "steel":      "#2A2F3A",
 *       "steel-light":"#9CA3AF",
 *     },
 *     fontFamily: {
 *       display: ["Bebas Neue", "sans-serif"],  // add to <head> via next/font or Google Fonts
 *     },
 *   },
 * },
 */