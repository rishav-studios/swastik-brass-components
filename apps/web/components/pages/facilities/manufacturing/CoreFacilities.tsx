import Fade from "@/components/animations/Fade";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import BackgroundNoise, { BackgroundLines } from "@/components/shared/BackgroundNoise";
import { Description, Eyebrow, SectionHeader } from "@/components/shared/SectionHeader";
import { TextRevealOnScroll } from "@/components/shared/TextReveal";
import { cn } from "@swastik/ui/lib/utils";
import Image from "next/image";

type Machine = {
    name?: string;
    description?: string;
    image: string;
}

type FacilityGroup = {
    groupName: string;
    description?: string;
    eyebrow?: string;
    machines: Machine[];
}

type CoreFacilitiesProps = {
    groups: FacilityGroup[];
}

const CoreFacilities = ({ groups }: CoreFacilitiesProps) => {
    return (
        <Section className="bg-background">
            <BackgroundNoise />
            <BackgroundLines />
            <Container className="space-y-32 relative z-10">
                {groups.map((group, index) => (
                    <div key={index} className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
                        {/* Sticky Title Column */}
                        <div className="w-full lg:w-1/3 shrink-0">
                            <SectionHeader className="sticky space-y-4 top-32">
                                {group.eyebrow && <Eyebrow>{group.eyebrow}</Eyebrow>}
                                <TextRevealOnScroll as="h2">
                                    {group.groupName}
                                </TextRevealOnScroll>
                                <Fade>
                                    <Description className="text-start text-base">

                                        {group.description}
                                    </Description>
                                </Fade>
                            </SectionHeader>
                        </div>

                        {/* Scrolling Machines Column */}
                        <div className="w-full lg:w-2/3 flex flex-col gap-12">
                            {group.machines.map((machine, mIndex) => (
                                <Fade key={mIndex} delay={mIndex * 0.08}>
                                    <div className={cn("group bg-card border border-border rounded-2xl overflow-hidden flex flex-col sm:flex-row hover:border-primary/20 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5",)}>
                                        {/* Image */}
                                        <div className={cn("relative w-full  overflow-hidden", machine.name ? "sm:w-2/5 h-72" : "w-full h-84")}>
                                            <Image
                                                src={machine.image}
                                                alt={machine.name || `image-${mIndex}`}
                                                fill
                                                className="object-contain transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Content */}
                                        {
                                            machine.name &&
                                            <div className="p-8 sm:w-3/5 flex flex-col justify-center gap-3">
                                                <h3 className="text-xl font-semibold text-foreground leading-snug">{machine.name}</h3>
                                                <div className="w-8 h-px bg-primary/40" />
                                                <p className="text-muted-foreground text-sm leading-relaxed">{machine.description}</p>
                                            </div>
                                        }
                                    </div>
                                </Fade>
                            ))}
                        </div>
                    </div>
                ))}
            </Container>
        </Section>
    )
}

export default CoreFacilities;
