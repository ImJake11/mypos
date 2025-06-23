"use client";

import { NewProductProps } from '@/app/lib/models/newProductModel'
import { toggleProductView } from '@/app/lib/redux/inventorySlice';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import ProductServices from '@/app/lib/utils/services/ProductServices';
import { faCartPlus, faHeart, faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from "framer-motion";

interface Prop {
    data: NewProductProps,
}

const ProductTile = ({
    data
}: Prop) => {

    const dispatch = useDispatch<AppDispatch>();

    const { isListView } = useSelector((state: RootState) => state.inventorySlice);

    return (
        <motion.div className='rounded-[7px] flex  p-4 gap-3 relative'
            layout
            style={{
                backgroundColor: "var(--background)"
            }}

            initial={{
                height: "420px",
                flexDirection: "column",
            }}

            animate={{
                height: isListView ? "200px" : "420px",
                flexDirection: isListView ? "row" : "column"
            }}
        >
            <div className='aspect-square overflow-hidden rounded-[7px] grid'
                style={{
                    backgroundColor: "var(--secondary-background)"
                }}

                onClick={() => dispatch(toggleProductView(
                    data
                ))}
            >
                {data.coverImage ? <img src={data.coverImage ?? null} alt="cover photo" className={`object-cover h-full ${isListView ? "w-[250px]" : "w-full"}`} /> :
                    <FontAwesomeIcon icon={faImage} size='5x' className='place-self-center' />}

            </div>

            {/** product details */}
            <div className={`flex-1 ${isListView ? "flex-row" : "flex-col"} flex gap-2 w-full `}>

                {/** name and price */}
                <div className='flex flex-col w-full h-full justify-evenly'>
                    <span className='font-semibold italic text-[1.2rem]'>{data.name}</span>
                    <span>Php {data.sellingPrice}</span>

                    {/** variants */}
                    <div className='flex w-full gap-2'>

                        {/** stock */}
                        <div className={`${isListView && "p-[7px_12px] rounded-[5px] linear-bg-40 w-fit h-[3rem] grid place-content-center"}`}>
                            Stock: {data.stock}
                        </div>
                        <AnimatePresence>
                            {isListView && data.variants.map((v, i) => <motion.div key={v.id} className='h-[3rem] w-[3rem] rounded-[5px] overflow-hidden'

                                style={{
                                    backgroundColor: "var(--secondary-background)"
                                }}
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                }}
                            >
                                <img src={v.imageUrl} alt="v" className='h-full w-full' />
                            </motion.div>)}
                        </AnimatePresence>


                    </div>
                </div>

                {/** actions */}
                <div className={`flex w-full gap-2.5 items-end h-full ${isListView ? "justify-end" : "justify-between"}`}>
                    {/** favorite */}
                    <button className='h-[3rem] w-[3rem] rounded-full grid place-content-center'
                        style={{
                            backgroundColor: "var(--tertiary)"
                        }}
                        onClick={() => {
                            const productServices = new ProductServices({ dispatch });
                            productServices.addProductToFavorite({
                                isFavorite: !data.isFavorite,
                                productId: data.id!,
                            })

                        }}
                    >
                        <FontAwesomeIcon icon={faHeart} style={{
                            color: data.isFavorite ? "var(--primary)" : "var(--foreground)"
                        }} />
                    </button>


                    {/** add to cart */}
                    <button className='linear-bg-40 h-[3rem] w-[3rem] rounded-full grid place-content-center'
                    >
                        <FontAwesomeIcon icon={faCartPlus} className='text-white' />
                    </button>
                </div>
            </div>

            {/** promotional discount is conditional */}
            {data.promotionalDiscount && data.promotionalDiscount.discountRate > 0 && <Discount rate={data.promotionalDiscount.discountRate} />}
        </motion.div>
    )

    interface DiscountProp {
        rate: number,
    }

    function Discount({ rate }: DiscountProp) {
        return (
            <div className='linear-bg-40 absolute top-3 right-3 p-[5px_10px] bg-linear-to-l  font-semibold rounded-[7px]'>
                <span>{rate}% OFF</span>
            </div>
        )
    }
}

export default ProductTile
