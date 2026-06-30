"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Eyebrow, SectionHeader } from "@/components/shared/SectionHeader";
import { StickyContainer, StickyItem } from "@/components/shared/Sticky";
import { TextRevealOnScroll } from "@/components/shared/TextReveal";
import MaterialCard from "./MaterialCard";

const materials = [
    {
        name: "Brass",
        imageSrc: "/materials/brass.png",
        features: [
            "Lead-free brass (C46500)",
            "Nickel-plated brass",
            "High-tensile brass",
        ],
        grades: [
            "C6801 – Bismuth Brass",
            "C36000 – Free Cutting Brass",
            "C37700 – Forging Brass",
            "C38500 – Architectural Brass",
            "C35300 – High Leaded Brass",
            "C34500 – Leaded Brass",
            "C26000 – Cartridge Brass",
            "CW614N – Free Machining Brass",
            "CW617N – Forging Brass",
            "CW602N – DZR Brass",
            "CW511L – Low Lead Brass",
            "CW508L – High Purity Brass",
            "CW510L – Gen. Purpose Brass",
            "CW721R – Special Brass Alloy",

        ]
    },
    {
        name: "Stainless Steel",
        imageSrc: "/materials/stainless-steel.png",
        grades: [
            "304 Stainless Steel",
            "316 Stainless Steel",
            "303 Stainless Steel"
        ],
        features: [
            "High corrosion resistance",
            "Good mechanical properties",
            "Heat resistance",
            "Durable"
        ]
    },
    {
        name: "Aluminium",
        imageSrc: "/materials/aluminium.png",
        grades: [
            "Aluminium 6061",
            "Aluminium 6063",
            "Aluminium 7075"
        ],
        features: [
            "Lightweight",
            "High strength-to-weight ratio",
            "Excellent corrosion resistance",
            "Good thermal conductivity"
        ]
    }
]
const calculateTopOffset = (index: number) => {
    return 96 + (index * 120);
}
const HomeMaterials = () => {

    return (
        <Section className="relative items-center justify-center ">

            <Container className="flex flex-col gap-24">
                <SectionHeader className="text-center z-10 mx-auto max-w-3xl flex flex-col items-center gap-2">
                    <Eyebrow className="mx-auto">Materials</Eyebrow>

                    <TextRevealOnScroll as="h2" className="leading-tight whitespace-pre-line">

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
                    <StickyItem className="h-24" children=" " />
                </StickyContainer>
            </Container>
        </Section>
    );
};

export default HomeMaterials;
