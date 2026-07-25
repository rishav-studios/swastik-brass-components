"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Eyebrow, SectionHeader } from "@/components/shared/SectionHeader";
import { StickyContainer, StickyItem } from "@/components/shared/Sticky";
import { TextRevealOnScroll } from "@/components/shared/TextReveal";
import { materials } from "@/constants/materials";
import MaterialCard from "./MaterialCard";

const calculateTopOffset = (index: number) => {
    return 96 + (index * 120);
}
const HomeMaterials = () => {

    return (
        <Section className="relative items-center justify-center ">

            <Container className="flex flex-col gap-6 min-[468px]:gap-12 md:gap-16 lg:gap-24">
                <SectionHeader>
                    <Eyebrow className="min-[468px]:mx-auto">Materials</Eyebrow>

                    <TextRevealOnScroll as="h2" className="leading-tight min-[468px]:hidden whitespace-pre-line">

                        {`Manufacturing\nsolutions\nwith standard\nmaterials`}
                    </TextRevealOnScroll>
                    <TextRevealOnScroll as="h2" className="leading-tight hidden min-[468px]:inline whitespace-pre-line text-center">

                        {`Manufacturing solutions\nwith standard materials`}
                    </TextRevealOnScroll>


                </SectionHeader>




                <StickyContainer className="z-10">
                    {
                        materials.map((material, index) => (
                            <StickyItem
                                className="h-max static md:sticky py-10 bg-background border-t-2 border-t-gray-300"
                                style={{ top: `${calculateTopOffset(index)}px` }}
                                key={material.name}>
                                <MaterialCard {...material} index={index + 1} />
                            </StickyItem>
                        ))
                    }
                    <StickyItem className="h-24 pointer-events-none" children=" " />
                </StickyContainer>
            </Container>
        </Section>
    );
};

export default HomeMaterials;
