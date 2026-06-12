"use client";

import useIsMobile from "@/hooks/useIsMobile";
import { LenisOptions } from "lenis";
import type { LenisRef } from "lenis/react";
import { ReactLenis } from "lenis/react";
import { cancelFrame, frame } from "motion/react";
import React, { useEffect, useRef } from "react";

const LenisProvider = ({ children }: React.PropsWithChildren) => {
    const lenisRef = useRef<LenisRef>(null);
    const isMobile = useIsMobile()

    useEffect(() => {
        function update(data: { timestamp: number }) {
            const time = data.timestamp;
            lenisRef.current?.lenis?.raf(time);
        }

        frame.update(update, true);

        return () => cancelFrame(update);
    }, []);

    const lenisOptions: LenisOptions = {
        lerp: isMobile ? 0.08 : 0.03, // Lower lerp makes it much smoother and more "luxurious"
        duration: isMobile ? 1.2 : 2.0, // Used if lerp is not driving the animation
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: isMobile ? 1 : 0.8, // Slightly softer wheel
        touchMultiplier: isMobile ? 1.5 : 2, 
        infinite: false,
        autoResize: true,
        autoRaf: false
    }

    return (
        <ReactLenis
            root
            ref={lenisRef}
            options={lenisOptions}
        >
            {children}
        </ReactLenis>
    );
};

export default LenisProvider;