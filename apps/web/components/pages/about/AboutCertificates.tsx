"use client";

import Fade from "@/components/animations/Fade";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Eyebrow, Heading, SectionHeader } from "@/components/shared/SectionHeader";
import Image from "next/image";

const CERTIFICATES = [
    {
        title: "ISO 9001:2015",
        description: "Quality Management System certification ensuring consistent delivery of products that meet customer and regulatory requirements.",
        image: "/certificate-iso9001.png"
    },
    {
        title: "ISO 14001:2015",
        description: "Environmental Management System certification demonstrating our commitment to sustainable manufacturing practices.",
        image: "/certificate-iso14001.png"
    },
    {
        title: "IATF 16949 Compliant",
        description: "Adhering to the stringent quality requirements of the global automotive industry supply chain.",
        image: "/certificate-iatf16949.png"
    }
];

const AboutCertificates = () => {
    return (
        <Section className="bg-foreground text-background relative py-24 lg:py-32 overflow-hidden">
            {/* Subtle Top Border */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <Container>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <SectionHeader className="w-max space-y-4">
                        <Eyebrow className="ml-0 bg-primary/20 text-primary">certified quality</Eyebrow>
                        <Heading className="ml-0 text-white">
                            Globally <span className="text-primary">Recognized</span><br />
                            Standards.
                        </Heading>
                    </SectionHeader>
                    <Fade delay={0.2}>
                        <p className="max-w-md text-muted-foreground text-lg">
                            We operate under the strictest international quality frameworks to guarantee precision and reliability in every component.
                        </p>
                    </Fade>
                </div>

                {/* Horizontal Scroll Snap Container */}
                <div className="w-full overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                    <div className="flex gap-6 md:gap-8 w-max">
                        {CERTIFICATES.map((cert, idx) => (
                            <Fade key={idx} delay={0.1 + (idx * 0.1)} className="snap-center shrink-0 w-[85vw] sm:w-[400px] group">
                                <div className="bg-black/40 border border-white/10 rounded-[2rem] p-6 h-full hover:bg-black/60 hover:border-primary/50 transition-all duration-300">
                                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-8 border border-white/5">
                                        <Image
                                            src={cert.image}
                                            alt={cert.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-white mb-3">{cert.title}</h4>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {cert.description}
                                    </p>
                                </div>
                            </Fade>
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default AboutCertificates;
