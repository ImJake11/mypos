'use client';

import { ProductProps } from '@/app/lib/models/productModel'
import { posSelectProduct } from '@/app/lib/redux/slice/posSlice';
import { checkDiscountExpiration } from '@/app/lib/utils/services/checkDiscountExpirationDate';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { motion } from "framer-motion";
import { IconBan } from '@tabler/icons-react';


interface Prop {
    data: ProductProps,
    index: number,
}
const PosProductTile = React.memo(({ data, index }: Prop) => {
    const [isImageLoad, setIsImageLoad] = useState(false);
    const [imgSrc, setImageSrc] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        const img = new Image();
        img.src = data.coverImage;

        img.onload = () => {
            setImageSrc(data.coverImage);
            setIsImageLoad(true);
        }
    }, [data.coverImage]);

    return (
        <motion.div className='w-full min-h-[13rem] h-[15rem] bg-[var(--main-bg-primary)] dark:bg-[var(--main-bg-primary-dark)] rounded-[8px] flex flex-col relative text-center gap-1.5 shadow-[1px_1px_5px_rgb(0,0,0,.2)] dark:shadow-[1px_1px_5px_rgb(0,0,0,.5)] overflow-hidden hover:shadow-[1px_1px_5px_rgb(0,0,0,.8)]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: index * .25, duration: .3 }}
        >

            {/** image container */}
            <div className='h-[7rem] w-full p-2'>
                <div className='w-full h-full overflow-hidden rounded-[7px]'>
                    {imgSrc && isImageLoad ? <img src={data.coverImage} loading='lazy' alt='cover image' className='w-full h-full object-fill' /> : <div className='w-full h-full grid place-content-center bg-gray-100 dark:bg-gray-500 text-gray-300'>
                        Nexustock</div>}
                </div>
            </div>

            <span>{data.name}</span>
            <span className='font-semibold text-[var(--color-brand-primary)] text-[1rem]'>{Number(data.sellingPrice).toLocaleString('en-US', { style: "currency", currency: "PHP" })}</span>
            <div className='flex-1' />
            <button className='h-[2rem] bg-[var(--color-brand-primary)] text-white'>Add To Cart</button>

            {/** discount  */}
            {data.promotionalDiscount && checkDiscountExpiration(data.promotionalDiscount.expirationDate) && <div className='button-primary-gradient h-fit rounded-[7px] p-[5px_7px] flex-1 flex justify-end pr-2 absolute top-2 right-2'>
                {<span className='font-semibold italic'>{data.promotionalDiscount.discountRate}% OFF</span>}
            </div>}

            {/** overlay for on click function */}
            <div className='absolute inset-1'
                onClick={() => dispatch(posSelectProduct(data.id!))}
            />



            {data.stock <= 0 && <div className='absolute inset-0 bg-gray-900/80 grid place-content-center justify-center'>
                <div className='flex justify-center items-center gap-2 -rotate-45'>
                    <IconBan color='red' size={16} />
                    <span className='text-red-500 font-[600]'>Out of Stock</span>
                </div>
            </div>}

            {!data.isActive && <div className='absolute inset-0 bg-gray-900/80 grid place-content-center justify-center'>
                <div className='flex justify-center items-center gap-2 -rotate-45'>
                    <IconBan color='red' size={16} />
                    <span className='text-red-500 font-[600]'>Unavailable</span>
                </div>
            </div>}
        </motion.div>
    )
})


export default PosProductTile
