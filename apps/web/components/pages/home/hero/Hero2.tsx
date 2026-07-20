import Fade from "@/components/animations/Fade"
import Container from "@/components/layout/Container"
import Section from "@/components/layout/Section"
import { Arrow, CustomLink } from "@/components/shared/clickables/CustomLink"
import HeroVideo from "./HeroVideo2"

const Hero = () => {
    return (
        <Section className="p-0!  w-full flex">
            <div className="rounded-xl justify-center p-1 sm:p-5 overflow-hidden w-full flex relative">
                <HeroVideo />
                <Container className="absolute z-10 bottom-[calc(5px+5vw)]">
                    <div className="space-y-5">
                        <Fade>

                            <HeroHeading />
                        </Fade>
                        <Fade>

                            <HeroDescription />
                        </Fade>

                        <HeroCta />
                    </div>
                </Container>

            </div>

        </Section>
    )
}

const HeroHeading = () => {
    return (
        <h1 className="text-3xl md:text-7xl font-bold text-background flex">
            Precision Brass <br />Components <br /> Built to Last
        </h1>
    )
}
const HeroDescription = () => {
    return (
        <p className="text-muted text-xs min-[468px]:text-sm sm:text-[16px] max-w-lg">
            Swastik Brass Components engineers high-performance brass parts for the world's most demanding industries — from aerospace to heavy rail.
        </p>
    )
}

const HeroCta = () => {
    return (
        <div className="hidden sm:flex flex-col sm:flex-row gap-4">
            <Fade className="flex">

                <CustomLink
                    href={"/sectors"}
                    variant="outline-brand"
                    className="text-background"
                >
                    Explore Sectors
                </CustomLink>
            </Fade>
            <Fade delay={0.2}>

                <CustomLink
                    href={"/quote"}
                    variant="button-brand"
                    className="w-max"
                >
                    Get a Quote
                    <Arrow variant="black" />
                </CustomLink>
            </Fade>
        </div>
    )
}


export default Hero