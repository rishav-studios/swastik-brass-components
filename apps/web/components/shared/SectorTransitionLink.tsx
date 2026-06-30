"use client";

import { Link } from "next-view-transitions";
import { ComponentProps } from "react";

type SectorTransitionLinkProps = ComponentProps<typeof Link>;

export const SectorTransitionLink = (props: SectorTransitionLinkProps) => {
    // This link intentionally does NOT trigger the column overlay animation.
    // Instead, it relies purely on the native View Transitions API provided
    // by next-view-transitions. This allows elements with matching 
    // view-transition-names (like the sector images) to seamlessly morph.
    return <Link {...props} />;
};
