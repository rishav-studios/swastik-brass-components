"use client";

import Section from "@/components/layout/Section";
import { Arrow, CustomLink } from "@/components/shared/clickables/CustomLink";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";



const AboutOverview = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })
    const containerX = useTransform(scrollYProgress, [0, 1], [-100, 100])
    return (
        <Section className="min-h-max h-max w-full py-0 lg:py-0">
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                {/* left image */}
                <div className="w-full h-full">
                    <img src="/factory.jpeg" alt="" className="w-full h-full object-cover" />
                </div>
                {/* right content */}
                <div className="bg-primary flex flex-col">
                    <div className="space-y-6 max-w-2xl p-8 sm:pr-0">
                        <p className="text-background font-medium">We are a team dedicated to precision engineering, delivering solutions that shape industries worldwide. Our journey is defined by trust, quality, and a commitment to excellence in every project.</p>
                        <div className="flex flex-col gap-6">

                            <CustomLink href="#journey" variant="button-black" className="hover:bg-background hover:text-foreground transition-colors duartion-300 w-max">
                                Our journey
                                <Arrow variant="primary" />
                            </CustomLink>
                            <CustomLink href="#journey" variant="outline-white" className="w-max text-background font-medium">
                                download brochure
                            </CustomLink>
                        </div>
                    </div>
                    <div className=" w-full mt-auto overflow-hidden flex whitespace-nowrap  pointer-events-none select-none">
                        <motion.div
                            ref={containerRef}
                            style={{
                                x: containerX
                            }}
                            className="flex text-[3rem] md:text-[6rem] lg:text-[8rem] font-semibold tracking-tighter text-background/40 leading-none"
                        >
                            <motion.span
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{ repeat: Infinity, ease: "linear", duration: 20 }}>
                                SINCE 2005 — PRESENT — SINCE 2005 — PRESENT —&nbsp;
                            </motion.span>
                            <motion.span
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{ repeat: Infinity, ease: "linear", duration: 20 }}>
                                SINCE 2005 — PRESENT — SINCE 2005 — PRESENT —&nbsp;
                            </motion.span>
                        </motion.div>
                    </div>

                </div>
            </div>

        </Section>
    );
};


export default AboutOverview;
