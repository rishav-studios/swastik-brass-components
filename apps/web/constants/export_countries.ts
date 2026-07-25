

export type ExportCountry = {
    name: string,
    code: string,
    alias?: string
}

export const exportCountries: ExportCountry[] = [
    {
        name: "india",
        code: "IN"
    },
    {
        name: "australia",
        code: "AU"
    },
    {
        name: "france",
        code: "FR"
    },
    {
        name: "canada",
        code: "CA"
    },
    {
        name: "united states of america",
        code: "US",
        alias: "united states"
    },
    {
        name: "singapore",
        code: "SG"
    },
    {
        name: "poland",
        code: "PL"
    },
]