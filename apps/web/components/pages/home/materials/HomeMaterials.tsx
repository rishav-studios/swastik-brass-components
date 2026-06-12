"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import ImageReveal from "@/components/shared/ImageReveal";
import { Description, Eyebrow, Heading, SectionHeader } from "@/components/shared/SectionHeader";
import Fade from "@/components/animations/Fade";

const MATERIALS = [
  {
    key: "brass",
    index: "01",
    title: "Brass",
    tagline: "The Gold Standard",
    description: "Our core expertise. We work with a full spectrum of brass alloys — from free-cutting CZ121 to high-tensile CZ114 — delivering components that combine excellent machinability with superior corrosion resistance.",
    properties: ["High Machinability", "Corrosion Resistant", "Excellent Conductivity", "Lead-Free Options"],
    image: "/materials-brass.png",
  },
  {
    key: "stainless-steel",
    index: "02",
    title: "Stainless Steel",
    tagline: "Built to Endure",
    description: "For applications demanding extreme strength and heat resistance, we precision-machine SS 304, SS 316, and duplex grades into fittings, fasteners, and custom-profile components.",
    properties: ["Heat Resistant", "High Strength", "Food-Grade Safe", "Marine Grade"],
    image: "/materials-steel.png",
  },
  {
    key: "aluminium",
    index: "03",
    title: "Aluminium",
    tagline: "Light. Strong. Versatile.",
    description: "Lightweight yet structurally robust, our aluminium components in 6061 and 7075 alloys serve aerospace, electronics, and automotive sectors where weight savings matter.",
    properties: ["Lightweight", "High Strength-to-Weight", "Anodizable", "Thermally Conductive"],
    image: "/materials-aluminium.png",
  },
];

const HomeMaterials = () => {
    return (
        <Section className="py-24 bg-muted overflow-hidden relative">
            <Container>
                <SectionHeader className="mb-16 md:mb-24 text-center mx-auto max-w-3xl">
                    <Eyebrow className="mx-auto">materials</Eyebrow>
                    <Heading>Materials We Deal With</Heading>
                    <Description>Expertise across premium metals for specialized applications</Description>
                </SectionHeader>

                <div className="space-y-24 md:space-y-32">
                    {MATERIALS.map((material, idx) => {
                        const isEven = idx % 2 === 0;
                        
                        return (
                            <div 
                                key={material.key}
                                className={`flex flex-col gap-10 lg:gap-16 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                            >
                                {/* Content Side */}
                                <div className="w-full lg:w-1/2 space-y-6">
                                    <Fade delay={0.1}>
                                        <div className="flex items-baseline gap-4 mb-4">
                                            <span className="text-3xl font-bold text-primary/80 tracking-widest">{material.index}</span>
                                            <h3 className="text-4xl md:text-5xl font-semibold">{material.title}</h3>
                                        </div>
                                    </Fade>

                                    <Fade delay={0.2}>
                                        <p className="text-xl md:text-2xl font-medium text-foreground/80">
                                            {material.tagline}
                                        </p>
                                    </Fade>

                                    <Fade delay={0.3}>
                                        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                                            {material.description}
                                        </p>
                                    </Fade>

                                    <Fade delay={0.4}>
                                        <div className="flex flex-wrap gap-3 pt-4">
                                            {material.properties.map((prop, pIdx) => (
                                                <span 
                                                    key={pIdx} 
                                                    className="px-4 py-2 bg-background border border-border text-foreground text-sm font-medium rounded-full shadow-sm"
                                                >
                                                    {prop}
                                                </span>
                                            ))}
                                        </div>
                                    </Fade>
                                </div>

                                {/* Image Side */}
                                <div className="w-full lg:w-1/2">
                                    <Fade delay={0.2} threshold={0.1}>
                                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/50 bg-background/50 aspect-[4/3] group">
                                            <ImageReveal
                                                src={material.image}
                                                alt={material.title}
                                                className="w-full h-full"
                                                imageClassName="transition-all duration-700 group-hover:scale-105"
                                                sizes="(max-w-768px) 100vw, 50vw"
                                                aspectRatio="aspect-[4/3]"
                                            />
                                        </div>
                                    </Fade>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Container>
        </Section>
    );
};

export default HomeMaterials;
