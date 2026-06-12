"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

const TrailingCursor = () => {
    const mouseX = useMotionValue(-20);
    const mouseY = useMotionValue(-20);

    // Spring config: stiff & low damping = snappy follow with a slight lag
    const springX = useSpring(mouseX, { stiffness: 800, damping: 100, mass: 0.3 });
    const springY = useSpring(mouseY, { stiffness: 800, damping: 100, mass: 0.3 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Offset by 2px (half of 4px dot) to center it on the cursor tip
            mouseX.set(e.clientX + 12);
            mouseY.set(e.clientY + 24);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            aria-hidden
            style={{
                x: springX,
                y: springY,
                position: "fixed",
                top: 0,
                left: 0,
                width: 8,
                height: 8,
                borderRadius: "9999px",
                backgroundColor: "var(--primary)",
                pointerEvents: "none",
                zIndex: 9999,
            }}
        />
    );
};

export default TrailingCursor;