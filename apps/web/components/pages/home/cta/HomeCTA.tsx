"use client";

import { Arrow, CustomLink } from "@/components/shared/clickables/CustomLink";
import { StickyItem } from "@/components/shared/Sticky";
import useIsMobile from "@/hooks/useIsMobile";
import { motion, useScroll, useTransform } from "motion/react";
import { ReactNode, useRef } from "react";
type HomeCTAProps = {
    title?: ReactNode;
    description?: string;
}
const HomeCTA = ({
    title = <>
        READY TO ENGINEER <br />
        <span className="text-primary mix-blend-normal drop-shadow-lg">THE FUTURE?</span>
    </>,
    description = "Partner with Swastik Brass Components for zero-defect precision parts delivered at scale, anywhere in the world." }: HomeCTAProps) => {
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
    const contentOpacity = useTransform(scrollYProgress, [0.6, 0.8, 1], [0, 1, 1]);
    const contentY = useTransform(scrollYProgress, [0.6, 0.8], [40, 0]);

    // Border glow fades out as it expands
    const borderOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    return (
        <section ref={containerRef} className="h-[200vh] w-full bg-background/40 relative">
            <StickyItem className="overflow-hidden">

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
                        <source src="/output.webm" type="video/webm" />
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
                        <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold text-background mb-6 mix-blend-plus-lighter">
                            {title}
                        </h2>

                        <p className="text-background/90 text-lg md:text-2xl max-w-2xl mx-auto mb-12 font-medium drop-shadow-md">
                            {description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full sm:w-auto">

                            <CustomLink href="/quote" variant="button-white" className="text-xl font-semibold">
                                Request a Quote
                                <Arrow variant="primary" />
                            </CustomLink>

                            <CustomLink href="/contact" variant="outline-white" className="text-xl py-3 px-10 font-semibold text-white">Contact</CustomLink>
                        </div>
                    </motion.div>
                </motion.div>

            </StickyItem>
        </section>
    );
};

export default HomeCTA;
