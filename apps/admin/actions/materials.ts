"use server"

import { createServerSupabaseClient } from "@swastik/supabase";
import { CreateMaterial, createMaterialSchema, Material, UpdateMaterial, updateMaterialSchema } from "@swastik/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function fetchMaterials(): Promise<Material[] | { error: string }> {
    try {
        const supabase = await createServerSupabaseClient();

        const { data: materials, error } = await supabase
            .from("materials")
            .select("*")
            .order("display_order", { ascending: true });

        if (error) {
            return { error: error.message };
        }

        return materials as Material[];

    } catch (err) {
        console.error("Unexpected fetch materials error:", err);
        return { error: "An unexpected error occurred. Please try again." };
    }
}

export async function createMaterial(data: CreateMaterial): Promise<{ error: string } | void> {
    // 1. Validate on the server
    const parsed = createMaterialSchema.safeParse(data);
    if (!parsed.success) {
        return { error: parsed.error.message };
    }

    try {
        const supabase = await createServerSupabaseClient();

        const { error } = await supabase
            .from("materials")
            .insert(parsed.data);

        if (error) {
            return { error: error.message };
        }

    } catch (err) {
        console.error("Unexpected create material error:", err);
        return { error: "An unexpected error occurred. Please try again." };
    }

    // Redirect on success — OUTSIDE try/catch
    redirect("/catalogue/materials");
}

export async function getMaterialById(id: string): Promise<Material | null> {
    try {
        const supabase = await createServerSupabaseClient();
        const { data: material, error } = await supabase
            .from("materials")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            console.error("Error fetching material by ID:", error.message);
            return null;
        }

        return material as Material;
    } catch (err) {
        console.error("Unexpected fetch material by ID error:", err);
        return null;
    }
}

export async function updateMaterial(id: string, data: UpdateMaterial): Promise<{ error: string } | void> {
    const parsed = updateMaterialSchema.safeParse(data);
    if (!parsed.success) {
        return { error: parsed.error.message };
    }

    try {
        const supabase = await createServerSupabaseClient();

        const { error } = await supabase
            .from("materials")
            .update(parsed.data)
            .eq("id", id);

        if (error) {
            return { error: error.message };
        }

    } catch (err) {
        console.error("Unexpected update material error:", err);
        return { error: "An unexpected error occurred. Please try again." };
    }

    // Redirect on success
    redirect("/catalogue/materials");
}

export async function deleteMaterial(id: string): Promise<{ error: string } | void> {
    try {
        const supabase = await createServerSupabaseClient();

        const { error } = await supabase
            .from("materials")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Error deleting material:", error.message);
            return { error: error.message };
        }

        revalidatePath("/catalogue/materials");
    } catch (err) {
        console.error("Unexpected delete material error:", err);
        return { error: "An unexpected error occurred. Please try again." };
    }
}
