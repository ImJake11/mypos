'use client';

import React from 'react'
import CartIcon from '@/app/lib/icons/cartIcon'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/lib/redux/store';
import { posToggleCartTab } from '@/app/lib/redux/posSlice';
import { FilterIcon } from '@/app/lib/icons/filterIcon';
import { filterToggleFilterTab } from '@/app/lib/redux/filterSlice';

const PosAppbar = () => {

    const dispatch = useDispatch();

    const cartItemsLength = useSelector((state: RootState) => state.posSlice.cartItems.length);

    return (
        <div className='min-h-[3rem] w-full bg-[var(--main-bg-primary-dark)] flex justify-end items-center gap-.5 p-[0_10px]'>

            {/** cart icon */}
            <div className='h-[2rem] w-[2rem] relative mr-3'
                onClick={() => dispatch(posToggleCartTab())}
            >
                <CartIcon />
                {/** items number indicator
                 * show cart indicator if cart items is more than 0
                 */}
                {cartItemsLength > 0 && <div className='absolute top-0 right-0 h-5 w-5 rounded-full bg-[var(--color-brand-primary)] grid place-content-center'>
                    {cartItemsLength}
                </div>}

            </div>

            {/** filter iconn */}
            <button className='flex p-[5px_7px] rounded-[30px] button-primary-gradient gap-2 items-center'
                onClick={() => dispatch(filterToggleFilterTab(true))}
            >
                Filter <div className='w-[1.3rem] h-[1.3rem]'><FilterIcon /></div>
            </button>
        </div>
    )
}

export default PosAppbar
