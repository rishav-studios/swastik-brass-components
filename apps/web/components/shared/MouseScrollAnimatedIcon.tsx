"use client"
import { motion } from "motion/react";

const MouseScrollAnimatedIcon = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
            <div className="w-8 h-14 border border-white/20 rounded-full flex justify-center p-2 backdrop-blur-md bg-white/5">
                <motion.div
                    animate={{ y: [0, 24, 0] }}
                    transition={{ 
                        repeat: Infinity, 
                        duration: 1.5, 
                        ease: ["easeIn", "easeOut"] 
                    }}
                    className="w-1.5 h-3 bg-primary rounded-full"
                />
            </div>
        </motion.div>
    )
}

export default MouseScrollAnimatedIcon;