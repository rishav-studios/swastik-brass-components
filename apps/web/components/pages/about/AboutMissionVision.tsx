"use client";

import Fade from "@/components/animations/Fade";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Heading, SectionHeader } from "@/components/shared/SectionHeader";
import { icons } from "@swastik/ui/constants/icon";

const AboutMissionVision = () => {
    return (
        <Section className="bg-background relative py-24 overflow-hidden">
            <Container>
                <SectionHeader className="text-center mb-16 space-y-4">
                    <Heading className="text-4xl md:text-5xl lg:text-6xl font-black">
                        Engineering Our <span className="text-primary">Future</span>
                    </Heading>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Our guiding principles that drive every decision, every process, and every component we manufacture.
                    </p>
                </SectionHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    
                    {/* Mission Card */}
                    <Fade delay={0.1}>
                        <div className="group relative h-full bg-card rounded-[2rem] p-10 md:p-12 border border-border shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-primary/50 transition-all duration-500 overflow-hidden">
                            {/* Decorative background blur */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-primary/20 transition-colors duration-500" />
                            
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform duration-500">
                                    <icons.globe className="w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-bold text-foreground mb-4">Our Mission</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    To manufacture and deliver precision-engineered brass components that meet the exact specifications of our global partners, ensuring uncompromising quality, timely delivery, and competitive value through continuous technological advancement.
                                </p>
                            </div>
                        </div>
                    </Fade>

                    {/* Vision Card */}
                    <Fade delay={0.3}>
                        <div className="group relative h-full bg-card rounded-[2rem] p-10 md:p-12 border border-border shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-primary/50 transition-all duration-500 overflow-hidden">
                            {/* Decorative background blur */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-primary/20 transition-colors duration-500" />
                            
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform duration-500">
                                    <icons.eye className="w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-bold text-foreground mb-4">Our Vision</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    To be the world's most trusted manufacturing partner for critical brass components, setting the global standard for Industry 4.0 integration, zero-defect production, and sustainable manufacturing practices.
                                </p>
                            </div>
                        </div>
                    </Fade>

                </div>
            </Container>
        </Section>
    );
};

export default AboutMissionVision;
