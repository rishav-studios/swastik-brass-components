"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type SectorBackgroundProps = {
    src: string;           // video src for the current sector
    sectorKey: string;     // unique key to trigger remount on sector change
    scrollProgress: number; // 0–1 scroll progress within this sector's range
};

/**
 * SectorBackground
 *
 * Renders a single fullscreen video layer.
 * - Scrubs the video frame-by-frame based on scrollProgress
 * - AnimatePresence drives the zoom-out exit + fade-in enter on sector change
 */
export const SectorBackground = ({
    src,
    sectorKey,
    scrollProgress,
}: SectorBackgroundProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load detection — safe for both src= and <source> approaches
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoaded = () => setIsLoaded(true);

        if (video.readyState >= 2) {
            setIsLoaded(true);
            return;
        }

        video.addEventListener("loadeddata", handleLoaded);
        return () => video.removeEventListener("loadeddata", handleLoaded);
    }, [src]);

    // Scrub the video based on scroll progress
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !Number.isFinite(video.duration)) return;

        const targetTime = scrollProgress * video.duration;

        if (Math.abs(video.currentTime - targetTime) > 0.033) {
            video.currentTime = targetTime;
        }
    }, [scrollProgress]);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={sectorKey}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: isLoaded ? 1 : 0, scale: 1 }}
                exit={{
                    opacity: 0,
                    scale: 1.12, // zoom out on exit
                    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
                }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
                <video
                    ref={videoRef}
                    src={src}
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                />

                {/* Dark vignette so card text stays readable over any video */}
                {/* <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20 pointer-events-none" /> */}
            </motion.div>
        </AnimatePresence>
    );
};