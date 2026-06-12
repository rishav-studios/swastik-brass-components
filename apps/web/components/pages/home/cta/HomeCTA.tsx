"use client";

import useIsMobile from "@/hooks/useIsMobile";
import { icons } from "@swastik/ui/constants/icon";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

const HomeCTA = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Morph the video container from a pill shape to full screen
    const width = useTransform(scrollYProgress, [0, 0.6], [isMobile ? "90%" : "60%", "100%"]);
    const height = useTransform(scrollYProgress, [0, 0.6], [isMobile ? "40dvh" : "50dvh", "100dvh"]);
    const borderRadius = useTransform(scrollYProgress, [0, 0.6], [isMobile ? "2rem" : "3rem", "0rem"]);

    // Reveal the CTA text only after the video has fully expanded
    const contentOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
    const contentY = useTransform(scrollYProgress, [0.6, 0.8], [40, 0]);

    // Border glow fades out as it expands
    const borderOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    return (
        <section ref={containerRef} className="h-[200vh] w-full bg-foreground relative">
            <div className="sticky top-0 h-dvh w-full flex items-center justify-center overflow-hidden">

                {/* Expanding Video Container */}
                <motion.div
                    style={{
                        width,
                        height,
                        borderRadius,
                    }}
                    className="relative overflow-hidden z-10 flex items-center justify-center will-change-transform bg-black"
                >
                    {/* Glowing border that fades out */}
                    <motion.div
                        style={{ opacity: borderOpacity }}
                        className="absolute inset-0 border-[1.5px] border-white/20 rounded-[inherit] shadow-[0_0_50px_rgba(255,255,255,0.05)] pointer-events-none z-20"
                    />

                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    >
                        <source src="/hero-video.mp4" type="video/mp4" />
                    </video>

                    {/* Subtle dark overlay to ensure text contrast when expanded */}
                    <motion.div
                        style={{ opacity: contentOpacity }}
                        className="absolute inset-0 bg-black/50 z-0 pointer-events-none"
                    />

                    {/* CTA Content */}
                    <motion.div
                        style={{ opacity: contentOpacity, y: contentY }}
                        className="relative z-20 flex flex-col items-center text-center px-4 w-full max-w-5xl"
                    >
                        <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-6 leading-[1.1] tracking-tighter mix-blend-plus-lighter">
                            READY TO ENGINEER <br />
                            <span className="text-primary mix-blend-normal drop-shadow-lg">THE FUTURE?</span>
                        </h2>

                        <p className="text-white/90 text-lg md:text-2xl max-w-2xl mx-auto mb-12 font-medium drop-shadow-md">
                            Partner with Swastik Brass Components for zero-defect precision parts delivered at scale, anywhere in the world.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full sm:w-auto">
                            <Link
                                href="/quote"
                                className="w-full sm:w-auto px-8 py-4 bg-primary text-white text-lg font-bold rounded-full hover:bg-primary/90 transition-all shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:shadow-[0_0_50px_rgba(234,179,8,0.6)] hover:-translate-y-1 flex items-center justify-center gap-3 group"
                            >
                                Request a Quote
                                <icons.arrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                href="/contact"
                                className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white/80 text-white text-lg font-semibold rounded-full hover:bg-white hover:text-black transition-all hover:-translate-y-1 text-center"
                            >
                                Contact
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
};

export default HomeCTA;
