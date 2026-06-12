"use client"

import { motion, useInView } from "motion/react"
import Image, { ImageProps } from "next/image"
import { useRef } from "react"

type ImageRevealProps = Omit<ImageProps, "className"> & {
    className?: string
    imageClassName?: string
    aspectRatio?: string
    duration?: number
    delay?: number
    once?: boolean
}

export default function ImageReveal({
    src,
    alt,
    className = "",
    imageClassName = "",
    aspectRatio = "aspect-video",
    duration = 1.4,
    delay = 0,
    once = true,
    ...imageProps
}: ImageRevealProps) {
    const ref = useRef<HTMLDivElement>(null)

    // Trigger when 10% (0.1) of the component enters the viewport
    const isInView = useInView(ref, { once, amount: 0.1 })

    return (
        <div
            ref={ref}
            className={`relative overflow-hidden w-full ${aspectRatio} ${className}`}
        >
            <motion.div
                initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                animate={{ clipPath: isInView ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" }}
                transition={{ duration, delay, ease: [0.76, 0, 0.24, 1] }}
                className="w-full h-full relative"
            >
                <motion.div
                    initial={{ scale: 1.25 }}
                    animate={{ scale: isInView ? 1 : 1.25 }}
                    transition={{ duration, delay, ease: [0.76, 0, 0.24, 1] }}
                    className="w-full h-full relative"
                >
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className={`object-cover ${imageClassName}`}
                        sizes="(max-w-768px) 100vw, 50vw"
                        {...imageProps}
                    />
                </motion.div>
            </motion.div>
        </div>
    )
}
