import Fade from "@/components/animations/Fade"
import Container from "@/components/layout/Container"
import Section from "@/components/layout/Section"
import BackgroundNoise, { BackgroundLines } from "@/components/shared/BackgroundNoise"
import { Arrow, CustomLink } from "@/components/shared/clickables/CustomLink"
import { Eyebrow } from "@/components/shared/SectionHeader"
import { TextRevealOnScroll } from "@/components/shared/TextReveal"
import { icons } from "@swastik/ui"
import DesktopCircles from "./DesktopCircles"
import MobileCircles from "./MobileCircles"


const HomeAbout = () => {
    return (
        <Section className="relative bg-background h-[440dvh] lg:h-[300dvh] xl:h-[220dvh] py-0">
            <BackgroundNoise />
            <BackgroundLines className="w-[90%] mx-auto" />
            <Container className="absolute inset-0 z-10">


                <div className="space-y-20 py-24 lg:py-40" >
                    {/* top side */}
                    <div className="space-y-8 lg:col-span-4">

                        <Eyebrow className="ml-0">who we are</Eyebrow>

                        <TextRevealOnScroll as="h2" className="leading-tight whitespace-pre-line">

                            {`Two Decades of\ncraftsmanship`}
                        </TextRevealOnScroll>
                    </div>

                    {/* circles */}
                    <DesktopCircles />
                    <MobileCircles />


                    <div className="relative grid grid-cols-1 md:grid-cols-4 -translate-y-16 xl:translate-y-0">

                        <div className="space-y-4 md:col-span-3 md:col-start-2">
                            <Fade>
                                <p className="text-3xl sm:text-4xl font-semibold max-w-xl">
                                    Driven by technology, backed  by experience, focused on  <span className="text-primary">
                                        manufacturing</span> excellence
                                </p>
                            </Fade>
                            <Fade>

                                <p className="max-w-xl">Founded over 25 years ago in the heart of India's brass manufacturing belt, Swastik Brass Components has grown from a local supplier into a globally trusted exporter of precision engineered brass parts.</p>
                            </Fade>
                            <Fade>

                                <p className="max-w-xl">Our facility houses state-of-the-art CNC turning, automatic screw machines, and in-house quality labs — enabling us to produce complex geometries to the tightest tolerances across a wide range of brass alloys.</p>
                            </Fade>

                            <div className="flex gap-5">
                                <Fade>

                                    <CustomLink variant="button-black" href={"/about"} >
                                        Know more
                                        <Arrow variant="primary" />
                                    </CustomLink>
                                </Fade>
                                <Fade delay={0.2} className="flex">
                                    <CustomLink variant="hover-underline" href={"/quote"} className="text-primary">
                                        Download brochure
                                        <icons.download />
                                    </CustomLink>
                                </Fade>
                            </div>
                        </div>


                    </div>
                </div>


            </Container>
        </Section >
    )
}

export default HomeAbout