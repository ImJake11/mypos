"use client";

import CircularLoadingIndicator from '@/app/lib/components/CircularLoadingIndicator';
import ToasEnum from '@/app/lib/enum/toastEnum';
import { toggleCategoryTab } from '@/app/lib/redux/productSlice';
import { RootState } from '@/app/lib/redux/store';
import { openToas } from '@/app/lib/redux/toastSlice';
import { storage } from '@/app/lib/utils/db/firebase';
import { generateImageStringUrl } from '@/app/lib/utils/services/convertImageFileToString';
import { getDownloadURL, ref, uploadBytes, uploadString } from 'firebase/storage';
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const NewCategoryTab = () => {

    const dispatch = useDispatch();

    const { showCategoryTab, categoryUpdateData } = useSelector((state: RootState) => state.productSlice);

    const [newCategory, setNewCategory] = useState<string>("");
    const [newImage, setNewImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [isUpdate, setIsUpdate] = useState(false);


    const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setNewImage(file);

        generateImageStringUrl({
            dispatch, file: file,
        }).then((dataUrl: string) => {
            setImagePreview(dataUrl);

        }).catch(() => {
            setImagePreview("");
        })
    }

    const handleSave = async () => {

        const imageId = categoryUpdateData.imageId ?? uuidv4();
        let imageDownloadUrl: string | undefined = categoryUpdateData.url ?? "";

        setIsLoading(true);
        // -- 1. check newImage file if its not null
        // if it is not null it means use attached a new photo

        if (newImage) {
            imageDownloadUrl = await handleImageUpload(imageId);
        }

        // --2. send data to db
        const id = await handleApiCall(imageId, imageDownloadUrl);

        // --- 4. reset category
        setNewCategory("");
        setIsLoading(false);

        // --- 5. close category tab
        dispatch(toggleCategoryTab(null));

        // --- .6 display toas message
        dispatch(openToas({ message: "Category process successfull", type: ToasEnum.SUCCESS }))
    }

    const handleApiCall = async (imageId: string, imageUrl: string) => {

        const res = await fetch("/api/category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: newCategory,
                id: categoryUpdateData.id,
                url: imageUrl,
                imageId: imageId,
            })
        });

        if (!res.ok) {
            setIsLoading(false);
            dispatch(openToas({
                message: res.statusText,
                type: ToasEnum.ERROR,
            }))
            throw new Error(res.statusText);
        };

    }

    const handleImageUpload = async (id: string) => {
        const filename = `category-image/${id}/${newImage?.name}`;

        const imageRef = ref(storage, filename);
        console.log("Uploading image")

        if (!newImage) {

            dispatch(openToas({
                message: "No image to upload",
                type: ToasEnum.ERROR,
            }))
            throw new Error("No image file selected for upload");
        }

        try {

            const snapshot = await uploadBytes(imageRef, newImage);
            console.log("Image uploaded succesfull", snapshot);

            const imageUrl = await getDownloadURL(snapshot.ref);
            console.log("successfully retrieve download url", imageUrl)

            return imageUrl;

        } catch (e) {

            dispatch(openToas({
                message: "Uable to upload category image",
                type: ToasEnum.ERROR,
            }));

            throw new Error("Firebase image error");
        }
    }

    useEffect(() => {
        if (categoryUpdateData.id) {
            setNewCategory(categoryUpdateData.content);
            setImagePreview(categoryUpdateData.url ?? "");
        }

        return () => {
            // clean up the state
            setImagePreview("");
            setNewImage(null);
            setNewCategory("");
        }
    }, [categoryUpdateData]);


    if (!showCategoryTab) return null;

    return (
        <div className='w-screen h-screen absolute backdrop-blur-[2px]'
            style={{
                backgroundColor: "rgba(0,0,0, .8)"
            }}
        >
            <div className='absolute flex p-[20px_15px] w-[90vw] gap-3.5 h-fit rounded-[7px] right-3 bottom-3 md:w-[40vw]'
                style={{
                    backgroundColor: "var(--main-bg-primary-dark)",
                    border: "solid 1px var(--primary)"
                }}
            >

                <div className='flex flex-col gap-4'>
                    <span className='italic font-semibold '>New Category</span>

                    {/** image container */}
                    <div className='w-[10rem] h-[10rem] rounded-[7px] bg-[var(--main-bg-secondary-dark)] relative overflow-hidden'>
                        {imagePreview && <img src={imagePreview} alt="category image" className=' w-full h-full object-cover absolute' />}
                        <input type="file" accept='image/**' className='h-full w-full opacity-0 absolute'
                            onChange={handleImageInput}
                        />
                    </div>
                </div>

                <div className='flex flex-1 flex-col w-full'>
                    <div className='h-[3rem]' />
                    <input type="text" value={newCategory} className='tf-attr h-[3rem] p-3'
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {

                            if (e.key === "Enter") {
                                handleSave()
                            }

                        }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const { value } = e.target;

                            setNewCategory(value);
                        }}
                    />
                    <div className='flex-1' />
                    <div className='flex w-full justify-end gap-2.5'>
                        <button className='w-[6rem] h-[3rem] rounded-[var(--button-border-radius)] '
                            style={{
                                border: "solid 1px var(--foreground)"
                            }}
                            onClick={() => dispatch(toggleCategoryTab(null))}
                        >Cancel</button>
                        {isLoading ? <div className='w-[6rem] h-[3rem] button-primary-gradient rounded-[var(--button-border-radius)] grid place-content-center'>
                            <CircularLoadingIndicator size={32} />
                        </div> :
                            <button className='button-primary-gradient w-[6rem] h-[3rem] rounded-[var(--button-border-radius)] ' onClick={handleSave} >Save</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewCategoryTab
