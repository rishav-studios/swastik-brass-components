"use client"
import { cn } from "@swastik/ui/lib/utils"
import { motion, useMotionTemplate, useScroll, UseScrollOptions, useTransform, } from "motion/react"
import { PropsWithChildren, useRef } from "react"

type AllowedTags = "div" | "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

type TextRevealProps = PropsWithChildren<{
    as?: AllowedTags
    offset?: UseScrollOptions["offset"]
    className?: string
}>

const motionComponents = {
    div: motion.div,
    p: motion.p,
    span: motion.span,
    h1: motion.h1,
    h2: motion.h2,
    h3: motion.h3,
    h4: motion.h4,
    h5: motion.h5,
    h6: motion.h6,
} as const

const classes = {
    h1: "",
    h2: "text-4xl sm:text-5xl font-semibold",
    h3: "text-3xl",
    h4: "text-2xl",
    h5: "text-xl",
    h6: "text-lg",
    p: "text-base",
    span: "text-sm",
    div: "text-base"
}

const TextReveal = ({ children, as = "div", offset = ["start end", "center"], className = "" }: TextRevealProps) => {

    const ref = useRef<any>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset
    })

    const value = useTransform(scrollYProgress, [0, 1], [0, 100])
    const Component = motionComponents[as]

    return (
        <Component
            ref={ref}
            className={cn('bg-foreground font-semibold bg-clip-text', classes[as], className)}
            style={{
                width: useMotionTemplate`${value}%`,
            }}
        >
            {children}
        </Component>
    )
}

export default TextReveal



import { MotionValue } from "motion/react"
import React, { useMemo } from "react"

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

export interface TextRevealOnScrollProps {
    /** Text content – single word, sentence, or multi-line paragraph */
    children: string;
    /** Tailwind / inline className forwarded to the wrapper */
    className?: string;
    /** How many viewport heights the scroll animation spans (default: 2) */
    scrollLength?: number;
    /** Font size forwarded via Tailwind class or inline style */
    fontSize?: string;
    /** Color of the already-revealed text (default: "#0a0a0a") */
    revealedColor?: string;
    /** Color of the un-revealed text (default: "#d1d5db" = gray-300) */
    hiddenColor?: string;

    as?: AllowedTags
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

/**
 * Splits a string into an array of "segments":
 *  - paragraph mode (contains \n): split by line, each line is one segment
 *  - single/multi-word mode: split by space, each word is one segment
 *
 * Within every segment the characters are preserved so we can clip
 * them individually.
 */
function buildSegments(text: string): string[] {
    if (text.includes("\n")) {
        // Paragraph: line-by-line reveal
        return text.split("\n").filter((l) => l.length > 0);
    }
    // Words
    return text.split(" ").filter((w) => w.length > 0);
}

/**
 * Total "reveal units" = sum of characters across all segments.
 * We derive each character's [start, end] fraction within [0, 1].
 */
function buildCharTimings(
    segments: string[]
): { segIdx: number; charIdx: number; start: number; end: number }[] {
    const total = segments.reduce((acc, s) => acc + s.length, 0);
    const timings: {
        segIdx: number;
        charIdx: number;
        start: number;
        end: number;
    }[] = [];
    let cursor = 0;

    segments.forEach((seg, si) => {
        for (let ci = 0; ci < seg.length; ci++) {
            timings.push({
                segIdx: si,
                charIdx: ci,
                start: cursor / total,
                end: (cursor + 1) / total,
            });
            cursor++;
        }
    });

    return timings;
}

// ─────────────────────────────────────────────────────────────
// Single animated character
// ─────────────────────────────────────────────────────────────

interface AnimCharProps {
    char: string;
    scrollYProgress: MotionValue<number>;
    start: number;
    end: number;
    revealedColor: string;
    hiddenColor: string;
}

/**
 * Renders two stacked copies of `char`:
 *  - bottom layer: hiddenColor (always visible)
 *  - top layer:    revealedColor, clipped by a left-to-right reveal mask
 *
 * The clip-path goes from "inset(0 100% 0 0)" (fully hidden) to
 * "inset(0 0% 0 0)" (fully visible) driven purely by scroll progress.
 */
function AnimChar({
    char,
    scrollYProgress,
    start,
    end,
    revealedColor,
    hiddenColor,
}: AnimCharProps) {
    // Map global scroll [start, end] → local [0, 1]
    const localProgress = useTransform(scrollYProgress, [start, end], [0, 1], {
        clamp: true,
    });

    // clip-path: inset(top right bottom left)
    // We animate the right inset from 100% → 0%
    const clipRight = useTransform(localProgress, [0, 1], ["100%", "0%"]);
    const clipPath = useTransform(
        clipRight,
        (r: string) => `inset(0 ${r} 0 0)`
    );

    // Whitespace: render as a regular space, no animation needed
    if (char === " ") {
        return <span style={{ display: "inline-block", width: "0.3em" }} />;
    }

    return (
        <span
            style={{
                position: "relative",
                display: "inline-block",
                // Prevent letter-spacing from collapsing
                whiteSpace: "pre",
            }}
        >
            {/* Base layer – always gray */}
            <span
                aria-hidden="true"
                style={{ color: hiddenColor, display: "inline-block" }}
            >
                {char}
            </span>

            {/* Reveal layer – clipped from left to right */}
            <motion.span
                aria-hidden="true"
                style={{
                    color: revealedColor,
                    display: "inline-block",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    clipPath,
                    // We need will-change for smooth GPU compositing
                    willChange: "clip-path",
                }}
            >
                {char}
            </motion.span>
        </span>
    );
}

// ─────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────

export function TextRevealOnScroll({
    as = "p",
    children,
    className = "",
    scrollLength = 2,
    revealedColor = "#0a0a0a",
    hiddenColor = "#d1d5db",
}: TextRevealOnScrollProps) {
    const containerRef = useRef<any>(null);

    // The outer div is tall enough to give scroll room; the inner content
    // is sticky so the text stays in view while you scroll through it.
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center"],
    });

    const segments = useMemo(() => buildSegments(children), [children]);
    const charTimings = useMemo(() => buildCharTimings(segments), [segments]);

    const isParagraph = children.includes("\n");

    const Component = motionComponents[as];

    return (
        <Component
            ref={containerRef}
            className={cn("relative", classes[as], className)}
        >
            {/* Sticky inner keeps the text centred while scrolling */}
            <>
                {isParagraph ? (
                    // ── Paragraph mode: render line by line ──
                    <p
                        aria-label={children}
                        style={{
                            lineHeight: 1.2,
                            margin: 0,
                        }}
                    >
                        {segments.map((line, si) => {
                            const lineTimings = charTimings.filter((t) => t.segIdx === si);
                            return (
                                <React.Fragment key={si}>
                                    <span
                                        style={{ display: "block" }}
                                    >
                                        {lineTimings.map((t, i) => (
                                            <AnimChar
                                                key={i}
                                                char={line[t.charIdx]!}
                                                scrollYProgress={scrollYProgress}
                                                start={t.start}
                                                end={t.end}
                                                revealedColor={revealedColor}
                                                hiddenColor={hiddenColor}
                                            />
                                        ))}
                                    </span>
                                </React.Fragment>
                            );
                        })}
                    </p>
                ) : (
                    // ── Word mode: render words with natural wrapping ──
                    <p
                        aria-label={children}
                        style={{
                            margin: 0,
                            lineHeight: 1.2,
                        }}
                    >
                        {segments.map((word, si) => {
                            const wordTimings = charTimings.filter((t) => t.segIdx === si);
                            return (
                                <React.Fragment key={si}>
                                    {/* Wrap each word in a no-break span so mid-word clip is clean */}
                                    <span
                                        style={{
                                            display: "inline-block",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {wordTimings.map((t, i) => (
                                            <AnimChar
                                                key={i}
                                                char={word[t.charIdx]!}
                                                scrollYProgress={scrollYProgress}
                                                start={t.start}
                                                end={t.end}
                                                revealedColor={revealedColor}
                                                hiddenColor={hiddenColor}
                                            />
                                        ))}
                                    </span>
                                    {/* Inter-word space (except after last word) */}
                                    {si < segments.length - 1 && (
                                        <span
                                            aria-hidden="true"
                                            style={{ display: "inline-block", width: "0.3em" }}
                                        />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </p>
                )}
            </>
        </Component>
    );
}

