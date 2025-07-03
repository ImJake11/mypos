import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ProductProps, VariantsProps } from "../../../../lib/models/productModel";
import { storage } from "../../../../lib/utils/db/firebase";
import { convertDataUrlToBlob } from "@/app/lib/utils/services/convertDataUrlToBlob";
import { convertDataUrlToWebP } from "@/app/lib/utils/services/convertDataUrlToWebP";
import { supabaseUploadAndGetIMageDownloadUrl } from "@/app/lib/utils/supabase/supabase_services";

interface Props {
    productData: ProductProps,
}

class ProductFormServices {
    public productData: ProductProps;


    constructor({ productData }: Props) {
        console.log("re rendered product service");
        this.productData = productData;
    }


    public async createVariant(updatedVariants: VariantsProps[], productID: string) {

        // 5. then add it to database
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
    }

    // update product
    public async updateProduct(updatedRawData: ProductProps) {
        const res = await fetch("/api/product", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ updatedRawData })
        });

        if (!res.ok) {
            throw new Error("Product update failed");
        };

    }

    // upload product cover photo
    public async uploadCoverPhoto({ dataUrl, imageId }: { dataUrl: string, imageId: string }): Promise<string> {
        const filename = `cover-images/${imageId}/${new Date()}`;

        const imageRef = ref(storage, filename);


        try {

            // convert data url to web p
            const webP = await convertDataUrlToWebP(dataUrl);
            // convert webp to file
            const imageFile = await convertDataUrlToBlob(webP)

            const downloadUrl = await supabaseUploadAndGetIMageDownloadUrl(`cover_images/${imageId}`, imageFile);
            console.log("Successfully retrieve the download url")

            return downloadUrl

        } catch (e) {
            console.log("Uploading cover photo failed", e);
            throw new Error(`Uploading cover photo error`)
        }
    }


    // upload raw product data
    public async createProduct({ data }: { data: ProductProps }): Promise<string | null> {

        const res = await fetch('/api/product', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });


        if (!res.ok) {
            console.log("Failed to save product raw data");
            return null;
        }

        const { productID } = await res.json();

        return productID;

    }


    // update variants 
    public async uploadVariants({ id }: { id: string }): Promise<VariantsProps[]> {

        const { variants } = this.productData;

        // create promises for all image uploads
        const imageUploadPromises = variants.map(async (variant, index) => { // we will make this asychronous becaue we will call the upload picture function
            if (variant.imageUrl) {

                // --check the image url if it is starts with data:
                // -- this means user want to upload new image

                const isBase64 = variant.imageUrl.startsWith("data:");

                if (isBase64) {
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
                } else {
                    return {
                        imageUrl: variant.imageUrl, // return with existing image url
                        originalIndex: index,
                        status: "successful",
                    }
                }

            }

            return { originalIndex: index, imageUrl: "", status: "skipped" }; // return this data if no image to upload

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


    // upload image to firebase and return dl string
    public async saveImageToFirebase({ index, dataUrl, productID }: { index: number, dataUrl: string, productID: string }): Promise<string> {

        const filename = `product-images/${productID}/variant-image-${index}`;

        const imageRef = ref(storage, filename);

        try {

            //-- convert data url to blob
            const imageBlob = await convertDataUrlToBlob(dataUrl);

            const snapshot = await uploadBytes(imageRef, imageBlob);
            console.log("Successfully uploaded the image", imageBlob)

            const downloadUrl = await getDownloadURL(snapshot.ref);
            console.log("Variant image url retrieved", downloadUrl);

            return downloadUrl

        } catch (e) {
            console.log('Firebase error', e)

            // we returned data url for update
            return "";
        }
    }


    // check if the form data is valid means all required fields are filled
    public isFormValid(): boolean {

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

        // 1. check required data
        if (requiredDataIsValid) {

            const { description, discountRate, expirationDate } = this.productData.promotionalDiscount;


            // 2. if bulk pricing is enabled then check all of its data are filled with the expected data
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

            // 3. check if use added a variant and if has check the required data if its all filled
            else if (this.productData.variants.length > 0) {

                // we collect the list of boolean for every variants that will return true or false only

                const results: boolean[] = this.productData.variants.map(variant => {
                    if (!variant.imageUrl || !variant.name || variant.price <= 0 || variant.stock <= 0) {
                        return false;
                    } else {
                        return true;
                    }
                });

                // then in our list we will check the data if there is a false existing 
                // then if it has we will return false even one false exist it will return false
                const hasInvalidVariants = results.some(res => res == false);


                if (hasInvalidVariants) return false;

                return true;
            }

            // 4. check promotional discount
            // either one of this field has a data the validation will start and means the user has put any data one of it
            else if (this.productData.promotionalDiscount) {

                const isValid: boolean = description && discountRate > 0 && expirationDate ? true : false;

                return isValid;
            } else {
                return true;
            }
        }

        return false;
    }


}


export default ProductFormServices;