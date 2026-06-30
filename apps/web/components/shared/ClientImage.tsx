"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface ClientImageProps extends Omit<ImageProps, "onError" | "src"> {
    src: string;
    fallbackSrc?: string;
}

export const ClientImage = ({ src, fallbackSrc = "/placeholder.png", ...props }: ClientImageProps) => {
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image
            {...props}
            src={imgSrc}
            onError={() => {
                setImgSrc(fallbackSrc);
            }}
        />
    );
};
