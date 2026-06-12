"use client";

import { motion } from "motion/react";

const AboutHero = () => {
    return (
        <section className="relative h-[90dvh] w-full flex items-center justify-center bg-foreground overflow-hidden">
            {/* Subtle background video texture */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover opacity-15"
            >
                <source src="/hero-video.mp4" type="video/mp4" />
            </video>

            {/* Glowing gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-transparent" />

            <div className="relative z-10 text-center px-4 max-w-5xl">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="text-primary tracking-[0.3em] uppercase text-sm md:text-base font-semibold mb-6 block">
                        Our Story
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-8 mix-blend-plus-lighter">
                        BUILT ON <br />
                        <span className="text-primary mix-blend-normal">PRECISION</span>
                    </h1>
                    <p className="text-white/70 text-lg md:text-2xl max-w-2xl mx-auto font-medium">
                        Two decades of engineering excellence, delivering zero-defect brass components to the world's most critical industries.
                    </p>
                </motion.div>
            </div>

            {/* Bottom scrolling year ticker */}
            <div className="absolute bottom-0 w-full overflow-hidden flex whitespace-nowrap opacity-10 pointer-events-none select-none mix-blend-overlay -z-0">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                    className="flex text-[8rem] md:text-[12rem] font-black tracking-tighter text-white leading-none translate-y-1/4"
                >
                    <span>SINCE 1999 — PRESENT — SINCE 1999 — PRESENT — SINCE 1999 — PRESENT — SINCE 1999 — PRESENT —&nbsp;</span>
                    <span>SINCE 1999 — PRESENT — SINCE 1999 — PRESENT — SINCE 1999 — PRESENT — SINCE 1999 — PRESENT —&nbsp;</span>
                </motion.div>
            </div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            >
                <div className="w-8 h-14 border border-white/20 rounded-full flex justify-center p-2 backdrop-blur-md bg-white/5">
                    <motion.div 
                        animate={{ y: [0, 16, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="w-1.5 h-3 bg-primary rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default AboutHero;
