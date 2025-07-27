'use client';

import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/lib/redux/store';
import CartIndicator from '@/app/lib/components/CartIndicator';
import Appbar from '@/app/lib/components/Appbar/Appbar';
import FilterButton from '@/app/lib/components/FilterTab/FilterButton';
import { IconMenu2, IconMenu3, IconSearch } from '@tabler/icons-react';
import { sidebarOpen } from '@/app/lib/redux/slice/sidebarSlice';
import Searchbar from '@/app/lib/components/Searchbar/Searchbar';

const PosAppbar = () => {

    const dispatch = useDispatch();

    const menu = (
        <div className='w-[2rem] h-[2rem] rounded-full bg-gray-100 border border-gray-300 grid place-content-center' onClick={() => dispatch(sidebarOpen(true))}>
            <IconMenu3 size={20} className='stroke-gray-400' />
        </div>
    );

    const child = <div className='flex w-full items-center gap-2'>
        {menu}
        <Searchbar context='pos' showEditIcon={false} />
        <div className='flex-1' />   
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
