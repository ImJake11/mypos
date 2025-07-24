'use client';

import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/lib/redux/store';
import CartIndicator from '@/app/lib/components/CartIndicator';
import Appbar from '@/app/lib/components/Appbar/Appbar';
import FilterButton from '@/app/lib/components/FilterTab/FilterButton';

const PosAppbar = () => {

    const cartItemsLength = useSelector((state: RootState) => state.posSlice.cartItems.length);

    const child = <div className='flex items-center gap-2'>
        <CartIndicator />
        {/** filter iconn */}
        <FilterButton />
    </div>

    return (
        <Appbar
            title='Point Of Sale'
            child={child}
        />
    )
}

export default PosAppbar
