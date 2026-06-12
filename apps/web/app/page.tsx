import HomeAbout from "@/components/pages/home/about/HomeAbout"
import Hero from "@/components/pages/home/hero/Hero"
import HomeImpact from "@/components/pages/home/impact/HomeImpact"
import HomeMaterials from "@/components/pages/home/materials/HomeMaterials"
import Sectors from "@/components/pages/home/sectors/Sectors"
import HomeQuality from "@/components/pages/home/quality/HomeQuality"
import HomeCTA from "@/components/pages/home/cta/HomeCTA"

const HomePage = () => {
  return (
    <div className="">
      <Hero />
      <div className="bg-transparent h-dvh" />
      <HomeAbout />
      <Sectors />
      <HomeMaterials />
      <HomeImpact />
      <HomeQuality />
      <HomeCTA />
    </div>
  )
}

export default HomePage