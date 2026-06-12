"use client";

import { motion, useMotionTemplate, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
    { name: "About", href: "/about" },
    { name: "Sectors", href: "/sectors" },
    { name: "Facilities", href: "/facilities" },
    { name: "Blog", href: "/blog" },
];

// Scroll range: transformation starts at 0px and completes at 150px
const SCROLL_START = 0;
const SCROLL_END = 150;

const Navbar = () => {
    const { scrollY } = useScroll();

    // Each value is mapped directly from scroll position — no boolean, no state
    const width = useTransform(scrollY, [SCROLL_START, SCROLL_END], ["100%", "90%"]);
    const containerWidth = useTransform(scrollY, [SCROLL_START, SCROLL_END], ["90%", "100%"]);
    const containerPaddingX = useTransform(scrollY, [SCROLL_START, SCROLL_END], ["0", "2rem"]);
    const y = useTransform(scrollY, [SCROLL_START, SCROLL_END], [0, 24]);
    const borderRadius = useTransform(scrollY, [SCROLL_START, SCROLL_END], ["0px", "40px"]);
    const backgroundColor = useTransform(
        scrollY,
        [SCROLL_START, SCROLL_END],
        ["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0.7)"]
    );
    const boxShadow = useTransform(
        scrollY,
        [SCROLL_START, SCROLL_END],
        [
            "0px 1px 2px 0px rgba(0,0,0,0.05)",
            "0 20px 40px -15px rgba(0,0,0,0.12), 0 10px 20px -10px rgba(0,0,0,0.06)",
        ]
    );
    const borderOpacity = useTransform(scrollY, [SCROLL_START, SCROLL_END], [1, 0.35]);
    // Side borders only appear as we scroll (0 → 1px)
    const sideBorderWidth = useTransform(scrollY, [SCROLL_START, SCROLL_END], ["0px", "1px"]);

    const imageHeight = useTransform(scrollY, [SCROLL_START, SCROLL_END], [48, 32]);
    const imageWidth = useTransform(scrollY, [SCROLL_START, SCROLL_END], [180, 100]);

    return (
        <motion.nav
            style={{
                width,
                y,
                borderRadius,
                backgroundColor,
                boxShadow,
                borderTopWidth: sideBorderWidth,
                borderLeftWidth: sideBorderWidth,
                borderRightWidth: sideBorderWidth,
                borderBottomWidth: "1px",
                borderColor: `rgba(229, 231, 235, ${borderOpacity.get()})`,
            }}
            className="flex fixed left-0 right-0 mx-auto w-full items-center   md:px-10- py-2 pointer-events-auto backdrop-blur-md border-solid overflow-hidden border-gray-200 bgtran z-100"
        >
            <motion.div
                className="flex justify-between container w-[90%] mx-auto"
                style={{ width: containerWidth, paddingLeft: containerPaddingX, paddingRight: containerPaddingX }}>

                {/* Links */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="relative text-sm font-medium text-foreground hover:text-primary transition-colors group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full rounded-full" />
                        </Link>
                    ))}
                </div>

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 ">
                    <motion.div
                        style={{ width: useMotionTemplate`${imageWidth}px`, height: useMotionTemplate`${imageHeight}px` }}
                        className="relative">
                        <Image
                            src="/logo.svg"
                            alt="Swastik Brass Components"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </motion.div>
                </Link>
                {/* Actions */}
                <div className="flex items-center gap-6">
                    <Link
                        href="/contact"
                        className="hidden lg:block text-sm font-medium text-foreground hover:text-primary transition-colors border border-foreground rounded-full py-2.5 px-6 hover:border-primary"
                    >
                        Contact
                    </Link>
                    <Link
                        href="/quote"
                        className="px-6 py-2.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary/90 transition-all shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/30 active:scale-95 flex items-center gap-2"
                    >
                        Quote Request
                    </Link>
                </div>
            </motion.div>
        </motion.nav>
    );
};

export default Navbar;