import Fade from "@/components/animations/Fade";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import HomeCTA from "@/components/pages/home/cta/HomeCTA";
import SectorHero from "@/components/pages/sectors/slug/Hero";
import BackgroundNoise, { BackgroundLines } from "@/components/shared/BackgroundNoise";
import { Description, Eyebrow, SectionHeader } from "@/components/shared/SectionHeader";
import { TextRevealOnScroll } from "@/components/shared/TextReveal";
import { products as productsList } from "@/constants/products";
import { fetchAllSectors } from "@/lib/sectors";
import { icons } from "@swastik/ui";
import { cn } from "@swastik/ui/lib/utils";
import { notFound } from "next/navigation";
import { ComponentType } from "react";
import { getProductsBySector } from "./actions";


type SectorType = "aerospace" | "automobile" | "oil-gas" | "railway" | "general"


type ExcellenceProps = {
    className?: string;
    icon: ComponentType<React.ComponentProps<"svg">>;
    title: string;
    description: string;
}
const Excellence = ({ className = "", icon: Icon, title, description }: ExcellenceProps) => {
    return (
        <div className={cn("bg-background rounded-3xl p-8 flex flex-col items-start shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group", className)}>
            <div className="p-4 bg-primary/10 rounded-2xl mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                <Icon className="w-8 h-8 text-primary" />
            </div>

            <h3 className="text-foreground text-xl font-bold mb-3">{title}</h3>
            <p className="text-foreground/70 leading-relaxed text-sm">{description}</p>
        </div>
    )
}

type ProductImageProps = {
    imageSrc: string;
    alt: string;
    className?: string;
}
const ProductImage = ({ imageSrc, alt, className = "" }: ProductImageProps) => {
    return (
        <div className={cn("h-full w-full relative overflow-hidden rounded-xl group", className)}>
            <img
                src={imageSrc}
                alt={alt}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
            />
        </div>
    )
}

type ProductGalleryProps = {
    title: string;
    images: string[];
    className?: string;
}
const ProductGallery = ({ title, images, className = "" }: ProductGalleryProps) => {
    return (
        <div className={cn("", className)}>
            <h3 className="text-foreground text-xl font-bold mb-6">{title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
                {images.map((image, index) => (
                    <ProductImage key={index} imageSrc={image} alt={title} />
                ))}
            </div>
        </div>
    )
}

export default async function DedicatedSectorPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const sectors = await fetchAllSectors();
    const sector = sectors.find(s => s.slug === slug);

    if (!sector) {
        notFound();
    }

    // Try to fetch products. If none, we'll show a placeholder grid.
    const products = sector.id ? await getProductsBySector(sector.id) : [];
    return (
        <main key={slug}>
            {/* Dynamic CSS for view transitions */}
            <style dangerouslySetInnerHTML={{
                __html: `
                ::view-transition-group(sector-image-${sector.slug}) {
                    animation-duration: 0.8s;
                    animation-timing-function: cubic-bezier(0.76, 0, 0.24, 1);
                }
                ::view-transition-old(sector-image-${sector.slug}),
                ::view-transition-new(sector-image-${sector.slug}) {
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                }
            `}} />

            {/* HERO SECTION */}
            <SectorHero
                coverImageUrl={sector.cover_image_url as string}
                sectorName={sector.name}
                sectorDescription={sector.dedicated_description}
            />

            {/* OVERVIEW STRIP */}
            <Section className="bg-foreground text-background min-h-max py-16">
                <Container className="space-y-12">
                    <SectionHeader className="justify-start">

                        <Eyebrow className="mx-0! mb-6">Excellence</Eyebrow>
                        <TextRevealOnScroll as="h2" hiddenColor="#36332D" revealedColor="#fff" className="inline sm:hidden">

                            {`Engineering\nExcellence\nin ${sector.name.toLowerCase()}`}
                        </TextRevealOnScroll>
                        <TextRevealOnScroll as="h2" hiddenColor="#36332D" revealedColor="#fff" className="hidden sm:inline">

                            {`Engineering Excellence\nin ${sector.name.toLowerCase()}`}
                        </TextRevealOnScroll>
                        <Description className="text-start max-w-xl text-sm sm:text-base md:text-lg text-background/80! mt-2">

                            We utilize advanced CNC machining and strict quality control to manufacture brass components that meet the exact specifications of the {sector.name.toLowerCase()} industry.
                        </Description>

                    </SectionHeader>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        <Fade>

                            <Excellence
                                icon={icons.settings}
                                title="Custom Machining"
                                description="Tailored solutions turned from premium brass alloys to your exact drawings."
                            />
                        </Fade>

                        <Fade delay={0.2}>
                            <Excellence
                                icon={icons.shield}
                                title="Zero-Defect Policy"
                                description="Rigorous optical sorting and dimensional checking on all batches."
                            />
                        </Fade>

                        <Fade delay={0.4}>
                            <Excellence
                                icon={icons.package}
                                title="Global Shipping"
                                description="Reliable supply chain logistics ensuring on-time delivery worldwide"
                            />
                        </Fade>
                    </div>


                </Container>
            </Section>

            {/* PRODUCTS/COMPONENTS SECTION */}
            <Section>
                <div className="absolute z-4 w-full inset-0 h-16 bg-linear-to-b from-foreground via-foreground/30 to-transparent" />
                <BackgroundNoise />
                <BackgroundLines lineCount={3} className="w-9/10 mx-auto" />
                <Container className="space-y-12 relative z-10 inset-0 w-9/10 mt-16 lg:mt-24">
                    <SectionHeader>
                        <Eyebrow className="mx-0! mb-6">Components</Eyebrow>
                        <TextRevealOnScroll as="h2">
                            {`${sector.name} Components`}
                        </TextRevealOnScroll>
                        <Description className="text-start max-w-xl text-sm sm:text-base md:text-lg mt-2">
                            Explore our extensive catalog of standard and custom-manufactured components designed specifically for this sector.
                        </Description>
                    </SectionHeader>

                    <div className="space-y-12">
                        {
                            productsList[sector.slug as SectorType].map((product) => (
                                <ProductGallery
                                    key={product.title}
                                    title={product.title}
                                    images={product.images} />
                            ))
                        }
                    </div>

                </Container>
            </Section>

            {/* CTA STRIP */}

            <HomeCTA
                title={
                    <>
                        Ready to source <br /><span className="text-primary"> {sector.name} </span> components?
                    </>
                }
                description="Upload your drawings for a technical review and rapid quotation."
            />
        </main >
    );
}


