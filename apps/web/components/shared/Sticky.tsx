import { cn } from "@swastik/ui/lib/utils";
import { CSSProperties, ReactNode } from "react";
type StickyContainerProps = {
    children: ReactNode;
    className?: string;
}
export const StickyContainer = ({
    children,
    className,
}: StickyContainerProps) => {

    return (
        <div className={cn("relative", className)}>
            {children}
        </div>
    )
}

type StickyItemProps = {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
}
export const StickyItem = ({
    children,
    className,
    style
}: StickyItemProps) => {

    return (
        <div
            className={cn("sticky top-0 h-dvh flex items-center justify-center w-full", className)}
            style={style}
        >
            {children}
        </div>
    )
}