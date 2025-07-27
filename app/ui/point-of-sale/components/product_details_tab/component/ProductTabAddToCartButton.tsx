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

    const { selectedVariantID, cartItems, quantity } = useSelector((state: RootState) => state.posSlice);

    const cartHelper = useMemo(() => {
        return new CartHelpers();
    }, [cartItems]);

    const productTabServices = useMemo(() => {
        return new ProductDetailsServices();
    }, [selectedVariantID, quantity]);

    const handleAddToCart = async () => {

        try {
            const data = productTabServices.generateDataForCart();

            if (!selectedVariantID) return;

            // save variant to cart
            dispatch(posAddProductToCart(data!));

            // save new data to database as cache
            await cartCacheSave(cartHelper.generateCartCacheData(data!));


            // close the tab
            dispatch(posCloseProductDetails())
            // show toas message
            dispatch(openToas({ message: "Product added to cart", type: ToasEnum.DEFAULT }))
        } catch (e) {
            console.log(e);
            dispatch(openToas({
                message: "Failed to add the product to cart",
                type: ToasEnum.ERROR,
            }))
        }
    }

    return (
        <div className='flex w-full justify-end gap-3'>
            <button className='flex-1 max-w-[10rem] min-h-[2.5rem] border border-[var(--foreground)] rounded-[7px]'
                onClick={() => dispatch(posCloseProductDetails())}
            >Cancel</button>
            {selectedVariantID !== "" && <button className='button-primary-gradient flex-1 min-h-[2rem] text-white rounded-[8px] grid place-content-center max-w-[10rem]'
                onClick={handleAddToCart}
            >Add to cart</button>
            }
        </div>
    )
}

export default ProductTabAddToCartButton
