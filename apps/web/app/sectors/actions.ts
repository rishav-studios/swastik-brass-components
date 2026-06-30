"use server"

import { createServerSupabaseClient } from "@swastik/supabase";
import { Sector } from "@swastik/types";

export async function fetchSectors(): Promise<Sector[] | { error: string }> {
    try {
        const supabase = await createServerSupabaseClient();

        const { data: sectors, error } = await supabase
            .from("sectors")
            .select("*")
            .order("display_order", { ascending: true });

        if (error) {
            return { error: error.message };
        }

        return sectors as Sector[];

    } catch (err) {
        console.error("Unexpected fetch sectors error:", err);
        return { error: "An unexpected error occurred. Please try again." };
    }
}
