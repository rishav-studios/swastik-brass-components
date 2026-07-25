import CoreFacilities from "@/components/pages/facilities/manufacturing/CoreFacilities";
import ManufacturingHero from "@/components/pages/facilities/manufacturing/ManufacturingHero";
import HomeCTA from "@/components/pages/home/cta/HomeCTA";
import { testingData } from "@/constants/facilities";

export default function TestingPage() {
    return (
        <main key="testing">
            <ManufacturingHero
                title={testingData.hero.title}
                subtitle={testingData.hero.subtitle}
                description={testingData.hero.description}
                images={testingData.hero.images}
            />

            <CoreFacilities groups={testingData.coreFacilities} id="testing-equipment" />


            <HomeCTA
                title={
                    <>
                        Need assured <br /><span className="text-primary"> Quality </span>?
                    </>
                }
                description="Our engineering team is ready to review your stringent requirements and provide a rapid quotation."
            />
        </main>
    );
}
