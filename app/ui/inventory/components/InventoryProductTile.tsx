"use client";

import { ProductProps } from '@/app/lib/models/productModel'
import { toggleProductView } from '@/app/lib/redux/inventorySlice';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import ProductServices from '@/app/ui/inventory/services/ProductServices';
import { faCartPlus, faHeart, faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from "framer-motion";

interface Prop {
    data: ProductProps,
}

const ProductTile = ({
    data
}: Prop) => {

    const dispatch = useDispatch<AppDispatch>();

    const { isListView } = useSelector((state: RootState) => state.inventorySlice);

    return (
        <motion.div className='bg-[var(--product-card-bg)] rounded-[var(--product-card-border-radius)] flex p-4 gap-2 relative'
            layout
            initial={{
                opacity: 0,
                height: isListView ? "200px" : "420px",
                flexDirection: isListView ? "row" : "column"
            }}
            animate={{
                opacity: 1,
                height: isListView ? "200px" : "420px",
                flexDirection: isListView ? "row" : "column"
            }}

            exit={{
                opacity: 0,
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
                <div className='flex flex-col w-full h-full justify-evenly gap-1'>
                    <span className='font-semibold italic text-[1.2rem]'>{data.name}</span>
                    <span className='text-[.8rem] text-[var(--foreground-lighter)]'>Php {data.sellingPrice}</span>

                    {/** variants */}
                    <div className='flex w-full gap-2'>

                        {/** stock */}
                        <div className={`text-[.8rem] text-[var(--foreground-lighter)] ${isListView && "button-primary-gradient p-[7px_12px] rounded-[5px] linear-bg-40 w-fit h-[3rem] grid place-content-center"}`}>
                            Stock: {data.stock}
                        </div>
                        <AnimatePresence>
                            {isListView && data.variants.map((v, i) => <motion.div key={v.id} className='h-[3rem] w-[3rem] rounded-[5px] overflow-hidden'
                                style={{
                                    backgroundColor: "var(--main-bg-secondary-dark)"
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
                            backgroundColor: "var(--main-bg-secondary-dark)"
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
                            color: data.isFavorite ? "var(--color-brand-primary)" : "var(--foreground)"
                        }} />
                    </button>


                    {/** add to cart */}
                    <button className='button-primary-gradient h-[3rem] w-[3rem] rounded-full grid place-content-center'
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
            <div className='button-primary-gradient absolute top-3 right-3 p-[5px_10px] bg-linear-to-l  font-semibold rounded-[7px]'>
                <span>{rate}% OFF</span>
            </div>
        )
    }
}

export default ProductTile
