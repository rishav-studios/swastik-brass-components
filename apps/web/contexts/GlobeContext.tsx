'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

type GlobeContextType = {
    selectedCountry: string | null;
    setSelectedCountry: (country: string | null) => void;
    highlightedCountries: string[];
    setHighlightedCountries: (countries: string[]) => void;
};

const GlobeContext = createContext<GlobeContextType | undefined>(undefined);

export function GlobeProvider({ children }: { children: ReactNode }) {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [highlightedCountries, setHighlightedCountries] = useState<string[]>([]);

    return (
        <GlobeContext.Provider
            value={{
                selectedCountry,
                setSelectedCountry,
                highlightedCountries,
                setHighlightedCountries
            }}
        >
            {children}
        </GlobeContext.Provider>
    );
}

export function useGlobe() {
    const context = useContext(GlobeContext);
    if (context === undefined) {
        throw new Error('useGlobe must be used within a GlobeProvider');
    }
    return context;
}