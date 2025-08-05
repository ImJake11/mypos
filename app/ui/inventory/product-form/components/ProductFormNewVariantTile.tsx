"use client";

import ToasEnum from '@/app/lib/enum/toastEnum';
import { VariantsProps } from '@/app/lib/models/productModel';
import { formDeleteVariant, formUpdateVariants } from '@/app/lib/redux/slice/productSlice';
import { openToas } from '@/app/lib/redux/slice/toastSlice';
import { ProductActionEnums } from '@/app/lib/redux/utils/enums/productActionEnums';
import { generateImageStringUrl } from '@/app/lib/utils/services/convertImageFileToString';
import React from 'react'
import { VariantKeys } from '@/app/lib/constants/ProductKeys';
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { IconCaretDownFilled, IconCaretUpFilled, IconColumnRemove, IconRowRemove, IconTrashFilled } from '@tabler/icons-react';

interface Prop {
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

const NewVariantTile = ({ index, data, sellingPrice }: Prop) => {
    const appDispatch = useDispatch();

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

    const imageContainer = (
        <div className={`h-[4rem] w-[4rem] rounded-[4px] relative border cursor-pointer overflow-hidden 
                 ${generateBorderColor(imageUrl !== "")}`}>
            <span className='absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 text-gray-500'>Pick Image</span>
            {imageUrl && <img src={imageUrl} alt="variant image" className='w-full h-full absolute' />}
            <input type="file" accept='image/*' className='inset-1 absolute opacity-0' onChange={handleImage} />

        </div>
    );

    const variantName = (
        <div className='flex-2 flex flex-col'>
            <span>Name</span>
            <input type="text" value={name} className={`border h-[2.5rem] w-full rounded-[4px] p-2
            ${generateBorderColor(name !== "")}
            `}
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
    )

    const variantDetails = (
        <div className='w-full flex flex-col'>
            <span>Details</span>
            <textarea value={details ?? ""} className={`w-full max-h-[7rem] min-h-[7rem] border rounded-[4px] box-border p-2
             ${generateBorderColor(true)}
            `}
                placeholder='ex. Color: red, Size: large'
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {

                    const { value } = e.target;

                    const name = VariantKeys.details as keyof VariantsProps;

                    appDispatch(formUpdateVariants({ data: value, name, index }))
                }}
            />
        </div>
    )

    const priceAdjustment = (
        <div className='w-full flex flex-col'>
            <span>Price Adjustment</span>
            <div className={`flex-1 relative flex items-center min-h-[2.5rem] border rounded-[4px] 
        ${generateBorderColor(price >= 0)}`}>
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
                <IconCaretUpFilled size={20} className='absolute right-2 top-1 fill-[var(--color-brand-primary)]' onClick={handlePriceSign} />
                <IconCaretDownFilled size={20} className='fill-gray-400 absolute bottom-1 right-2' onClick={handlePriceSign} />
                <span className='font-semibold text-[1.5rem] absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500'>{isPositive ? "+" : "-"}</span>
            </div>
        </div>
    )

    const stocking = (
        <div className={`w-full flex flex-col`}>
            <span>Stock</span>
            <input value={String(stock)} type="text" maxLength={5} inputMode='numeric' className={`p-2 h-[2.5rem] border rounded-[4px] w-full
            ${generateBorderColor(stock > 0)}
            `}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const { value } = e.target;

                    const convertedKey = VariantKeys.stock as keyof VariantsProps;

                    const isNan = isNaN(Number(value));

                    if (isNan) return;

                    appDispatch(formUpdateVariants({ data: Number(value), index, name: convertedKey }))
                }}
            />
        </div>
    )

    const total = (
        <div className={`h-[2.5rem] flex gap-1 items-center`}>
            <span>Total: </span>
            <span className='text-gray-400'>Php {generateTotal()}</span>
        </div>
    )

    return (
        <div className={`w-full flex items-start flex-col gap-3 border border-gray-300 p-3 rounded-[4px]`}>
            <span className='text-right font-semibold w-full text-gray-400'>Variant {index + 1}</span>
            <div className='w-full flex gap-3 items-end'>
                {imageContainer}
                {variantName}
            </div>

            {/** variant details */}
            {variantDetails}
            {/** price adjustment */}
            {priceAdjustment}
            {/** stock */}
            {stocking}
            {/** total */}

            <div className='w-full flex justify-between items-center'>
                {total}
                {isForUpdate ? <div className={`cursor-pointer p-[10px_15px] rounded-[4px] text-white ${data.isArchived ? "bg-[var(--color-brand-primary)]" : "bg-red-500"}`}
                    onClick={handleVariantAction}
                >{isArchived ? "UnArchive" : "Archive"}</div> :
                    <button className='flex gap-2 px-2 py-1.5 bg-red-500 rounded-[4px] text-white items-center'
                        onClick={() => appDispatch(formDeleteVariant(index))}
                    >
                        <span>Remove</span>
                        <IconColumnRemove className='text-[1.5rem] w-[1.5rem] h-[1.5rem]' />
                    </button>
                }
            </div>
        </div>
    )

}


export default NewVariantTile
