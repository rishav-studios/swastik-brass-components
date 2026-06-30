"use client";

import { cn } from "@swastik/ui/lib/utils";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { StickyItem } from "./Sticky";

/**
 * ScrollVideo Component
 * Accepts a video `src` prop and scrubs through it based on scroll progress.
 */

type PlayVideoOnScrollProps = {
    src: string;
    className?: string;
}
const PlayVideoOnScroll = ({ src, className = "" }: PlayVideoOnScrollProps) => {
    // Container ref to track scroll progress across a specific height
    const containerRef = useRef(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Track scroll progress within the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        // Start tracking when the top of container hits the top of viewport
        // End when the bottom of container hits the bottom of viewport
        offset: ["start start", "end end"],
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!videoRef.current || !Number.isFinite(videoRef.current.duration)) return;

        const targetTime = latest * videoRef.current.duration;

        // Only seek if the difference is more than 1 frame (at 30fps = 0.033s)
        if (Math.abs(videoRef.current.currentTime - targetTime) > 0.033) {
            videoRef.current.currentTime = targetTime;
        }
    });
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoaded = () => setIsLoaded(true);

        // If metadata is already loaded by the time this runs, set immediately
        if (video.readyState >= 1) {
            setIsLoaded(true);
            return;
        }

        video.addEventListener("loadedmetadata", handleLoaded);
        return () => video.removeEventListener("loadedmetadata", handleLoaded);
    }, []);
    return (
        // The container needs extra height (e.g., 400vh) to give the user room to scroll
        <div ref={containerRef} className={cn("relative w-full", className)}>
            {/* Sticky container holds the video firmly on screen while we scroll through the outer div */}
            <StickyItem className=" flex flex-col items-center justify-center overflow-hidden">

                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-white/50 text-xl font-mono">
                        Loading video metadata...
                    </div>
                )}

                <video
                    ref={videoRef}
                    src={src}
                    // Muted and playsInline are strongly recommended for programmable videos 
                    // to prevent browser autoplay blocking rules and mobile full-screen takeovers
                    muted
                    playsInline
                    preload="auto"
                    className={`w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"
                        }`}
                // onLoadedMetadata={() => setIsLoaded(true)}
                // onError={(e) => console.log("Video failed to load:", e.target.error)}
                />

                {/* Subtle overlay gradient to make text/UI pop */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                {/* Visual Progress Bar */}
                <div className="absolute bottom-12 left-12 right-12 h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                    <motion.div
                        className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                        style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
                    />
                </div>
            </StickyItem>
        </div>
    );
};

// Main App Component to demonstrate usage
export default function App() {
    return (
        <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-blue-500/30">

            {/* Introduction Section */}
            <header className="h-screen flex flex-col items-center justify-center text-center p-8 max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-white"
                >
                    Scroll to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Play</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-slate-400 mb-12"
                >
                    A Framer Motion + Next.js component that binds video playback directly to your scrollbar.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="animate-bounce flex flex-col items-center text-slate-500 gap-2 mt-12"
                >
                    <span className="text-sm font-medium uppercase tracking-widest">Scroll Down</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </motion.div>
            </header>

            {/* The Scroll Video Component */}
            <PlayVideoOnScroll src="/hero-video.mp4" />

            {/* Footer Section */}
            <footer className="h-screen flex items-center justify-center bg-black relative">
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">End of Video</h2>
                    <p className="text-slate-500">Scroll back up to reverse time.</p>
                </div>
            </footer>

        </div>
    );
}