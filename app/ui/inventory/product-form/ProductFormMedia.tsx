"use client";

import ToasEnum from '@/app/lib/enum/toastEnum';
import { ProductProps } from '@/app/lib/models/productModel';
import { formUpdateState } from '@/app/lib/redux/slice/productSlice';
import { RootState } from '@/app/lib/redux/store';
import { openToas } from '@/app/lib/redux/slice/toastSlice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from './components/ProductFormErrorMessage';
import { ProductKeys } from '@/app/lib/constants/ProductKeys';
import ProductFormCard from './components/ProductFormCard';

const UploadMedia = () => {

    const dispatch = useDispatch();

    const { coverImage } = useSelector((state: RootState) => state.productSlice.data);

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            const imageString = reader.result as string;

            const name = ProductKeys.coverImage as keyof ProductProps;

            dispatch(formUpdateState({ data: imageString, name }));
        }

        reader.onerror = () => {
            dispatch(openToas({ message: "Load image error", type: ToasEnum.ERROR }))
        }

        reader.readAsDataURL(file);
    }

    return (
        <ProductFormCard>
            <div className='flex flex-col w-full gap-3 p-[var(--form-section-padding)] rounded-[11px] bg-[var(--main-bg-primary)]'
            >
                <span className='italic font-semibold '>Product Media</span>
                <ErrorMessage isShow={!coverImage} message='Cover image is required' />
                <div className='flex w-full gap-2.5'>

                    {/** cover photo */}
                    <div className='w-[10rem] h-[10rem]  rounded-[11px] relative cursor-pointer overflow-hidden border border-gray-400'>
                        <span className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full text-center'>Cover Photo</span>
                        {coverImage && <img src={coverImage} alt='cover image' className='w-full h-full absolute' />}
                        <input type='file' accept='image/**' className='opacity-0 h-full w-full' onChange={handleImage} />
                    </div>
                </div>
            </div>
        </ProductFormCard>
    );
}

export default UploadMedia
