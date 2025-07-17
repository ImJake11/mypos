"use client";

import React, { useState } from 'react'
import { ProductProps } from '@/app/lib/models/productModel'
import { inventoryToggleProductView } from '@/app/lib/redux/slice/inventorySlice';
import { AppDispatch } from '@/app/lib/redux/store';
import { faCartPlus, faHeart, faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux';
import { motion } from "framer-motion";
import { inventoryServiceUpdateProductFavorite } from '../../services/inventoryServiceAddProductToFavorite';
import { checkDiscountExpiration } from '@/app/lib/utils/services/checkDiscountExpirationDate';

interface Prop {
    data: ProductProps,
}

const InventoryGridTile = ({
    data
}: Prop) => {

    const dispatch = useDispatch<AppDispatch>();

    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    }

    const handleMouseLeave = () => {
        setIsHover(false);
    }


    return (
        <motion.div className='w-full h-[300px] bg-[var(--product-card-bg)] flex-col rounded-[var(--product-card-border-radius)] flex p-4 gap-2 relative'
            layout
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}

            exit={{
                opacity: 0,
            }}

            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="w-full h-[150px] overflow-hidden rounded-[7px] relative"
                style={{
                    backgroundColor: "var(--secondary-background)"
                }}

                onClick={() => dispatch(inventoryToggleProductView(
                    data
                ))}
            >
                {data.coverImage ? <motion.img src={data.coverImage} loading='lazy' alt="cover photo" className='object-fill w-full h-full'
                    animate={{
                        scale: isHover ? 1.2 : 1,
                    }}
                /> :
                    <FontAwesomeIcon icon={faImage} size='5x' className='place-self-center' />}

            </div>

            {/** product details */}
            <div className={`flex-1 flex-col flex gap-2 w-full `}>

                {/** name and price */}
                <div className='flex flex-col w-full h-full justify-evenly gap-1'>
                    <span className='font-semibold italic'>{data.name}</span>

                    <span className='text-[.8rem] text-[var(--foreground-lighter)]'>
                        Php {data.sellingPrice}
                    </span>
                </div>

                {/** actions */}
                <motion.div className={`flex gap-2.5 items-end h-full justify-between`}
                    animate={{
                        padding: isHover ? "0 10px" : "0 0px"
                    }}
                >
                    {/** favorite */}
                    <button className='h-[3rem] w-[3rem] rounded-full grid place-content-center'
                        style={{
                            backgroundColor: "var(--main-bg-secondary-dark)"
                        }}
                        onClick={() => {
                            inventoryServiceUpdateProductFavorite(
                                {
                                    dispatch,
                                    isFavorite: !data.isFavorite,
                                    productId: data.id!,
                                }
                            )

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
                </motion.div>

            </div>
            {/** promotional discount is conditional */}
            {data.promotionalDiscount && checkDiscountExpiration(data.promotionalDiscount.expirationDate) && <Discount rate={data.promotionalDiscount.discountRate} />}
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

export default InventoryGridTile;
