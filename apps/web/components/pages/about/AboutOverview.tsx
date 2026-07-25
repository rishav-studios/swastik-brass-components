"use client";

import Section from "@/components/layout/Section";
import { Arrow, CustomLink, variantClasses } from "@/components/shared/clickables/CustomLink";
import { cn } from "@swastik/ui/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
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
                <div className="h-72 md:w-full md:h-full relative">
                    <Image fill src="https://jpouktmcsliceesoassj.supabase.co/storage/v1/object/public/public_assets/general/factory.webp" alt="factory" className="w-full h-full object-cover" />
                </div>
                {/* right content */}
                <div className="bg-primary flex flex-col">
                    <div className="space-y-6 max-w-2xl p-8 sm:pr-0">
                        <p className="text-background font-medium">We are a team dedicated to precision engineering, delivering solutions that shape industries worldwide. Our journey is defined by trust, quality, and a commitment to excellence in every project.</p>
                        <div className="flex flex-col gap-6">

                            <a href="#journey" className={cn("hover:bg-background hover:text-foreground transition-colors duartion-300 w-max group/custom-link pr-2!", variantClasses["button-black"].base, variantClasses["button-black"].hover, variantClasses["button-black"].active)}>
                                Our journey
                                <Arrow variant="primary" />
                            </a>
                            <CustomLink
                                variant="outline-white"
                                target="_blank"
                                href="https://jpouktmcsliceesoassj.supabase.co/storage/v1/object/public/public_assets/SWASTIK_BRASS_COMPONENTS_CATALOGUE.pdf"
                                className="w-max text-background font-medium"
                                download
                            >
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
