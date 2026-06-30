"use client";

import Container from "@/components/layout/Container";
import { Eyebrow, SectionHeader } from "@/components/shared/SectionHeader";
import { TextRevealOnScroll } from "@/components/shared/TextReveal";
import { icons } from "@swastik/ui/constants/icon";
import { MotionValue, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";

const STATS = [
    { value: 25, suffix: "+", label: "Years of Experience", icon: "grade" },
    { value: 10000, suffix: "+", label: "sq. ft. Manufacturing Space", icon: "factory" },
    { value: 4, suffix: "+", label: "Sectors Served", icon: "sector" },
    { value: 50000, suffix: "+", label: "Monthly Components", icon: "database" },
] as const;

function AnimatedCounter({
    motionValue,
    suffix
}: {
    motionValue: MotionValue<number>;
    suffix: string
}) {
    const [display, setDisplay] = useState(0);

    useMotionValueEvent(motionValue, "change", (latest) => {
        setDisplay(Math.round(latest));
    });

    return (
        <span className="tabular-nums tracking-tighter">
            {display.toLocaleString()}{suffix}
        </span>
    );
}

const HomeImpact = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Progress bar width
    const progressWidth = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

    // Title opacity
    const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
    const titleY = useTransform(scrollYProgress, [0, 0.1], [20, 0]);

    return (
        <section
            ref={containerRef}
            className="h-[300vh] bg-foreground relative text-background"
        >
            {/* Sticky Container */}
            <div className="sticky top-0 h-dvh flex flex-col justify-center overflow-hidden">

                {/* Subtle Dot Grid Background */}
                <div
                    className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(var(--background) 2px, transparent 2px)',
                        backgroundSize: '32px 32px'
                    }}
                />

                {/* Glow Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vh] bg-primary/10 rounded-[100%] blur-[120px] pointer-events-none z-0" />

                <Container className="relative z-10">
                    <SectionHeader>
                        <Eyebrow>Statistics</Eyebrow>
                        <TextRevealOnScroll hiddenColor="#36332d" revealedColor="#fff" as="h2" className="leading-tight whitespace-pre-line text-center">
                            {`Numbers speaks for itself`}
                        </TextRevealOnScroll>
                    </SectionHeader>

                    {/* Progress Bar Container */}
                    <motion.div
                        className="w-full max-w-5xl mx-auto h-px bg-background/10 mt-8 mb-16 md:mb-24 relative overflow-hidden"
                    >
                        <motion.div
                            className="absolute top-0 left-0 bottom-0 bg-primary shadow-[0_0_20px_var(--primary)]"
                            style={{ width: progressWidth }}
                        />
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-4 lg:gap-8 mx-auto">
                        {STATS.map((stat, idx) => {
                            // Calculate specific scroll windows for this card
                            const startAppear = 0.15 + (idx * 0.1);
                            const endAppear = startAppear + 0.15;

                            const opacity = useTransform(scrollYProgress, [startAppear, endAppear, 1], [0, 1, 1]);
                            const y = useTransform(scrollYProgress, [startAppear, endAppear], [40, 0]);
                            const countValue = useTransform(scrollYProgress, [startAppear, endAppear], [0, stat.value]);

                            const IconComponent = icons[stat.icon as keyof typeof icons];

                            return (
                                <motion.div
                                    key={idx}
                                    style={{ opacity, y }}
                                    className={`flex flex-col items-center text-center space-y-4 ${idx === 4 ? 'col-span-2 md:col-span-1' : ''}`}
                                >
                                    {IconComponent && (
                                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-2 md:mb-4 shadow-[0_0_15px_rgba(234,179,8,0.1)]">
                                            <IconComponent className="w-5 h-5 md:w-8 md:h-8" />
                                        </div>
                                    )}
                                    <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-background drop-shadow-md">
                                        <AnimatedCounter motionValue={countValue} suffix={stat.suffix} />
                                    </div>
                                    <div className="text-xs md:text-sm tracking-[0.15em] leading-relaxed uppercase text-muted-foreground font-semibold max-w-[150px]">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </Container>
            </div>
        </section>
    );
};

export default HomeImpact;
