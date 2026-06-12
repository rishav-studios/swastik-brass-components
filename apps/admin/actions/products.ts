"use server"

import { createServerSupabaseClient } from "@swastik/supabase";
import { revalidatePath } from "next/cache";

/**
 * Finds the count of products associated with a given sector ID.
 */
export async function findProductsBySectorId(sectorId: string): Promise<{ count: number } | { error: string }> {
    try {
        const supabase = await createServerSupabaseClient();

        const { count, error } = await supabase
            .from("products")
            .select("*", { count: "exact", head: true })
            .eq("sector_id", sectorId);

        if (error) {
            console.error("Error finding products by sector:", error);
            return { error: error.message };
        }

        return { count: count || 0 };
    } catch (err) {
        console.error("Unexpected error in findProductsBySectorId:", err);
        return { error: "An unexpected error occurred while checking products." };
    }
}

/**
 * Deletes all products associated with a given sector ID.
 */
export async function deleteProductsBySectorId(sectorId: string): Promise<{ error: string } | void> {
    try {
        const supabase = await createServerSupabaseClient();

        const { error } = await supabase
            .from("products")
            .delete()
            .eq("sector_id", sectorId);

        if (error) {
            console.error("Error deleting products by sector:", error);
            return { error: error.message };
        }
        
        revalidatePath("/catalogue/sectors");
    } catch (err) {
        console.error("Unexpected error in deleteProductsBySectorId:", err);
        return { error: "An unexpected error occurred while deleting products." };
    }
}

/**
 * Finds the count of products associated with a given material ID.
 */
export async function findProductsByMaterialId(materialId: string): Promise<{ count: number } | { error: string }> {
    try {
        const supabase = await createServerSupabaseClient();

        const { count, error } = await supabase
            .from("products")
            .select("*", { count: "exact", head: true })
            .eq("material_id", materialId);

        if (error) {
            console.error("Error finding products by material:", error);
            return { error: error.message };
        }

        return { count: count || 0 };
    } catch (err) {
        console.error("Unexpected error in findProductsByMaterialId:", err);
        return { error: "An unexpected error occurred while checking products." };
    }
}

/**
 * Deletes all products associated with a given material ID.
 */
export async function deleteProductsByMaterialId(materialId: string): Promise<{ error: string } | void> {
    try {
        const supabase = await createServerSupabaseClient();

        const { error } = await supabase
            .from("products")
            .delete()
            .eq("material_id", materialId);

        if (error) {
            console.error("Error deleting products by material:", error);
            return { error: error.message };
        }
        
        revalidatePath("/catalogue/materials");
    } catch (err) {
        console.error("Unexpected error in deleteProductsByMaterialId:", err);
        return { error: "An unexpected error occurred while deleting products." };
    }
}
