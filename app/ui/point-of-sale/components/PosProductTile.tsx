'use client';

import { ProductProps } from '@/app/lib/models/productModel'
import { posSelectProduct } from '@/app/lib/redux/slice/posSlice';
import { checkDiscountExpiration } from '@/app/lib/utils/services/checkDiscountExpirationDate';
import Image from 'next/image';
import React from 'react'
import { useDispatch } from 'react-redux';
import {motion} from "framer-motion";


interface Prop {
    data: ProductProps,
}
const PosProductTile = ({ data }: Prop) => {

    const dispatch = useDispatch();

    return (
        <motion.div className='w-full min-h-[13rem] h-[13rem] bg-[var(--main-bg-primary)] rounded-[12px] flex flex-col p-2 relative text-center gap-2 shadow-[1px_1px_5px_rgb(0,0,0,.2)]'

        whileHover={{
            boxShadow: "1px 1px 5px rgb(0,0,0,.4)",
        }}
        >

            {/** image container */}
            <div className='w-full min-h-[7rem] max-h-[7rem] bg-[var(--tertiary)] overflow-hidden rounded-[7px]'>
                {data.coverImage && <img src={data.coverImage} loading='lazy' alt='cover image' className='w-full h-full object-fill' />}
            </div>

            <span className='text-[.8rem]'>{data.name}</span>
            <div className='flex-1' />
            <span className='font-semibold text-[var(--color-brand-primary)]'>{Number(data.sellingPrice).toLocaleString('en-US', { style: "currency", currency: "PHP" })}</span>

            {/** discount  */}
            {data.promotionalDiscount && checkDiscountExpiration(data.promotionalDiscount.expirationDate) && <div className='button-primary-gradient h-fit rounded-[7px] p-[5px_7px] flex-1 flex justify-end pr-2 absolute top-2 right-2'>
                {<span className='font-semibold italic'>{data.promotionalDiscount.discountRate}% OFF</span>}
            </div>}

            {/** overlay for on click function */}
            <div className='absolute inset-1'
                onClick={() => dispatch(posSelectProduct(data.id!))}
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
        </motion.div>
    )
}


export default PosProductTile
