"use client";

import Fade from "@/components/animations/Fade";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import ImageReveal from "@/components/shared/ImageReveal";
import { Description, Eyebrow, Heading, SectionHeader } from "@/components/shared/SectionHeader";
import { icons } from "@swastik/ui/constants/icon";

const STATS = [
    { label: "Manufacturing Space", value: "10,000+", suffix: " sq ft" },
    { label: "Monthly Components", value: "50K+", suffix: "" },
    { label: "Export Countries", value: "10+", suffix: "" },
];

const AboutOverview = () => {
    return (
        <Section className="bg-background relative py-24 lg:py-32 overflow-hidden">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    
                    {/* Left: Content */}
                    <div className="space-y-10">
                        <SectionHeader className="w-full space-y-6">
                            <Eyebrow className="ml-0">who we are</Eyebrow>
                            <Heading className="ml-0 leading-tight text-left">
                                A legacy of <span className="text-primary">craftsmanship</span> <br className="hidden lg:block" />
                                built for the modern era.
                            </Heading>
                        </SectionHeader>

                        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                            <Fade delay={0.1}>
                                <p>
                                    Founded in the heart of India's manufacturing belt, Swastik Brass Components began with a singular vision: to elevate the standard of precision engineering. What started as a modest workshop has evolved into a global powerhouse for brass components.
                                </p>
                            </Fade>
                            <Fade delay={0.2}>
                                <p>
                                    Today, we operate a state-of-the-art facility equipped with advanced CNC machinery and automated optical inspection systems. Our transition from traditional methods to industry 4.0 standards has allowed us to serve the most demanding sectors, including aerospace, defense, and railways.
                                </p>
                            </Fade>
                        </div>

                        <Fade delay={0.3} className="grid grid-cols-2 sm:grid-cols-3 gap-8 pt-8 border-t border-border">
                            {STATS.map((stat, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="text-3xl font-bold text-foreground">
                                        {stat.value}<span className="text-primary text-xl">{stat.suffix}</span>
                                    </div>
                                    <div className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </Fade>
                    </div>

                    {/* Right: Image */}
                    <Fade delay={0.4} className="relative h-full min-h-[500px] w-full">
                        {/* Decorative background element */}
                        <div className="absolute -inset-4 bg-primary/5 rounded-[2.5rem] -z-10 transform -rotate-3" />
                        
                        <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-border/50">
                            <ImageReveal
                                src="/about-facility-wide.png"
                                alt="Swastik Brass Modern Facility"
                                className="w-full h-full absolute inset-0"
                                aspectRatio="" // Fill container
                                imageClassName="transition-all duration-1000 hover:scale-105"
                                sizes="(max-w-1024px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -left-6 bg-background p-6 rounded-3xl border border-border shadow-xl flex items-center gap-4 z-20">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <icons.globe className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-xl font-bold text-foreground leading-none">Global</div>
                                <div className="text-sm text-muted-foreground font-medium mt-1">Export Network</div>
                            </div>
                        </div>
                    </Fade>

                </div>
            </Container>
        </Section>
    );
};

export default AboutOverview;
