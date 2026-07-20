"use client";

import Section from "@/components/layout/Section";
import MouseScrollAnimatedIcon from "@/components/shared/MouseScrollAnimatedIcon";
import { cn } from "@swastik/ui/lib/utils";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import Container from "@/components/layout/Container";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@swastik/ui/components/shadcn/carousel";

type ManufacturingHeroProps = {
    className?: string;
    title: string;
    subtitle: string;
    description: string;
    images: string[];
};

const ManufacturingHero = ({
    className = "",
    title,
    subtitle,
    description,
    images,
}: ManufacturingHeroProps) => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    const onSelect = useCallback(() => {
        if (!api) return;
        setCurrent(api.selectedScrollSnap());
    }, [api]);

    useEffect(() => {
        if (!api) return;
        onSelect();
        api.on("select", onSelect);
        api.on("reInit", onSelect);
        return () => {
            api.off("select", onSelect);
            api.off("reInit", onSelect);
        };
    }, [api, onSelect]);

    // Autoplay effect
    useEffect(() => {
        if (!api) return;
        const interval = setInterval(() => {
            api.scrollNext();
        }, 5000);
        return () => clearInterval(interval);
    }, [api]);

    return (
        <Section className={cn("p-0! min-h-dvh overflow-hidden", className)}>
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                setApi={setApi}
                className="w-full h-dvh"
            >
                <CarouselContent className="h-dvh ml-0">
                    {images.map((image, index) => (
                        <CarouselItem key={index} className="h-dvh pl-0 relative">
                            <Image
                                src={image}
                                alt={`Manufacturing facility ${index + 1}`}
                                fill
                                className="object-cover"
                                priority={index === 0}
                                sizes="100vw"
                            />
                            {/* Dark overlay for text readability */}
                            <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/70 to-black/90" />
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Hero content overlay */}
                <Container className="absolute inset-0 bottom-12 z-10 flex items-end text-white pointer-events-none">
                    <div className="text-center w-full flex items-end justify-between">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl max-w-xl lg:text-7xl text-start font-medium leading-tighter">
                            {title}{" "}
                            <span className="text-primary">{subtitle}</span>
                        </h1>
                        <div className="relative">

                            <p className="text-base md:text-lg mb-12 text-end max-w-xl text-white leading-relaxed hidden lg:flex">
                                {description}
                            </p>
                            <div className="absolute right-0 z-10 flex gap-2 bottom-1">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => api?.scrollTo(index)}
                                        className={cn(
                                            "h-2 rounded-full transition-all duration-500 cursor-pointer",
                                            current === index
                                                ? "w-8 bg-white"
                                                : "w-2 bg-white/60 hover:bg-white/60"
                                        )}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>

                {/* Dot indicators */}

                <CarouselNext className="top-1/2- size-10 right-4" />
                <CarouselPrevious className="top-1/2- size-10 left-4" />
            </Carousel>
            <MouseScrollAnimatedIcon iconContainerClassname="bg-white/70 border-gray-600 hidden lg:flex" />
        </Section>
    );
};

export default ManufacturingHero;
