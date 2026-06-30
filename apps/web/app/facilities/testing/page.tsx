import CoreFacilities from "@/components/pages/facilities/manufacturing/CoreFacilities";
import ManufacturingHero from "@/components/pages/facilities/manufacturing/ManufacturingHero";
import HomeCTA from "@/components/pages/home/cta/HomeCTA";
import { testingData } from "@/constants/facilities";

export default function TestingPage() {
    return (
        <main className="w-full bg-background min-h-screen">
            <ManufacturingHero
                title={testingData.hero.title}
                subtitle={testingData.hero.subtitle}
                description={testingData.hero.description}
                imageUrl={testingData.hero.image}
            />

            <CoreFacilities groups={testingData.coreFacilities} />


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
