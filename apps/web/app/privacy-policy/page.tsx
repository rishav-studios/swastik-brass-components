import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import BackgroundNoise, { BackgroundLines } from "@/components/shared/BackgroundNoise";
import { Eyebrow, SectionHeader } from "@/components/shared/SectionHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Swastik Brass Components",
    description: "Learn how Swastik Brass Components collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
    return (
        <main key="privacy-policy">
            {/* Hero */}
            <Section className="min-h-[50dvh] lg:py-16 lg:pt-24 flex items-center">
                <BackgroundNoise />
                <BackgroundLines className="w-9/10 mx-auto" />
                <Container className="relative z-10">
                    <SectionHeader className="space-y-6">
                        <Eyebrow className="mx-auto">Legal</Eyebrow>
                        <h1 className="text-center text-5xl md:text-7xl font-medium">Privacy Policy</h1>
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

                        <PolicySection title="1. Introduction">
                            <p>
                                Swastik Brass Components (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website or engage with our services.
                            </p>
                        </PolicySection>

                        <PolicySection title="2. Information We Collect">
                            <p>We may collect the following types of information:</p>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Personal Information</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Contact details:</strong> Name, email address, phone number, and company name when you submit a contact form or quote request.</li>
                                <li><strong>Project information:</strong> Technical specifications, drawings, and requirements shared through our quote request form.</li>
                                <li><strong>Communication records:</strong> Emails, messages, and correspondence exchanged with our team.</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Automatically Collected Information</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Usage data:</strong> Pages visited, time spent on the site, referring URLs, and navigation paths.</li>
                                <li><strong>Device data:</strong> Browser type, operating system, screen resolution, and device identifiers.</li>
                                <li><strong>Cookies:</strong> We use essential and analytical cookies to improve your browsing experience. See Section 6 for details.</li>
                            </ul>
                        </PolicySection>

                        <PolicySection title="3. How We Use Your Information">
                            <p>We use the collected information for the following purposes:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-3">
                                <li>To respond to your enquiries and provide customer support.</li>
                                <li>To process and evaluate quote requests.</li>
                                <li>To improve our website, products, and services.</li>
                                <li>To send relevant updates about your ongoing projects or orders (with your consent).</li>
                                <li>To comply with legal obligations and protect our rights.</li>
                            </ul>
                        </PolicySection>

                        <PolicySection title="4. Data Sharing & Disclosure">
                            <p>
                                We do not sell, rent, or trade your personal information to third parties. We may share your data only in the following circumstances:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-3">
                                <li><strong>Service providers:</strong> Trusted third-party services that assist us in operating our website (e.g., hosting, analytics) under strict confidentiality agreements.</li>
                                <li><strong>Legal requirements:</strong> When required by law, court order, or governmental regulation.</li>
                                <li><strong>Business transfers:</strong> In the event of a merger, acquisition, or sale of assets, your data may be transferred as part of the transaction.</li>
                            </ul>
                        </PolicySection>

                        <PolicySection title="5. Data Security">
                            <p>
                                We implement industry-standard security measures to protect your personal information from unauthorised access, alteration, disclosure, or destruction. These include encrypted data transmission (SSL/TLS), secure server infrastructure, and access controls.
                            </p>
                            <p className="mt-3">
                                However, no method of electronic transmission or storage is 100% secure. While we strive to protect your data, we cannot guarantee its absolute security.
                            </p>
                        </PolicySection>

                        <PolicySection title="6. Cookies">
                            <p>Our website uses cookies to:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-3">
                                <li><strong>Essential cookies:</strong> Enable core functionality such as page navigation and form submissions.</li>
                                <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our site so we can improve the user experience.</li>
                            </ul>
                            <p className="mt-3">
                                You can manage cookie preferences through your browser settings. Disabling cookies may affect certain features of the website.
                            </p>
                        </PolicySection>

                        <PolicySection title="7. Data Retention">
                            <p>
                                We retain your personal information only for as long as necessary to fulfil the purposes outlined in this policy, unless a longer retention period is required or permitted by law. Quote request data and project files are retained for the duration of the business relationship and a reasonable period thereafter.
                            </p>
                        </PolicySection>

                        <PolicySection title="8. Your Rights">
                            <p>Depending on your jurisdiction, you may have the right to:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-3">
                                <li>Access the personal data we hold about you.</li>
                                <li>Request correction of inaccurate or incomplete data.</li>
                                <li>Request deletion of your personal data.</li>
                                <li>Object to or restrict the processing of your data.</li>
                                <li>Withdraw consent at any time (where processing is based on consent).</li>
                            </ul>
                            <p className="mt-3">
                                To exercise any of these rights, please contact us at{" "}
                                <a href="mailto:info@swastikbrasscomponents.com" className="text-primary hover:underline">info@swastikbrasscomponents.com</a>.
                            </p>
                        </PolicySection>

                        <PolicySection title="9. Third-Party Links">
                            <p>
                                Our website may contain links to external sites that are not operated by us. We have no control over the content and privacy practices of those sites and encourage you to review their privacy policies independently.
                            </p>
                        </PolicySection>

                        <PolicySection title="10. Changes to This Policy">
                            <p>
                                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
                            </p>
                        </PolicySection>

                        <PolicySection title="Contact">
                            <p>
                                If you have any questions about this Privacy Policy, please contact us at{" "}
                                <a href="mailto:info@swastikbrasscomponents.com" className="text-primary hover:underline">info@swastikbrasscomponents.com</a> or write to us at:
                            </p>
                            <p className="mt-3">
                                Swastik Brass Components<br />
                                Plot No. 3436, Phase III, G.I.D.C., Dared<br />
                                Jamnagar – 361004, Gujarat, India
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
