"use client";

import Fade from "@/components/animations/Fade";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import BackgroundNoise, { BackgroundLines } from "@/components/shared/BackgroundNoise";
import ImageReveal from "@/components/shared/ImageReveal";
import { Description, Eyebrow, SectionHeader } from "@/components/shared/SectionHeader";
import { TextRevealOnScroll } from "@/components/shared/TextReveal";
import { icons } from "@swastik/ui/constants/icon";

const QUALITY_FEATURES = [
    {
        title: "Zero-Defect Commitment",
        description: "We enforce strict statistical process control (SPC) and 100% automated optical inspection on critical dimensions.",
        icon: "shieldCheck"
    },
    {
        title: "Advanced CMM Labs",
        description: "Equipped with multi-axis Coordinate Measuring Machines to verify complex geometries down to the micron level.",
        icon: "flaskConical"
    },
    {
        title: "Global Certifications",
        description: "ISO 9001:2015 certified and compliant with IATF 16949 standards for automotive precision components.",
        icon: "checkCircle2"
    }
];

const HomeQuality = () => {
    return (
        <Section className="bg-background overflow-hidden">
            <BackgroundNoise />
            <BackgroundLines className="w-[90%] mx-auto" />
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Content & Features */}
                    <div className="space-y-12">
                        <SectionHeader>
                            <Eyebrow className="ml-0 mb-6">quality assurance</Eyebrow>
                            <TextRevealOnScroll as="h2">
                                {`Precision down to\nthe last micron.`}
                            </TextRevealOnScroll>
                            <Fade delay={0.5}>

                                <Description className="text-left text-lg max-w-md mt-4">
                                    For mission-critical sectors, "close enough" is never enough. Our rigorous inspection protocols ensure every component meets exact tolerances.
                                </Description>
                            </Fade>
                        </SectionHeader>

                        <div className="space-y-8">
                            {QUALITY_FEATURES.map((feature, idx) => {
                                const IconComponent = icons[feature.icon as keyof typeof icons];
                                return (
                                    <Fade key={idx} delay={0.2 + (idx * 0.1)} className="flex gap-6 group">
                                        <div className="shrink-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                            {IconComponent && <IconComponent className="w-6 h-6" />}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-foreground mb-2">{feature.title}</h4>
                                            <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                                        </div>
                                    </Fade>
                                )
                            })}
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="relative">

                        <Fade delay={0.4} threshold={0.2}>
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/50">
                                <ImageReveal
                                    src="/quality-inspection.png"
                                    alt="Precision Quality Inspection"
                                    className="w-full h-full"
                                    aspectRatio="aspect-square lg:aspect-[4/5]"
                                    imageClassName="transition-all duration-700 hover:scale-105"
                                    sizes="(max-w-768px) 100vw, 50vw"
                                />
                                {/* Overlay to ensure text readability if needed, or just aesthetic */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                                {/* Floating Badge */}
                                <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-md px-6 py-4 rounded-2xl border border-border/50 shadow-xl flex items-center gap-4">
                                    <icons.loader2 className="w-8 h-8 text-primary animate-spin-slow" />
                                    <div>
                                        <div className="text-sm font-bold tracking-widest text-foreground uppercase">100%</div>
                                        <div className="text-xs text-muted-foreground font-medium">Optical Inspection</div>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    </div>

                </div>
            </Container>
        </Section>
    );
};

export default HomeQuality;
