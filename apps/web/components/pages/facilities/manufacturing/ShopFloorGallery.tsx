import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Image from "next/image";

type ShopFloorGalleryProps = {
    images: string[];
}

const ShopFloorGallery = ({ images }: ShopFloorGalleryProps) => {
    return (
        <Section className="py-24 bg-zinc-950 text-white">
            <Container>
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Optimized Shop Floor</h2>
                    <p className="text-zinc-400 max-w-2xl text-lg">
                        Our facility is designed around process-driven manufacturing principles to ensure seamless material flow, safety, and peak operational efficiency.
                    </p>
                </div>
                
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
