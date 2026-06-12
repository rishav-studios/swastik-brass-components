import { cn } from "@swastik/ui/lib/utils";
import { PropsWithChildren } from "react";

type FormSectionProps = PropsWithChildren<{
    title: string,
    description?: string,
    className?: string
}>

export const FormSection = ({ title, description, children, className = "" }: FormSectionProps) => (
    <div className={cn("rounded-xl border border-border overflow-hidden flex flex-col h-full", className)}>
        <div className=" bg-secondary p-4 flex gap-2">
            <span className="text-xl font-bold text-secondary-foreground">#</span>
            <div className="-space-y-0.5">

                <h3 className="text-base font-semibold text-secondary-foreground">{title}</h3>
                {description && <p className="text-sm text-secondary-foreground/80">{description}</p>}
            </div>
        </div>
        <div className="p-4 flex-1">
            {children}
        </div>
    </div>
);