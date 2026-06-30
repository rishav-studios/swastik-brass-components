import { cn } from "@swastik/ui/lib/utils"
import { PropsWithChildren } from "react"

type ContainerProps = PropsWithChildren<{
    className?: string
    style?: React.CSSProperties
}>
const Container = ({ children, className = "", style }: ContainerProps) => {
    return (
        <div className={cn(" w-[90%] mx-auto", className)} style={style}>
            {children}
        </div>
    )
}

export default Container