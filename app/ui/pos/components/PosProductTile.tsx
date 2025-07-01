'use client';

import { ProductProps } from '@/app/lib/models/productModel'
import { posSelectProduct } from '@/app/lib/redux/posSlice';
import React from 'react'
import { useDispatch } from 'react-redux';
interface Prop {
    data: ProductProps,
}
const PosProductTile = ({ data }: Prop) => {

    const dispatch = useDispatch();

    const { discountRate } = data.promotionalDiscount;

    return (
        <div className='w-full h-[15rem] bg-[var(--product-card-bg)] rounded-[11px] flex flex-col p-2 relative text-center
        gap-2
        '>

            {/** image container */}
            <div className='aspect-square bg-[var(--tertiary)] overflow-hidden rounded-[7px]'>
                {data.coverImage && <img src={data.coverImage} alt='cover image' className='w-full h-full object-cover' />}
            </div>

            <span>{data.name}</span>
            <span className='font-semibold text-[var(--color-brand-primary)]'>Php {data.sellingPrice}</span>

            {/** actions */}

            {/** discount  */}
            {discountRate > 0 && <div className='button-primary-gradient h-fit rounded-[7px] p-[5px_7px] flex-1 flex justify-end pr-2 absolute top-2 right-2'>
                {<span className='font-semibold italic'>{discountRate}% OFF</span>}
            </div>}

            {/** overlay for on click function */}
            <div className='absolute  inset-1'
                onClick={() => dispatch(posSelectProduct(data))}
            />
        </div>
    )
}


export default PosProductTile
