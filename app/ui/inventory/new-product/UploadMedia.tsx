"use client";

import { NewProductKeys } from '@/app/lib/constants/NewProductKeys';
import ToasEnum from '@/app/lib/enum/toastEnum';
import { NewProductProps } from '@/app/lib/models/newProductModel';
import { updateNewProductState } from '@/app/lib/redux/newProductSlice';
import { RootState } from '@/app/lib/redux/store';
import { openToas } from '@/app/lib/redux/toastSlice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from './components/ErrorMessage';

const UploadMedia = () => {

    const dispatch = useDispatch();

    const { coverImage } = useSelector((state: RootState) => state.newProductSlice.data);

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            const imageString = reader.result as string;

            const name = NewProductKeys.coverImage as keyof NewProductProps;

            dispatch(updateNewProductState({ data: imageString, name }));
        }

        reader.onerror = () => {
            dispatch(openToas({ message: "Load image error", type: ToasEnum.ERROR }))
        }

        reader.readAsDataURL(file);
    }
    return (
        <div className='flex flex-col w-full gap-3 p-[20px_10px] rounded-[11px]'
            style={{
                backgroundColor: "var(--background)"
            }}
        >
            <span className='italic font-semibold '>Product Media</span>
            <ErrorMessage isShow={!coverImage} message='Cover image is required' />
            <div className='flex w-full gap-2.5'>

                {/** cover photo */}
                <div className='w-[10rem] h-[10rem]  rounded-[11px] relative cursor-pointer overflow-hidden'
                    style={{
                        border: "solid 1px var(--secondary-foreground)"
                    }}
                >
                    <span className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full text-center'>Cover Photo</span>
                    {coverImage && <img src={coverImage} alt='cover image' className='w-full h-full absolute' />}
                    <input type='file' accept='image/**' className='opacity-0 h-full w-full' onChange={handleImage} />
                </div>
            </div>
        </div>
    );
}

export default UploadMedia
