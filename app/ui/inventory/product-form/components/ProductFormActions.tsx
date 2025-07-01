"use client";

import ToasEnum from '@/app/lib/enum/toastEnum';
import { VariantsProps } from '@/app/lib/models/productModel';
import { resetProcessDialogState, toggleProcessDialog, updateProcessDialogCurrentValue, updaterPocessDialogMessage } from '@/app/lib/redux/processSlice';
import { resetProductState } from '@/app/lib/redux/productSlice';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import { openToas } from '@/app/lib/redux/toastSlice';
import SaveNewProduct from '@/app/ui/inventory/product-form/services/ProductFormServices';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from "uuid";

const btnStyles = "w-fit min-h-[3rem]  rounded-[7px] p-[10px_15px]";

const Actions = () => {
    const router = useRouter();

    const dispatch = useDispatch<AppDispatch>();
    const productSlice = useSelector((state: RootState) => state.productSlice);

    const productData = productSlice.data;

    const productServices = useMemo(() => {
        return new SaveNewProduct({
            productData: productData,
        });
    }, [productData]);


    const handleProcessDialogState = (
        message: string,
        value: number,
    ) => {
        dispatch(updaterPocessDialogMessage(message));
        dispatch(updateProcessDialogCurrentValue(value))
    }


    // handle save product 
    const handleSaveProduct = async (isSaveOnly: boolean) => {

        dispatch(resetProcessDialogState());
        dispatch(toggleProcessDialog());
        handleProcessDialogState("Validating data", 10);

        if (!productServices.isFormValid()) {
            dispatch(openToas({
                message: "Publishing product failed",
                type: ToasEnum.ERROR
            }));

            return;
        }

        // generate id for cover photo
        const coverImageId = uuid();

        handleProcessDialogState("Uploading cover photo", 15);
        // 1. upload cover photo
        const coverPhotoUrl = await productServices.uploadCoverPhoto({ dataUrl: productData.coverImage, imageId: coverImageId });

        handleProcessDialogState("Processing product data", 30);
        // 2. then update the cover photo in raw data
        const updatedRawData = { ...productData, coverPhotoUrl: coverPhotoUrl, coverImageId };

        handleProcessDialogState("Processing product data", 55);
        // 3. upload raw data of products
        const productID = await productServices.createProduct({ data: updatedRawData });

        if (!productID) return;

        handleProcessDialogState("Processing product data", 70);
        // 4. upload vairiat to firebase
        const updatedVariants = await productServices.uploadVariants({
            id: productID,
        });

        handleProcessDialogState("Processing product data", 90);
        // 5. then add it to database
        await productServices.createVariant(updatedVariants, productID);

        handleProcessDialogState("Finalizing..", 100);
        dispatch(openToas({
            message: "Product saved successfully",
            type: ToasEnum.SUCCESS,
        }));
        // 6. reset form state
        dispatch(resetProductState());

        dispatch(toggleProcessDialog());
        //7. then redirect to inventory if save only
        if (isSaveOnly) {
            setTimeout(() => {
                router.push('/ui/inventory')
            }, 1000);
        }

    }

    const handleUpdateProduct = async () => {

        const coverImageId = uuid();

        dispatch(resetProcessDialogState());
        dispatch(toggleProcessDialog());
        handleProcessDialogState("Validating data", 10);
        console.log("Validating form data")
        if (!productServices.isFormValid()) {
            dispatch(openToas({
                message: "Updating product failed",
                type: ToasEnum.ERROR
            }));
            return;
        }

        handleProcessDialogState("Uploading cover photo", 25);

        // 1. upload cover photo
        // if cover image id is not exisiting pass new id

        //-- check the product data image url is starts with data:
        // -- if its not means user put new image 
        // -- therefore we need to proceed to upload the image to firebase
        let coverPhotoUrl: string = productData.coverImage;

        console.log("Uploading cover photo");
        if (productData.coverImage.startsWith("data:")) {
            coverPhotoUrl = await productServices.uploadCoverPhoto({ dataUrl: productData.coverImage, imageId: productData.coverImageId ?? coverImageId });
        }

        handleProcessDialogState("Processing product data", 50);
        // 2. then update the cover photo in raw data
        const updatedRawData = { ...productData, coverPhotoUrl: coverPhotoUrl };
        console.log("Raw data updated");

        handleProcessDialogState("Processing product data", 70);
        //3. upload product variants 
        const updatedVariants: VariantsProps[] = await productServices.uploadVariants({
            id: productData.id ?? '',
        });
        console.log("updated variants retrieved");

        handleProcessDialogState("Processing product data", 85);

        //4. update variants in rawData
        updatedRawData.variants = updatedVariants.map(variant => ({
            isArchived: variant.isArchived,
            imageUrl: variant.imageUrl,
            isPositive: variant.isPositive,
            name: variant.name,
            price: variant.price,
            stock: variant.stock,
            id: variant.id ?? "",
            details: variant.details,
        }));
        console.log("raw data variants updated")


        handleProcessDialogState("Processing product data", 90);
        console.log("Uploading raw data")
        // 4. update product data
        await productServices.updateProduct(updatedRawData);
        console.log("Upload raw data successfully")

        handleProcessDialogState("Finalizing..", 100);

        dispatch(openToas({
            message: "Product updated successfully",
            type: ToasEnum.SUCCESS,
        }));
        dispatch(toggleProcessDialog())
        // redirect to inventory
        setTimeout(() => {
            router.push('/ui/inventory')
        }, 1000);
    }

    return (
        <div className='w-full flex justify-end mt-14 gap-2'>
            <button className={` ${btnStyles}`}
                style={{
                    border: "solid 1px"
                }}
            >Cancel</button>

            {!productSlice.isForUpdate &&

                <button className={`${btnStyles} ${productServices.isFormValid() ? "button-primary-gradient" : "button-primary-disabled-gradient"}`}
                    onClick={() => { handleSaveProduct(false) }}
                >Save & Add Another</button>

            }

            <button className={`${btnStyles} ${productServices.isFormValid() ? "button-primary-gradient" : "button-primary-disabled-gradient"}`}

                onClick={() => {

                    if (productData.id) {
                        handleUpdateProduct();
                    } else {
                        handleSaveProduct(true)
                    }
                }}
            >{productSlice.isForUpdate ? "Update" : "Save"}</button>
        </div>
    )
}

export default Actions
