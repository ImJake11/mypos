'use client';

import { RootState } from '@/app/lib/redux/store';
import React from 'react'
import { useSelector } from 'react-redux';
import CartTile from './cart/component/CartTile';
import CartHelpers from './cart/services/cartHelper';
import CartOrderSummary from './cart/component/CartOrderSummary';

const PosCartList = () => {
    const isLoading = useSelector((state: RootState) => state.posSlice.isLoading);

    const cartHelper = new CartHelpers();

    const { cartItems } = useSelector((state: RootState) => state.posSlice);

    if (isLoading) return null;

    return (
        <div className='hidden lg:block min-w-[25rem] h-full bg-[var(--main-bg-secondary)] pl-0 p-2'>

            <div className='w-full h-full bg-white rounded-[12px] shadow-[1px_1px_5px_rgb(0,0,0,.3)] flex flex-col p-2'>
                <span>Current Orders</span>

                <div className='w-full h-[60rem] flex flex-col overflow-auto pt-2 gap-2 p-0.5'>
                    {
                        cartItems.length <= 0 ? <div className='w-full h-full grid place-content-center'>
                            <span>No items</span>
                        </div> :
                            cartItems.map((item, index) => <CartTile
                                key={item.variantID}
                                cartHelper={cartHelper}
                                data={item}
                                index={index}
                            />)}
                </div>

                <CartOrderSummary showCloseButton={false} overallCartTotal={cartHelper.computeOverAllTotalCartItems()} />
            </div>

        </div>
    )
}

export default PosCartList
