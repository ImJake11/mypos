"use client";

import { NewProductProps } from '@/app/lib/models/newProductModel'
import { toggleProductView } from '@/app/lib/redux/inventorySlice';
import { AppDispatch } from '@/app/lib/redux/store';
import ProductServices from '@/app/lib/utils/services/ProductServices';
import { faCartPlus, faHeart, faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

interface Prop {
    data: NewProductProps,
}

const ProductTile = ({
    data
}: Prop) => {

    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className='h-[400px] rounded-[7px] flex flex-col p-4 gap-3 relative'
            style={{
                backgroundColor: "var(--background)"
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
                {data.coverImage ? <img src={data.coverImage ?? null} alt="cover photo" className='object-cover h-full w-full' /> :
                    <FontAwesomeIcon icon={faImage} size='5x' className='place-self-center' />}

            </div>

            <span className='font-semibold italic '>{data.name}</span>
            <span>Php {data.sellingPrice}</span>

            {/** actions */}
            <div className='flex w-full justify-between'>
                {/** favorite */}
                <button className='h-[3rem] w-[3rem]  rounded-full grid place-content-center'
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
                        color: data.isFavorite? "var(--primary)" : "var(--foreground)"
                    }} />
                </button>


                {/** add to cart */}
                <button className='linear-bg-40 h-[3rem] w-[3rem] rounded-full grid place-content-center'
                >
                    <FontAwesomeIcon icon={faCartPlus} className='text-white' />
                </button>
            </div>

            {/** promotional discount is conditional */}
            {data.promotionalDiscount && data.promotionalDiscount.discountRate > 0 && <Discount rate={data.promotionalDiscount.discountRate} />}
        </div>
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
