"use client"

import { icons } from "@swastik/ui"
import { motion, Transition, ViewportOptions } from "motion/react"
import Circle from "./Circle"
const DesktopCircles = () => {

    const viewPort: ViewportOptions = {
        amount: 0.7
    }

    const transition: Transition = {
        type: "spring",
        duration: 1.5,
        stiffness: 100,
        mass: 0.8,
    }

    return (
        <div
            className="hidden lg:grid grid-cols-4 xl:grid-cols-3 relative gap-6">
            <motion.div
                initial={{
                    x: 200,
                    opacity: 0,
                }}
                whileInView={{
                    x: 0,
                    opacity: 1,
                }}
                viewport={viewPort}
                transition={transition}
            >


                <Circle className="border border-gray-500 p-20 gap-8 col-span-2 xl:col-span-1">


                    <img src="/logo.svg" alt="" className="w-1/2 mx-auto" />
                    <div className="font-semibold text-6xl ">
                        <span className="text-primary ">100</span> +
                    </div>
                    <p className="text-center xl:text-sm ">Trusted by businesses across multiple manufacturing industries worldwide</p>
                    <div className="flex items-end leading-none">
                        <span className="text-4xl xl:text-3xl font-semibold leading-[0.7]">4.8</span>
                        <span>/5.0</span>
                        <div className="flex gap-1 ml-5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <icons.star key={i} className="fill-foreground size-4" />
                            ))}
                        </div>
                    </div>
                </Circle>
            </motion.div>

            <motion.div
                initial={{
                    y: 20,
                    opacity: 0,
                }}
                whileInView={{
                    y: 0,
                    opacity: 1,
                }}
                viewport={viewPort}
                transition={transition}
            >
                <Circle className="p-0 col-span-2 xl:col-span-1">

                    < img src="https://www.mtwmag.com/wp-content/uploads/2026/04/Multi-Axis.jpg" className="h-full w-full object-cover" alt="" />
                </Circle>
            </motion.div>


            <motion.div
                // style={{
                //     x: circle3X
                // }}
                initial={{
                    x: -200,
                    opacity: 0,
                }}
                whileInView={{
                    x: 0,
                    opacity: 1,
                }}
                viewport={viewPort}
                transition={transition}
            >


                <Circle className="bg-linear-to-b p-0 from-primary to-orange-500 text-background justify-center relative col-span-2 col-start-2 xl:col-start-3 xl:col-span-1 -translate-y-16 xl:translate-y-0">

                    <span># 2005 - 2026 #</span>
                    <span className="font-semibold text-6xl text-foreground">25 +
                    </span>
                    <p className="text-center">Delivering consistent manufacturing  <br /> excellence since day one.</p>
                    < img src="/machine-icon.svg" className="size-36 absolute bottom-0" alt="" />


                </Circle>
            </motion.div>

        </div>
    )
}

export default DesktopCircles