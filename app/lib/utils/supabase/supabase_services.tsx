import { createClient } from "./supabase"; // Assuming this correctly creates your Supabase client

export async function supabaseUploadAndGetIMageDownloadUrl( // Make the function itself async
    filePath: string,
    file: Blob | File,
): Promise<string> {
    const supabase = createClient();

    try {
        console.log("uploading image");

        const { data, error: uploadError } = await supabase.storage.from("mypos.bucket").upload(filePath, file, {
            contentType: file.type || undefined,
            upsert: true,
        });

        if (uploadError) {
            console.error("Supabase Image upload error:", uploadError); // Use console.error
            throw new Error(`Supabase image upload failed: ${uploadError.message}`); // More descriptive error
        }

        // Supabase getPublicUrl returns an object with a publicUrl property
        const { data: publicUrlData } = supabase.storage.from("mypos.bucket").getPublicUrl(data.path);

        // Check if publicUrlData or publicUrlData.publicUrl is null/undefined
        if (!publicUrlData || !publicUrlData.publicUrl) {
            console.error("Unable to get public image URL after upload for path:", data.path); // Use console.error
            throw new Error("Failed to get public image URL from Supabase.");
        }

        console.log("Image uploaded succesfully", publicUrlData);
        return publicUrlData.publicUrl; // Return the actual URL

    } catch (e) {
        // Catch any errors from Supabase operations and re-throw them
        // This allows `handleImageUpload` to catch them.
        console.error("Error in supabaseUploadAndGetIMageDownloadUrl:", e);
        throw e; // Re-throw the original error or a new one if you want to standardize it
    }
}