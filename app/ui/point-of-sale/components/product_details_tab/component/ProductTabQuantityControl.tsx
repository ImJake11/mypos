'use client';

import { RootState } from '@/app/lib/redux/store';
import React, { ChangeEvent, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ProductDetailsServices from '../services/productDetailsServices';
import ToasEnum from '@/app/lib/enum/toastEnum';
import { posUpdateSelectedvariantQuantity } from '@/app/lib/redux/slice/posSlice';
import { openToas } from '@/app/lib/redux/slice/toastSlice';
import { useWindowSize } from '@/app/lib/utils/hooks/useGetWindowSize';

const ProductTabQuantityControl = () => {

    const dispatch = useDispatch();

    const { selectedVariantID, quantity } = useSelector((state: RootState) => state.posSlice);

    const productDetailsTabCalculator = useMemo(() => {
        return new ProductDetailsServices();
    }, [quantity]);

    const overallTotalPrice = productDetailsTabCalculator.computeOverallTotalPrice();

    const maxStock = productDetailsTabCalculator.getSelectedVariatMaxStock();
    //
    const handleQuantityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        if (maxStock === undefined) return;

        // we will validate the use input because it can bypass the plus and minus button function

        // check if the value is number
        const isNan = isNaN(Number(value));

        if (isNan) return;

        if (Number(value) > maxStock) {
            dispatch(posUpdateSelectedvariantQuantity({
                quantity: maxStock,
            }));
        } else {
            dispatch(posUpdateSelectedvariantQuantity({
                quantity: Number(value),
            }))
        }
    }

    // handle the plus minus button 
    const handleQuantity = (isPlus: boolean) => {

        if (isPlus) {
            // show toas message if user put a quantity that is equal or greater than  the variants current stock
            if (maxStock !== undefined && maxStock <= quantity) {
                dispatch(openToas({
                    message: "Max Stock reached",
                    type: ToasEnum.ERROR,
                }));
            } else {
                dispatch(posUpdateSelectedvariantQuantity({ isAddition: true }));
            }
        } else {

            dispatch(posUpdateSelectedvariantQuantity({ isAddition: false }))
        }
    }

    const w = useWindowSize().width;

    const isXSmall = w < 576;

    return (
        selectedVariantID && <div className='flex w-full gap-3 justify-end items-center mb-5'>
            <span className={`${isXSmall ? "text-[.8rem]" : "text-[1rem]"}`}>TOTAL:
                <span> {Number(overallTotalPrice).toLocaleString('en-US', { style: "currency", currency: "PHP" })}</span>
            </span>
            <div className='flex-1' />
            <StockActions isPlus={false} onClick={
                () => handleQuantity(false)
            } />
            {/** quantity input */}
            <input type="text" maxLength={4} value={String(quantity) ?? "0"} className='w-[5rem] border border-gray-300 h-full rounded-[8px] text-center'
                onChange={handleQuantityInput}
            />
            <StockActions isPlus={true} onClick={() => handleQuantity(true)} />
        </div>
    )
}

interface StockActionProp {
    isPlus: boolean,
    onClick: () => void,
}

function StockActions({ isPlus, onClick }: StockActionProp) {
    return <div className={`${isPlus ? "button-primary-gradient text-white" : "border border-gray-300 text-[var(--color-brand-primary)]"} h-[2rem] w-[2rem] rounded-full grid place-content-center`}

        onClick={onClick}
    >
        {isPlus ? <i className="ri-add-fill" /> : <i className="ri-subtract-line"></i>}
    </div>
}

export default ProductTabQuantityControl
