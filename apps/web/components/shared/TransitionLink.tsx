"use client";

import Link from "next/link";
import { usePageTransition } from "@/components/providers/PageTransitionProvider";
import { ComponentProps } from "react";
import { usePathname } from "next/navigation";

type TransitionLinkProps = ComponentProps<typeof Link>;

export const TransitionLink = ({ href, onClick, ...props }: TransitionLinkProps) => {
    const { triggerTransition } = usePageTransition();
    const pathname = usePathname();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Only trigger transition if it's a different route
        if (href.toString() !== pathname) {
            e.preventDefault();
            triggerTransition(href.toString());
        }
        if (onClick) onClick(e);
    };

    return <Link href={href} onClick={handleClick} {...props} />;
};
