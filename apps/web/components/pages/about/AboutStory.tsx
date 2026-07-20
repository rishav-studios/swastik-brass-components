import Container from "@/components/layout/Container"
import Section from "@/components/layout/Section"
import BackgroundNoise, { BackgroundLines } from "@/components/shared/BackgroundNoise"
import { Arrow, CustomLink } from "@/components/shared/clickables/CustomLink"
import { Eyebrow } from "@/components/shared/SectionHeader"
import { TextRevealOnScroll } from "@/components/shared/TextReveal"
import { icons } from "@swastik/ui"
import Image from "next/image"

const AboutStory = () => {
    return (
        <Section className="hidden">
            <BackgroundNoise />
            <BackgroundLines className="w-9/10 mx-auto" />
            <Container className="relative z-10 space-y-24">
                {/* top */}
                <div className="grid grid-cols-10 gap-20">
                    {/* eyebrow */}
                    <div className="col-span-3">
                        <Eyebrow className="mx-0!">Our story</Eyebrow>
                    </div>
                    <div className="col-span-7">
                        {
                            <TextRevealOnScroll as="h2">
                                {
                                    `Engineering trust and\nquality through years of\nmanufacturing experience`
                                }
                            </TextRevealOnScroll>
                        }
                    </div>
                </div>

                {/* bottom */}
                <div className="grid grid-cols-10 gap-20">
                    <div className="col-span-3 relative rounded-2xl overflow-hidden">
                        <Image src="/about-founder.png" alt="" fill className="w-full h-full object-cover z-1 absolute inset-0" />

                    </div>
                    <div className="col-span-7 grid grid-cols-2 gap-20">
                        {/* story */}
                        <div className="space-y-6">
                            <h3 className="font-semibold text-3xl">Our story</h3>
                            <div className="space-y-4 text-lg text-foreground/80">
                                <p>
                                    We started with a vision to redefine manufacturing standards and provide solutions that industries can rely on. Over the years, we have grown into a team of skilled professionals equipped with cutting-edge technology, serving clients across diverse sectors and geographies.

                                </p>
                                <p>

                                    What drives us is not just producing components, but delivering value — ensuring every part we manufacture contributes to our client’s success. Our commitment to quality, timely delivery, and innovation has helped us establish long-term partnerships with leading businesses worldwide

                                </p>
                            </div>
                        </div>
                        {/* facilities */}
                        <div className=" h-full flex flex-col gap-6">
                            <h3 className="font-semibold text-3xl">Our Facilities</h3>
                            <ul className=" w-full text-lg text-foreground/80 space-y-4">
                                <li>
                                    <CustomLink variant="custom" href="/facilities/manufacturing" className="flex justify-between pb-4 border-b-2 border-gray-300 hover:border-foreground/70 transition-colors duration-300">
                                        Manufacturing Facility
                                        <icons.arrowRight />
                                    </CustomLink>
                                </li>
                                <li>
                                    <CustomLink variant="custom" href="/facilities/testing" className="flex justify-between pb-4 border-b-2 border-gray-300 hover:border-foreground/70 transition-colors duration-300">
                                        Testing Facility
                                        <icons.arrowRight />
                                    </CustomLink>
                                </li>
                            </ul>
                            <CustomLink variant="button-black" className="w-max mt-auto">
                                View all
                                <Arrow variant="primary" />
                            </CustomLink>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    )
}


export default AboutStory