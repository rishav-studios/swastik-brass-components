import { cn } from "@swastik/ui/lib/utils";
import { ComponentProps, PropsWithChildren } from "react";

type SectionProps = PropsWithChildren<{
    className?: string
} & ComponentProps<"section">>

const Section = ({ className, children, ...props }: SectionProps) => {
    return (
        <section {...props} className={cn("py-16 lg:py-24 min-h-dvh", className)}>
            {children}
        </section>
    );
};

export default Section;