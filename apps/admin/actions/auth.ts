"use server"

import { createServerSupabaseClient } from "@swastik/supabase";
import { LoginFields, loginSchema } from "@swastik/types";
import { redirect } from "next/navigation";

export async function loginUser(data: LoginFields) {
    // 1. Re-validate on the server
    const { success, data: user } = loginSchema.safeParse(data);
    if (!success) {
        return { error: "Invalid form data" };
    }

    // Wrap the database call in a try/catch for unexpected crashes
    try {
        const supabase = await createServerSupabaseClient();

        const { error } = await supabase.auth.signInWithPassword({
            email: user.email,
            password: user.password,
        });

        // 2. Handle Expected Errors (e.g., wrong password)
        if (error) {
            return { error: error.message };
        }

    } catch (err) {
        // 3. Handle Unexpected Errors (e.g., network failure)
        console.error("Unexpected login error:", err);
        return { error: "An unexpected error occurred. Please try again." };
    }

    // 4. Redirect on success. 
    // CRITICAL: This is strictly OUTSIDE the try/catch block.
    redirect("/");
}