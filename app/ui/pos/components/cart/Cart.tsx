'use client';

import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/lib/redux/store';
import CartTile from './component/CartTile';
import CartHelpers from './services/cartHelper';
import CartOrderSummary from './component/CartOrderSummary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import CartIcon from '@/app/lib/icons/cartIcon';

const Cart = () => {

    const dispatch = useDispatch();

    const posSlice = useSelector((state: RootState) => state.posSlice);

    const cartData = posSlice.cartItems;

    const cartHelper = useMemo(() => {
        return new CartHelpers({
            cartItems: cartData,
        })
    }, [cartData]);

    if (!posSlice.isCartVisible) return null;

    return (
        <div className='absolute w-screen h-screen backdrop-blur-[2px]'
            style={{
                backgroundColor: "rgb(0,0,0, .5)",
            }}
        >
            <div className='absolute right-0 w-[40vw] h-full bg-[var(--main-bg-primary-dark)] flex flex-col p-5 gap-2'>
                <div className='flex w-full items-center gap-2'>
                    <div className='w-[2rem] h-[2rem]'>
                        <CartIcon />
                    </div>
                    <span className='font-semibold italic'>Cart</span>
                </div>

                <div className='h-1.5' />
                {/** headers */}
                <div className='flex w-full font-bold text-left '>
                    <span className='flex-3'>Items</span>
                    <span className='flex-2'>Price</span>
                    <span className='flex-2'>Quantity</span>
                    <span className='flex-1'></span>
                </div>
                <div className='h-[1rem]' />

                {/** list of items */}
                <div className='w-full h-[75vh] flex flex-col overflow-auto gap-2'>
                    {cartData.length === 0 ? <div className='w-full h-full grid place-content-center'>
                        No items
                    </div> :
                        cartData.map((data, i) => <CartTile key={i} index={i} data={data} />)}
                </div>

                {/** summary */}
                <CartOrderSummary overallCartTotal={cartHelper.computeOverAllTotalCartItems()} />
            </div>
        </div>
    )
}


export default Cart
