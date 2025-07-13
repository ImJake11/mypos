'use client';

import React from 'react'
import CartIcon from '@/app/lib/icons/cartIcon'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/lib/redux/store';
import { posToggleCartTab } from '@/app/lib/redux/posSlice';
import { FilterIcon } from '@/app/lib/icons/filterIcon';
import { filterToggleFilterTab } from '@/app/lib/redux/filterSlice';
import CartIndicator from '@/app/lib/components/CartIndicator';

const PosAppbar = () => {

    const dispatch = useDispatch();

    const cartItemsLength = useSelector((state: RootState) => state.posSlice.cartItems.length);

    return (
        <div className='min-h-[5rem] w-full bg-[var(--main-bg-primary-dark)] flex justify-end items-center gap-.5 p-[0_10px]'>

            {/** cart icon */}
            <CartIndicator />

            {/** filter iconn */}
            <button className='flex h-[2.5rem] p-[0_7px] rounded-[8px] button-primary-gradient gap-2 items-center'
                onClick={() => dispatch(filterToggleFilterTab(true))}
            >
                Filter <div className='w-[1.3rem] h-[1.3rem]'><FilterIcon /></div>
            </button>
        </div>
    )
}

export default PosAppbar
