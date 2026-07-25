import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import BackgroundNoise, { BackgroundLines } from "@/components/shared/BackgroundNoise";
import { Eyebrow, SectionHeader } from "@/components/shared/SectionHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms & Conditions | Swastik Brass Components",
    description: "Terms and conditions governing the use of Swastik Brass Components website and services.",
};

export default function TermsPage() {
    return (
        <main key="terms">
            {/* Hero */}
            <Section className="min-h-[50dvh] lg:py-16 lg:pt-24 flex items-center">
                <BackgroundNoise />
                <BackgroundLines className="w-9/10 mx-auto" />
                <Container className="relative z-10">
                    <SectionHeader className="space-y-6">
                        <Eyebrow className="mx-auto">Legal</Eyebrow>
                        <h1 className="text-center text-5xl md:text-7xl font-medium">Terms &amp; Conditions</h1>
                        <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto">
                            Last updated: July 2026
                        </p>
                    </SectionHeader>
                </Container>
            </Section>

            {/* Content */}
            <Section className="min-h-max py-16 lg:py-20">
                <Container>
                    <article className="max-w-3xl mx-auto space-y-12 text-foreground/85 text-[1.0625rem] leading-relaxed">

                        <PolicySection title="1. Acceptance of Terms">
                            <p>
                                By accessing and using the Swastik Brass Components website (&ldquo;Site&rdquo;), you accept and agree to be bound by these Terms &amp; Conditions. If you do not agree to these terms, please do not use this Site.
                            </p>
                        </PolicySection>

                        <PolicySection title="2. Company Information">
                            <p>
                                This website is operated by Swastik Brass Components, located at Plot No. 3436, Phase III, G.I.D.C., Dared, Jamnagar – 361004, Gujarat, India. For enquiries, please contact us at{" "}
                                <a href="mailto:info@swastikbrasscomponents.com" className="text-primary hover:underline">info@swastikbrasscomponents.com</a>.
                            </p>
                        </PolicySection>

                        <PolicySection title="3. Use of the Website">
                            <p>You agree to use this Site only for lawful purposes. You must not:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-3">
                                <li>Use the Site in any way that breaches any applicable local, national, or international law or regulation.</li>
                                <li>Transmit any material that is defamatory, offensive, or otherwise objectionable.</li>
                                <li>Attempt to gain unauthorised access to any part of the Site, the server on which the Site is stored, or any server, computer, or database connected to the Site.</li>
                                <li>Use the Site to send unsolicited commercial communications.</li>
                            </ul>
                        </PolicySection>

                        <PolicySection title="4. Intellectual Property">
                            <p>
                                All content on this Site — including text, graphics, logos, images, product photographs, technical specifications, and software — is the property of Swastik Brass Components or its content suppliers and is protected by international intellectual property laws.
                            </p>
                            <p className="mt-3">
                                You may not reproduce, distribute, modify, create derivative works of, publicly display, or otherwise exploit any of our content without prior written consent.
                            </p>
                        </PolicySection>

                        <PolicySection title="5. Product Information">
                            <p>
                                While we strive to ensure accuracy, technical specifications, product descriptions, and pricing information on this Site are provided for general reference purposes only and do not constitute a binding offer. All quotations are subject to final confirmation by our engineering and sales team.
                            </p>
                        </PolicySection>

                        <PolicySection title="6. Quotations & Orders">
                            <p>
                                Submitting a quote request through this Site does not constitute a binding purchase order. All orders are subject to acceptance by Swastik Brass Components. Final pricing, lead times, and delivery terms will be communicated via a formal quotation document.
                            </p>
                        </PolicySection>

                        <PolicySection title="7. Limitation of Liability">
                            <p>
                                To the fullest extent permitted by applicable law, Swastik Brass Components shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of the Site.
                            </p>
                        </PolicySection>

                        <PolicySection title="8. Third-Party Links">
                            <p>
                                This Site may contain links to third-party websites. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.
                            </p>
                        </PolicySection>

                        <PolicySection title="9. Governing Law">
                            <p>
                                These terms are governed by and construed in accordance with the laws of India. Any disputes arising from or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Jamnagar, Gujarat.
                            </p>
                        </PolicySection>

                        <PolicySection title="10. Changes to These Terms">
                            <p>
                                We reserve the right to modify these Terms &amp; Conditions at any time. Changes will be effective immediately upon posting to this Site. Your continued use of the Site following the posting of changes constitutes your acceptance of such changes.
                            </p>
                        </PolicySection>

                        <PolicySection title="Contact">
                            <p>
                                If you have any questions about these Terms &amp; Conditions, please contact us at{" "}
                                <a href="mailto:info@swastikbrasscomponents.com" className="text-primary hover:underline">info@swastikbrasscomponents.com</a>.
                            </p>
                        </PolicySection>
                    </article>
                </Container>
            </Section>
        </main>
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
