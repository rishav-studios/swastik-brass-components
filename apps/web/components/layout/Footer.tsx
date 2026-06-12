"use client";

import Container from "@/components/layout/Container";
import { icons } from "@swastik/ui/constants/icon";
import Link from "next/link";

const FOOTER_LINKS = {
    company: [
        { label: "About Us", href: "/about" },
        { label: "Facilities", href: "/facilities" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
    ],
    sectors: [
        { label: "Aerospace", href: "/sectors#aerospace" },
        { label: "Automobile", href: "/sectors#automobile" },
        { label: "Railway", href: "/sectors#railway" },
        { label: "Oil & Gas", href: "/sectors#oil-gas" },
    ],
    legal: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Quality Policy", href: "/quality" },
    ]
};

const Footer = () => {
    return (
        <footer className="bg-foreground text-background pt-24 pb-12 relative overflow-hidden">
            {/* Subtle Top Border */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
                    
                    {/* Brand Column */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                                <icons.factory className="w-5 h-5 text-white" />
                            </div>
                            Swastik Brass
                        </div>
                        <p className="text-muted-foreground leading-relaxed max-w-sm">
                            Precision-engineered brass components for the world's most demanding industries. Built on 25 years of excellence and zero-defect manufacturing.
                        </p>
                        
                        <div className="flex items-center gap-4 pt-4">
                            {/* Social Icons Placeholder */}
                            {[icons.globe, icons.mail, icons.companyGeneral].map((Icon, idx) => (
                                <Link 
                                    key={idx} 
                                    href="#" 
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                                >
                                    {Icon && <Icon className="w-4 h-4" />}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="text-white font-semibold tracking-wider uppercase text-sm">Company</h4>
                        <ul className="space-y-4">
                            {FOOTER_LINKS.company.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="text-white font-semibold tracking-wider uppercase text-sm">Sectors</h4>
                        <ul className="space-y-4">
                            {FOOTER_LINKS.sectors.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="lg:col-span-4 space-y-6">
                        <h4 className="text-white font-semibold tracking-wider uppercase text-sm">Global Headquarters</h4>
                        <div className="space-y-4 text-muted-foreground text-sm">
                            <p className="flex items-start gap-3">
                                <icons.globe className="w-5 h-5 shrink-0 text-primary/80" />
                                <span>Plot No. 4004, GIDC Phase III, <br />Dared, Jamnagar - 361004, <br />Gujarat, India</span>
                            </p>
                            <p className="flex items-center gap-3">
                                <icons.mail className="w-5 h-5 shrink-0 text-primary/80" />
                                <a href="mailto:info@swastikbrass.com" className="hover:text-primary transition-colors">info@swastikbrass.com</a>
                            </p>
                            <p className="flex items-center gap-3">
                                <icons.contact className="w-5 h-5 shrink-0 text-primary/80" />
                                <a href="tel:+919824200000" className="hover:text-primary transition-colors">+91 98242 00000</a>
                            </p>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-muted-foreground text-sm">
                        © {new Date().getFullYear()} Swastik Brass Components. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        {FOOTER_LINKS.legal.map((link) => (
                            <Link key={link.label} href={link.href} className="text-muted-foreground hover:text-white transition-colors text-sm">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
