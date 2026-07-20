import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import BackgroundNoise, { BackgroundLines } from "@/components/shared/BackgroundNoise";
import { Eyebrow, SectionHeader } from "@/components/shared/SectionHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Quality Policy | Swastik Brass Components",
    description: "Our commitment to quality — learn about the standards, certifications, and quality management systems at Swastik Brass Components.",
};

export default function QualityPolicyPage() {
    return (
        <>
            {/* Hero */}
            <Section className="min-h-[50dvh] lg:py-16 lg:pt-24 flex items-center">
                <BackgroundNoise />
                <BackgroundLines className="w-9/10 mx-auto" />
                <Container className="relative z-10">
                    <SectionHeader className="space-y-6">
                        <Eyebrow className="mx-auto">Standards</Eyebrow>
                        <h1 className="text-center text-5xl md:text-7xl font-medium">Quality Policy</h1>
                        <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto">
                            Our unwavering commitment to precision, consistency, and continuous improvement.
                        </p>
                    </SectionHeader>
                </Container>
            </Section>

            {/* Content */}
            <Section className="min-h-max py-16 lg:py-20">
                <Container>
                    <article className="max-w-3xl mx-auto space-y-12 text-foreground/85 text-[1.0625rem] leading-relaxed">

                        <PolicySection title="Our Commitment">
                            <p>
                                At Swastik Brass Components, quality is not just a department — it is the foundation of everything we do. From raw material selection to final inspection, every step of our manufacturing process is governed by rigorous quality standards designed to exceed our customers&apos; expectations.
                            </p>
                        </PolicySection>

                        <PolicySection title="Quality Objectives">
                            <p>We are committed to achieving and maintaining the following quality objectives:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-3">
                                <li><strong>Zero-Defect Manufacturing:</strong> Delivering precision-engineered components that conform to specified dimensions, tolerances, and surface finishes — every time.</li>
                                <li><strong>On-Time Delivery:</strong> Meeting agreed-upon delivery schedules through optimised production planning and inventory management.</li>
                                <li><strong>Continuous Improvement:</strong> Systematically analysing processes, identifying opportunities for improvement, and implementing corrective and preventive actions.</li>
                                <li><strong>Customer Satisfaction:</strong> Actively engaging with our customers to understand their evolving needs and translating those into measurable quality parameters.</li>
                                <li><strong>Employee Development:</strong> Investing in the training and development of our workforce to ensure competence across all quality-critical operations.</li>
                            </ul>
                        </PolicySection>

                        <PolicySection title="Certifications & Standards">
                            <p>Our quality management system is certified to the following international standards:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-3">
                                <li><strong>ISO 9001:2015</strong> — Quality Management Systems</li>
                                <li><strong>IATF 16949:2016</strong> — Automotive Quality Management Systems</li>
                                <li><strong>ISO 14001:2015</strong> — Environmental Management Systems</li>
                            </ul>
                            <p className="mt-3">
                                These certifications are independently audited and renewed by accredited certification bodies, ensuring our systems meet the highest global benchmarks.
                            </p>
                        </PolicySection>

                        <PolicySection title="Quality Control Process">
                            <p>Our multi-stage quality control process ensures defect-free output across every production batch:</p>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Incoming Material Inspection</h3>
                            <p>
                                All raw materials undergo chemical composition analysis via spectrometry and physical property verification before being released for production. We work exclusively with pre-qualified material suppliers who meet our stringent procurement standards.
                            </p>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">In-Process Quality Checks</h3>
                            <p>
                                Statistical Process Control (SPC) and real-time monitoring are employed at critical stages of machining. Dedicated quality checkpoints are distributed across the shop floor to catch deviations early and minimise scrap.
                            </p>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Final Inspection &amp; Testing</h3>
                            <p>
                                Finished components are inspected using Coordinate Measuring Machines (CMM), vision measuring systems, optical sorters, surface roughness testers, and go/no-go gauges. Every batch is accompanied by a detailed inspection report and, where required, a material test certificate.
                            </p>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Automated Optical Sorting</h3>
                            <p>
                                For high-volume production runs, our automated optical sorting systems inspect thousands of parts per minute, ensuring 100% dimensional compliance and detecting surface defects that are invisible to the naked eye.
                            </p>
                        </PolicySection>

                        <PolicySection title="Traceability">
                            <p>
                                We maintain full traceability from raw material to finished product. Every lot is assigned a unique identification number that links to material certificates, process parameters, inspection results, and packaging records — enabling rapid root cause analysis if required.
                            </p>
                        </PolicySection>

                        <PolicySection title="Environmental Responsibility">
                            <p>
                                Our ISO 14001-certified environmental management system ensures that we minimise waste, optimise energy consumption, and manage our environmental footprint responsibly. Brass chips and turnings are recycled through certified channels, and our cutting fluids are processed through oil-water separation systems before disposal.
                            </p>
                        </PolicySection>

                        <PolicySection title="Customer Collaboration">
                            <p>
                                We believe quality is a shared responsibility. Our engineering team works closely with customers during the APQP (Advanced Product Quality Planning) phase to establish control plans, define critical-to-quality characteristics, and agree on inspection criteria before production begins.
                            </p>
                            <p className="mt-3">
                                For any quality-related enquiries or to request our certifications, please contact us at{" "}
                                <a href="mailto:info@swastikbrasscomponents.com" className="text-primary hover:underline">info@swastikbrasscomponents.com</a>.
                            </p>
                        </PolicySection>
                    </article>
                </Container>
            </Section>
        </>
    );
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
            <div className="w-8 h-px bg-primary/40" />
            {children}
        </section>
    );
}
