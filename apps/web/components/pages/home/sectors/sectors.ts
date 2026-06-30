import type { Sector } from "./SectorCard";

/**
 * SECTORS_DATA
 *
 * Replace `videoSrc` with your actual WebM/MP4 paths.
 * Keep both formats side-by-side in /public:
 *   /sectors/aerospace.webm  (primary — Chrome/Firefox)
 *   /sectors/aerospace.mp4   (fallback — Safari)
 *
 * Videos should be processed with ffmpeg:
 *   ffmpeg -i input.mp4 -movflags faststart -g 30 -vf scale=1280:-2 -crf 28 -vcodec libx264 output.mp4
 */
export const SECTORS_DATA: Sector[] = [
    {
        id: "aerospace",
        label: "Aerospace",
        slug: "aerospace",
        description:
            "From hydraulic fittings to instrument housings, our brass components meet AS9100 aerospace standards — zero-defect tolerances in environments where failure is not an option.",
        stats: [
            { value: "±0.005", unit: "mm Tolerance" },
            { value: "AS9100", unit: "Certified" },
        ],
        videoSrc: "/sectors/videos/aerospace.mp4",
    },
    {
        id: "railway",
        label: "Railway",
        slug: "railway",
        description:
            "Signalling systems, valve assemblies, and connector housings built to withstand decades of vibration, pressure, and environmental exposure across global rail networks.",
        stats: [
            { value: "30+", unit: "Years Lifespan" },
            { value: "EN 45545", unit: "Fire Rated" },
        ],
        videoSrc: "/sectors/videos/railway.mp4",
    },
    {
        id: "oil-gas",
        label: "Oil & Gas",
        slug: "oil-gas",
        description:
            "Offshore and onshore valve bodies, manifolds, and coupling fittings machined from dezincification-resistant brass — engineered for aggressive media and extreme pressures.",
        stats: [
            { value: "600", unit: "Bar Rated" },
            { value: "DZR", unit: "Brass Alloy" },
        ],
        videoSrc: "/sectors/videos/oil-gas.mp4",
    },
    {
        id: "automobile",
        label: "Automobile",
        slug: "automobile",
        description:
            "Fuel system inserts, EV battery terminal blocks, and precision-turned connectors supplied to OEM and Tier-1 manufacturers with IATF 16949 quality systems.",
        stats: [
            { value: "IATF", unit: "16949 Certified" },
            { value: "12M+", unit: "Parts / Year" },
        ],
        videoSrc: "/sectors/videos/automobile.mp4",
    }
];