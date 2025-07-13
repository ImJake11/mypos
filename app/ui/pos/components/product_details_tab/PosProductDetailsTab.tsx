'use client';

import React, { useMemo, useState } from 'react'
import { posAddProductToCart, posCloseProductDetails, posUpdateSelectedvariantQuantity } from '@/app/lib/redux/posSlice';
import { RootState } from '@/app/lib/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import Variants from './component/Variants';
import BulkTable from './component/BulkTiers';
import { openToas } from '@/app/lib/redux/toastSlice';
import ToasEnum from '@/app/lib/enum/toastEnum';
import ProductDetailsCalculator from './services/productDetailsServices';
import CartHelpers from "../cart/services/cartHelper";
import { AnimatePresence, motion } from "framer-motion";
import CircularLoadingIndicator from '@/app/lib/components/CircularLoadingIndicator';
import { cartCacheSave } from '../../services/saveCartCache';
import { checkDiscountExpiration } from '@/app/lib/utils/services/checkDiscountExpirationDate';

const PosProductDetailsTab = () => {
    const [isLaoding, setIsLoading] = useState(false);

    const { isProductDetailsTabVisible, selectedProduct, selectedVariantID, quantity, cartItems } = useSelector((state: RootState) => state.posSlice);

    const dispatch = useDispatch();

    const productDetailsTabCalculator = useMemo(() => {
        return new ProductDetailsCalculator();
    }, [isProductDetailsTabVisible, quantity, selectedProduct, quantity]);


    const cartHelper = useMemo(() => {
        return new CartHelpers({
            cartItems,
        })
    }, [cartItems]);

    const { bulkTier,
        name,
        promotionalDiscount,
        sellingPrice,
        variants,
    } = selectedProduct;


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

    const handleAddToCart = async () => {

        setIsLoading(true);
        const data = productDetailsTabCalculator.generateDataForCart();

        if (!data) return;

        const isExisiting = cartHelper.isProductExisingInCart(data?.variantID);

        if (isExisiting) {
            dispatch(openToas({
                message: "Product is currently existing in the list",
                type: ToasEnum.ERROR,
            }));
            setIsLoading(false);
            return;
        }

        // save variant to cart
        dispatch(posAddProductToCart(data));

        // save new data to database as cache
        await cartCacheSave(cartHelper.generateCartCacheData(data));

        setIsLoading(false);
        // close the tab
        dispatch(posCloseProductDetails())
        // show toas message
        dispatch(openToas({ message: "Product added to cart", type: ToasEnum.DEFAULT }))
    }

    // current price of the product if the promotional discount is applied
    // means the main price not the variants price
    const discountedPrice = productDetailsTabCalculator.getDiscountedProductPrice();
    const overallTotalPrice = productDetailsTabCalculator.computeOverallTotalPrice().toLocaleString('en-us');
    const maxStock = productDetailsTabCalculator.getSelectedVariatMaxStock();
    const hasDiscount = promotionalDiscount && checkDiscountExpiration(promotionalDiscount.expirationDate);

    // return null if its not visible
    if (!isProductDetailsTabVisible) return null;


    return (
        <div className='w-screen h-screen backdrop-blur-[2px] absolute'
            style={{
                backgroundColor: "rgb(0,0,0, .6)"
            }}
        >
            <div className='bg-[var(--main-bg-primary-dark)] overflow-auto scrollbar-hide absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[90vh]
            rounded-[11px] p-5 flex flex-col gap-3
            '>

                <span className='font-semibold italic'>Choose Product Variant</span>

                {/** discount and aname */}
                <div className='flex w-full gap-2'>
                    {hasDiscount && <div className='w-fit h-[2rem] button-primary-gradient grid place-content-center p-3 rounded-[7px]'>
                        <span>{promotionalDiscount?.discountRate}% OFF</span>
                    </div>}
                    <span className='text-[1.5rem] italic font-semibold'>{name}</span>
                </div>

                {/** price */}
                <span className='text-[1.5rem] font-semibold'>--- Php {discountedPrice} ---
                    {hasDiscount && <span className='text-gray-400'> (Original: Php {sellingPrice})</span>}
                </span>

                <Variants variants={variants!} sellingPrice={discountedPrice} />
                <BulkTable data={bulkTier ?? []} quantity={quantity ?? 0} />
                <div className='flex-1' />

                {/** stock actions plus minus */}
                {selectedVariantID && <div className='flex w-full gap-3 justify-end items-center mb-5'>
                    <span className='text-[1.5rem]'>TOTAL PRICE:
                        <span> Php {overallTotalPrice}</span>
                    </span>
                    <div className='flex-1' />
                    <StockActions isPlus={false} onClick={
                        () => handleQuantity(false)
                    } />
                    <input type="text" maxLength={4} value={String(quantity) ?? "0"} className='w-[5rem] border border-[var(--primary)] h-full rounded-[7px] text-center'
                        onChange={handleQuantityInput}
                    />
                    <StockActions isPlus={true} onClick={() => handleQuantity(true)} />
                </div>}
                {/** add to cart button */}
                <div className='flex w-full gap-3'>

                    <button className='flex-1 min-h-[3rem] border border-[var(--foreground)] rounded-[7px]'
                        onClick={() => dispatch(posCloseProductDetails())}
                    >Cancel</button>

                    {selectedVariantID !== "" ? <button className='button-primary-gradient flex-1 min-h-[3rem] rounded-[7px] grid place-content-center'
                        onClick={handleAddToCart}
                    >Add to cart</button> :
                        <span className='bg-linear-to-br from-[var(--error-color-primary)] to-[var(--error-color-secondary)] flex-1 text-center p-[10px_0] rounded-[11px]'>No Selected Variant</span>}
                </div>

            </div>
            <AnimatePresence>
                {isLaoding && <LoadinIndicator />}
            </AnimatePresence>
        </div>
    )
}

function LoadinIndicator() {
    return <motion.div className='w-[60vw] h-[90vh] absolute grid place-content-center left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2'
        style={{
            backgroundColor: "rgb(0,0,0,.7)",
        }}
        initial={{
            opacity: 0,
        }}
        animate={{
            opacity: 1,
        }}
        exit={{
            opacity: 0
        }}
    >
        <div className='w-[200px] aspect-square rounded-[12px] bg-[var(--main-bg-primary-dark)] grid place-content-center'>
            <CircularLoadingIndicator size={50} />
        </div>
    </motion.div>
}

interface StockActionProp {
    isPlus: boolean,
    onClick: () => void,
}

function StockActions({ isPlus, onClick }: StockActionProp) {
    return <div className={`${isPlus ? "button-primary-gradient" : "bg-linear-0 text-[var(--color-brand-primary)]"} h-[3rem] w-[3rem] rounded-full grid place-content-center`}

        onClick={onClick}
    >
        {isPlus ? <i className="ri-add-fill" /> : <i className="ri-subtract-line"></i>}
    </div>
}
export default PosProductDetailsTab
