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
        <div className='w-full min-h-[20rem] max-h-[20rem] bg-[var(--product-card-bg)] rounded-[12px] flex flex-col p-4 relative text-center
        gap-2
        '>

            {/** image container */}
            <div className='w-full min-h-[10rem] max-h-[10rem] bg-[var(--tertiary)] overflow-hidden rounded-[7px]'>
                {data.coverImage && <img src={data.coverImage} alt='cover image' className='w-full h-full object-fill' />}
            </div>

            <span>{data.name}</span>
            <div className='flex-1'/>
            <span className='font-semibold text-[var(--color-brand-primary)]'>Php {data.sellingPrice}</span>

            {/** actions */}

            {/** discount  */}
            {discountRate > 0 && <div className='button-primary-gradient h-fit rounded-[7px] p-[5px_7px] flex-1 flex justify-end pr-2 absolute top-2 right-2'>
                {<span className='font-semibold italic'>{discountRate}% OFF</span>}
            </div>}x

            {/** overlay for on click function */}
            <div className='absolute  inset-1'
                onClick={() => dispatch(posSelectProduct(data))}
            />
        </div>
    )
}


export default PosProductTile
