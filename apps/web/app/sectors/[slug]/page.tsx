import Fade from "@/components/animations/Fade";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import HomeCTA from "@/components/pages/home/cta/HomeCTA";
import SectorHero from "@/components/pages/sectors/slug/Hero";
import BackgroundNoise, { BackgroundLines } from "@/components/shared/BackgroundNoise";
import { Description, Eyebrow, SectionHeader } from "@/components/shared/SectionHeader";
import { TextRevealOnScroll } from "@/components/shared/TextReveal";
import { products as productsList } from "@/constants/products";
import { Sector } from "@swastik/types";
import { icons } from "@swastik/ui";
import { cn } from "@swastik/ui/lib/utils";
import { notFound } from "next/navigation";
import { ComponentType } from "react";
import { getProductsBySector } from "./actions";



// Hardcoded fallback data in case DB is empty
const FALLBACK_SECTORS: Sector[] = [
    {
        id: "1291405278922468",
        name: "Aerospace",
        slug: "aerospace",
        home_description: "Precision-engineered brass connectors, bushings, and sensor housings built to survive extreme altitudes, vibration, and thermal cycling.",
        dedicated_description: "Our aerospace components are manufactured under the strictest quality controls, delivering uncompromising reliability for commercial and defense applications where precision is measured in microns.",
        cover_image_url: "https://jpouktmcsliceesoassj.supabase.co/storage/v1/object/public/public_assets/sectors/covers/aerospace-cover.webp",
        image_url: "https://jpouktmcsliceesoassj.supabase.co/storage/v1/object/public/public_assets/sectors/images/aerospace.webp",
        display_order: 1,
        seo_metadata: {
            og_type: "website",
            keywords: [
                "aerospace brass components",
                "precision brass aerospace parts",
                "brass components for aviation",
                "brass aerospace fittings",
                "custom aerospace brass parts",
                "precision brass manufacturer",
                "brass components India",
                "Jamnagar brass manufacturer",
                "high precision brass components",
                "aerospace component manufacturer"
            ],
            og_title: "Brass Components for Aerospace Industry | Swastik Brass Components",
            meta_title: "Brass Components for Aerospace Industry | Swastik Brass Components",
            meta_robots: "index, follow",
            twitter_card: "summary_large_image",
            twitter_title: "Brass Components for Aerospace Industry | Swastik Brass Components",
            og_description: "Precision-engineered brass aerospace components manufactured to meet stringent quality standards for reliable performance in demanding aviation applications.",
            meta_description: "Swastik Brass Components manufactures precision brass components for the aerospace industry, delivering exceptional dimensional accuracy, reliability, and quality for demanding aviation applications.",
            twitter_description: "High-quality brass components for aerospace applications, engineered for precision, reliability, and long-term performance."
        }
    },
    {
        id: "1291405278922469",
        name: "Automobile",
        slug: "automobile",
        home_description: "High-performance brass components built for the automotive industry, delivering precision, durability, and reliable performance across critical vehicle systems.",
        dedicated_description: "We supply tier-1 automotive manufacturers with critical brass turned parts, ensuring high-volume consistency and zero-defect delivery for modern vehicle systems.",
        cover_image_url: "https://jpouktmcsliceesoassj.supabase.co/storage/v1/object/public/public_assets/sectors/covers/automobile-cover.webp",
        image_url: "https://jpouktmcsliceesoassj.supabase.co/storage/v1/object/public/public_assets/sectors/images/automobile.webp",
        display_order: 2,
        seo_metadata: {
            og_type: "website",
            keywords: [
                "automotive brass components",
                "brass auto parts",
                "brass components for automotive industry",
                "precision brass automotive parts",
                "brass electrical components",
                "brass connectors",
                "custom brass components",
                "automotive brass manufacturer",
                "Jamnagar brass manufacturer",
                "precision brass components India"
            ],
            og_title: "Brass Components for Automotive Industry | Swastik Brass Components",
            meta_title: "Brass Components for Automotive Industry | Swastik Brass Components",
            meta_robots: "index, follow",
            twitter_card: "summary_large_image",
            twitter_title: "Brass Components for Automotive Industry | Swastik Brass Components",
            og_description: "High-quality brass components engineered for automotive applications, offering precision, durability, corrosion resistance, and consistent performance.",
            meta_description: "Swastik Brass Components manufactures precision brass components for the automotive industry, delivering durable, corrosion-resistant, and high-performance solutions for OEMs and automotive component manufacturers.",
            twitter_description: "Precision-engineered brass components for the automotive industry, manufactured to deliver reliable performance and long-term durability."
        }
    },
    {
        id: "1291405278922470",
        name: "Railway",
        slug: "railway",
        home_description: "Precision-manufactured brass railway components engineered for durability, reliability, and consistent performance in demanding rail infrastructure and transportation applications.",
        dedicated_description: "Swastik Brass Components manufactures precision brass parts for the railway industry, where durability, accuracy, and reliability are essential. Designed for demanding rail applications, our components offer excellent corrosion resistance and consistent performance. With advanced manufacturing and strict quality control, we deliver dependable brass solutions meeting industry standards.",
        cover_image_url: "https://jpouktmcsliceesoassj.supabase.co/storage/v1/object/public/public_assets/sectors/covers/railway-cover.webp",
        image_url: "https://jpouktmcsliceesoassj.supabase.co/storage/v1/object/public/public_assets/sectors/images/railway.webp",
        display_order: 3,
        seo_metadata: {
            og_type: "website",
            keywords: [
                "railway brass components",
                "brass railway parts",
                "brass components for railway industry",
                "railway brass fittings",
                "precision brass railway components",
                "custom brass railway parts",
                "industrial brass components",
                "railway component manufacturer",
                "Jamnagar brass manufacturer",
                "precision brass components India"
            ],
            og_title: "Brass Components for Railway Industry | Swastik Brass Components",
            meta_title: "Brass Components for Railway Industry | Swastik Brass Components",
            meta_robots: "index, follow",
            twitter_card: "summary_large_image",
            twitter_title: "Brass Components for Railway Industry | Swastik Brass Components",
            og_description: "Reliable brass components engineered for railway applications, delivering precision, durability, corrosion resistance, and consistent long-term performance.",
            meta_description: "Swastik Brass Components manufactures precision brass components for the railway industry, delivering durable, corrosion-resistant, and high-performance solutions for railway infrastructure and transportation applications.",
            twitter_description: "High-quality brass components manufactured for railway infrastructure and transportation systems with precision, durability, and dependable performance."
        }
    },
    {
        id: "495047912215",
        name: "Oil & Gas",
        slug: "oil-gas",
        home_description: "Engineered brass components designed to deliver exceptional sealing, corrosion resistance, and dependable performance in demanding oil and gas environments.",
        dedicated_description: "Swastik Brass Components manufactures high-performance brass components for the oil and gas industry, where precision, durability, and reliability are essential. Designed for demanding high-pressure and corrosive environments, our components provide excellent corrosion resistance and long service life. With advanced manufacturing and strict quality control, we deliver dependable brass solutions for critical industrial applications",
        display_order: 4,
        image_url: "https://jpouktmcsliceesoassj.supabase.co/storage/v1/object/public/public_assets/sectors/images/oil-gas.webp",
        cover_image_url: "https://jpouktmcsliceesoassj.supabase.co/storage/v1/object/public/public_assets/sectors/covers/oil-gas-cover.webp",
        seo_metadata: {
            og_type: "website",
            keywords: [
                "brass oil and gas components",
                "brass fittings for oil and gas",
                "precision brass components",
                "brass valve components",
                "brass connectors",
                "industrial brass parts",
                "custom brass components",
                "brass manufacturer India",
                "brass components Jamnagar",
                "oil and gas brass parts"],
            og_title: "Brass Components for Oil & Gas Industry | Swastik Brass Components",
            meta_title: "Brass Components for Oil & Gas Industry | Swastik Brass Components",
            meta_robots: "index, follow",
            twitter_card: "summary_large_image",
            twitter_title: "Brass Components for Oil & Gas Industry | Swastik Brass Components",
            og_description: "High-quality brass components engineered for demanding oil & gas applications, delivering precision, corrosion resistance, and long-term reliability.",
            meta_description: "Swastik Brass Components manufactures precision brass components for the oil & gas industry, including fittings, connectors, valves, and custom-engineered parts with superior corrosion resistance and reliable performance.",
            twitter_description: "Precision-engineered brass fittings, connectors, valves, and custom components for reliable performance in oil & gas applications."
        },
    },
    {
        id: "",
        name: "General",
        slug: "general",
        home_description: "General precision brass components, nuts, bolts, and custom machined parts.",
        dedicated_description: "Versatile, high-quality brass components manufactured to precise client specifications for a wide range of industrial applications.",
        cover_image_url: "/sectors/general.png",
        image_url: "/sectors/general.png",
        display_order: 5,
        seo_metadata: {
            og_type: "website",
            keywords: [
                "general brass components",
                "brass parts",
                "precision brass components",
                "custom brass components",
                "brass machined parts",
                "industrial brass components",
                "brass manufacturer India",
                "brass components Jamnagar",
                "brass fittings",
                "brass nuts and bolts"
            ],
            og_title: "General Brass Components | Swastik Brass Components",
            meta_title: "General Brass Components | Swastik Brass Components",
            meta_robots: "index, follow",
            twitter_card: "summary_large_image",
            twitter_title: "General Brass Components | Swastik Brass Components",
            og_description: "High-quality brass components for general industrial applications, manufactured to precise specifications for consistent performance and reliability.",
            meta_description: "Swastik Brass Components manufactures general brass components including machined parts, nuts, bolts, and custom components for diverse industrial applications with precision and reliability.",
            twitter_description: "Precision-engineered brass components for general industrial applications, manufactured to meet exact specifications and deliver reliable performance."
        }
    }
];

const availableSectors = [
    "aerospace",
    "automobile",
    "oil-gas",
    "railway",
    "general"
]

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

    // let sector = await getSectorBySlug(slug);

    let isSectorAvailable = availableSectors.includes(slug.toLocaleLowerCase())

    // Use fallback if DB fetch fails or returns null
    if (!isSectorAvailable) {
        notFound();
    }
    const sector = FALLBACK_SECTORS.find(s => s.slug === slug) as any;



    // Try to fetch products. If none, we'll show a placeholder grid.
    const products = sector.id ? await getProductsBySector(sector.id) : [];

    return (
        <main className="w-full bg-background min-h-screen-">
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
                coverImageUrl={sector.cover_image_url}
                sectorName={sector.name}
                sectorDescription={sector.dedicated_description}
            />

            {/* OVERVIEW STRIP */}
            <Section className="bg-foreground text-background min-h-max py-16">
                <Container className="space-y-12">
                    <SectionHeader className="justify-start">

                        <Eyebrow className="mx-0! mb-6">Excellence</Eyebrow>
                        <TextRevealOnScroll as="h2" hiddenColor="#36332D" revealedColor="#fff">

                            {`Engineering Excellence\nin ${sector.name.toLowerCase()}`}
                        </TextRevealOnScroll>
                        <Description className="text-start max-w-xl text-lg! text-background/80! mt-2">

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
                <BackgroundLines className="w-9/10 mx-auto" />
                <Container className="space-y-12 relative z-10 inset-0 w-9/10 mt-16 lg:mt-24">
                    <SectionHeader>
                        <Eyebrow className="mx-0! mb-6">Components</Eyebrow>
                        <TextRevealOnScroll as="h2">
                            {`${sector.name} Components`}
                        </TextRevealOnScroll>
                        <Description className="text-start max-w-xl text-lg! mt-2">
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


