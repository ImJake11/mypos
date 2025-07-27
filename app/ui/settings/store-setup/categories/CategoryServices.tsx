import { CategoryModel } from "@/app/lib/models/categoryModel";
import { fetchAllCategory } from "@/app/lib/utils/data/fetchCategories";
import { convertDataUrlToBlob } from "@/app/lib/utils/services/convertDataUrlToBlob";
import { convertDataUrlToWebP } from "@/app/lib/utils/services/convertDataUrlToWebP";
import { isBase64Image } from "@/app/lib/utils/services/isBase64Image";
import { supabaseUploadAndGetIMageDownloadUrl } from "@/app/lib/utils/supabase/supabase_services";
import { v4 as uuid } from "uuid";

export class CategoryServices {
    private categoryData: CategoryModel;

    constructor({ categoryData }: { categoryData: CategoryModel }) {
        this.categoryData = categoryData;
    }

    public async handleSave({
        onLoading,
        onSuccess,
        onError,
    }:
        {
            onLoading: (isLoading: boolean) => void,
            onSuccess: () => void,
            onError: () => void
        }
    ) {

        try {

            onLoading(true);

            const {
                content,
                imageId,
                url,
            } = this.categoryData;

            if (!content || !url) {
                onLoading(false);
                return;
            };

            const generatedImageId = !imageId ? uuid() : imageId;

            const imageUrl = await this.handleImageUpload(generatedImageId);

            await this.handleApiCall(generatedImageId, imageUrl);

            onSuccess();
        } catch (e) {
            onError();
            throw new Error("Failed to save category");
        } finally {
            onLoading(false);
        }
    }

    private async handleApiCall(imageId: string, imageUrl: string) {

        try {
            if (!this.categoryData) return;

            const res = await fetch("/api/category", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: this.categoryData?.content,
                    id: this.categoryData.id,
                    url: imageUrl,
                    imageId: imageId,
                })
            });

            if (!res.ok) {
                throw new Error(res.statusText);
            };
        } catch (e) {
            throw new Error("Api erro");
        }
    }

    private async handleImageUpload(id: string): Promise<string> {

        try {
            if (!this.categoryData.url) return "";

            if (!isBase64Image(this.categoryData.url)) return this.categoryData.url;

            // --convert image data to webP url
            const webpUrl = await convertDataUrlToWebP(this.categoryData.url);

            // -- convert webp url to blob
            const blobImage = await convertDataUrlToBlob(webpUrl);

            const imageUrl = await supabaseUploadAndGetIMageDownloadUrl(`category_images/${id}`, blobImage);

            return imageUrl;

        } catch (e) {
            throw new Error("Failed to save image");
        }
    }
}
