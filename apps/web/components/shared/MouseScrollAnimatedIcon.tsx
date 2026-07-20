"use client"
import { cn } from "@swastik/ui/lib/utils";
import { motion } from "motion/react";

type MouseScrollAnimatedIconProps = {
    className?: string;
    iconClassName?: string;
    iconContainerClassname?: string
}
const MouseScrollAnimatedIcon = ({ className, iconClassName, iconContainerClassname }: MouseScrollAnimatedIconProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className={cn("absolute bottom-8 left-1/2 -translate-x-1/2 z-20", className)}
        >
            <div className={cn("w-8 h-14 border border-white/20 rounded-full flex justify-center p-2 backdrop-blur-md bg-white/5", iconContainerClassname)}>
                <motion.div
                    animate={{ y: [0, 24, 0] }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: ["easeIn", "easeOut"]
                    }}
                    className={cn("w-1.5 h-3 bg-primary rounded-full", iconClassName)}
                />
            </div>
        </motion.div>
    )
}

export default MouseScrollAnimatedIcon;