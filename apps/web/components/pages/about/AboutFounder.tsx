"use client";

import Fade from "@/components/animations/Fade";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import ImageReveal from "@/components/shared/ImageReveal";
import { icons } from "@swastik/ui/constants/icon";

const AboutFounder = () => {
    return (
        <Section className="bg-muted relative py-24 lg:py-32 overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-background hidden lg:block rounded-l-[4rem] border-l border-y border-border/50" />

            <Container className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

                    {/* Left: Founder Portrait */}
                    <div className="lg:col-span-5 relative">
                        <Fade className="relative">
                            <div className="absolute -inset-4 bg-primary rounded-[3rem] -z-10 transform -rotate-3 opacity-20 blur-xl" />
                            <div className="absolute -inset-2 rounded-[2.5rem] border-2 border-primary/20 -z-10 transform rotate-2" />

                            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-border/50 aspect-[3/4]">
                                <ImageReveal
                                    src="/about-founder.png"
                                    alt="Savan Sojitra - Founder & Managing Director"
                                    className="w-full h-full absolute inset-0"
                                    aspectRatio=""
                                    imageClassName="transition-all duration-700 hover:scale-105"
                                    sizes="(max-w-1024px) 100vw, 40vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                            </div>
                        </Fade>
                    </div>

                    {/* Right: Content */}
                    <div className="lg:col-span-7 space-y-10 lg:pl-8">
                        <Fade delay={0.1}>
                            <span className="flex items-center gap-3 text-primary text-sm font-bold uppercase tracking-widest mb-4">
                                <span className="w-8 h-[2px] bg-primary rounded-full" />
                                Leadership
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2">
                                Savan Sojitra
                            </h2>
                            <div className="text-xl text-muted-foreground font-medium">
                                Founder & Managing Director
                            </div>
                        </Fade>

                        <Fade delay={0.2} className="relative">
                            <icons.quoteRequest className="absolute -top-6 -left-6 w-24 h-24 text-primary/10 -z-10 rotate-180" />
                            <p className="text-2xl md:text-3xl text-foreground font-serif italic leading-relaxed">
                                "Precision is not just about measuring down to the micron. It's a culture, an attitude, and a promise we deliver with every single component."
                            </p>
                        </Fade>

                        <Fade delay={0.3} className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                With a profound understanding of metallurgy and modern CNC technologies, Savan Sojitra established Swastik Brass Components to bridge the gap between traditional craftsmanship and Industry 4.0 automation.
                            </p>
                            <p>
                                Under his leadership, the company has expanded its footprint from local supply chains to an international export network, servicing critical sectors like aerospace and railways where failure is not an option. His relentless focus on zero-defect manufacturing continues to drive the company's innovation and growth.
                            </p>
                        </Fade>

                        <Fade delay={0.4}>
                            <div className="pt-8 flex items-center gap-6">
                                <div className="text-sm font-bold tracking-widest uppercase text-foreground">Connect</div>
                                <div className="h-[1px] w-16 bg-border" />
                                <a href="#" className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                                    linkedin
                                </a>
                                <a href="#" className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                                    <icons.mail className="w-5 h-5" />
                                </a>
                            </div>
                        </Fade>
                    </div>

                </div>
            </Container>
        </Section>
    );
};

export default AboutFounder;
