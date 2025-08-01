"use client";

import ToasEnum from '@/app/lib/enum/toastEnum';
import { VariantsProps } from '@/app/lib/models/productModel';
import { formDeleteVariant, formUpdateVariants } from '@/app/lib/redux/slice/productSlice';
import { AppDispatch } from '@/app/lib/redux/store';
import { openToas } from '@/app/lib/redux/slice/toastSlice';
import { ProductActionEnums } from '@/app/lib/redux/utils/enums/productActionEnums';
import { generateImageStringUrl } from '@/app/lib/utils/services/convertImageFileToString';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { VariantKeys } from '@/app/lib/constants/ProductKeys';
import { useSearchParams } from 'next/navigation';

interface Prop {
    appDispatch: AppDispatch,
    index: number,
    data: VariantsProps,
    sellingPrice: number, // main product price 
}

// validation border color
function generateBorderColor(condition: boolean) {

    if (condition) {
        return "border-[var(--color-brand-primary)]";
    }

    return "border-red-400";
}

const NewVariantTile = ({ appDispatch, index, data, sellingPrice }: Prop) => {

    const params = useSearchParams();

    const { isPositive, imageUrl, name, price, stock, isArchived, details } = data;

    const isForUpdate = params.get("product-id");

    // generate total of the variant base on price adjustment value
    function generateTotal() {

        // convert price adjustment to decimal
        const convertedPrice = price / 100;

        // calculate the total
        const subTotal = sellingPrice * convertedPrice;

        const total = isPositive ? (sellingPrice + subTotal) : (sellingPrice - subTotal);

        return total;
    }


    // -- handles the image input
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];

        // check if file is empty means user did not choose file
        if (!file) return;

        // read the file as data url for image preview
        generateImageStringUrl({
            file, dispatch: appDispatch,
        }).then((dataUrl: string) => {
            appDispatch(formUpdateVariants({
                data: dataUrl,
                index,
                name: VariantKeys.imageUrl as keyof VariantsProps,
            }));
        }).catch(() => {
            appDispatch(openToas({
                message: "Unable to load image preview",
                type: ToasEnum.ERROR,
            }))
        })

    }

    const handlePriceSign = () => {

        const name = VariantKeys.isPositive as keyof VariantsProps;

        appDispatch(formUpdateVariants({ data: !isPositive, index: index, name }));
    }

    const handleVariantAction = () => {

        const name = VariantKeys.isArchived as keyof VariantsProps;

        const promptMessage = data.isArchived ? "Are you sure you want to unarchive this variant?" : "Are you sure you want to archive this variant?";

        appDispatch(openToas({
            message: promptMessage,
            type: ToasEnum.CONFIRMATION,
            context: ProductActionEnums.UPDATE_VARIANT,
            payload: {
                name, index, data: !data.isArchived,
            }
        }));

    }

    return (
        <div className='w-full flex mt-3 items-start gap-1'>
            {/** image */}
            <div className='flex-1'>

                <div className={`h-[7rem] w-full rounded-[7px] relative border ${generateBorderColor(imageUrl !== "")} cursor-pointer overflow-hidden`}>
                    <span className='absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 text-gray-500'>Pick Image</span>
                    {imageUrl && <img src={imageUrl} alt="variant image" className='w-full h-full absolute' />}
                    <input type="file" accept='image/*' className='inset-1 absolute opacity-0' onChange={handleImage} />

                </div>
            </div>

            {/** name */}
            <div className='flex-2'>
                <input type="text" value={name} className={`border ${generateBorderColor(name !== "")} h-[3rem] w-full rounded-[7px] p-2`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                        const { value } = e.target;

                        const convertedKey = VariantKeys.name as keyof VariantsProps;

                        appDispatch(formUpdateVariants({
                            data: value,
                            index,
                            name: convertedKey,
                        }))
                    }}
                />
            </div>

            {/** variant details */}
            <div className='flex-2 flex items-end'>
                <textarea value={details ?? ""} className={`w-full max-h-[7rem] min-h-[7rem] border ${generateBorderColor(true)} rounded-[7px] box-border p-2`}
                    placeholder='ex. Color: red, Size: large'
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {

                        const { value } = e.target;

                        const name = VariantKeys.details as keyof VariantsProps;

                        appDispatch(formUpdateVariants({ data: value, name, index }))
                    }}
                />
            </div>


            {/** price adjustment */}
            <div className={`flex-1 relative grid h-[3rem] border ${generateBorderColor(price >= 0)} rounded-[7px]`}>
                <input type="text" maxLength={3} className='border-none h-full w-full p-[0_30px] outline-none'
                    inputMode='numeric'
                    value={String(price)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const { value } = e.target;

                        const name = VariantKeys.price as keyof VariantsProps;

                        const isNan = isNaN(Number(value));

                        if (isNan) return;

                        appDispatch(formUpdateVariants({ data: Number(value), index, name }));
                    }}
                />
                {/** arrows */}
                <i className={`ri-arrow-up-s-fill absolute right-2.5 top-1 text-[2rem] -translate-y-[.8rem] ${isPositive ? "text-[var(--primary)]" : "text-gray-300"}`} onClick={handlePriceSign} />
                <i className={`ri-arrow-down-s-fill absolute right-2.5 bottom-0 text-[2rem] translate-y-[.5rem] ${!isPositive ? "text-[var(--primary)]" : "text-gray-300"}`} onClick={handlePriceSign} />
                <span className='font-semibold text-[1.5rem] absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500'>{isPositive ? "+" : "-"}</span>

            </div>

            {/** stock */}
            <div className='flex-1 grid place-content-center'>
                <input value={String(stock)} type="text" maxLength={5} inputMode='numeric' className={`p-2 h-[3rem] border ${generateBorderColor(stock > 0)} rounded-[7px] w-full`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const { value } = e.target;

                        const convertedKey = VariantKeys.stock as keyof VariantsProps;

                        const isNan = isNaN(Number(value));

                        if (isNan) return;

                        appDispatch(formUpdateVariants({ data: Number(value), index, name: convertedKey }))
                    }}
                />
            </div>

            {/** total */}
            <div className='flex-1 grid place-content-center h-[3rem]'>
                <span className='text-gray-400'>Php {generateTotal()}</span>
            </div>

            {/** actions */}
            <div className='flex-1 grid place-content-center'>

                {/** delete */}
                {isForUpdate ? <div className={`cursor-pointer p-[10px_15px] rounded-[7px] text-white ${data.isArchived ? "button-primary-gradient" : "button-primary-gradient-error"}`}
                    onClick={handleVariantAction}
                >{isArchived ? "UnArchive" : "Archive"}</div> :
                    <FontAwesomeIcon icon={faTrash} className='text-[1.5rem] text-red-500 ' onClick={() => appDispatch(formDeleteVariant(index))} />
                }
            </div>
        </div>
    )

}

export default NewVariantTile
