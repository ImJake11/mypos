'use client';

import React from 'react'
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/lib/redux/store';
import { openToas } from '@/app/lib/redux/toastSlice';
import ToasEnum from '@/app/lib/enum/toastEnum';
import { ProductActionEnums } from '@/app/lib/redux/utils/enums/productActionEnums';
import { ProductKeys } from '@/app/lib/constants/ProductKeys';
import { ProductProps } from '@/app/lib/models/productModel';
import { formUpdateState } from '@/app/lib/redux/productSlice';

const ProductFormStatus = () => {
    const dispatch = useDispatch();

    const isActive = useSelector((state: RootState) => state.productSlice.data.isActive);

    return (
        <div className='flex gap-3 w-full justify-end p-3 items-center'>
            <span>{isActive ? "Activated" : "Deactivated"}</span>
            <div className='w-[4rem] h-[2rem] relative'>
                <motion.div className={`${isActive ? "button-primary-gradient" : "bg-linear-to-l from-black to-gray-800"}  w-full h-full rounded-full absolute top-1/2 -translate-y-1/2 border-[2px] border-white`} />
                <motion.div className={`${isActive ? "button-primary-gradient" : "bg-linear-to-l from-white to-gray-400"} w-[1.5rem] h-[1.5rem] rounded-full border-[2px] border-white absolute top-1/2 -translate-y-1/2 left-0`}
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

                    onClick={() => {
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
                    }}

                />
            </div>
        </div>
    )
}

export default ProductFormStatus
