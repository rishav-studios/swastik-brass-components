import { ElementType } from "react";

type PageHeaderProps = {
    title: string;
    description: string;
    icon: ElementType;
    children?: React.ReactNode;
}

export const PageHeader = ({ title, description, icon: Icon, children }: PageHeaderProps) => {
    return (
        <div className="flex gap-4 items-center justify-between">
            <div className="flex gap-2 items-center">
                <Icon className="size-10 bg-primary/10 text-primary p-2 border border-primary rounded-md" />
                <div className="-space-y-0.5">
                    <h1 className="text-2xl font-semibold">{title}</h1>
                    <p className="text-gray-600 text-sm">{description}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">{children}</div>
        </div>
    )
}

export const PageContent = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="">
            {children}
        </div>
    )
}

export const Page = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="space-y-4">
            {children}
        </div>
    )
}

export const PageFooter = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="">
            {children}
        </div>
    )
}