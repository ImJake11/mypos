'use client';

import React, { useEffect, useMemo, useState } from 'react'
import { posAddProductToCart, posCloseProductDetails, posSelectProduct, posSetSelectedProductData, posUpdateSelectedvariantQuantity } from '@/app/lib/redux/slice/posSlice';
import { RootState } from '@/app/lib/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import Variants from './component/Variants';
import BulkTable from './component/BulkTiers';
import { openToas } from '@/app/lib/redux/slice/toastSlice';
import ToasEnum from '@/app/lib/enum/toastEnum';
import ProductDetailsCalculator from './services/productDetailsServices';
import CartHelpers from "../cart/services/cartHelper";
import { AnimatePresence } from "framer-motion";
import { cartCacheSave } from '../../services/saveCartCache';
import { checkDiscountExpiration } from '@/app/lib/utils/services/checkDiscountExpirationDate';
import ProductTabLoadingIndicator from './component/ProductTabLoadingIndicatore';
import { fetchSingleProductData } from '@/app/lib/utils/data/fetchSingeProductData';
import ProductTabQuantityControl from './component/ProductTabQuantityControl';
import ProductTabAddToCartButton from './component/ProductTabAddToCartButton';

const PosProductDetailsTab = () => {
    const dispatch = useDispatch();

    const [isLaoding, setIsLoading] = useState(true);

    const { isProductDetailsTabVisible, selectedProduct, quantity, selectedProdctID, selectedVariantID } = useSelector((state: RootState) => state.posSlice);


    const productDetailsTabCalculator = useMemo(() => {
        return new ProductDetailsCalculator();
    }, [isProductDetailsTabVisible, quantity, selectedProduct, quantity, selectedVariantID]);

    // current price of the product if the promotional discount is applied
    // means the main price not the variants price
    const discountedPrice = productDetailsTabCalculator.getDiscountedProductPrice();
    const hasDiscount = selectedProduct?.promotionalDiscount && checkDiscountExpiration(selectedProduct?.promotionalDiscount.expirationDate);

    useEffect(() => {
        const fetchProductData = async () => {
            if (!isProductDetailsTabVisible) return;

            try {

                setIsLoading(true);
                const data = await fetchSingleProductData(selectedProdctID);

                dispatch(posSetSelectedProductData(data));
            } catch (e) {
                throw new Error("Failed to fetch product");
            } finally {
                setIsLoading(false);
            }
        }

        fetchProductData();

    }, [isProductDetailsTabVisible]);
    // return null if its not visible
    if (!isProductDetailsTabVisible) return null;

    return (
        <div className='w-screen h-screen backdrop-blur-[2px] absolute'
            style={{
                backgroundColor: "rgb(0,0,0, .6)"
            }}
        >
            {isLaoding ? <ProductTabLoadingIndicator /> : <div className='bg-[var(--main-bg-primary)] overflow-auto scrollbar-hide absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[80vh] rounded-[11px] p-5 flex flex-col gap-3
            '>
                {/** discount and aname */}
                <div className='flex w-full gap-2'>
                    {hasDiscount && <div className='w-fit h-[2rem] button-primary-gradient grid place-content-center p-3 rounded-[7px]'>
                        <span>{selectedProduct?.promotionalDiscount?.discountRate}% OFF</span>
                    </div>}
                    <span className='text-[1.2rem] italic font-semibold'>{selectedProduct?.name}</span>
                </div>

                {/** price */}
                <span className='text-[1rem] font-semibold'>--- Php {discountedPrice} ---
                    {hasDiscount && <span className='text-gray-400'> (Original: Php {selectedProduct.sellingPrice})</span>}
                </span>

                <Variants variants={selectedProduct?.variants ?? []} sellingPrice={discountedPrice} />
                <BulkTable data={selectedProduct?.bulkTier ?? []} quantity={quantity ?? 0} />
                <div className='flex-1' />

                <ProductTabQuantityControl />

                {!selectedVariantID && <span className='text-center text-red-500 grid place-content-center'>No Selected Variant</span>}
                <ProductTabAddToCartButton />
            </div>}
            <AnimatePresence>
                {isLaoding && <ProductTabLoadingIndicator />}
            </AnimatePresence>
        </div>
    )
}

export default PosProductDetailsTab
