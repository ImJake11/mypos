'use client';

import React from 'react'
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/lib/redux/store';
import { openToas } from '@/app/lib/redux/slice/toastSlice';
import ToasEnum from '@/app/lib/enum/toastEnum';
import { ProductActionEnums } from '@/app/lib/redux/utils/enums/productActionEnums';
import { ProductProps } from '@/app/lib/models/productModel';
import { formUpdateState } from '@/app/lib/redux/slice/productSlice';
import { ProductKeys } from '@/app/lib/constants/ProductKeys';
import { useSearchParams } from 'next/navigation';
import ProductFormCard from './components/ProductFormCard';

const ProductFormStatus = () => {
    const dispatch = useDispatch();

    const searchParams = useSearchParams();

    const productID = searchParams.get('product-id');

    const isActive = useSelector((state: RootState) => state.productSlice.data.isActive);

    function handleFunction(): void {
        if (!productID) {
            dispatch(formUpdateState({
                data: !isActive,
                name: ProductKeys.isActive as keyof ProductProps
            }))
        } else {

            if (isActive) {
                dispatch(openToas({
                    message: "Are you sure you want to deactivate this product? It will no longer be visible or available for transactions in the POS system.",
                    type: ToasEnum.CONFIRMATION,
                    context: ProductActionEnums.CONFIRM_PRODUCT_DEACTIVATION,
                    payload: {
                        data: false
                    },
                }));
            }
            else {
                dispatch(formUpdateState({
                    data: true,
                    name: ProductKeys.isActive as keyof ProductProps
                }))
            }
        }
    }

    return (
        <div className='flex gap-3 w-full justify-end pr-1 items-center'>
            <span>{isActive ? "Activated" : "Deactivated"}</span>
            <div className='w-[4rem] h-[2rem] relative'>
                <motion.div className={`${isActive ? "bg-linear-120 from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)]" : "bg-linear-to-l from-gray-300 to-gray-400"}  w-full h-full rounded-full absolute top-1/2 -translate-y-1/2 border-[2px] border-gray-200`} />
                <motion.div className={`${isActive ? "bg-linear-120 from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)]" : "bg-linear-to-l from-white to-gray-400"} w-[1.5rem] h-[1.5rem] rounded-full border-[2px] border-gray-200 absolute top-1/2 -translate-y-1/2 left-0`}
                    initial={{
                        transform: "translateX(15%)"
                    }}
                    animate={{
                        transform: isActive ? "translateX(150%)" : "translateX(15%)",
                    }}
                    transition={{
                        duration: .25,
                        ease: "easeInOut",
                    }}

                    onClick={handleFunction}
                />
            </div>
        </div>
    )
}

export default ProductFormStatus
