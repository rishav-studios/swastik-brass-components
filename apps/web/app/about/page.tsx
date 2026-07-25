import AboutCertificates from "@/components/pages/about/AboutCertificates"
import AboutHero from "@/components/pages/about/AboutHero"
import AboutJourney from "@/components/pages/about/AboutJourney"
import AboutMissionVision from "@/components/pages/about/AboutMissionVision"
import AboutOverview from "@/components/pages/about/AboutOverview"
import AboutStory from "@/components/pages/about/AboutStory"
import HomeCTA from "@/components/pages/home/cta/HomeCTA"

const AboutPage = () => {
    return (
        <main key="about">
            <AboutHero />
            <AboutOverview />
            <AboutStory />
            <AboutMissionVision />
            <AboutCertificates />
            <AboutJourney />
            <HomeCTA />
        </main>
    )
}

export default AboutPage;