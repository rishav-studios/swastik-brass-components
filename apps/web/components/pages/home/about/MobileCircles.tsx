import { StickyContainer, StickyItem } from "@/components/shared/Sticky"
import { icons } from "@swastik/ui"
import Circle from "./Circle"

const MobileCircles = () => {
    return (
        <StickyContainer className="lg:hidden">
            <StickyItem className="py-4">
                <Circle className="border border-gray-500 gap-8">


                    <img src="/logo.svg" alt="" className="w-40" />
                    <div className="font-semibold text-6xl ">
                        <span className="text-primary ">100</span> +
                    </div>
                    <p>Trusted by businesses across multiple <br /> manufacturing industries worldwide</p>
                    <div className="flex items-end leading-none">
                        <span className="text-4xl font-semibold leading-[0.7]">4.8</span>
                        <span>/5.0</span>
                        <div className="flex gap-1 ml-5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <icons.star key={i} className="fill-foreground" />
                            ))}
                        </div>
                    </div>
                </Circle>
            </StickyItem>
            <StickyItem className="py-4">
                <Circle className="p-0">

                    < img src="https://www.mtwmag.com/wp-content/uploads/2026/04/Multi-Axis.jpg" className="h-full w-full object-cover" alt="" />
                </Circle>
            </StickyItem>
            <StickyItem className="py-4">
                <Circle className="bg-linear-to-b p-0 from-primary to-orange-500 text-background justify-center relative">

                    <span># 2005 - 2026 #</span>
                    <span className="font-semibold text-6xl text-foreground">25 +
                    </span>
                    <p className="text-center">Delivering consistent manufacturing  <br /> excellence since day one.</p>
                    < img src="/machine-icon.svg" className="size-36 absolute bottom-0" alt="" />


                </Circle>
            </StickyItem>
        </StickyContainer>
    )
}

export default MobileCircles