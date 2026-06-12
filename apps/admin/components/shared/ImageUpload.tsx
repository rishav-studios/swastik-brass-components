"use client";

import { ACCEPTED_IMAGE_TYPES } from "@swastik/types";
import { icons } from "@swastik/ui";
import { cn } from "@swastik/ui/lib/utils";
import { useCallback, useRef, useState } from "react";

type ImageUploadProps = {
    value: File | string | null | undefined;
    onChange: (file: File | null) => void;
    label?: string;
    error?: string;
    disabled?: boolean;
    className?: string;
};

export const ImageUpload = ({
    value,
    onChange,
    label,
    error,
    disabled = false,
    className,
}: ImageUploadProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const preview = value
        ? typeof value === "string"
            ? value
            : URL.createObjectURL(value)
        : null;

    const handleFile = useCallback(
        (file: File | null) => {
            if (!file) return;
            if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) return;
            onChange(file);
        },
        [onChange]
    );

    const handleDragOver = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            if (!disabled) setIsDragging(true);
        },
        [disabled]
    );

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);
            if (disabled) return;
            const file = e.dataTransfer.files?.[0];
            if (file) handleFile(file);
        },
        [disabled, handleFile]
    );

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0] ?? null;
            if (file) handleFile(file);
        },
        [handleFile]
    );

    const handleRemove = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            onChange(null);
            if (inputRef.current) inputRef.current.value = "";
        },
        [onChange]
    );

    return (
        <div className={cn("space-y-1.5 flex flex-col", className)}>
            {label && (
                <label className="text-xs font-semibold text-foreground/80 tracking-wide uppercase">
                    {label}
                </label>
            )}
            <div
                onClick={() => !disabled && inputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                    "relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 cursor-pointer transition-all duration-200 h-full",
                    isDragging
                        ? "border-primary bg-primary/5 scale-[1.01]"
                        : "border-input hover:border-primary/50 hover:bg-muted/30",
                    error && "border-destructive/50 bg-destructive/5",
                    disabled && "opacity-50 cursor-not-allowed",
                    preview && "p-2"
                )}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={ACCEPTED_IMAGE_TYPES.join(",")}
                    onChange={handleInputChange}
                    disabled={disabled}
                    className="hidden"
                />

                {preview ? (
                    <div className="relative w-full group">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    inputRef.current?.click();
                                }}
                                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
                                title="Replace image"
                            >
                                <icons.edit3 className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="p-2 bg-white/20 hover:bg-red-500/80 rounded-lg text-white transition-colors"
                                title="Remove image"
                            >
                                <icons.delete className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="p-3 bg-muted/50 rounded-xl">
                            <icons.plus className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium text-foreground/80">
                                Drop an image here or{" "}
                                <span className="text-primary font-semibold">browse</span>
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                PNG, JPG, WEBP, GIF, or SVG
                            </p>
                        </div>
                    </>
                )}
            </div>
            {error && (
                <p className="text-[11px] text-destructive font-medium animate-in fade-in duration-200">
                    {error}
                </p>
            )}
        </div>
    );
};
