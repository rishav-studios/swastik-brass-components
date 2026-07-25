import HomeAbout from "@/components/pages/home/about/HomeAbout"
import HomeCTA from "@/components/pages/home/cta/HomeCTA"
import Exports from "@/components/pages/home/exports/Exports"
import Hero from "@/components/pages/home/hero/Hero"
import HomeImpact from "@/components/pages/home/impact/HomeImpact"
import HomeMaterials from "@/components/pages/home/materials/HomeMaterials"
import HomeQuality from "@/components/pages/home/quality/HomeQuality"
import Sectors from "@/components/pages/home/sectors/SectorsSectionMain"
import { GlobeProvider } from "@/contexts/GlobeContext"
import { fetchAllSectors } from "@/lib/sectors"


const HomePage = async () => {
  const sectors = await fetchAllSectors();
  console.log(sectors)
  const sectorWithoutGeneral = sectors.filter(sector => sector.slug !== "general")

  return (
    <div className="">
      <Hero />
      <HomeAbout />
      <Sectors dbSectors={sectorWithoutGeneral} />
      <HomeMaterials />
      <HomeImpact />
      <GlobeProvider>

        <Exports />
      </GlobeProvider>
      <HomeQuality />
      <HomeCTA />
    </div>
  )
}

export default HomePage