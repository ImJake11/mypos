/**
 * ProductFormServices handles all operations related to product creation and update.
 * This includes:
 * - Cover photo upload
 * - Variant image upload
 * - Form validation
 * - Backend API interaction
 * 
 * Used in admin/product management form to ensure smooth product creation/update experience.
 */
import { ProductProps, VariantsProps } from "../../../../lib/models/productModel";
import { convertDataUrlToBlob } from "@/app/lib/utils/services/convertDataUrlToBlob";
import { convertDataUrlToWebP } from "@/app/lib/utils/services/convertDataUrlToWebP";
import { supabaseUploadAndGetIMageDownloadUrl } from "@/app/lib/utils/supabase/supabase_services";
import { isBase64Image } from "@/app/lib/utils/services/isBase64Image";
import store, { AppDispatch } from "@/app/lib/redux/store";
import { toggleProcessDialog, updateProcessDialogCurrentValue, updaterPocessDialogMessage } from "@/app/lib/redux/slice/processSlice";
import { v4 as uuid } from "uuid";
import { formResetProductState } from "@/app/lib/redux/slice/productSlice";
import { openToas } from "@/app/lib/redux/slice/toastSlice";
import ToasEnum from "@/app/lib/enum/toastEnum";

interface Props {
    dispatch: AppDispatch,
}

class ProductFormServices {
    // Gets the latest product data directly from the Redux store
    private productData: ProductProps = store.getState().productSlice.data;
    private dispatch: AppDispatch;


    constructor({ dispatch }: Props) {
        this.dispatch = dispatch;
    }

    // Handles the entire product form flow:
    // 1. Validates form
    // 2. Uploads cover image
    // 3. Creates or updates product in DB
    // 4. Uploads variant images
    // 5. Syncs updated variant data
    public async handleProduct() {

        try {
            this.handleProcessDialog("Validating product data", 10);
            if (!this.isFormValid()) {
                // Show error toast if any required product field is incomplete
                this.dispatch(openToas({
                    message: "Please complete all required product information before submitting",
                    type: ToasEnum.ERROR,
                }))
                throw new Error("Failed to upload product, required fields are empty")
            }

            let rawData = this.productData;

            const imageId = uuid();

            this.handleProcessDialog("Uploading Cover Photo", 40);
            const coverPhotoUrl = await this.handleCoverPhotoUpload({
                dataUrl: rawData.coverImage,
                imageId: rawData.coverImageId ?? imageId,
            });

            rawData = {
                ...rawData,
                coverImageId: imageId,
                coverImage: coverPhotoUrl,
            }

            this.handleProcessDialog("Saving product data", 60);
            const id = await this.handleProductUpload({
                data: rawData,
                isForUpdate: this.isForUpdate(),
            });

            if (!id) {
                throw new Error("Product ID is missing");
            }

            this.handleProcessDialog("Uploading Variants", 80)
            const updatedVariants = await this.handleVariantsUploadToImageProvider({
                id
            });


            this.handleProcessDialog("Saving Variants", 90);
            await this.handleVariantUpload({
                productID: id,
                updatedVariants,
            });

            this.handleProcessDialog("Product saved successfully", 100);
            this.dispatch(openToas({
                message: "Product saved successfully",
                type: ToasEnum.SUCCESS,
            }))
            this.dispatch(formResetProductState());

        } catch (e) {
            throw new Error("Failed to upload product");
        } finally {
            // this.dispatch(toggleProcessDialog());
        }
    }

    private handleProcessDialog(message: string, value: number) {
        this.dispatch(updateProcessDialogCurrentValue(value))
        this.dispatch(updaterPocessDialogMessage(message))
    }

    // Final sync of updated variant data with the database.
    // Sends a POST request to `/api/product/variants`.
    private async handleVariantUpload({ updatedVariants, productID }: { updatedVariants: VariantsProps[], productID: string }) {

        const res = await fetch('/api/product/variants', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ variants: updatedVariants, productID: productID })
        });

        if (!res.ok) {
            throw new Error("Variant update failed")
        }

        console.log("Variants Uploaded successfully")
    }

    // Upload product's cover photo and return its public download URL
    private async handleCoverPhotoUpload({ dataUrl, imageId }:
        { dataUrl: string, imageId: string }): Promise<string> {

        const filename = `cover-images/${imageId}/${new Date()}`;

        // Skip upload if already a base64 (meaning already uploaded or user hasn't changed it)
        if (!isBase64Image(dataUrl)) {
            return dataUrl;
        }

        try {
            // Convert base64 to WebP to optimize file size and performance
            const webP = await convertDataUrlToWebP(dataUrl);
            // Convert the WebP image to a Blob/File format for uploading
            const imageFile = await convertDataUrlToBlob(webP)

            // Upload the image to Supabase storage and get the download URL
            const downloadUrl = await supabaseUploadAndGetIMageDownloadUrl(`cover_images/${imageId}`, imageFile);

            return downloadUrl

        } catch (e) {
            throw new Error(`Uploading cover photo error`)
        }
    }

    // Uploads or updates the product based on `isForUpdate` flag.
    // Returns the product ID after operation completes.
    private async handleProductUpload({ data, isForUpdate }:
        { data: ProductProps, isForUpdate: boolean }): Promise<string> {

        try {
            let returnId: string = data.id || "";

            if (isForUpdate) {// -- Update existing product

                const res = await fetch("/api/product", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ data })
                });

                if (!res.ok) {
                    throw new Error("Product update failed");
                };

                console.log("Product updated");

                returnId = data.id!;

            } else { // -- Create new product

                const res = await fetch('/api/product', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ data }),
                });


                if (!res.ok) {
                    throw new Error("Failed to upload new product")
                }

                const { id } = await res.json();

                returnId = id;
            }

            return returnId;
        } catch (e) {
            throw new Error("Upload product failed")
        }
    }


    // Uploads new variant images if needed.
    // Skips upload for already-existing image URLs.
    // Returns the updated variants array with the correct image URLs.
    private async handleVariantsUploadToImageProvider({ id }: { id: string }): Promise<VariantsProps[]> {

        const { variants } = this.productData;

        // Loop over each variant and check if it needs a new image upload
        const imageUploadPromises = variants.map(async (variant, index) => {

            if (variant.imageUrl && isBase64Image(variant.imageUrl)) {

                // Convert and upload the variant image if it's a new one (base64)

                const filePath = `variant_images/${id}/variant${index}`;

                // -- covert image to webp
                const webP = await convertDataUrlToWebP(variant.imageUrl);

                // -- covnert webp data to blob
                const imageFile = await convertDataUrlToBlob(webP);

                const imageUrl = await supabaseUploadAndGetIMageDownloadUrl(filePath, imageFile);

                return {
                    imageUrl: imageUrl, // return with the new image url
                    originalIndex: index,
                    status: "successful",
                }
            }

            // If image is already uploaded or not updated, skip the upload
            return { originalIndex: index, imageUrl: variant.imageUrl, status: "skipped" };

        });

        // we will get all images url that is succesfully uploaded
        const uploadResults = await Promise.allSettled(imageUploadPromises);

        // we will update image urls from base product
        const updateVariants: VariantsProps[] = variants.map((variant, index) => {

            const result = uploadResults[index];

            // then we will confirm if the image is uploaded successfuly
            if (result && result.status === "fulfilled") {

                if (result.value.status === "successful") {
                    // then update the base product image url to uploaded image url
                    return { ...variant, imageUrl: result.value.imageUrl }

                } else {
                    return { ...variant, imageUrl: variant.imageUrl }
                }
            } else {
                return { ...variant, imageUrl: "" };
            }
        });

        // then finally return the update variants list
        return updateVariants;
    }


    // Checks if the form is being used to update an existing product
    // Returns true if productData has a valid ID
    private isForUpdate(): boolean {

        if (this.productData.id !== undefined) {
            return true;
        } else {
            return false;
        }
    }


    // Validates all required fields of the product form before submission.
    // Covers 4 cases:
    // 1. Basic product info
    // 2. Bulk pricing
    // 3. Variant data
    // 4. Promotional discount (optional)
    private isFormValid(): boolean {

        // required data validation (seperated for more readability)
        const requiredDataIsValid = this.productData.name &&
            this.productData.categoryID &&
            this.productData.costPrice &&
            this.productData.sellingPrice &&
            this.productData.tax &&
            this.productData.stock &&
            this.productData.lowStock &&
            this.productData.stock > this.productData.lowStock &&
            this.productData.coverImage;

        // 1. Validate core required fields like name, pricing, category, etc.
        if (requiredDataIsValid) {


            // 2. If bulk pricing is enabled, validate all tier values
            if (this.productData.bulkEnabled) {
                if (this.productData.bulkTier.length > 0) {
                    const results: boolean[] = this.productData.bulkTier.map(tier => {

                        if (tier.quantity <= 0) {
                            return false;
                        } else {
                            return true;
                        }
                    });

                    const hasInvalidData = results.some(res => res === false);

                    if (hasInvalidData) return false;

                    return true;
                } else {
                    return false;
                }
            }

            // 3. If variants exist, validate that each variant has valid required fields
            else if (this.productData.variants.length > 0) {

                // we collect the list of boolean for every variants that will return true or false only

                const results: boolean[] = this.productData.variants.map(variant => {
                    if (!variant.imageUrl || !variant.name || variant.stock <= 0) {
                        return false;
                    } else {
                        return true;
                    }
                });

                const hasInvalidVariants = results.some(res => res == false);

                if (hasInvalidVariants) return false;

                return true;
            }
        }

        return false;
    }


}


export default ProductFormServices;