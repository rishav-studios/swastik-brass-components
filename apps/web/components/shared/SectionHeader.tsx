import { PropsWithChildren } from "react"

type SectionHeaderProps = PropsWithChildren<{
    className?: string
}>

export const SectionHeader = ({ className = "", children }: SectionHeaderProps) => {
    return (
        <div className={`w-full space-y-1 ${className}`}>
            {children}
        </div>
    )
}

export const Heading = ({ children, className = "" }: SectionHeaderProps) => {
    return (
        <h2 className={`w-max text-4xl mx-auto font-semibold ${className}`}>
            {children}
        </h2>
    )
}

export const Description = ({ children, className = "" }: SectionHeaderProps) => {
    return (
        <p className={`w-full text-sm text-center text-gray-600 ${className}`}>
            {children}
        </p>
    )
}
export const Eyebrow = ({ children, className = "" }: SectionHeaderProps) => {
    return (
        <span className={`w-max flex rounded-full items-center gap-2 mx-auto px-3 py-1 font-medium bg-background border border-[#D1D1D1] text-foreground text-sm z-10 ${className}`}>
            <div className="w-1.5 h-1.5 aspect-square bg-primary" />
            {children}
        </span>
    )
}