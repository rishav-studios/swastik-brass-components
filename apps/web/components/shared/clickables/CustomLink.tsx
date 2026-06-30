"use client"
import { icons } from "@swastik/ui";
import { cn } from "@swastik/ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Children, isValidElement, ReactNode, useMemo } from "react";


export type ClickableVariants =
    | "hover-underline"
    | "outline-brand"
    | "outline-white"
    | "outline-black"
    | "button-brand"
    | "button-black"
    | "button-white"
    | "custom";

type BaseCustomLinkProps = {
    variant?: ClickableVariants;
    children: ReactNode;
    className?: string;
};

type LinkProps = BaseCustomLinkProps & {
    href: string;
};

type SpanProps = BaseCustomLinkProps & {
    href?: never;
};

export type CustomLinkProps = LinkProps | SpanProps;

const buttonBaseClasses = "py-2 px-6 rounded-full flex items-center justify-center gap-2"

export const variantClasses: Record<Exclude<ClickableVariants, "custom">, {
    base?: string,
    hover?: string,
    active?: string
}> = {
    "hover-underline": {
        base:
            "relative flex items-center gap-2 hover:text-primary transition-colors duration-300 before:absolute before:left-0 before:-bottom-1 before:h-0.5 before:w-full before:origin-right before:scale-x-0 before:bg-primary before:transition-transform before:duration-300",
        hover: "hover:before:scale-x-100 hover:before:origin-left",
        active: "before:scale-x-100",
    },
    "outline-brand": {
        base: cn(buttonBaseClasses, "border border-primary"),
        hover: "",
        active: ""
    },
    "outline-black": {
        base: cn(buttonBaseClasses, "border border-black transition-colors duration-300"),
        hover: "hover:text-background hover:bg-foreground ",
        active: ""
    },
    "outline-white": {
        base: cn(buttonBaseClasses, "border border-white transition-colors duration-300"),
        hover: "hover:text-black hover:bg-white ",
        active: ""
    },
    "button-brand": {
        base: cn(buttonBaseClasses, "bg-primary text-background"),
        hover: "",
        active: ""
    },
    "button-black": {
        base: cn(buttonBaseClasses, "bg-foreground text-background"),
        hover: "",
        active: ""
    },
    "button-white": {
        base: cn(buttonBaseClasses, "bg-white text-black"),
        hover: "",
        active: ""
    },
}

export const CustomLink = (props: CustomLinkProps) => {
    const { children, className, variant = "hover-underline", href, ...rest } = props;

    const childrenArray = Children.toArray(children)
    const hasIcon = childrenArray.some((child) => isValidElement(child))

    const variantClass = useMemo(() => {
        return variant === "custom" ? undefined : variantClasses[variant]
    }, [variant])
    const pathname = usePathname();

    const isActive = href ? pathname === href : false

    const combinedVariantClassName = cn(
        "group/custom-link",
        variantClass?.base,
        isActive ? variantClass?.active : variantClass?.hover,
        hasIcon && "pr-2",
        className,
    );
    if (href) {
        return (
            <Link href={href} className={combinedVariantClassName} {...rest}>
                {children}
            </Link>

        );
    }

    return (
        <span role="button" className={combinedVariantClassName} {...(rest as any)}>
            {children}
        </span>
    );
}
type ArrowVariants = "primary" | "black" | "white"
type ArrowProps = {
    className?: string;
    variant?: ArrowVariants;
}
export const Arrow = ({ className = "", variant = "black" }: ArrowProps) => (
    <div className={cn(
        "flex p-2 rounded-full",
        {
            "bg-primary text-background": variant === "primary",
            "bg-black text-background": variant === "black",
            "bg-white text-primary": variant === "white",
        },
        className
    )}>
        <icons.arrowRight className="w-5 h-5 group-hover/custom-link:-rotate-45 transition-transform duration-300" />
    </div>)