"use client";

import { Eyebrow } from "@/components/shared/SectionHeader";
import { icons } from "@swastik/ui";
import { Button } from "@swastik/ui/components/shadcn/button";
import { cn } from "@swastik/ui/lib/utils";
import { useState } from "react";

type MaterialCardProps = {
    className?: string;
    imageSrc: string;
    name: string;
    features: string[];
    grades: string[];
    index: number
};


const MaterialCard = ({ className, imageSrc, name, features, grades, index }: MaterialCardProps) => {
    const [showAllGrades, setShowAllGrades] = useState(false);

    const displayedGrades = showAllGrades || grades.length <= 7 ? grades : grades.slice(0, 7);

    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6", className)}>
            {/* left image */}
            <div className="flex items-start gap-6">
                <span className="text-4xl font-bold text-shadow-accent hidden md:flex">#{index}</span>
                <div className="w-full h-full rounded-2xl overflow-hidden">
                    <img
                        src={imageSrc}
                        alt={name}
                        className="w-full h-full hover:scale-110 transition-transform duration-700 object-cover"
                    />
                </div>
            </div>

            {/* right content */}
            <div className="xl:col-span-2">
                <div className="grid lg:grid-cols-2 gap-6">

                    {/* name */}
                    <div>
                        <h3 className="text-3xl font-semibold">{name}</h3>
                    </div>
                    {/* features */}
                    <div className="space-y-6">
                        <h4 className="font-medium text-sm"># Features</h4>
                        <ul className="space-y-2">

                            {features.map((feature, index) => (
                                <li key={index} className="flex gap-2 items-start">
                                    <icons.check className="text-primary shrink-0 size-4" />
                                    <p className="font-medium xl:text-lg">{feature}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* grades */}
                <div className="mt-6 lg:mt-0 space-y-6">
                    <h4 className="font-medium text-sm"># grades</h4>
                    <ul className="flex flex-wrap gap-4">

                        {displayedGrades.map((grade, index) => (
                            <li key={index} className="">
                                <Eyebrow className="bg-accent! text-[10px]!">{grade}</Eyebrow>
                            </li>
                        ))}

                        {grades.length > 7 && (
                            <li>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="cursor-pointer rounded-full text-xs mt-auto"
                                    onClick={() => setShowAllGrades(prev => !prev)}
                                >
                                    {showAllGrades ? "Show Less" : `...and ${grades.length - 7} more grades`}
                                </Button>
                            </li>
                        )}
                    </ul>
                </div>


            </div>
        </div>
    );
};

export default MaterialCard;