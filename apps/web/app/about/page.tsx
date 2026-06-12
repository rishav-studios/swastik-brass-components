import AboutCertificates from "@/components/pages/about/AboutCertificates";
import AboutFounder from "@/components/pages/about/AboutFounder";
import AboutHero from "@/components/pages/about/AboutHero";
import AboutJourney from "@/components/pages/about/AboutJourney";
import AboutMissionVision from "@/components/pages/about/AboutMissionVision";
import AboutOverview from "@/components/pages/about/AboutOverview";
import HomeCTA from "@/components/pages/home/cta/HomeCTA";

const AboutPage = () => {
    return (
        <div className="bg-background min-h-screen">
            <AboutHero />
            <AboutOverview />
            <AboutFounder />
            <AboutMissionVision />
            <AboutCertificates />
            <AboutJourney />
            <HomeCTA />
        </div>
    )
}

export default AboutPage;