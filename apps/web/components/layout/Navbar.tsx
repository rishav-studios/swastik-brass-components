"use client";

import { TransitionLink } from "@/components/shared/TransitionLink";
import { FacilityCategory } from "@swastik/types";
import { icons } from "@swastik/ui";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@swastik/ui/components/shadcn/dropdown-menu";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { CustomLink } from "../shared/clickables/CustomLink";
import Container from "./Container";

type NavLink = {
    name: string,
    href: string,
    type: "link" | "dropdown"
}

const NAV_LINKS: NavLink[] = [
    {
        name: "About",
        href: "/about",
        type: "link"
    },
    {
        name: "Sectors", href: "/sectors",
        type: "link"
    },
    {
        name: "Facilities",
        href: "/facilities",
        type: "dropdown"
    },
    // {
    //     name: "Blog",
    //     href: "/blog",
    //     type: "link"
    // },
];

// Scroll range: transformation starts at 0px and completes at 150px
const SCROLL_START = 0;
const SCROLL_END = 150;

export interface NavbarProps {
    facilityCategories?: FacilityCategory[];
}

const MobileNavigation = ({
    isOpen,
    setIsOpen,
    facilityCategories
}: {
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
    facilityCategories: FacilityCategory[];
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black z-100 md:hidden"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 bottom-0 w-full bg-black/95 backdrop-blur-xl z-110 flex flex-col lg:hidden overflow-y-auto"
                    >
                        <div className="flex justify-between items-center p-6 pb-2 border-b border-white/10">
                            <div style={{ width: 140, height: 40 }} className="relative">
                                <Image
                                    src="/logo.svg"
                                    alt="Swastik Brass Components"
                                    fill
                                    className="object-contain object-left invert brightness-0"
                                    priority
                                />
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                            >
                                <icons.x className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex flex-col px-6 py-8 gap-2 flex-1">
                            {NAV_LINKS.map((link, i) => {
                                if (link.type === "dropdown") {
                                    return (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + i * 0.05 }}
                                        >
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="flex items-center justify-between w-full text-2xl font-bold py-4 text-white outline-none group border-b border-white/5">
                                                    {link.name}
                                                    <icons.chevronDown className="w-6 h-6 transition-transform group-data-[state=open]:rotate-180" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    align="center"
                                                    className="w-[90vw] border-white/10 bg-black/90 backdrop-blur-2xl text-white rounded-2xl overflow-hidden p-2 z-120"
                                                >
                                                    {facilityCategories.map(cat => (
                                                        <DropdownMenuItem key={cat.slug} asChild className="focus:bg-white/10 focus:text-white cursor-pointer rounded-xl mb-1 last:mb-0">
                                                            <TransitionLink href={`/facilities/${cat.slug}`} onClick={() => setIsOpen(false)} className="flex items-center gap-4 w-full px-2 py-3">
                                                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                                                                    <icons.building2 className="w-5 h-5" />
                                                                </div>
                                                                <p className="text-lg font-bold">{cat.display_name || cat.name}</p>
                                                            </TransitionLink>
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </motion.div>
                                    );
                                }

                                return (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + i * 0.05 }}
                                    >
                                        <TransitionLink
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block text-2xl font-bold py-4 text-white hover:text-primary transition-colors border-b border-white/5"
                                        >
                                            {link.name}
                                        </TransitionLink>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="p-6 flex flex-col gap-4 mt-auto mb-6"
                        >
                            <TransitionLink
                                href="/contact"
                                onClick={() => setIsOpen(false)}
                                className="w-full text-center text-base font-semibold text-white border border-white/30 rounded-full py-4 hover:bg-white/10 transition-colors"
                            >
                                Contact
                            </TransitionLink>
                            <TransitionLink
                                href="/quote"
                                onClick={() => setIsOpen(false)}
                                className="w-full text-center text-base font-semibold text-white bg-primary rounded-full py-4 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-[0.98]"
                            >
                                Quote Request
                            </TransitionLink>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const Navbar = ({ facilityCategories = [] }: NavbarProps) => {
    const { scrollY } = useScroll();
    const [isFacilitiesHovered, setIsFacilitiesHovered] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Each value is mapped directly from scroll position — no boolean, no state
    const y = useTransform(scrollY, [SCROLL_START, SCROLL_END], [36, 18]);


    return (
        <>
            <MobileNavigation isOpen={isMobileOpen} setIsOpen={setIsMobileOpen} facilityCategories={facilityCategories} />
            <motion.nav
                style={{
                    y,
                }}
                className="flex fixed left-0 right-0 z-50 w-full pointer-events-auto"
            >
                <Container className="backdrop-blur-md bg-white/80 rounded-full shadow-lg">
                    <div
                        className=" flex gap-6 xl:gap-0 xl:grid xl:grid-cols-4  pr-2 pl-6 py-2 md:py-1 lg:py-0"
                    >
                        {/* Logo */}
                        <TransitionLink href="/" className="flex items-center lg:col-span-1">
                            <div
                                style={{ width: 140, height: 40 }}
                                className="relative ">
                                <Image
                                    src="/logo.svg"
                                    alt="Swastik Brass Components"
                                    fill
                                    className="object-contain object-left"
                                    priority
                                />
                            </div>
                        </TransitionLink>

                        {/* Links */}
                        <div className="hidden lg:flex items-center gap-8 relative justify-center lg:col-span-2">
                            {NAV_LINKS.map((link) => {
                                if (link.type === "dropdown") {
                                    return (
                                        <div
                                            key={link.name}
                                            className="relative"
                                            onMouseEnter={() => setIsFacilitiesHovered(true)}
                                            onMouseLeave={() => setIsFacilitiesHovered(false)}
                                        >
                                            <TransitionLink
                                                href={link.href}
                                                className="relative text-sm font-medium text-foreground hover:text-primary transition-colors group flex items-center gap-1 py-4"
                                            >
                                                {link.name}
                                                <icons.chevronDown className={`w-3 h-3 transition-transform duration-300 ${isFacilitiesHovered ? 'rotate-180' : ''}`} />
                                                <span className="absolute bottom-3 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full rounded-full" />
                                            </TransitionLink>

                                            {/* Dropdown */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={isFacilitiesHovered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2, ease: "easeOut" }}
                                                className={`absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl overflow-hidden ${isFacilitiesHovered ? 'pointer-events-auto' : 'pointer-events-none'}`}
                                                style={{ transformOrigin: "top center" }}
                                            >
                                                <div className="p-2 flex flex-col">
                                                    {facilityCategories.map(cat => (
                                                        <TransitionLink
                                                            key={cat.slug}
                                                            href={`/facilities/${cat.slug}`}
                                                            className="px-4 py-3 hover:bg-black/5 rounded-xl transition-colors flex items-center gap-3 group/item"
                                                        >
                                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                                                                <icons.building2 className="w-4 h-4" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">{cat.display_name || cat.name}</p>
                                                            </div>
                                                        </TransitionLink>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        </div>
                                    );
                                }

                                return (
                                    <CustomLink
                                        key={link.name}
                                        href={link.href}
                                        variant="hover-underline"
                                    >
                                        {link.name}
                                    </CustomLink>
                                );
                            })}
                        </div>


                        {/* Actions */}
                        <div className="flex gap-6 items-center justify-end ml-auto lg:col-span-1">
                            <div className="flex items-center gap-6">

                                <CustomLink
                                    href="/contact"
                                    variant="outline-black"
                                    className="text-sm hidden lg:flex"
                                >
                                    Contact
                                </CustomLink>
                                <CustomLink
                                    href="/quote"
                                    variant="button-brand"
                                    className="text-sm hidden md:flex"
                                >
                                    Quote Request
                                </CustomLink>
                            </div>

                            <button
                                className="lg:hidden flex p-2 mr-2 text-foreground hover:bg-black/5 rounded-full transition-colors"
                                onClick={() => setIsMobileOpen(true)}
                            >
                                <icons.menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </Container>
            </motion.nav>
        </>
    );
};

export default Navbar;