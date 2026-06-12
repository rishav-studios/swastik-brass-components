import Container from "@/components/layout/Container"
import Section from "@/components/layout/Section"
import ImageReveal from "@/components/shared/ImageReveal"
import { Eyebrow, Heading, SectionHeader } from "@/components/shared/SectionHeader"
import { icons } from "@swastik/ui"
import Link from "next/link"

const HomeAbout = () => {
    return (
        <Section className="relative bg-background py-24 flex items-center">
            <Container>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* left side */}
                    <div className="space-y-8">

                        <SectionHeader className="w-max space-y-4">
                            <Eyebrow className="ml-0">who we are</Eyebrow>
                            <Heading className="leading-none">Two Decades of
                                <br />
                                <span className="text-primary">
                                    Brass craftsmanship
                                </span>
                            </Heading>
                        </SectionHeader>



                        <div className="space-y-4">
                            <p className="max-w-xl">Founded over 25 years ago in the heart of India's brass manufacturing belt, Swastik Brass Components has grown from a local supplier into a globally trusted exporter of precision engineered brass parts.</p>
                            <p className="max-w-xl">Our facility houses state-of-the-art CNC turning, automatic screw machines, and in-house quality labs — enabling us to produce complex geometries to the tightest tolerances across a wide range of brass alloys.</p>

                            <div className="flex gap-8 items-center mt-12">
                                <Link href={""} className="flex items-center w-max group">
                                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-all duration-300">
                                        <icons.arrowRight className="text-white" />
                                    </div>
                                    <span className="ml-3 text-lg font-medium text-primary">
                                        Read More
                                    </span>
                                </Link>
                                <Link
                                    href="/facilities"
                                    className="flex items-center text-lg font-medium text-muted-foreground hover:text-primary transition-colors duration-300 group py-2"
                                >
                                    <span className="relative">
                                        Explore Capabilities
                                        <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full" />
                                    </span>
                                    <icons.arrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* right side */}
                    <div className="relative grid grid-cols-12 gap-3 sm:gap-4 auto-rows-[80px] sm:auto-rows-[100px] w-full mt-12 lg:mt-0 pl-0 lg:pl-8">
                        {/* Dots pattern top-left */}
                        <div
                            className="absolute -top-8 -left-4 w-120 h-100 opacity-30 z-0"
                            style={{
                                backgroundImage: 'radial-gradient(var(--primary) 1.5px, transparent 1.5px)',
                                backgroundSize: '12px 12px'
                            }}
                        />
                        {/* Dots pattern bottom-right */}
                        <div
                            className="absolute -bottom-20 -right-4 w-60 h-100 opacity-30 z-0"
                            style={{
                                backgroundImage: 'radial-gradient(var(--primary) 1.5px, transparent 1.5px)',
                                backgroundSize: '12px 12px'
                            }}
                        />

                        {/* Card 1: CNC Facility */}
                        <div className="col-span-7 row-span-3 relative rounded-2xl overflow-hidden shadow-lg border border-border/40 group/img1">
                            <ImageReveal
                                src="/about-facility.png"
                                alt="Swastik Brass CNC Facility"
                                className="w-full h-full"
                                aspectRatio=""
                                imageClassName="transition-all duration-700 group-hover/img1:scale-105 group-hover/img1:brightness-105"
                                sizes="(max-w-768px) 100vw, 30vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Card 2: QA Laboratory / Technician */}
                        <div className="col-span-5 row-span-2 relative rounded-2xl overflow-hidden shadow-lg border border-border/40 group/img2">
                            <ImageReveal
                                src="/about-technician.png"
                                alt="Modern QA Inspection"
                                className="w-full h-full"
                                aspectRatio=""
                                imageClassName="transition-all duration-700 group-hover/img2:scale-105"
                                sizes="(max-w-768px) 50vw, 20vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Card 3: Blueprint & Precision */}
                        <div className="col-span-5 row-span-3 relative rounded-2xl overflow-hidden shadow-lg border border-border/40 group/img3">
                            <ImageReveal
                                src="/about-blueprint.png"
                                alt="Brass Components Engineering Blueprint"
                                className="w-full h-full"
                                aspectRatio=""
                                imageClassName="transition-all duration-700 group-hover/img3:scale-105"
                                sizes="(max-w-768px) 50vw, 20vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Card 4: Precision Parts */}
                        <div className="col-span-7 row-span-2 relative rounded-2xl overflow-hidden shadow-lg border border-border/40 group/img4">
                            <ImageReveal
                                src="/about-parts.png"
                                alt="Finished Precision Brass Components"
                                className="w-full h-full"
                                aspectRatio=""
                                imageClassName="transition-all duration-700 group-hover/img4:scale-105 group-hover/img4:brightness-105"
                                sizes="(max-w-768px) 100vw, 30vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Floating Experience Badge */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background/95 backdrop-blur-md border border-border p-3 sm:p-5 rounded-2xl shadow-2xl flex items-center gap-2 sm:gap-4 animate-float hover:scale-105 transition-all duration-300 z-10">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <icons.grade className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <div className="whitespace-nowrap">
                                <div className="text-xl sm:text-2xl font-bold text-foreground leading-none">25+</div>
                                <div className="text-[8px] sm:text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-1">Years of Excellence</div>
                            </div>
                        </div>
                    </div>
                </div>


            </Container>
        </Section>
    )
}

export default HomeAbout