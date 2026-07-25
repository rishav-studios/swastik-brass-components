import CoreFacilities from "@/components/pages/facilities/manufacturing/CoreFacilities";
import ManufacturingHero from "@/components/pages/facilities/manufacturing/ManufacturingHero";
import ShopFloorGallery from "@/components/pages/facilities/manufacturing/ShopFloorGallery";
import HomeCTA from "@/components/pages/home/cta/HomeCTA";
import { manufacturingData } from "@/constants/facilities";

export default function ManufacturingPage() {
    return (
        <main key="manufacturing">
            <ManufacturingHero
                title={manufacturingData.hero.title}
                subtitle={manufacturingData.hero.subtitle}
                description={manufacturingData.hero.description}
                images={manufacturingData.hero.images}
            />

            <CoreFacilities groups={manufacturingData.coreFacilities} id="cnc-machines" />

            <ShopFloorGallery images={manufacturingData.shopFloorGallery} />

            {/* <ManufacturingFootprint units={manufacturingData.footprint} /> */}

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