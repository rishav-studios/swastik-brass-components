import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import BackgroundNoise, { BackgroundLines } from "@/components/shared/BackgroundNoise";
import ScrollDownMouseAnimation from "@/components/shared/MouseScrollAnimatedIcon";
import { Eyebrow, SectionHeader } from "@/components/shared/SectionHeader";


const AboutHero = () => {
    return (
        <Section className="min-h-[70dvh] lg:py-16 lg:pt-24">
            <BackgroundNoise />
            <BackgroundLines className="w-9/10 mx-auto" />
            <Container className="relative z-10 h-[calc(70dvh-8rem)] lg:h-[calc(70dvh-10rem)] flex flex-col">
                <SectionHeader className="space-y-6 my-auto sm:mt-auto">
                    <Eyebrow className="mx-auto">Who we are</Eyebrow>
                    <h1 className="text-center text-6xl md:text-8xl font-medium">About Us</h1>
                </SectionHeader>
                <div className="justify-between hidden sm:flex text-gray-500 mt-auto">
                    <span>Jamnagar, Gujarat, India</span>
                    <span>22.4685° N, 70.0573° E</span>
                </div>
            </Container>
            <ScrollDownMouseAnimation iconContainerClassname="bg-gray-300" />

        </Section>
    );
};

export default AboutHero;
