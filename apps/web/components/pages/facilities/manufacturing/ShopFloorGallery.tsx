import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Description, Eyebrow, SectionHeader } from "@/components/shared/SectionHeader";
import { TextRevealOnScroll } from "@/components/shared/TextReveal";
import Image from "next/image";

type ShopFloorGalleryProps = {
    images: string[];
}

const ShopFloorGallery = ({ images }: ShopFloorGalleryProps) => {
    return (
        <Section className="bg-zinc-950 text-white" id="shop-floor">
            <Container className="space-y-12">
                <SectionHeader>
                    <Eyebrow>Shop Floor</Eyebrow>
                    <TextRevealOnScroll as="h2" revealedColor="#fff" hiddenColor="#36332d">Optimized Shop Floor</TextRevealOnScroll>
                    <Description className="text-gray-100 text-start text-base max-w-xl">
                        Our facility is designed around process-driven manufacturing principles to ensure seamless material flow, safety, and peak operational efficiency.
                    </Description>
                </SectionHeader>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((img, idx) => {
                        // Create an interesting masonry-like layout for 4 images
                        let layoutClass = 'h-48 md:h-[240px]'; // default small square-ish
                        if (idx === 0) layoutClass = 'col-span-2 row-span-2 h-[400px] md:h-[500px]';
                        if (idx === 3) layoutClass = 'col-span-2 h-48 md:h-[240px]';

                        return (
                            <div key={idx} className={`relative rounded-2xl overflow-hidden group ${layoutClass}`}>
                                <Image
                                    src={img}
                                    alt={`Shop floor image ${idx + 1}`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                            </div>
                        )
                    })}
                </div>
            </Container>
        </Section>
    )
}

export default ShopFloorGallery;
