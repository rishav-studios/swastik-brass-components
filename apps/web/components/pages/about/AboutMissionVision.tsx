"use client";

import Fade from "@/components/animations/Fade";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import ImageReveal from "@/components/shared/ImageReveal";
import { TextRevealOnScroll } from "@/components/shared/TextReveal";
import { icons } from "@swastik/ui/constants/icon";

/* ── Bullet point sub-component ─────────────────────────────── */
const BulletPoint = ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-center gap-3 text-foreground/80">
        <icons.arrowRight className="w-4 h-4 text-foreground shrink-0" />
        <span className="text-base font-medium">{children}</span>
    </li>
);

/* ── Mission image collage (left side) ──────────────────────── */
const MissionImageGrid = () => (
    <div className="relative w-full h-full md:min-h-100">
        {/* Large background image — 75% width, pushed right */}
        <div className=" w-[75%] h-full overflow-hidden flex rounded-2xl min-h-100">
            <ImageReveal
                src="https://jpouktmcsliceesoassj.supabase.co/storage/v1/object/public/public_assets/general/mission-2.webp"
                alt="Manufacturing facility"
                className="w-full h-100 object-cover"
            />
        </div>

        {/* Smaller overlapping image — vertically centered, half on / half off */}
        <div className="absolute right-0 top-1/2 bg-white p-1 md:p-2 -translate-y-1/2 w-[55%] aspect-4/3 overflow-hidden rounded-2xl shadow-2xl">
            <ImageReveal
                src="https://jpouktmcsliceesoassj.supabase.co/storage/v1/object/public/public_assets/general/mission-1.webp"
                alt="Quality inspection"
                className="w-full h-full object-cover rounded-2xl"
            />
        </div>
    </div>
);

/* ── Vision overlapping images (right side) ─────────────────── */
const VisionImageStack = () => (
    <div className="relative w-full h-full md:min-h-100">
        {/* Large background image — 75% width, pushed right */}
        <div className="ml-auto w-[75%] h-full min-h-100 overflow-hidden rounded-2xl">
            <ImageReveal
                src="https://jpouktmcsliceesoassj.supabase.co/storage/v1/object/public/public_assets/general/vision-1.webp"
                alt="Manufacturing facility"
                className="w-full h-100 object-cover"
            />
        </div>

        {/* Smaller overlapping image — vertically centered, half on / half off */}
        <div className="absolute left-0 top-1/2 bg-white p-1 md:p-2 -translate-y-1/2 w-[55%] aspect-4/3 overflow-hidden rounded-2xl shadow-2xl">
            <ImageReveal
                src="https://jpouktmcsliceesoassj.supabase.co/storage/v1/object/public/public_assets/general/vision-2.webp"
                alt="Quality inspection"
                className="w-full h-full object-cover rounded-2xl"
            />
        </div>
    </div>
);

/* ══════════════════════════════════════════════════════════════ */
/*  Main Component                                               */
/* ══════════════════════════════════════════════════════════════ */
const AboutMissionVision = () => {
    return (
        <Section className="bg-background relative overflow-hidden min-h-max">
            <Container className="space-y-24 lg:space-y-32 relative z-10">

                {/* ─── Mission Block ─────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Images — left */}
                    <Fade className="lg:col-span-7" delay={0.1}>
                        <MissionImageGrid />
                    </Fade>

                    {/* Text — right */}
                    <Fade className="lg:col-span-5" delay={0.25}>
                        <div className="space-y-6">
                            <TextRevealOnScroll as="h2">Our Mission</TextRevealOnScroll>

                            <div className="space-y-4 text-foreground/70 text-base lg:text-lg leading-relaxed">
                                <p>
                                    To provide exceptional manufacturing services that exceed client expectations
                                    through innovation, quality craftsmanship, and a commitment to sustainability.
                                </p>
                                <p>
                                    Through precision, expertise, and a customer-centric approach, we aim to create
                                    solutions that inspire and improve the lives of our clients and communities, striving
                                    to exceed expectations in every project.
                                </p>
                                <p>
                                    Our dedication to integrity and engineering excellence drives us to build lasting
                                    relationships and a legacy of trust.
                                </p>
                            </div>

                            <ul className="space-y-3 pt-2">
                                <BulletPoint>Fostering Sustainable Growth and Green Development</BulletPoint>
                                <BulletPoint>Innovating for a Sustainable Future</BulletPoint>
                                <BulletPoint>Customer-Centric Approach</BulletPoint>
                                <BulletPoint>Building Stronger Communities</BulletPoint>
                            </ul>
                        </div>
                    </Fade>
                </div>

                {/* ─── Vision Block ──────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Text — left */}
                    <Fade className="lg:col-span-5 order-2 lg:order-1" delay={0.1}>
                        <div className="space-y-6">
                            <TextRevealOnScroll as="h2">Our Vision</TextRevealOnScroll>

                            <div className="space-y-4 text-foreground/70 text-base lg:text-lg leading-relaxed">
                                <p>
                                    At Swastik Brass Components, our vision is to redefine the future of
                                    manufacturing through innovation, sustainability, and excellence.
                                </p>
                                <p>
                                    We aim to create components that not only inspire but also contribute to the
                                    well-being of communities and the environment. By embracing cutting-edge
                                    technology and eco-friendly practices, we strive to lead the industry
                                    toward a greener, smarter future.
                                </p>
                                <p>
                                    Our focus is on delivering value, quality, and longevity in every project
                                    we undertake. Together, we envision a world where manufacturing empowers
                                    progress and transforms lives.
                                </p>
                            </div>

                            <ul className="space-y-3 pt-2">
                                <BulletPoint>Inspiring Modern Architecture</BulletPoint>
                                <BulletPoint>Pioneering Sustainable Construction</BulletPoint>
                            </ul>
                        </div>
                    </Fade>

                    {/* Images — right (overlapping stack) */}
                    <Fade className="lg:col-span-7 order-1 lg:order-2" delay={0.25}>
                        <VisionImageStack />
                    </Fade>
                </div>

            </Container>
        </Section>
    );
};

export default AboutMissionVision;
