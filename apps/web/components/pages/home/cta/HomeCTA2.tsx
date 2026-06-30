import Container from "@/components/layout/Container"
import Section from "@/components/layout/Section"
import { Eyebrow } from "@/components/shared/SectionHeader"
import { icons } from "@swastik/ui"
import Link from "next/link"

const HomeCTA2 = () => {
    return (
        <>
            {/* <div className="w-screen overflow-x-hidden- translate-y-20">

                <img src="/glow.avif" className="w-full blur-[30px] scale-x-150 origin-center" alt="" />
            </div> */}
            <div className="relative bg-[#191919] w-full overflow-hidden">
                {/* Ambient Glow Transition */}
                {/* Positioned absolutely at the top to bleed ambient light downwards */}
                {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen max-w-[1400px] -translate-y-[40%] pointer-events-none opacity-70 z-0">
                    <img
                        src="/glow.avif"
                        className="w-full h-auto blur-[80px] d:blur-[120px] scale-x-[1.5] md:scale-x-[2] transform-gpu"
                        alt=""
                    />
                </div> */}

                <Section className="relative z-10 py-32 md:py-48 lg:py-56 min-h-[70vh] flex flex-col justify-center">
                    <Container className="flex flex-col items-center text-center">

                        <Eyebrow className="mb-8 border-white/10 bg-white/5 text-white/80 backdrop-blur-md shadow-none">
                            Start your next project
                        </Eyebrow>

                        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-bold tracking-tight text-white mb-8 leading-[1.05]">
                            Ready to engineer <br className="hidden sm:block" />
                            <span className="text-white/40 font-medium">the future?</span>
                        </h2>

                        <p className="text-lg md:text-xl text-white/50 max-w-2xl mb-14 font-medium leading-relaxed">
                            Partner with Swastik Brass Components for zero-defect precision parts delivered at scale, anywhere in the world.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                            <Link
                                href="/quote"
                                className="group flex w-full sm:w-auto h-14 items-center justify-center rounded-full bg-primary px-10 text-base font-semibold text-white transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
                            >
                                <span className="mr-2 tracking-wide">Request a Quote</span>
                                <icons.arrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>

                            <Link
                                href="/contact"
                                className="flex w-full sm:w-auto h-14 items-center justify-center rounded-full border border-white/15 px-10 text-base font-semibold text-white transition-colors hover:bg-white/10 active:bg-white/5"
                            >
                                <span className="tracking-wide">Contact Sales</span>
                            </Link>
                        </div>

                    </Container>
                </Section>
            </div>
        </>
    )
}

export default HomeCTA2