'use client';

import React from 'react'
import CartIcon from '@/app/lib/icons/cartIcon'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/lib/redux/store';
import { posToggleCartTab } from '@/app/lib/redux/slice/posSlice';
import { FilterIcon } from '@/app/lib/icons/filterIcon';
import { filterToggleFilterTab } from '@/app/lib/redux/slice/filterSlice';
import CartIndicator from '@/app/lib/components/CartIndicator';
import Appbar from '@/app/lib/components/Appbar/Appbar';

const PosAppbar = () => {

    const dispatch = useDispatch();

    const cartItemsLength = useSelector((state: RootState) => state.posSlice.cartItems.length);

    const child = <div className='flex items-center'>
        <CartIndicator />
        {/** filter iconn */}
        <button className='flex h-[2rem] p-[0_7px] rounded-[8px] button-primary-gradient gap-2 items-center'
            onClick={() => dispatch(filterToggleFilterTab(true))}
        >
            Filter <div className='w-[1.3rem] h-[1.3rem]'><FilterIcon /></div>
        </button>
    </div>

    return (
        <Appbar
            title='Point Of Sale'
            child={child}
        />
    )
}

export default PosAppbar
