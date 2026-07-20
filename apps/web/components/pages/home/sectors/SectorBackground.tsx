"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

type FrameSrc = {
    dir: string;
    prefix: string;
    count: number;
    padDigits: number;
};

type SectorBackgroundProps = {
    frameSrc: FrameSrc;
    sectorKey: string;
    scrollProgress: number;
    posterSrc?: string;
};

/**
 * Builds a frame URL: e.g. "/sectors/frames/aerospace/frame_0001.webp"
 */
function getFrameUrl(frameSrc: FrameSrc, index: number): string {
    const num = String(index).padStart(frameSrc.padDigits, "0");
    return `${frameSrc.dir}/${frameSrc.prefix}${num}.webp`;
}

/**
 * SectorBackground
 *
 * Renders a fullscreen <canvas> and draws pre-loaded image frames
 * based on scrollProgress (0–1). Much smoother than video.currentTime
 * scrubbing because decoded images draw synchronously.
 */
export const SectorBackground = ({
    frameSrc,
    sectorKey,
    scrollProgress,
    posterSrc,
}: SectorBackgroundProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const framesRef = useRef<HTMLImageElement[]>([]);
    const lastDrawnIndexRef = useRef<number>(-1);
    const rafRef = useRef<number>(0);
    const [isLoaded, setIsLoaded] = useState(false);

    // ── Preload all frames for this sector ──────────────────────────────
    useEffect(() => {
        setIsLoaded(false);
        lastDrawnIndexRef.current = -1;

        const images: HTMLImageElement[] = [];
        let loadedCount = 0;
        let firstFrameDrawn = false;

        for (let i = 1; i <= frameSrc.count; i++) {
            const img = new Image();
            img.src = getFrameUrl(frameSrc, i);

            img.onload = () => {
                loadedCount++;

                // Draw first frame immediately so user sees content fast
                if (i === 1 && !firstFrameDrawn) {
                    firstFrameDrawn = true;
                    drawFrame(img);
                }

                if (loadedCount === frameSrc.count) {
                    setIsLoaded(true);
                }
            };

            images.push(img);
        }

        framesRef.current = images;

        return () => {
            // Cleanup: cancel any pending RAF and release image references
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            framesRef.current = [];
        };
    }, [frameSrc.dir, frameSrc.count]); // eslint-disable-line react-hooks/exhaustive-deps

    // ── Canvas resize handling ───────────────────────────────────────────
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                const dpr = window.devicePixelRatio || 1;
                canvas.width = width * dpr;
                canvas.height = height * dpr;

                // Redraw current frame at new size
                const frames = framesRef.current;
                const idx = lastDrawnIndexRef.current;
                if (idx >= 0 && idx < frames.length && frames[idx]?.complete) {
                    drawFrame(frames[idx]);
                }
            }
        });

        observer.observe(canvas);
        return () => observer.disconnect();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ── Draw a single image onto the canvas (object-cover style) ────────
    const drawFrame = useCallback((img: HTMLImageElement) => {
        const canvas = canvasRef.current;
        if (!canvas || !img.complete || img.naturalWidth === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const cw = canvas.width;
        const ch = canvas.height;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;

        // Object-cover: crop source to match canvas aspect ratio
        const imgRatio = iw / ih;
        const canvasRatio = cw / ch;

        let sx: number, sy: number, sw: number, sh: number;

        if (imgRatio > canvasRatio) {
            // Image is wider — crop sides
            sh = ih;
            sw = sh * canvasRatio;
            sx = (iw - sw) / 2;
            sy = 0;
        } else {
            // Image is taller — crop top/bottom
            sw = iw;
            sh = sw / canvasRatio;
            sx = 0;
            sy = (ih - sh) / 2;
        }

        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
    }, []);

    // ── Scroll-driven frame drawing ─────────────────────────────────────
    useEffect(() => {
        const frames = framesRef.current;
        if (frames.length === 0) return;

        // Map 0–1 progress to frame index (0-based)
        const targetIndex = Math.min(
            Math.floor(scrollProgress * frameSrc.count),
            frameSrc.count - 1
        );

        // Skip if we already drew this frame
        if (targetIndex === lastDrawnIndexRef.current) return;

        const img = frames[targetIndex];
        if (!img || !img.complete) return;

        // Use rAF to batch draws with the browser's paint cycle
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            drawFrame(img);
            lastDrawnIndexRef.current = targetIndex;
        });
    }, [scrollProgress, frameSrc.count, drawFrame]);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={sectorKey}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: isLoaded ? 1 : 0, scale: 1 }}
                exit={{
                    opacity: 0,
                    scale: 1.12,
                    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
                }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
                {/* Poster image shown while frames load */}
                {posterSrc && !isLoaded && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={posterSrc}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}

                <canvas
                    ref={canvasRef}
                    className="w-full h-full block"
                />
            </motion.div>
        </AnimatePresence>
    );
};