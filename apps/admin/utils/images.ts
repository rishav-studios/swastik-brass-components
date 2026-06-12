import { createBrowserSupabaseClient } from "@swastik/supabase/client";

/**
 * Converts an image File to WebP format using the HTML5 Canvas API.
 * @param file The original image File.
 * @param quality The quality of the WebP image (0.0 to 1.0). Default is 0.8.
 * @returns A Promise that resolves to the converted WebP File.
 */
export const convertToWebp = (file: File, quality = 0.8): Promise<File> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    reject(new Error("Canvas context is not available"));
                    return;
                }
                ctx.drawImage(img, 0, 0);
                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            reject(new Error("Canvas to Blob conversion failed"));
                            return;
                        }
                        const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
                        const newFile = new File([blob], newFileName, {
                            type: "image/webp",
                        });
                        resolve(newFile);
                    },
                    "image/webp",
                    quality
                );
            };
            img.onerror = (error) => reject(error);
            if (event.target?.result) {
                img.src = event.target.result as string;
            } else {
                reject(new Error("Failed to read file"));
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

/**
 * Uploads a file to the Supabase public_assets storage bucket.
 * @param file The File to upload.
 * @param folder The folder path within the bucket (e.g., 'sectors/images').
 * @returns A Promise that resolves to the public URL of the uploaded file.
 */
export const uploadToSupabase = async (file: File, folder: string): Promise<string> => {
    const supabase = createBrowserSupabaseClient();
    const fileName = `${folder}/${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
        .from("public_assets")
        .upload(fileName, file, {
            contentType: file.type,
            upsert: false,
        });

    if (uploadError) {
        throw new Error(`Failed to upload ${folder} image: ${uploadError.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
        .from("public_assets")
        .getPublicUrl(fileName);

    return publicUrl;
};
