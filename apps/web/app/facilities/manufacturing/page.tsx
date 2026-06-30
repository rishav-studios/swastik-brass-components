import CoreFacilities from "@/components/pages/facilities/manufacturing/CoreFacilities";
import ManufacturingFootprint from "@/components/pages/facilities/manufacturing/ManufacturingFootprint";
import ManufacturingHero from "@/components/pages/facilities/manufacturing/ManufacturingHero";
import ShopFloorGallery from "@/components/pages/facilities/manufacturing/ShopFloorGallery";
import HomeCTA from "@/components/pages/home/cta/HomeCTA";
import { manufacturingData } from "@/constants/facilities";

export default function ManufacturingPage() {
    return (
        <main className="w-full bg-background min-h-screen">
            <ManufacturingHero 
                title={manufacturingData.hero.title}
                subtitle={manufacturingData.hero.subtitle}
                description={manufacturingData.hero.description}
                imageUrl={manufacturingData.hero.image}
            />

            <CoreFacilities groups={manufacturingData.coreFacilities} />

            <ShopFloorGallery images={manufacturingData.shopFloorGallery} />

            <ManufacturingFootprint units={manufacturingData.footprint} />

            <HomeCTA 
                title={
                    <>
                        Ready to source <br /><span className="text-primary"> Components </span>?
                    </>
                }
                description="Our engineering team is ready to review your requirements and provide a rapid quotation."
            />
        </main>
    );
}