'use client';

import { ProductProps } from '@/app/lib/models/productModel'
import { posSelectProduct } from '@/app/lib/redux/posSlice';
import { checkDiscountExpiration } from '@/app/lib/utils/services/checkDiscountExpirationDate';
import Image from 'next/image';
import React from 'react'
import { useDispatch } from 'react-redux';

interface Prop {
    data: ProductProps,
}
const PosProductTile = ({ data }: Prop) => {

    const dispatch = useDispatch();

    return (
        <div className='w-full min-h-[17rem] h-[17rem] bg-[var(--product-card-bg)] rounded-[12px] flex flex-col p-4 relative text-center gap-2 overflow-hidden
        '>

            {/** image container */}
            <div className='w-full min-h-[10rem] max-h-[10rem] bg-[var(--tertiary)] overflow-hidden rounded-[7px]'>
                {data.coverImage && <img src={data.coverImage} loading='lazy' alt='cover image' className='w-full h-full object-fill' />}
            </div>

            <span className='text-[.8rem]'>{data.name}</span>
            <div className='flex-1' />
            <span className='font-semibold text-[var(--color-brand-primary)]'>Php {data.sellingPrice}</span>

            {/** discount  */}
            {data.promotionalDiscount && checkDiscountExpiration(data.promotionalDiscount.expirationDate) && <div className='button-primary-gradient h-fit rounded-[7px] p-[5px_7px] flex-1 flex justify-end pr-2 absolute top-2 right-2'>
                {<span className='font-semibold italic'>{data.promotionalDiscount.discountRate}% OFF</span>}
            </div>}

            {/** overlay for on click function */}
            <div className='absolute  inset-1'
                onClick={() => dispatch(posSelectProduct(data))}
            />

            {data.stock <= 0 && <div className='absolute inset-0 bg-gray-700 opacity-80 grid place-content-center justify-center'>
                <div className='flex flex-col justify-center items-center gap-3 -translate-y-6'>
                    <Image alt='out of stock' src="/out-of-stock.png" width={64} height={64} />
                    <span className='text-black'>Out of stock</span>
                </div>
            </div>}

            {!data.isActive && <div className='absolute inset-0 bg-gray-700 opacity-80 grid place-content-center justify-center'>
                <div className='flex flex-col justify-center items-center gap-3 -translate-y-6'>
                    <Image alt='out of stock' src="/ban-circle-symbol.png" width={64} height={64} />
                    <span className='text-black'>Product is inActive</span>
                </div>
            </div>}
        </div>
    )
}


export default PosProductTile
