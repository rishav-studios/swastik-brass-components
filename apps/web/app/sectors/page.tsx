import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import HomeCTA from "@/components/pages/home/cta/HomeCTA";
import BackgroundNoise, { BackgroundLines } from "@/components/shared/BackgroundNoise";
import { CustomLink } from "@/components/shared/clickables/CustomLink";
import MouseScrollAnimatedIcon from "@/components/shared/MouseScrollAnimatedIcon";
import { Description, Eyebrow, SectionHeader } from "@/components/shared/SectionHeader";
import { TextRevealOnScroll } from "@/components/shared/TextReveal";
import { fetchAllSectors } from "@/lib/sectors";
import { icons } from "@swastik/ui";
import Image from "next/image";

export default async function SectorsPage() {
    const sectors = await fetchAllSectors();

    return (
        <main key="sectors">
            {/* SECTOR DETAIL GRID SECTION */}
            <Section className="min-h-[80dvh] lg:py-16 lg:pt-24">
                <BackgroundNoise />
                <BackgroundLines className="w-9/10 mx-auto" />
                <Container className="relative z-10 h-[calc(80dvh-8rem)] lg:h-[calc(80dvh-10rem)] flex flex-col">
                    <SectionHeader className="space-y-6 my-auto sm:mt-auto">
                        <Eyebrow className="mx-auto">Sectors</Eyebrow>
                        <h1 className="text-center text-6xl md:text-8xl font-medium">Serving Critical Industries</h1>
                    </SectionHeader>
                    <div className="justify-between hidden sm:flex text-gray-500 mt-auto">
                        <span>Jamnagar, Gujarat, India</span>
                        <span>22.4685° N, 70.0573° E</span>
                    </div>
                </Container>
                <MouseScrollAnimatedIcon iconContainerClassname="bg-gray-300" />

            </Section>
            <Section className="py-24 lg:py-32 bg-background">

                <Container className="space-y-12">

                    <SectionHeader>
                        <Eyebrow className="mx-0!">Sectors</Eyebrow>
                        <TextRevealOnScroll as="h2">Precision. At Every Scale.</TextRevealOnScroll>
                        <Description className="max-w-xl text-start">Explore how our advanced manufacturing capabilities support the world's most demanding industries.</Description>
                    </SectionHeader>


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                        {sectors.map((sector, idx) => {
                            // Create an asymmetric masonry-like layout
                            // Row 1: 7 cols, 5 cols
                            // Row 2: 4 cols, 8 cols
                            // Row 3: 12 cols (if 5 items)
                            let colSpan = "lg:col-span-6";
                            if (idx === 0) colSpan = "lg:col-span-7";
                            else if (idx === 1) colSpan = "lg:col-span-5";
                            else if (idx === 2) colSpan = "lg:col-span-4";
                            else if (idx === 3) colSpan = "lg:col-span-4";
                            else if (idx === 4) colSpan = "lg:col-span-4";

                            return (
                                <CustomLink
                                    variant="custom"
                                    key={sector.slug}
                                    href={`/sectors/${sector.slug}`}
                                    className={`group relative cursor-pointer overflow-hidden rounded-3xl min-h-100 border border-border/50 hover:border-primary/50 transition-colors ${colSpan}`}
                                >
                                    <div className="absolute inset-0" style={{ viewTransitionName: `sector-image-${sector.slug}` }}>
                                        <Image
                                            src={sector.image_url as string}
                                            alt={sector.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500"></div>
                                    </div>

                                    <div className="absolute z-10 inset-0 p-8 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                                                <icons.arrowRight className="w-6 h-6 text-white transform -rotate-45  group-hover:rotate-0 transition-transform duration-500" />
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-3xl font-bold text-white mb-3">{sector.name}</h3>
                                            <p className="text-white/70 max-w-lg text-lg line-clamp-2">
                                                {sector.home_description}
                                            </p>
                                        </div>
                                    </div>
                                </CustomLink>
                            )
                        })}
                    </div>
                </Container>
            </Section>

            {/* CTA STRIP */}
            <HomeCTA
                title={
                    <>
                        Ready to discuss <br />
                        your<span className="text-primary mix-blend-normal drop-shadow-lg"> requirements?</span>
                    </>
                }
            />
        </main>
    );
}