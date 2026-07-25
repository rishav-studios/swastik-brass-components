"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import BackgroundNoise from "@/components/shared/BackgroundNoise";
import { Eyebrow, SectionHeader } from "@/components/shared/SectionHeader";
import { TextRevealOnScroll } from "@/components/shared/TextReveal";
import { Timeline } from "@swastik/ui/components/ui/timeline";
import { cn } from "@swastik/ui/lib/utils";
import { ReactNode } from "react";
type TimelineEntry = { // ui.acertinity.in
    title: string;
    content: React.ReactNode;
};

type ContentHeaderProps = {
    className?: string;
    children: ReactNode;
}
const ContentHeader = ({ className, children }: ContentHeaderProps) => {
    return (
        <div className={cn("inline-flex w-fit items-center rounded-full px-3 py-1 text-xs md:text-sm font-medium", className)}>
            {children}
        </div>
    )
}

export const JOURNEY: TimelineEntry[] = [
    {
        title: "2005",
        content: (
            <div className="space-y-5 h-full">
                <div className="grid gap-4 grid-cols-1 2xl:grid-cols-2 h-full">
                    <div className="overflow-hidden rounded-3xl flex w-full h-full p-6 bg-[#171717]">
                        <img
                            src="/logo-white.svg"
                            alt="Swastik Brass Components foundation"
                            className=" object-contain flex "
                        />
                    </div>
                    <div className="flex flex-col justify-center space-y-4 rounded-3xl bg-amber-50 p-6">
                        <ContentHeader className="bg-amber-100 text-amber-800">
                            Foundation year
                        </ContentHeader>
                        <h3 className="text-2xl font-semibold text-neutral-900">The beginning in Jamnagar</h3>
                        <p className="text-sm md:text-base hidden sm:block text-neutral-700">
                            Swastik Brass Components was founded in <strong>2005</strong> in
                            <strong> Jamnagar, Gujarat</strong>, with a vision to manufacture
                            precision brass components that meet international quality standards.
                        </p>
                        <div className="rounded-2xl hidden sm:block bg-white p-4 shadow-sm">
                            <p className="text-sm md:text-base font-semibold text-neutral-900">What defined the first year</p>
                            <ul className="mt-3 space-y-2 text-sm md:text-base text-neutral-700">
                                <li>• Established the first precision machining setup</li>
                                <li>• Focused on brass inserts and custom turned parts</li>
                                <li>• Built the company around quality and customer trust</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        ),
    },

    {
        title: "2008",
        content: (
            <div className="space-y-5">
                <div className="rounded-3xl bg-neutral-900 p-6 text-white">
                    <div className="flex flex-col gap-6 2xl:flex-row md:items-center">
                        <div className="flex-1 space-y-4">
                            <ContentHeader className="bg-white/10">
                                Production expansion
                            </ContentHeader>
                            <h3 className="text-2xl font-semibold">Scaling capacity to meet demand</h3>
                            <p className="text-neutral-300 hidden sm:block text-sm md:text-base">
                                As demand grew, the company expanded production capacity with
                                additional CNC and precision machining equipment, allowing Swastik
                                Brass Components to serve a wider customer base.
                            </p>
                        </div>
                        <div className="grid flex-1 grid-cols-1 w-full md:grid-cols-2 gap-3">
                            <div className="overflow-hidden rounded-2xl bg-neutral-800">
                                <img
                                    src="https://jpouktmcsliceesoassj.supabase.co/storage/v1/object/public/public_assets/general/5-axis-machining-center.webp"
                                    alt="CNC machines"
                                    className="h-36 lg:h-56 w-full object-cover"
                                />
                            </div>
                            <div className="overflow-hidden rounded-2xl bg-neutral-800">
                                <img
                                    src="https://jpouktmcsliceesoassj.supabase.co/storage/v1/object/public/public_assets/general/shop-floor-1.webp"
                                    alt="Production floor"
                                    className="h-36 lg:h-56 w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden sm:grid gap-3 lg:grid-cols-3">
                    <div className="rounded-2xl border border-neutral-200 bg-white p-4">
                        <p className="text-sm font-semibold text-neutral-900">Capacity growth</p>
                        <p className="mt-1 text-sm text-neutral-600">Additional CNC machines installed.</p>
                    </div>
                    <div className="rounded-2xl border border-neutral-200 bg-white p-4">
                        <p className="text-sm font-semibold text-neutral-900">Wider reach</p>
                        <p className="mt-1 text-sm text-neutral-600">Started supplying to more industrial customers.</p>
                    </div>
                    <div className="rounded-2xl border border-neutral-200 bg-white p-4">
                        <p className="text-sm font-semibold text-neutral-900">Reliable partner</p>
                        <p className="mt-1 text-sm text-neutral-600">Built a reputation for timely delivery.</p>
                    </div>
                </div>
            </div>
        ),
    },

    {
        title: "2011",
        content: (
            <div className="space-y-5">
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-6 2xl:flex-row">
                        <div className="flex-1 space-y-4">
                            <ContentHeader className=" bg-blue-50 text-blue-700">
                                Product diversification
                            </ContentHeader>
                            <h3 className="text-2xl font-semibold text-neutral-900">Expanding the product portfolio</h3>
                            <p className="text-neutral-700 hidden sm:block text-sm md:text-base">
                                Swastik Brass Components diversified its product range by introducing
                                precision-engineered brass inserts, electrical components, auto parts,
                                pipe fittings, terminals, and custom machined parts.
                            </p>
                        </div>
                        <div className="grid flex-1 grid-cols-1 lg:grid-cols-2 gap-3">

                            <div className="overflow-hidden rounded-2xl bg-neutral-100">
                                <img
                                    src="https://jpouktmcsliceesoassj.supabase.co/storage/v1/object/public/public_assets/general/brass-electrical-part.webp"
                                    alt="Electrical components"
                                    className="h-32 lg:h-52 w-full object-cover"
                                />
                            </div>
                            <div className="overflow-hidden rounded-2xl bg-neutral-100">
                                <img
                                    src="https://jpouktmcsliceesoassj.supabase.co/storage/v1/object/public/public_assets/general/brass-auto-part.webp"
                                    alt="Auto parts"
                                    className="h-32 lg:h-52 w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden gap-3 sm:grid-cols-2 lg:grid-cols-3 md:grid">
                    {[
                        "Brass inserts",
                        "Electrical components",
                        "Auto parts",
                        "Pipe fittings",
                        "Terminals",
                        "Custom machined parts",
                    ].map((item) => (
                        <div
                            key={item}
                            className="rounded-2xl border border-neutral-200 bg-white p-4 text-sm font-medium text-neutral-800"
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        ),
    },

    {
        title: "2014",
        content: (
            <div className="space-y-5">
                <div className="grid gap-4 lg:grid-cols-3">
                    <div className="lg:col-span-2 rounded-3xl bg-linear-to-br from-neutral-900 to-neutral-800 p-6 text-white">
                        <div className="space-y-4">
                            <ContentHeader className="bg-white/10">
                                Quality focus
                            </ContentHeader>
                            <h3 className="text-2xl font-semibold">Strengthening quality control</h3>
                            <p className="text-neutral-300 hidden sm:block text-sm md:text-base">
                                The company adopted advanced quality control processes and modern
                                production techniques to ensure consistent dimensional accuracy,
                                superior finishing, and reliable delivery performance.
                            </p>
                            <div className="grid gap-3 lg:grid-cols-3">
                                <div className="rounded-2xl bg-white/5 p-4">
                                    <p className="text-sm md:text-base font-semibold">Dimensional accuracy</p>
                                </div>
                                <div className="rounded-2xl bg-white/5 p-4">
                                    <p className="text-sm md:text-base font-semibold">Superior finishing</p>
                                </div>
                                <div className="rounded-2xl bg-white/5 p-4">
                                    <p className="text-sm md:text-base font-semibold">Timely delivery</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden rounded-3xl bg-neutral-100">
                        <img
                            src="https://jpouktmcsliceesoassj.supabase.co/storage/v1/object/public/public_assets/general/quality-inspection.webp"
                            alt="Quality control inspection"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        ),
    },

    {
        title: "2017",
        content: (
            <div className="space-y-5">
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <div className="space-y-4">
                        <ContentHeader className="bg-green-50 text-green-700">
                            Multi-material machining
                        </ContentHeader>
                        <h3 className="text-2xl font-semibold text-neutral-900">Beyond brass manufacturing</h3>
                        <p className="text-neutral-700 text-sm md:text-base hidden sm:block">
                            Swastik Brass Components expanded its machining capabilities to include
                            <strong> aluminium</strong>, <strong>stainless steel</strong>, and other
                            engineering materials, enabling customers to source diverse components
                            from one trusted partner.
                        </p>
                    </div>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                    <div className="overflow-hidden rounded-3xl bg-neutral-100">
                        <img
                            src="https://jpouktmcsliceesoassj.supabase.co/storage/v1/object/public/public_assets/general/about-parts.webp"
                            alt="Multiple engineering materials"
                            className="h-72 w-full object-cover"
                        />
                    </div>
                    <div className="rounded-3xl bg-neutral-50 py-6">
                        <p className="text-sm font-semibold text-neutral-900">Materials added</p>
                        <div className="mt-4 grid gap-3">
                            {[
                                "Aluminium",
                                "Stainless steel",
                            ].map((material) => (
                                <div
                                    key={material}
                                    className="rounded-full w-max border border-neutral-200 bg-white p-4 text-sm md:text-base font-medium text-neutral-800"
                                >
                                    {material}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        ),
    },

    {
        title: "2021",
        content: (
            <div className="space-y-5">
                <div className="rounded-3xl bg-blue-50 p-6">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                        <div className="flex-1 space-y-4">
                            <ContentHeader className="bg-blue-100 text-blue-700">
                                Industry expansion
                            </ContentHeader>
                            <h3 className="text-2xl font-semibold text-neutral-900">Serving diverse industries</h3>
                            <p className="text-neutral-700 text-sm md:text-base hidden sm:block">
                                With years of manufacturing expertise, the company expanded its
                                presence across automotive, electrical & electronics, oil & gas,
                                plumbing, aerospace, railway, telecommunications, renewable energy,
                                and industrial engineering sectors.
                            </p>
                        </div>
                        <div className="grid flex-1 md:grid-cols-2 gap-3">
                            {[
                                "Aerospace",
                                "Automobile",
                                "Oil & gas",
                                "Railway",
                            ].map((industry) => (
                                <div
                                    key={industry}
                                    className="rounded-full border border-blue-100 bg-white py-2 px-4 text-sm md:text-base font-medium text-neutral-800"
                                >
                                    {industry}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        ),
    },

    {
        title: "2026...",
        content: (
            <div className="space-y-5">
                <div className="grid gap-4 lg:grid-cols-3">

                    <div className="rounded-3xl lg:col-span-3 bg-neutral-900 p-6 text-white">
                        <div className="space-y-4">
                            <ContentHeader className="bg-white/10 text-white">
                                Present day
                            </ContentHeader>
                            <h3 className="text-2xl font-semibold">Trusted worldwide manufacturer</h3>
                            <p className="text-neutral-300 text-sm md:text-base hidden sm:block">
                                Today, Swastik Brass Components continues to be a trusted manufacturer
                                of precision turned and machined components, serving clients worldwide
                                with a commitment to quality, customization, competitive pricing, and
                                on-time delivery.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="grid gap-3 lg:grid-cols-2">
                    {[
                        "Quality assurance",
                        "Customization",
                        "Competitive pricing",
                        "On-time delivery",
                    ].map((value) => (
                        <div
                            key={value}
                            className="rounded-full border border-neutral-200 bg-white p-4 text-sm md:text-base font-medium text-neutral-800"
                        >
                            {value}
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
];

const AboutJourney = () => {
    return (
        <Section id="journey">
            <BackgroundNoise />
            <Container className="relative z-10">
                <SectionHeader>

                    <Eyebrow>history</Eyebrow>

                    <TextRevealOnScroll as="h2" className="leading-tight whitespace-pre-line">
                        Our Journey
                    </TextRevealOnScroll>
                </SectionHeader>

                <Timeline data={JOURNEY} />
            </Container>
        </Section>
    );
};

export default AboutJourney;
