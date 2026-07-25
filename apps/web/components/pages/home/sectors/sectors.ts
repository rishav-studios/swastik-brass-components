// import type { Sector } from "./SectorCard";

// /**
//  * SECTORS_DATA
//  *
//  * Each sector's frames live in /public/sectors/frames/<id>/
//  * Naming: frame_0001.webp … frame_NNNN.webp
//  */
// export const SECTORS_DATA: Sector[] = [
//     {
//         id: "aerospace",
//         label: "Aerospace",
//         slug: "aerospace",
//         description:
//             "From hydraulic fittings to instrument housings, our brass components meet AS9100 aerospace standards — zero-defect tolerances in environments where failure is not an option.",
//         stats: [
//             { value: "±0.005", unit: "mm Tolerance" },
//             { value: "AS9100", unit: "Certified" },
//         ],
//         frameSrc: {
//             dir: "/sectors/frames/aerospace",
//             prefix: "frame_",
//             count: 96,
//             padDigits: 4,
//         },
//         posterSrc: "/sectors/frames/aerospace/frame_0001.webp",
//     },
//     {
//         id: "railway",
//         label: "Railway",
//         slug: "railway",
//         description:
//             "Signalling systems, valve assemblies, and connector housings built to withstand decades of vibration, pressure, and environmental exposure across global rail networks.",
//         stats: [
//             { value: "30+", unit: "Years Lifespan" },
//             { value: "EN 45545", unit: "Fire Rated" },
//         ],
//         frameSrc: {
//             dir: "/sectors/frames/railway",
//             prefix: "frame_",
//             count: 96,
//             padDigits: 4,
//         },
//         posterSrc: "/sectors/frames/railway/frame_0001.webp",
//     },
//     {
//         id: "oil-gas",
//         label: "Oil & Gas",
//         slug: "oil-gas",
//         description:
//             "Offshore and onshore valve bodies, manifolds, and coupling fittings machined from dezincification-resistant brass — engineered for aggressive media and extreme pressures.",
//         stats: [
//             { value: "600", unit: "Bar Rated" },
//             { value: "DZR", unit: "Brass Alloy" },
//         ],
//         frameSrc: {
//             dir: "/sectors/frames/oil-gas",
//             prefix: "frame_",
//             count: 121,
//             padDigits: 4,
//         },
//         posterSrc: "/sectors/frames/oil-gas/frame_0001.webp",
//     },
//     {
//         id: "automobile",
//         label: "Automobile",
//         slug: "automobile",
//         description:
//             "Fuel system inserts, EV battery terminal blocks, and precision-turned connectors supplied to OEM and Tier-1 manufacturers with IATF 16949 quality systems.",
//         stats: [
//             { value: "IATF", unit: "16949 Certified" },
//             { value: "1M+", unit: "Parts / Year" },
//         ],
//         frameSrc: {
//             dir: "/sectors/frames/automobile",
//             prefix: "frame_",
//             count: 73,
//             padDigits: 4,
//         },
//         posterSrc: "/sectors/frames/automobile/frame_0001.webp",
//     },
// ];