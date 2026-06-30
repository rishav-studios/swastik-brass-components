import { cn } from "@swastik/ui/lib/utils";
import { HTMLAttributes } from "react";

type CircleProps = {
    className?: string
} & HTMLAttributes<HTMLDivElement>

const Circle = ({ className, children, ...props }: CircleProps) => {
    return (
        <div {...props} className={cn("aspect-square rounded-full w-full h-full max-w-2xl overflow-hidden flex justify-center items-center p-5 flex-col gap-5 bg-white", className)}>
            {children}
        </div>
    )
}

export default Circle