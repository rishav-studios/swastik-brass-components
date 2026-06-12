"use client";

import Fade from "@/components/animations/Fade";
import Container from "@/components/layout/Container";
import { Eyebrow, Heading, SectionHeader } from "@/components/shared/SectionHeader";
import Image from "next/image";

const MILESTONES = [
    {
        year: 1999,
        title: "The Foundation",
        description: "Established our first modest workshop in Jamnagar with just two manual lathe machines and a vision for precision.",
        image: "/about-facility.png"
    },
    {
        year: 2005,
        title: "Global Reach",
        description: "Achieved our first international export order, marking our transition from a local supplier to a global player.",
        image: "/about-parts.png"
    },
    {
        year: 2012,
        title: "CNC Revolution",
        description: "Completely overhauled our manufacturing line, introducing state-of-the-art CNC turning centers for micron-level accuracy.",
        image: "/about-blueprint.png"
    },
    {
        year: 2018,
        title: "Aerospace Entry",
        description: "Secured stringent quality certifications allowing us to supply mission-critical components to the aerospace sector.",
        image: "/about-technician.png"
    },
    {
        year: 2024,
        title: "Scale & Sustainability",
        description: "Expanded to a 10,000 sq ft facility capable of producing over 50,000 zero-defect components monthly.",
        image: "/about-facility-wide.png"
    }
];

const AboutJourney = () => {
    return (
        <section className="bg-muted relative py-24 lg:py-32 overflow-hidden">
            <Container>
                <SectionHeader className="w-max mx-auto text-center space-y-4 mb-20 lg:mb-32">
                    <Eyebrow className="mx-auto">our journey</Eyebrow>
                    <Heading className="mx-auto leading-tight">
                        Milestones of <span className="text-primary">Growth</span>
                    </Heading>
                </SectionHeader>

                <div className="relative max-w-5xl mx-auto">
                    {/* The Center Spine */}
                    <div className="absolute left-[24px] lg:left-1/2 top-0 bottom-0 w-[2px] bg-border -translate-x-1/2 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
                    </div>

                    <div className="space-y-16 lg:space-y-32">
                        {MILESTONES.map((milestone, idx) => {
                            const isEven = idx % 2 === 0;
                            return (
                                <div key={idx} className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                                    
                                    {/* Spacer for empty side on desktop */}
                                    <div className="hidden lg:block w-1/2" />

                                    {/* The Node on the Spine */}
                                    <div className="absolute left-[24px] lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-4 border-primary z-10 shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
                                    
                                    {/* The Content Card */}
                                    <div className={`w-full lg:w-1/2 pl-16 lg:pl-0 ${isEven ? 'lg:pr-16 text-left lg:text-right' : 'lg:pl-16 text-left'}`}>
                                        <Fade delay={0.1} className="bg-background p-8 md:p-10 rounded-[2rem] shadow-xl border border-border/50 relative group hover:-translate-y-1 transition-all duration-300">
                                            {/* Connector Line (Desktop) */}
                                            <div className={`hidden lg:block absolute top-1/2 -translate-y-1/2 w-16 h-[2px] bg-border ${isEven ? '-right-16' : '-left-16'}`} />
                                            
                                            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm mb-4">
                                                {milestone.year}
                                            </span>
                                            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                                                {milestone.title}
                                            </h3>
                                            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                                                {milestone.description}
                                            </p>
                                            
                                            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-border">
                                                <Image
                                                    src={milestone.image}
                                                    alt={milestone.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                    sizes="(max-w-1024px) 100vw, 33vw"
                                                />
                                            </div>
                                        </Fade>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default AboutJourney;
