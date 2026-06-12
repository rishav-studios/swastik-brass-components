"use client";

import { useState, useRef, useEffect } from "react";
import { Metal, METALS } from "@/constants/metals";
import { icons } from "@swastik/ui";
import { cn } from "@swastik/ui/lib/utils";

export type MetalSelection = {
    metal: string;
    label: string;
};

interface MetalCompositionInputProps {
    value: MetalSelection[];
    onChange: (value: MetalSelection[]) => void;
}

export function MetalCompositionInput({ value = [], onChange }: MetalCompositionInputProps) {
    const [inputValue, setInputValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Filter metals based on input, excluding already selected ones
    const filteredMetals = METALS.filter((metal) => {
        const isSelected = value.some((v) => v.metal.toLowerCase() === metal.name.toLowerCase());
        const matchesSearch = metal.name.toLowerCase().includes(inputValue.toLowerCase());
        return !isSelected && matchesSearch;
    });

    const handleSelect = (metal: Metal) => {
        onChange([...value, { metal: metal.name.toLowerCase(), label: metal.label.toLowerCase() }]);
        setInputValue("");
        setIsOpen(false);
    };

    const handleRemove = (metalToRemove: string) => {
        onChange(value.filter((v) => v.metal !== metalToRemove));
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="space-y-4">
            <div className="relative" ref={containerRef}>
                <div
                    className={cn(
                        "flex flex-wrap items-center gap-2 rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 min-h-10",
                        isOpen && "rounded-b-none border-b-transparent focus-within:border-b-transparent"
                    )}
                    onClick={() => setIsOpen(true)}
                >
                    {value.map((item) => (
                        <span
                            key={item.metal}
                            className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
                        >
                            <span className="capitalize">{item.metal}</span>
                            <span className="opacity-60 text-[10px] uppercase">({item.label})</span>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove(item.metal);
                                }}
                                className="ml-1 rounded-full hover:bg-secondary-foreground/20 p-0.5 transition-colors"
                            >
                                <icons.x className="h-3 w-3" />
                                <span className="sr-only">Remove {item.metal}</span>
                            </button>
                        </span>
                    ))}
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            setIsOpen(true);
                        }}
                        onFocus={() => setIsOpen(true)}
                        placeholder={value.length === 0 ? "Type to search metals..." : ""}
                        className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground min-w-[120px] text-sm"
                    />
                </div>

                {/* Dropdown */}
                {isOpen && (
                    <div className="absolute top-full left-0 z-50 w-full rounded-b-lg border border-input bg-popover text-popover-foreground shadow-md max-h-60 overflow-y-auto">
                        {filteredMetals.length > 0 ? (
                            <ul className="py-1">
                                {filteredMetals.map((metal) => (
                                    <li
                                        key={metal.name}
                                        onClick={() => handleSelect(metal)}
                                        className="cursor-pointer px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground flex items-center justify-between"
                                    >
                                        <span>{metal.name}</span>
                                        <span className="text-muted-foreground text-xs">{metal.label}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="p-4 text-center text-sm text-muted-foreground">
                                No matching metals found.
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* JSON Preview */}
            <div className="rounded-lg border border-border overflow-hidden">
                <div className="bg-secondary/50 px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase border-b border-border">
                    Preview Output
                </div>
                <pre className="p-4 bg-muted/30 text-xs font-mono overflow-x-auto">
                    {value.length > 0 ? JSON.stringify(value, null, 2) : "[\n  // Add metals above to see preview\n]"}
                </pre>
            </div>
        </div>
    );
}
