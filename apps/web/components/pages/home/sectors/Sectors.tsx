"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Description, Eyebrow, Heading, SectionHeader } from "@/components/shared/SectionHeader";
import { useEffect, useRef, useState } from "react";
import { MorphingParticles } from "./Particles";

const SECTORS = [
    {
        key: "aerospace",
        title: "Aerospace",
        description: "Precision-engineered brass connectors, bushings, and sensor housings built to survive extreme altitudes, vibration, and thermal cycling.",
        highlights: ["MIL-spec certified", "High-altitude tolerant", "Vibration-resistant"],
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M185.33,114.21l29.14-27.42.17-.17a32,32,0,0,0-45.26-45.26c0,.06-.11.11-.17.17L141.79,70.67l-83-30.2a8,8,0,0,0-8.39,1.86l-24,24a8,8,0,0,0,1.22,12.31l63.89,42.59L76.69,136H56a8,8,0,0,0-5.65,2.34l-24,24A8,8,0,0,0,29,175.42l36.82,14.73,14.7,36.75.06.16a8,8,0,0,0,13.18,2.47l23.87-23.88A8,8,0,0,0,120,200V179.31l14.76-14.76,42.59,63.89a8,8,0,0,0,12.31,1.22l24-24a8,8,0,0,0,1.86-8.39Zm-.07,97.23-42.59-63.88A8,8,0,0,0,136.8,144c-.27,0-.53,0-.79,0a8,8,0,0,0-5.66,2.35l-24,24A8,8,0,0,0,104,176v20.69L90.93,209.76,79.43,181A8,8,0,0,0,75,176.57l-28.74-11.5L59.32,152H80a8,8,0,0,0,5.66-2.34l24-24a8,8,0,0,0-1.22-12.32L44.56,70.74l13.5-13.49,83.22,30.26a8,8,0,0,0,8.56-2L180.78,52.6A16,16,0,0,1,203.4,75.23l-32.87,30.93a8,8,0,0,0-2,8.56l30.26,83.22Z"></path></svg>`,
    },
    {
        key: "automobile",
        title: "Automobile",
        description: "High-volume brass components for fuel injection systems, electrical terminals, and transmission assemblies — zero-defect at scale.",
        highlights: ["Zero-defect production", "IATF 16949 aligned", "High-volume capable"],
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M240,112H211.31L168,68.69A15.86,15.86,0,0,0,156.69,64H44.28A16,16,0,0,0,31,71.12L1.34,115.56A8.07,8.07,0,0,0,0,120v48a16,16,0,0,0,16,16H33a32,32,0,0,0,62,0h66a32,32,0,0,0,62,0h17a16,16,0,0,0,16-16V128A16,16,0,0,0,240,112ZM44.28,80H156.69l32,32H23ZM64,192a16,16,0,1,1,16-16A16,16,0,0,1,64,192Zm128,0a16,16,0,1,1,16-16A16,16,0,0,1,192,192Zm48-24H223a32,32,0,0,0-62,0H95a32,32,0,0,0-62,0H16V128H240Z"></path></svg>`,
    },
    {
        key: "railway",
        title: "Railway",
        description: "Heavy-duty brass fittings for brake systems, signalling equipment, and pantograph assemblies — engineered for decades of service.",
        highlights: ["RDSO approved", "Corrosion-resistant", "25+ year lifespan"],
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M184,24H72A32,32,0,0,0,40,56V184a32,32,0,0,0,32,32h8L65.6,235.2a8,8,0,1,0,12.8,9.6L100,216h56l21.6,28.8a8,8,0,1,0,12.8-9.6L176,216h8a32,32,0,0,0,32-32V56A32,32,0,0,0,184,24ZM56,120V80h64v40Zm80-40h64v40H136ZM72,40H184a16,16,0,0,1,16,16v8H56V56A16,16,0,0,1,72,40ZM184,200H72a16,16,0,0,1-16-16V136H200v48A16,16,0,0,1,184,200ZM96,172a12,12,0,1,1-12-12A12,12,0,0,1,96,172Zm88,0a12,12,0,1,1-12-12A12,12,0,0,1,184,172Z"></path></svg>`,
    },
    {
        key: "oil-gas",
        title: "Oil & Gas",
        description: "Explosion-proof brass cable glands, valve bodies, and instrumentation fittings rated for ATEX Zone 1 and subsea environments.",
        highlights: ["ATEX Zone 1 rated", "Subsea grade", "Anti-spark certified"],
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M116,176a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h28A8,8,0,0,1,116,176Zm60-8H148a8,8,0,0,0,0,16h28a8,8,0,0,0,0-16Zm64,48a8,8,0,0,1-8,8H24a8,8,0,0,1,0-16h8V88a8,8,0,0,1,12.8-6.4L96,120V88a8,8,0,0,1,12.8-6.4l38.74,29.05L159.1,29.74A16.08,16.08,0,0,1,174.94,16h18.12A16.08,16.08,0,0,1,208.9,29.74l15,105.13s.08.78.08,1.13v72h8A8,8,0,0,1,240,216Zm-77.86-94.4,8.53,6.4h36.11L193.06,32H174.94ZM48,208H208V144H168a8,8,0,0,1-4.8-1.6l-14.4-10.8,0,0L112,104v32a8,8,0,0,1-12.8,6.4L48,104Z"></path></svg>`,
    },
];

const Sectors = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const options = {
            root: null,
            // Triggers exactly when the card crosses the center of the screen
            rootMargin: "-50% 0px -49% 0px",
            threshold: 0,
        };

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = Number(entry.target.getAttribute("data-index"));
                    if (!isNaN(index)) {
                        setActiveIndex(index);
                    }
                }
            });
        }, options);

        const cards = document.querySelectorAll(".sector-card");
        cards.forEach((card) => observerRef.current?.observe(card));

        return () => {
            observerRef.current?.disconnect();
        };
    }, []);

    const activeSector = SECTORS[activeIndex] || SECTORS[0];

    return (


        <Section id="sectors" className="py-0 lg:py-0 relative bg-background">
            <Container className="pt-16 lg:pt-24 pb-8">
                <SectionHeader className="mb-8">
                    <Eyebrow>sectors</Eyebrow>
                    <Heading>Sectors We Serve</Heading>
                    <Description>Precision components across industries</Description>
                </SectionHeader>
            </Container>

            <div className="relative">
                {/* Mobile View: Just vertical stacked cards without Particles */}
                <div className="md:hidden">
                    <Container>
                        {SECTORS.map((sector, index) => (
                            <div key={sector.key} className="py-12 border-b border-gray-200 last:border-0">
                                <div className="text-sm font-bold text-primary mb-2">0{index + 1}</div>
                                <h3 className="text-3xl font-semibold mb-4">{sector.title}</h3>
                                <p className="text-gray-600 mb-6">{sector.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {sector.highlights.map((h, i) => (
                                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                            {h}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </Container>
                </div>

                {/* Desktop View: Scroll Hijack / Sticky Layout */}
                <div className="hidden md:grid grid-cols-2 relative mx-auto w-[90%]">
                    {/* Left side: Scrollable cards */}
                    <div className="pl-4 lg:pl-[2vw] pr-8 pb-32">
                        {SECTORS.map((sector, index) => (
                            <div
                                key={sector.key}
                                data-index={index}
                                className={`sector-card h-dvh flex flex-col justify-center transition-all duration-500 ease-in-out border-l-4 pl-8
                                    ${activeIndex === index ? "opacity-100 border-primary" : "opacity-30 border-transparent"}
                                `}
                            >
                                <div className="text-lg font-bold text-primary/80 mb-4 tracking-widest">
                                    0{index + 1}
                                </div>
                                <h3 className="text-5xl font-semibold mb-6">{sector.title}</h3>
                                <p className="text-xl text-gray-600 mb-8 max-w-md leading-relaxed">
                                    {sector.description}
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {sector.highlights.map((h, i) => (
                                        <span key={i} className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full border border-gray-200">
                                            {h}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right side: Sticky Particles */}
                    <div className="relative">
                        <div className="sticky top-0 h-dvh flex items-center justify-center overflow-hidden">
                            <MorphingParticles
                                svgString={activeSector!.svg}
                                className="w-full h-[60vh] max-h-[800px] bg-transparent"
                                isActive={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Section>

    );
};

export default Sectors;