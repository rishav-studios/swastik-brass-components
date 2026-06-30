"use client"
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import { Eyebrow, Heading, SectionHeader } from '@/components/shared/SectionHeader';
import { icons } from '@swastik/ui/constants/icon';
import {
    motion,
    useInView,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
} from 'motion/react';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

// --- CONFIGURATION & DATA ---

const CUSTOM_EASE = [0.22, 1, 0.36, 1];

const TOP_SQUARES = [
    { x: 6, y: 20, s: 12 }, { x: 12, y: 32, s: 8 }, { x: 8, y: 44, s: 6 },
    { x: 88, y: 18, s: 10 }, { x: 92, y: 30, s: 14 }, { x: 85, y: 42, s: 7 },
    { x: 90, y: 52, s: 5 }, { x: 14, y: 56, s: 5 }
];

const CASE_STUDIES = [
    {
        id: "heartx", title: "HeartX", category: "Brand Strategy & Product Design", year: "2026",
        image: "https://images.pexels.com/photos/7691249/pexels-photo-7691249.jpeg?auto=compress&cs=tinysrgb&w=800",
        squares: [{ x: 5, y: 30, s: 16 }, { x: 10, y: 42, s: 10 }, { x: 3, y: 52, s: 7 }, { x: 80, y: 70, s: 14 }, { x: 85, y: 82, s: 9 }, { x: 78, y: 60, s: 6 }]
    },
    {
        id: "swave", title: "Swave®", category: "Web Design & Identity", year: "2025",
        image: "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=800",
        squares: [{ x: 82, y: 55, s: 16 }, { x: 88, y: 68, s: 10 }, { x: 78, y: 72, s: 7 }, { x: 85, y: 42, s: 6 }, { x: 90, y: 80, s: 8 }]
    },
    {
        id: "eduspark", title: "EduSpark", category: "Brand Strategy & Web Design", year: "2023",
        image: "https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?auto=compress&cs=tinysrgb&w=800",
        squares: [{ x: 4, y: 24, s: 16 }, { x: 10, y: 36, s: 10 }, { x: 2, y: 44, s: 7 }, { x: 78, y: 78, s: 14 }, { x: 84, y: 88, s: 8 }]
    },
    {
        id: "greenergy", title: "Greenergy", category: "Brand Strategy & Web Design", year: "2022",
        image: "https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=800",
        squares: [{ x: 82, y: 26, s: 14 }, { x: 88, y: 38, s: 10 }, { x: 78, y: 44, s: 7 }, { x: 84, y: 54, s: 5 }, { x: 90, y: 60, s: 8 }]
    }
];

const MARQUEE_LOGOS = [
    { name: "Codecraft_", icon: "code" },
    { name: "ennLabs", icon: "dots" },
    { name: "GlobalBank", icon: "circle-ring" },
    { name: "45 Degrees°", icon: "arrow" },
    { name: "AlphaWave", icon: "wave-circle" },
    { name: "Biosynthesis", icon: "lines" },
    { name: "Boltshift", icon: "bolt" },
    { name: "Clandestine", icon: "plus" }
];

// --- SUB-COMPONENTS ---

const MarqueeIcon = ({ type }: { type: string }) => {
    switch (type) {
        case 'code':
            return (
                <svg viewBox="0 0 22 18" className="h-4 w-4 fill-none stroke-foreground stroke-2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 4 1 9 6 14" /><polyline points="16 4 21 9 16 14" /><line x1="13" y1="2" x2="9" y2="16" />
                </svg>
            );
        case 'dots':
            return (
                <svg viewBox="0 0 20 20" className="h-4 w-4 fill-foreground">
                    {[3, 10, 17].map(cx => [3, 10, 17].map(cy => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.2" />))}
                </svg>
            );
        case 'circle-ring':
            return (
                <svg viewBox="0 0 22 22" className="h-[18px] w-[18px] fill-none stroke-foreground stroke-2">
                    <circle cx="11" cy="11" r="9" /><circle cx="11" cy="11" r="4" />
                </svg>
            );
        case 'arrow':
            return (
                <svg viewBox="0 0 18 18" className="h-4 w-4 fill-none stroke-foreground stroke-2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="2" y1="16" x2="16" y2="2" /><polyline points="7 2 16 2 16 11" />
                </svg>
            );
        case 'wave-circle':
            return (
                <svg viewBox="0 0 22 22" className="h-[18px] w-[18px] fill-none stroke-foreground" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="9" /><path d="M5 11Q8 7 11 11Q14 15 17 11" />
                </svg>
            );
        case 'lines':
            return (
                <svg viewBox="0 0 24 18" className="h-4 w-5 fill-none stroke-foreground" strokeWidth="2.2" strokeLinecap="round">
                    <line x1="0" y1="3" x2="24" y2="3" /><line x1="6" y1="9" x2="24" y2="9" /><line x1="0" y1="15" x2="18" y2="15" />
                </svg>
            );
        case 'bolt':
            return (
                <svg viewBox="0 0 14 20" className="h-[18px] w-auto fill-foreground">
                    <polygon points="8,0 0,11 6,11 6,20 14,9 8,9" />
                </svg>
            );
        case 'plus':
            return (
                <svg viewBox="0 0 18 18" className="h-4 w-4 fill-foreground">
                    <rect x="7.5" y="0" width="3" height="18" /><rect x="0" y="7.5" width="18" height="3" />
                </svg>
            );
        default: return null;
    }
};

const MagneticSquare = ({ x, y, size, pointerXSpring, pointerYSpring }: any) => {
    const shiftX = useTransform(pointerXSpring, (val: number) => (val - (x / 100)) * 40);
    const shiftY = useTransform(pointerYSpring, (val: number) => (val - (y / 100)) * 40);

    return (
        <motion.div
            style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, x: shiftX, y: shiftY }}
            className="absolute bg-black pointer-events-none z-10"
        />
    );
};

const CaseStudyCard = ({ study, index }: any) => {
    const [isHovered, setIsHovered] = useState(false);
    const pointerX = useMotionValue(0.5);
    const pointerY = useMotionValue(0.5);

    const springConfig = { stiffness: 80, damping: 18, mass: 0.6 };
    const pointerXSpring = useSpring(pointerX, springConfig);
    const pointerYSpring = useSpring(pointerY, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        pointerX.set((e.clientX - rect.left) / rect.width);
        pointerY.set((e.clientY - rect.top) / rect.height);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        pointerX.set(0.5);
        pointerY.set(0.5);
    };

    const renderPixelOverlay = () => {
        const blocks = [];
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 12; col++) {
                const delayIn = ((row + 1) + (col + 1)) * 0.018;
                const delayOut = ((8 - (row + 1)) + (12 - (col + 1))) * 0.012;

                blocks.push(
                    <motion.div
                        key={`${row}-${col}`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{ delay: isHovered ? delayIn : delayOut, duration: 0.25, ease: 'easeInOut' }}
                        className="bg-black/80 w-full h-full origin-center"
                    />
                );
            }
        }
        return (
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 z-[5] pointer-events-none">
                {blocks}
            </div>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: index * 0.1, duration: 0.7, ease: "easeInOut" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative overflow-hidden aspect-[4/3] bg-gray-100 cursor-pointer rounded-[2rem] border border-border/50"
        >
            <img src={study.image} alt={study.title} className="absolute inset-0 h-full w-full object-cover" />

            {renderPixelOverlay()}

            {study.squares.map((sq: any, i: number) => (
                <MagneticSquare key={i} x={sq.x} y={sq.y} size={sq.s} pointerXSpring={pointerXSpring} pointerYSpring={pointerYSpring} />
            ))}

            <div className="absolute right-4 top-4 z-10 flex h-7 w-7 items-center justify-center border border-white/30 text-xs text-white mix-blend-difference rounded-full">
                +
            </div>

            <div className="absolute bottom-0 left-0 z-20 bg-white px-6 pb-5 pt-4 max-w-[80%] rounded-tr-[2rem]">
                <h3 className="text-[clamp(1.4rem,2.2vw,2rem)] font-bold leading-tight text-black">
                    {study.title}
                </h3>
                <div className="mt-1.5 flex flex-row items-center gap-4">
                    <span className="text-[12px] text-black/60 font-medium tracking-wide uppercase">{study.category}</span>
                    <span className="text-[12px] font-bold text-black bg-black/5 px-2 py-0.5 rounded-full">{study.year}</span>
                </div>
            </div>
        </motion.div>
    );
};


// --- MAIN EXPORT ---

export default function ProjectsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });

    return (
        <Section
            ref={sectionRef}
            className="relative bg-background text-foreground overflow-hidden py-24 lg:py-32"
        >
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes marqueeProjects {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-projects {
          animation: marqueeProjects 28s linear infinite;
        }
        .marquee-projects:hover {
          animation-play-state: paused;
        }
      `}} />

            {/* Parallax Floating Squares Layer */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
                {TOP_SQUARES.map((sq, i) => {
                    const yOffset = useTransform(scrollYProgress, [0, 1], [0, -(80 + i * 30)]);
                    const springY = useSpring(yOffset, { stiffness: 40, damping: 20 });
                    return (
                        <motion.div
                            key={i}
                            style={{ left: `${sq.x}%`, top: `${sq.y}%`, y: springY }}
                            className="absolute"
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                                className="bg-primary/20 backdrop-blur-sm rounded-sm"
                                style={{ width: sq.s, height: sq.s }}
                            />
                        </motion.div>
                    );
                })}
            </div>

            <Container className="relative z-10 space-y-16 lg:space-y-24">

                {/* Header Text */}
                <div ref={headerRef} className="mx-auto w-full text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                    >
                        <SectionHeader className="w-max mx-auto text-center space-y-4">
                            <Eyebrow className="mx-auto">Projects</Eyebrow>
                            <Heading className="mx-auto leading-tight">
                                Insights from <br className="hidden md:block" />
                                <span className="text-primary">Our Case Studies</span>
                            </Heading>
                        </SectionHeader>
                    </motion.div>
                </div>

                {/* Cards Grid */}
                <div className="grid gap-8 md:grid-cols-2">
                    {CASE_STUDIES.map((study, idx) => (
                        <CaseStudyCard key={study.id} study={study} index={idx} />
                    ))}
                </div>

                {/* Footer Area */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 pt-8 border-t border-border/50">

                    {/* Left Side */}
                    <div className="max-w-xl">
                        <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <icons.grade className="w-5 h-5" />
                        </div>
                        <p className="text-lg leading-relaxed text-muted-foreground">
                            We partner with ambitious brands that are ready to move beyond fragmented visuals and shallow quick fixes — turning their identity, website, and messaging into one focused engine for growth.
                        </p>

                        <div className="mt-8">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white text-lg font-bold rounded-full hover:bg-primary/90 transition-all shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:shadow-[0_0_50px_rgba(234,179,8,0.6)] hover:-translate-y-1 group w-max"
                            >
                                Let's work together
                                <icons.arrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Side Marquee */}
                    <div className="flex-1 overflow-hidden w-full md:max-w-[50%] opacity-50 hover:opacity-100 transition-opacity duration-500">
                        <div className="marquee-projects flex w-max">
                            {[...MARQUEE_LOGOS, ...MARQUEE_LOGOS].map((logo, index) => (
                                <div key={index} className="flex shrink-0 items-center gap-3 px-8">
                                    <MarqueeIcon type={logo.icon} />
                                    <span className="whitespace-nowrap font-semibold tracking-wider uppercase text-foreground">
                                        {logo.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </Container>
        </Section>
    );
}

