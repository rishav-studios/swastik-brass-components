"use client"
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Eyebrow } from "@/components/shared/SectionHeader";
import { TextRevealOnScroll } from "@/components/shared/TextReveal";
import { motion } from "motion/react";
import { SECTORS_DATA } from "./sectors";
import { SectorsSection } from "./SectorSection";

export default function Sectors() {
    return (
        <Section className="py-0! bg-foreground">

            <Container className="space-y-8 py-16">

                <Eyebrow className="ml-0">who we are</Eyebrow>

                <TextRevealOnScroll hiddenColor="#36332d" revealedColor="#fff" as="h2" className="leading-tight whitespace-pre-line">

                    {`Sectors We\nEmpower`}
                </TextRevealOnScroll>
            </Container>

            <div
                className="absolute h-16 w-full bg-foreground z-10 mask-b-from-5%" />
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
                    sectors={SECTORS_DATA}
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