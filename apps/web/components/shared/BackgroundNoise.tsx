import { cn } from "@swastik/ui/lib/utils";

type BackgroundNoiseProps = {
    className?: string;
    image?: string;
}
const BackgroundNoise = ({ className = "", image = '/bg-noise.gif' }: BackgroundNoiseProps) => {
    return (
        <div
            style={{
                backgroundImage: `url("${image}")`
            }}
            className={cn("absolute inset-0 w-full h-full opacity-5 z-1", className)} />
    )
}

type BackgroundLinesProps = {
    lineCount?: number;
    className?: string;
    lineColor?: string;
}
export const BackgroundLines = ({ lineCount = 5, className = "", lineColor = "#e5e7eb" }: BackgroundLinesProps) => {
    return (
        <div className={cn("absolute w-full h-full left-0 right-0 bottom-0 top-0 z-0 flex justify-between", className)}>
            {
                Array.from({ length: lineCount }).map((_, i) => (
                    <div
                        key={i}
                        className="w-px h-full will-change-transform"
                        style={{ backgroundColor: lineColor }} />
                ))
            }
        </div>
    )
}

export default BackgroundNoise