import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import MouseScrollAnimatedIcon from "@/components/shared/MouseScrollAnimatedIcon";
import { cn } from "@swastik/ui/lib/utils";
import Image from "next/image";

type ManufacturingHeroProps = {
    className?: string;
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
}

const ManufacturingHero = ({ className = "", title, subtitle, description, imageUrl }: ManufacturingHeroProps) => {
    return (
        <Section className={cn("", className)}>
            {/*hero image container */}
            <div className="absolute inset-0 h-full w-full">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-black/80 to-transparent" />
            <Container className="relative z-10 h-[calc(100dvh-12rem)] flex items-end">
                <div className="space-y-6 max-w-2xl mb-12">
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-wide leading-none">
                        {title.toUpperCase()} <br />
                        <span className="text-white/60">{subtitle.toUpperCase()}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed">{description}</p>
                </div>
            </Container>
            <MouseScrollAnimatedIcon />
        </Section>
    )
}

export default ManufacturingHero;
