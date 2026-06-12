"use client"

import { motion, useInView } from "motion/react"
import { PropsWithChildren, useRef } from "react"

type FadeProps = PropsWithChildren<{
    className?: string
    duration?: number
    delay?: number
    threshold?: number
    once?: boolean
}>
const Fade = ({ children, className = "", duration = 1, delay = 0, threshold = 0.2, once = true }: FadeProps) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once, amount: threshold })
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default Fade