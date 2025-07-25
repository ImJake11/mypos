'use client';

import ToasEnum from '@/app/lib/enum/toastEnum';
import { posAddProductToCart, posCloseProductDetails } from '@/app/lib/redux/slice/posSlice';
import { openToas } from '@/app/lib/redux/slice/toastSlice';
import { RootState } from '@/app/lib/redux/store';
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { cartCacheSave } from '../../../services/saveCartCache';
import CartHelpers from '../../cart/services/cartHelper';
import ProductDetailsServices from '../services/productDetailsServices';

const ProductTabAddToCartButton = () => {

    const dispatch = useDispatch();

    const { selectedVariantID, cartItems} = useSelector((state: RootState) => state.posSlice);

    const cartHelper = useMemo(()=>{
        return new CartHelpers({cartItems});
    },[]);

    const productTabServices = useMemo(()=>{
        return new ProductDetailsServices();
    },[]);

    const handleAddToCart = async () => {

        const data = productTabServices.generateDataForCart();

        if (!data) return;

        const isExisiting = cartHelper.isProductExisingInCart(data?.variantID);

        if (isExisiting) {
            dispatch(openToas({
                message: "Product is currently existing in the list",
                type: ToasEnum.ERROR,
            }));
            return;
        }

        // save variant to cart
        dispatch(posAddProductToCart(data));

        // save new data to database as cache
        await cartCacheSave(cartHelper.generateCartCacheData(data));


        // close the tab
        dispatch(posCloseProductDetails())
        // show toas message
        dispatch(openToas({ message: "Product added to cart", type: ToasEnum.DEFAULT }))
    }

    return (
        <div className='flex w-full gap-3'>

            <button className='flex-1 min-h-[3rem] border border-[var(--foreground)] rounded-[7px]'
                onClick={() => dispatch(posCloseProductDetails())}
            >Cancel</button>

            {selectedVariantID !== "" ? <button className='button-primary-gradient flex-1 min-h-[2rem] text-white rounded-[7px] grid place-content-center'
                onClick={handleAddToCart}
            >Add to cart</button> :
                <span className='bg-linear-to-br from-[var(--error-color-primary)] to-[var(--error-color-secondary)] flex-1 text-center p-[10px_0] text-white rounded-[11px]'>No Selected Variant</span>}
        </div>
    )
}

export default ProductTabAddToCartButton
