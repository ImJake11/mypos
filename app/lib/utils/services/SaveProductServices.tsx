import { getDownloadURL, ref, UploadResult, uploadString } from "firebase/storage";
import { NewProductProps, VariantsProps } from "../../models/newProductModel";
import { AppDispatch } from "../../redux/store";
import { storage } from "../db/firebase";
import { resetProcessDialogState, toggleProcessDialog, updateProcessDialogCurrentValue, updaterPocessDialogMessage } from "../../redux/processSlice";
import { resetNewProductState } from "../../redux/newProductSlice";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface Props {
    dispatch: AppDispatch,
    newProductData: NewProductProps,
    router: AppRouterInstance,
}

class SaveProductServices {
    private dispatch: AppDispatch;
    private newProductData: NewProductProps;
    private router: AppRouterInstance;

    constructor({ dispatch, newProductData, router }: Props) {
        this.dispatch = dispatch;
        this.router = router;
        this.newProductData = newProductData;
    }


    async saveProduct({ isSaveOnly }: // for save and add another or save only
        { isSaveOnly: boolean }) {
        this.dispatch(resetProcessDialogState())
        this.dispatch(toggleProcessDialog());
        this.dispatch(updaterPocessDialogMessage("Uploading cover photo"));

        // 1. upload cover photo
        const coverPhotoUrl = await this.uploadCoverPhoto({ dataUrl: this.newProductData.coverImage });

        this.dispatch(updateProcessDialogCurrentValue(5))
        this.dispatch(updaterPocessDialogMessage("Saving product data"));

        // 2. then update the cover photo in raw data
        const updatedRawData = { ...this.newProductData, coverPhotoUrl: coverPhotoUrl };

        this.dispatch(updateProcessDialogCurrentValue(15))

        // 3. upload raw data of products
        const productID = await this.uploadRawProductData({ data: updatedRawData });

        this.dispatch(updateProcessDialogCurrentValue(50))

        if (!productID) return;


        // 4. upload vairiat to firebase
        const updatedVariants = await this.uploadVariants({
            id: productID,
        });

        this.dispatch(updateProcessDialogCurrentValue(75))


        // 5. then add it to database
        const res = await fetch('/api/product/variants', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ variants: updatedVariants, productID: productID })
        });

        if (!res.ok) return;

        this.dispatch(updateProcessDialogCurrentValue(100))
        this.dispatch(updaterPocessDialogMessage("Published Successfully"));

        this.dispatch(resetNewProductState())
        setTimeout(() => {
            // 6. close process dialog
            this.dispatch(toggleProcessDialog());

            if (isSaveOnly) {
                this.router.push("/ui/inventory");
            }
        }, 1500);
    }



    // update product
    public async updateProduct() {

        this.dispatch(resetProcessDialogState())
        this.dispatch(toggleProcessDialog());
        this.dispatch(updaterPocessDialogMessage("Updating Product"));

        // 1. upload cover photo
        const coverPhotoUrl = await this.uploadCoverPhoto({ dataUrl: this.newProductData.coverImage });

        this.dispatch(updateProcessDialogCurrentValue(5))
        this.dispatch(updaterPocessDialogMessage("Updating product data"));

        // 2. then update the cover photo in raw data
        const updatedRawData = { ...this.newProductData, coverPhotoUrl: coverPhotoUrl };

        this.dispatch(updateProcessDialogCurrentValue(35));

        //3. upload product variants 
        const updatedVariants: VariantsProps[] = await this.uploadVariants({
            id: this.newProductData.id!,
        });

        this.dispatch(updateProcessDialogCurrentValue(50));

        //4. update variants in rawData
        updatedRawData.variants = updatedVariants.map(variant => ({
            isArchived: variant.isArchived,
            imageUrl: variant.imageUrl,
            isPositive: variant.isPositive,
            name: variant.name,
            price: variant.price,
            stock: variant.stock,
            id: variant.id,
        }));

        this.dispatch(updateProcessDialogCurrentValue(75));

        // 4. update product data
        const res = await fetch("/api/product", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ updatedRawData })
        });

        if (!res.ok) return;

        this.dispatch(updateProcessDialogCurrentValue(100))
        this.dispatch(updaterPocessDialogMessage("Updated Successfully"));
        this.dispatch(resetNewProductState())
        setTimeout(() => {
            // 6. close process dialog
            this.dispatch(toggleProcessDialog());
            this.router.push("/ui/inventory");
        }, 1500);

    }

    // upload product cover photo
    private async uploadCoverPhoto({ dataUrl }: { dataUrl: string, }): Promise<string> {
        const filename = `cover-images/${new Date()}`;

        const imageRef = ref(storage, filename);

        try {

            await uploadString(imageRef, dataUrl, "data_url");

            const downloadUrl = await getDownloadURL(imageRef);

            return downloadUrl

        } catch (e) {
            throw new Error(`Uploading cover photo error ${e}`)
        }
    }




    // upload raw product data
    private async uploadRawProductData({ data }: { data: NewProductProps }): Promise<string | null> {

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
    private async uploadVariants({ id }: { id: string }): Promise<VariantsProps[]> {

        const { variants } = this.newProductData;

        // create promises for all image uploads
        const imageUploadPromises = variants.map(async (variant, index) => { // we will make this asychronous becaue we will call the upload picture function
            if (variant.imageUrl) {

                // verify first if its a base64 image
                const isBase64Image = variant.imageUrl.startsWith("data:");

                if (isBase64Image) {
                    const imageUrl = await this.saveImageToFirebase({
                        dataUrl: variant.imageUrl,
                        index,
                        productID: id
                    });

                    return {
                        imageUrl: imageUrl,
                        originalIndex: index,
                        status: "successful",
                    }
                } else {
                    // then if not a base64 image just skip it
                    return { originalIndex: index, imageUrl: variant.imageUrl, status: "skipped" };
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
    private async saveImageToFirebase({ index, dataUrl, productID }: { index: number, dataUrl: string, productID: string }): Promise<string> {

        const filename = `product-images/${productID}/variant-image-${index}`;

        const imageRef = ref(storage, filename);

        try {

            console.log(dataUrl);

            await uploadString(imageRef, dataUrl, "data_url");

            const downloadUrl = await getDownloadURL(imageRef);

            return downloadUrl

        } catch (e) {
            console.log('Firebase error', e)

            // we returned data url for update
            return "";
        }
    }

}


export default SaveProductServices;