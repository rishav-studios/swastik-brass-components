import { createPublicSupabaseClient } from "@swastik/supabase";
import { Sector } from "@swastik/types";
import { unstable_cache } from "next/cache";

/**
 * Cached fetch for all sectors from Supabase.
 * Tagged with "sectors" for on-demand revalidation from the admin panel.
 *
 * Used by: home page, /sectors page, /sectors/[slug], footer (via layout).
 */
export const fetchAllSectors = unstable_cache(
    async (): Promise<Sector[]> => {
        try {
            const supabase = createPublicSupabaseClient();

            const { data, error } = await supabase
                .from("sectors")
                .select("*")
                .order("display_order", { ascending: true });

            if (error) {
                console.error("Failed to fetch sectors:", error.message);
                return [];
            }

            return (data as Sector[]) ?? [];
        } catch (err) {
            console.error("Unexpected error fetching sectors:", err);
            return [];
        }
    },
    ["all-sectors"],
    { tags: ["sectors"] }
);
