import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import BackgroundNoise, { BackgroundLines } from "@/components/shared/BackgroundNoise";
import Image from "next/image";

type Machine = {
    name: string;
    description: string;
    image: string;
}

type FacilityGroup = {
    groupName: string;
    description: string;
    machines: Machine[];
}

type CoreFacilitiesProps = {
    groups: FacilityGroup[];
}

const CoreFacilities = ({ groups }: CoreFacilitiesProps) => {
    return (
        <Section className="py-24 bg-background">
            <BackgroundNoise />
            <BackgroundLines />
            <Container className="space-y-32 relative">
                {groups.map((group, index) => (
                    <div key={index} className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
                        {/* Sticky Title Column */}
                        <div className="w-full lg:w-1/3 shrink-0">
                            <div className="sticky top-32">
                                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                                    {group.groupName}
                                </h2>
                                <p className="text-muted-foreground text-lg">
                                    {group.description}
                                </p>
                            </div>
                        </div>

                        {/* Scrolling Machines Column */}
                        <div className="w-full lg:w-2/3 flex flex-col gap-12">
                            {group.machines.map((machine, mIndex) => (
                                <div key={mIndex} className="bg-card border border-border rounded-3xl overflow-hidden flex flex-col sm:flex-row shadow-sm hover:shadow-md transition-shadow">
                                    <div className="relative w-full sm:w-2/5 h-64 sm:h-auto bg-zinc-100">
                                        <Image
                                            src={machine.image}
                                            alt={machine.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-8 sm:w-3/5 flex flex-col justify-center">
                                        <h3 className="text-2xl font-bold text-foreground mb-3">{machine.name}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{machine.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </Container>
        </Section>
    )
}

export default CoreFacilities;
