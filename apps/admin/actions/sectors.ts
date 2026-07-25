"use server"

import { createServerSupabaseClient } from "@swastik/supabase";
import { CreateSector, createSectorSchema, Sector, UpdateSector, updateSectorSchema } from "@swastik/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Triggers on-demand revalidation on the public website.
 * Called after sector CRUD operations to bust the cached sectors data.
 */
async function revalidateWebsite(tag: string = "sectors") {
    const webUrl = process.env.NEXT_PUBLIC_WEB_URL;
    const secret = process.env.REVALIDATION_SECRET;

    if (!webUrl || !secret) {
        console.warn("Missing NEXT_PUBLIC_WEB_URL or REVALIDATION_SECRET — skipping website revalidation.");
        return;
    }

    try {
        await fetch(`${webUrl}/api/revalidate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ secret, tag }),
        });
    } catch (err) {
        console.error("Failed to revalidate website:", err);
    }
}

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

export async function createSector(data: CreateSector): Promise<{ error: string } | void> {
    // 1. Validate on the server
    const parsed = createSectorSchema.safeParse(data);
    if (!parsed.success) {
        return { error: parsed.error.message };
    }

    try {
        const supabase = await createServerSupabaseClient();

        const { error } = await supabase
            .from("sectors")
            .insert(parsed.data);

        if (error) {
            return { error: error.message };
        }

    } catch (err) {
        console.error("Unexpected create sector error:", err);
        return { error: "An unexpected error occurred. Please try again." };
    }

    // Revalidate the public website
    await revalidateWebsite();

    // Redirect on success — OUTSIDE try/catch
    redirect("/catalogue/sectors");
}

export async function getSectorById(id: string): Promise<Sector | null> {
    try {
        const supabase = await createServerSupabaseClient();
        console.log(id)
        const { data: sector, error } = await supabase
            .from("sectors")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            console.error("Error fetching sector by ID:", error.message);
            return null;
        }

        return sector as Sector;
    } catch (err) {
        console.error("Unexpected fetch sector by ID error:", err);
        return null;
    }
}

export async function updateSector(id: string, data: UpdateSector): Promise<{ error: string } | void> {
    const parsed = updateSectorSchema.safeParse(data);
    if (!parsed.success) {
        return { error: parsed.error.message };
    }

    try {
        const supabase = await createServerSupabaseClient();

        const { error } = await supabase
            .from("sectors")
            .update(parsed.data)
            .eq("id", id);

        if (error) {
            return { error: error.message };
        }

    } catch (err) {
        console.error("Unexpected update sector error:", err);
        return { error: "An unexpected error occurred. Please try again." };
    }

    // Revalidate the public website
    await revalidateWebsite();

    // Redirect on success
    redirect("/catalogue/sectors");
}

export async function deleteSector(id: string): Promise<{ error: string } | void> {
    try {
        const supabase = await createServerSupabaseClient();

        const { error } = await supabase
            .from("sectors")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Error deleting sector:", error.message);
            return { error: error.message };
        }

        revalidatePath("/catalogue/sectors");

        // Revalidate the public website
        await revalidateWebsite();
    } catch (err) {
        console.error("Unexpected delete sector error:", err);
        return { error: "An unexpected error occurred. Please try again." };
    }
}
