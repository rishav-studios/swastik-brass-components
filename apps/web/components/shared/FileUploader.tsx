"use client";

import { useState, useCallback, useRef } from "react";
import { uploadToSupabase } from "@/utils/storage";
import { icons } from "@swastik/ui/constants/icon";
import { cn } from "@swastik/ui/lib/utils";
import { toast } from "@swastik/ui/components/shadcn";

interface FileUploaderProps {
    value?: string | null;
    onChange: (url: string | null) => void;
    accept?: string;
    maxSizeMB?: number;
    folder?: string;
    className?: string;
}

export const FileUploader = ({
    value,
    onChange,
    accept = ".dwg,.dxf,.pdf,.step,.igs,.stp,.igx",
    maxSizeMB = 50,
    folder = "quotes/drawings",
    className,
}: FileUploaderProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [fileName, setFileName] = useState<string | null>(value ? value.split("/").pop() || "Uploaded File" : null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleFile = async (file: File) => {
        if (!file) return;

        // Validate size
        if (file.size > maxSizeMB * 1024 * 1024) {
            toast.error(`File is too large. Maximum size is ${maxSizeMB}MB.`);
            return;
        }

        // Validate extension (basic check against accept string)
        const fileExt = `.${file.name.split(".").pop()?.toLowerCase()}`;
        if (accept && !accept.split(",").includes(fileExt)) {
             toast.error(`Invalid file type. Accepted types: ${accept}`);
             return;
        }

        try {
            setIsUploading(true);
            setFileName(file.name);
            const url = await uploadToSupabase(file, folder);
            onChange(url);
            toast.success("File uploaded successfully.");
        } catch (error: any) {
            toast.error(error.message || "Failed to upload file.");
            setFileName(null);
            onChange(null);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
            const file = e.dataTransfer.files?.[0];
            if (file) {
                handleFile(file);
            }
        },
        [maxSizeMB, accept, folder, onChange]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFile(file);
        }
        // Reset input so the same file can be selected again if needed
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleRemove = () => {
        setFileName(null);
        onChange(null);
    };

    return (
        <div className={cn("w-full", className)}>
            {!value ? (
                <div
                    className={cn(
                        "relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl transition-all",
                        isDragging ? "border-primary bg-primary/5" : "border-border/50 hover:border-primary/50 hover:bg-muted/50",
                        isUploading ? "opacity-50 pointer-events-none" : "cursor-pointer"
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleChange}
                        accept={accept}
                        className="hidden"
                    />
                    <div className="p-4 bg-muted rounded-full text-muted-foreground mb-4">
                        {isUploading ? (
                            <icons.loader className="w-8 h-8 animate-spin" />
                        ) : (
                            <icons.uploadCloud className="w-8 h-8" />
                        )}
                    </div>
                    <p className="text-foreground font-semibold mb-1 text-center">
                        {isUploading ? "Uploading..." : "Drag & drop your CAD files here"}
                    </p>
                    <p className="text-muted-foreground text-sm text-center mb-4">
                        {accept.replace(/,/g, ", ")} (max {maxSizeMB}MB)
                    </p>
                    {!isUploading && (
                        <span className="px-6 py-2 rounded-full border border-border text-sm font-medium hover:bg-muted transition-colors">
                            Browse Files
                        </span>
                    )}
                </div>
            ) : (
                <div className="flex items-center justify-between p-4 bg-muted/30 border border-border/50 rounded-xl">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="p-2 bg-primary/10 text-primary rounded-lg shrink-0">
                            <icons.fileCheck2 className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-foreground truncate">
                            {fileName || "Uploaded File"}
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors shrink-0"
                    >
                        <icons.trash className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
};
