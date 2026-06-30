"use server"

import { createServerSupabaseClient } from "@swastik/supabase";
import { Sector, Product } from "@swastik/types";

export async function getSectorBySlug(slug: string): Promise<Sector | null> {
    try {
        const supabase = await createServerSupabaseClient();
        const { data, error } = await supabase
            .from("sectors")
            .select("*")
            .eq("slug", slug)
            .single();

        if (error) {
            console.error("Error fetching sector:", error);
            return null;
        }

        return data as Sector;
    } catch (err) {
        console.error("Unexpected error fetching sector:", err);
        return null;
    }
}

export async function getProductsBySector(sectorId: number): Promise<Product[]> {
    try {
        const supabase = await createServerSupabaseClient();
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("sector_id", sectorId);

        if (error) {
            console.error("Error fetching products by sector:", error);
            return [];
        }

        return data as Product[];
    } catch (err) {
        console.error("Unexpected error fetching products:", err);
        return [];
    }
}
