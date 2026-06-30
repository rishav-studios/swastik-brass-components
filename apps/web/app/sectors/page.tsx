import Container from "@/components/layout/Container";
import { GlowOrb } from "@/components/layout/Footer";
import Section from "@/components/layout/Section";
import HomeCTA from "@/components/pages/home/cta/HomeCTA";
import SectorHeroCards from "@/components/pages/sectors/SectorHeroCards";
import BackgroundNoise, { BackgroundLines } from "@/components/shared/BackgroundNoise";
import { CustomLink } from "@/components/shared/clickables/CustomLink";
import MouseScrollAnimatedIcon from "@/components/shared/MouseScrollAnimatedIcon";
import { Description, Eyebrow, SectionHeader } from "@/components/shared/SectionHeader";
import { TextRevealOnScroll } from "@/components/shared/TextReveal";
import { icons } from "@swastik/ui";
import Image from "next/image";
import { fetchSectors } from "./actions";

// Hardcoded fallback data in case DB is empty
const FALLBACK_SECTORS = [
    {
        name: "Aerospace",
        slug: "aerospace",
        home_description: "Precision-engineered brass components built to survive extreme altitudes and vibration.",
        cover_image_url: "/sectors/aerospace.png",
        image_url: "/sectors/aerospace.png",
        display_order: 1
    },
    {
        name: "Railway",
        slug: "railway",
        home_description: "Heavy-duty brass fittings for brake systems and pantograph assemblies.",
        cover_image_url: "/sectors/railway.png",
        image_url: "/sectors/railway.png",
        display_order: 2
    },
    {
        name: "Automobile",
        slug: "automobile",
        home_description: "High-volume brass components for fuel injection systems and electrical terminals.",
        cover_image_url: "/sectors/automobile.png",
        image_url: "/sectors/automobile.png",
        display_order: 3
    },

    {
        name: "Oil & Gas",
        slug: "oil-gas",
        home_description: "Explosion-proof brass cable glands and valves for ATEX Zone 1 environments.",
        cover_image_url: "/sectors/oil-gas.png",
        image_url: "/sectors/oil-gas.png",
        display_order: 4
    },
    {
        name: "General",
        slug: "general",
        home_description: "General precision brass components, nuts, bolts, and custom machined parts.",
        cover_image_url: "/sectors/general.png",
        image_url: "/sectors/general.png",
        display_order: 5
    }
];

export default async function SectorsPage() {
    let sectorsResponse = await fetchSectors();
    let sectors = Array.isArray(sectorsResponse) && sectorsResponse.length > 0
        ? sectorsResponse
        : FALLBACK_SECTORS;

    return (
        <main className="w-full">
            {/* SECTOR DETAIL GRID SECTION */}
            <Section className="bg-foreground flex items-ceter overflow-hidden">
                {/* <div className="absolute w-20 h-10 flex justify-center items-center rounded-full border-2 border-background"> */}
                <MouseScrollAnimatedIcon />

                {/* </div> */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
                <GlowOrb id="orb-sector-1" className="opacity-20 -top-150 -left-150" />
                <Container className="grid grid-cols-1 lg:grid-cols-2 h-[calc(100dvh-12rem)]">
                    <div className="flex items-end">
                        <div className="space-y-6 shrink-0 max-w-xl ">

                            <h1 className="leading-[1.1] text-5xl lg:text-7xl font-bold text-background">
                                Engineering Across <br />
                                <span className="text-primary">Industries</span>
                            </h1>
                            <p className="text-muted text-lg lg:text-xl max-w-2xl pt-2">
                                We serve critical industries where precision, reliability, and quality are non-negotiable. Our engineering capabilities support complex applications across aerospace, defense and railways sectors.
                            </p>
                        </div>
                    </div>
                    <SectorHeroCards sectors={sectors} />
                </Container>
            </Section>
            <Section className="py-24 lg:py-32 bg-background">
                <BackgroundNoise />
                <BackgroundLines className="w-9/10 mx-auto" />

                <Container className="space-y-12">

                    <SectionHeader>
                        <Eyebrow className="mx-0!">Sectors</Eyebrow>
                        <TextRevealOnScroll as="h2">Precision. At Every Scale.</TextRevealOnScroll>
                        <Description className="max-w-xl text-start">Explore how our advanced manufacturing capabilities support the world's most demanding industries.</Description>
                    </SectionHeader>


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                        {FALLBACK_SECTORS.map((sector, idx) => {
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
                                    className={`group relative cursor-pointer overflow-hidden rounded-3xl min-h-[400px] border border-border/50 hover:border-primary/50 transition-colors ${colSpan}`}
                                >
                                    <div className="absolute inset-0" style={{ viewTransitionName: `sector-image-${sector.slug}` }}>
                                        <Image
                                            src={sector.image_url || sector.cover_image_url}
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