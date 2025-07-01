'use client';

import React from 'react'
import SearchBar from './PosSearchBar'
import CartIcon from '@/app/lib/icons/cartIcon'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/lib/redux/store';
import { toggleCategoryTab } from '@/app/lib/redux/productSlice';
import { posToggleCartTab } from '@/app/lib/redux/posSlice';

const PosAppbar = () => {

    const dispatch = useDispatch();

    const cartItemsLength = useSelector((state: RootState) => state.posSlice.cartItems.length);

    return (
        <div className='min-h-[4rem] w-full bg-[var(--main-bg-primary-dark)] flex items-center'>
            <SearchBar />
            <div className='flex-1' />
            {/** cart icon */}
            <div className='h-[2.5rem] w-[2.5rem] relative mr-3'
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
        </div>
    )
}

export default PosAppbar
