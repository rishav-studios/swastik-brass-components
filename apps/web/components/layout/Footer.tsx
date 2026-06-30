"use client";

import { TextAnimate } from "@swastik/ui/components/shadcn/text-animate";
import { cn } from "@swastik/ui/lib/utils";
import { ReactNode } from "react";
import Fade from "../animations/Fade";
import { BackgroundLines } from "../shared/BackgroundNoise";
import { CustomLink, variantClasses } from "../shared/clickables/CustomLink";
import Container from "./Container";


// import { Linkedin, Twitter, Instagram } from "lucide-react";

const FOOTER_LINKS = {
    company: [
        { id: "f8f6c2c2-2d6dd7b", label: "About Us", href: "/about" },
        { id: "f8f6c2c2-2d6dd7c", label: "Facilities", href: "/facilities" },
        { id: "f8f6c2c2-2d6dd7d", label: "Contact", href: "/contact" },

    ],
    sectors: [
        { id: "f8f6c2c2-2d6dd7e", label: "Aerospace", href: "/sectors/aerospace" },
        { id: "f8f6c2c2-2d6dd7f", label: "Automobile", href: "/sectors/automobile" },
        { id: "f8f6c2c2-2d6dd7a", label: "Railway", href: "/sectors/railway" },
        { id: "f8f6c2c2-2d6dd7g", label: "Oil & Gas", href: "/sectors/oil-gas" },

    ],
    legal: [
        { id: "f8f6c2c2-2d6dd7h", label: "Privacy Policy", href: "/privacy" },
        { id: "f8f6c2c2-2d6dd7i", label: "Terms of Service", href: "/terms" },
        { id: "f8f6c2c2-2d6dd7j", label: "Quality Policy", href: "/quality" },
    ],
    socials: [
        {
            id: "f8f6c2c2-2d6dd7k",
            // WhatsApp SVG icon inline — sized correctly at size-5 (20px)
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="size-5 shrink-0" viewBox="0 0 640 640">
                <path
                    className="fill-background/80 group-hover/custom-link:fill-primary transition-colors duration-300" d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z" />
            </svg>,
            label: "Whatsapp", href: "/whatsapp"
        },
        {
            id: "f8f6c2c2-2d6dd7l",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="size-5 shrink-0" viewBox="0 0 640 640">
                <path
                    className="fill-background/80 group-hover/custom-link:fill-primary transition-colors duration-300"
                    d="M576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 440 146.7 540.8 258.2 568.5L258.2 398.2L205.4 398.2L205.4 320L258.2 320L258.2 286.3C258.2 199.2 297.6 158.8 383.2 158.8C399.4 158.8 427.4 162 438.9 165.2L438.9 236C432.9 235.4 422.4 235 409.3 235C367.3 235 351.1 250.9 351.1 292.2L351.1 320L434.7 320L420.3 398.2L351 398.2L351 574.1C477.8 558.8 576 450.9 576 320z" />
            </svg>,
            label: "Facebook", href: "/facebook"
        },
        {
            id: "f8f6c2c2-2d6dd7m",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="size-5 shrink-0" viewBox="0 0 640 640">
                <path
                    className="fill-background/80 group-hover/custom-link:fill-primary transition-colors duration-300" d="M160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160C544 124.7 515.3 96 480 96L160 96zM165 266.2L231.5 266.2L231.5 480L165 480L165 266.2zM236.7 198.5C236.7 219.8 219.5 237 198.2 237C176.9 237 159.7 219.8 159.7 198.5C159.7 177.2 176.9 160 198.2 160C219.5 160 236.7 177.2 236.7 198.5zM413.9 480L413.9 376C413.9 351.2 413.4 319.3 379.4 319.3C344.8 319.3 339.5 346.3 339.5 374.2L339.5 480L273.1 480L273.1 266.2L336.8 266.2L336.8 295.4L337.7 295.4C346.6 278.6 368.3 260.9 400.6 260.9C467.8 260.9 480.3 305.2 480.3 362.8L480.3 480L413.9 480z" />
            </svg>,
            label: "LinkedIn", href: "/linkedin"
        },
    ]
};

// Glow orb — a radial gradient circle perfectly centered in its own viewBox.
// Use blur + opacity via className to tune intensity at the call site.
export const GlowOrb = ({ className = "", id }: { className?: string; id: string }) => {
    const gradId = `orb-grad-${id}`;
    return (
        <svg
            className={cn("absolute pointer-events-none", className)}
            xmlns="http://www.w3.org/2000/svg"
            width="1440"
            height="1440"
            viewBox="0 0 1440 1440"
            fill="none"
            aria-hidden="true"
        >
            <defs>
                <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#F15E32" stopOpacity="0.85" />
                    <stop offset="30%" stopColor="#F15E32" stopOpacity="0.50" />
                    <stop offset="60%" stopColor="#F15E32" stopOpacity="0.18" />
                    <stop offset="85%" stopColor="#F15E32" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#F15E32" stopOpacity="0" />
                </radialGradient>
            </defs>
            <circle cx="720" cy="720" r="720" fill={`url(#${gradId})`} />
        </svg>
    );
}

type GridItemProps = {
    className?: string;
    children: ReactNode;
}
const GridItem = ({ className, children }: GridItemProps) => {
    return (
        <div className={cn("w-fullv space-y-6 p-1", className)}>
            {children}
        </div>
    )
}

const Heading = ({ children }: { children: string }) => {
    return <h2 className="font-heading text-background font-medium text-3xl ">{children}</h2>
}

type LinksListProps = {
    links: {
        id: string,
        label: string,
        href: string,
        icon?: ReactNode
    }[];
    direction?: "vertical" | "horizontal"
}
const LinksList = ({ links, direction = "vertical" }: LinksListProps) => {
    return (
        <ul className={cn("space-y-4", direction === "horizontal" && "flex gap-4")}>
            {links.map((link) => (
                <li key={link.id}>
                    <CustomLink
                        href={link.href}
                        variant="hover-underline"
                        className="text-background/80 w-max font-medium text-lg gap-2"
                    >
                        {link.icon && <>{link.icon}</>}
                        {link.label}
                    </CustomLink>
                </li>
            ))}
        </ul>
    )
}

const FooterQuickLinks = () => {
    return (
        <GridItem>
            <Heading>Quick Links</Heading>
            <div className="grid grid-cols-2">
                <div>
                    <h3 className="text-xs text-background/50 font-medium mb-4">Company</h3>
                    <LinksList links={FOOTER_LINKS.company} />
                </div>
                <div>
                    <h3 className="text-xs text-background/50 font-medium mb-4">Sectors</h3>
                    <LinksList links={FOOTER_LINKS.sectors} />
                </div>
            </div>
        </GridItem>
    )
}

const FooterContactInfo = () => {
    const combinedClasses = cn(
        "w-max",
        variantClasses["hover-underline"].base,
        variantClasses["hover-underline"].hover,
    )
    return (
        <GridItem>
            <Heading>Contact info</Heading>
            <div className="space-y-4 text-background/80 w-max font-medium text-lg">

                <a href="https://maps.app.goo.gl/oWP3UqsEFrhYD4u86" className={combinedClasses}>
                    Jamnagar, Gujarat, India
                </a>
                <a href="mailto:swastikbrasscomponent@gmail.com" className={combinedClasses}>
                    swastikbrasscomponent@gmail.com
                </a>
                <a href="tel:+911234567890" className={combinedClasses}>
                    +91 1234567890
                </a>


            </div>
        </GridItem>
    )
}

const FooterWorkingHours = () => {
    return (
        <GridItem>
            <Heading>Working hours</Heading>

            <ul className="space-y-4 text-background/80 w-max font-medium text-lg">
                <li>Sat to Thu - 9:00AM to 6:00PM</li>
                <li>Fri - Closed</li>
            </ul>

        </GridItem >
    )
}

const Footer = () => {
    return (
        <footer className="xl:h-[130dvh] bg-foreground pt-48 relative overflow-hidden">
            <BackgroundLines className="w-[90%] mx-auto" lineColor="#2c2c2c" />

            <GlowOrb id="br" className="opacity-50 -top-150 -right-150" />
            <GlowOrb id="bl" className="opacity-50 -left-150" />
            <Container className="relative z-10">
                {/* top */}
                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-12">

                    <Fade>

                        <GridItem className="space-y-0">
                            <img src="/logo-white.svg" alt="" className="w-8/10 -translate-y-13" />
                            <p className="text-background/80 w-8/10 font-normal -translate-y-5">We are a precision engineering firm specializing in brass components with over 20 years of industry experience.</p>
                        </GridItem>
                    </Fade>
                    <Fade delay={.3}>

                        <FooterQuickLinks />
                    </Fade>
                    <Fade delay={.4}>

                        <FooterContactInfo />
                    </Fade>
                    <Fade delay={.5}>

                        <FooterWorkingHours />
                    </Fade>

                </div>
                {/* middle */}

                <div className="flex justify-between mt-24 flex-col xl:flex-row gap-12">
                    <Fade>

                        <LinksList links={FOOTER_LINKS.legal} direction="horizontal" />
                    </Fade>
                    <Fade delay={.2}>

                        <LinksList links={FOOTER_LINKS.socials} direction="horizontal" />
                    </Fade>
                </div>

                {/* bottom */}
                <TextAnimate className="font-bold text-[clamp(13rem,20vw,312px)] justify-center text-background/20 hidden lg:flex" duration={1} by="character">SWASTIK</TextAnimate>
            </Container>

        </footer>
    )
}
export default Footer;



