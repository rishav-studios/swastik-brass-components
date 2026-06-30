import { createBrowserSupabaseClient } from "@swastik/supabase/client";

/**
 * Uploads a file to the Supabase public_assets storage bucket.
 * @param file The File to upload.
 * @param folder The folder path within the bucket (e.g., 'quotes/drawings').
 * @returns A Promise that resolves to the public URL of the uploaded file.
 */
export const uploadToSupabase = async (file: File, folder: string): Promise<string> => {
    const supabase = createBrowserSupabaseClient();
    const fileName = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;

    const { error: uploadError } = await supabase.storage
        .from("public_assets")
        .upload(fileName, file, {
            contentType: file.type || "application/octet-stream",
            upsert: false,
        });

    if (uploadError) {
        throw new Error(`Failed to upload file: ${uploadError.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
        .from("public_assets")
        .getPublicUrl(fileName);

    return publicUrl;
};
