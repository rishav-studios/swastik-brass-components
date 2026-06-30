import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import MouseScrollAnimatedIcon from "@/components/shared/MouseScrollAnimatedIcon";
import { cn } from "@swastik/ui/lib/utils";
import Image from "next/image";

type SectorHeroProps = {
    className?: string;
    sectorName: string;
    sectorDescription: string;
    coverImageUrl: string;
}
const SectorHero = ({ className = "", sectorName, sectorDescription, coverImageUrl }: SectorHeroProps) => {
    return (
        <Section className={cn("", className)}>
            {/*hero image container */}
            <div className="absolute inset-0 h-full w-full">
                <Image
                    src={coverImageUrl}
                    alt={sectorName}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-black/80 to-transparent" />
            <Container className="relative z-10 h-[calc(100dvh-12rem)] flex items-end">
                <div className="space-y-4 max-w-xl mb-12">
                    <h1 className="text-9xl font-bold text-white tracking-wide">{sectorName.toUpperCase()}</h1>
                    <p className="text-lg text-white">{sectorDescription}</p>
                </div>

            </Container>
            <MouseScrollAnimatedIcon />

        </Section>
    )
}

export default SectorHero