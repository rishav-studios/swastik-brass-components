import Fade from "@/components/animations/Fade"
import Container from "@/components/layout/Container"
import { icons } from "@swastik/ui"
import Link from "next/link"
import HeroVideo from "./HeroVideo"


const Hero = () => {
    return (
        <div className="h-dvh w-full fixed">
            <HeroVideo />
            <div className="absolute w-full h-full bottom-0 flex items-end bg-linear-to-tr from-black/80  to-transparent">
                <Container className="mb-16">
                    <div className="space-y-4">
                        <Fade>
                            <h1 className="text-8xl font-semibold text-background">

                                Precision Brass
                                <br />
                                <span className="text-primary">

                                    Components
                                </span>
                                <br />
                                Built to Last
                            </h1>
                        </Fade>
                        <Fade delay={0.5}>

                            <p className="text-background/80 text-lg max-w-lg">
                                Swastik Brass Components engineers high-performance brass parts for the world's most demanding industries — from aerospace to heavy rail.
                            </p>
                        </Fade>
                        <Fade delay={0.6}>


                            <div className="flex gap-4">
                                <Link href={"/sectors"} className="px-6 py-2 text-sm font-semibold text-white border border-primary rounded-full hover:bg-primary/90 transition-all shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/30 active:scale-95 flex items-center gap-2">
                                    Explore Sectors
                                </Link>
                                <Link href={"/quote"} className="pr-3 pl-5 py-2 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary/90 transition-all shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/30 active:scale-95 flex items-center gap-4 group ">
                                    Get a Quote

                                    <div className="bg-foreground p-1 rounded-full group-hover:-rotate-45 transition-all">
                                        <icons.arrowRight className="text-background" />
                                    </div>
                                </Link>
                            </div>
                        </Fade>
                    </div>
                </Container>
            </div>
            <a href="#sectors" className="absolute bottom-4 left-0 right-0 mx-auto flex w-max border border-r-background rounded-full cursor-pointer px-8 py-2">
                <icons.arrowDown className="animate-bounce text-white" />
            </a>
        </div>
    )
}

export default Hero