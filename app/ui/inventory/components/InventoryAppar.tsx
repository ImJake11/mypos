'use client';

import React from 'react'
import CartIndicator from '@/app/lib/components/CartIndicator';
import Appbar from '@/app/lib/components/Appbar/Appbar';
import FilterButton from '@/app/lib/components/FilterTab/FilterButton';
import Searchbar from '@/app/lib/components/Searchbar/Searchbar';
import MenuButton from '@/app/lib/components/Appbar/components/MenuButton';
import TileViewButton from '@/app/lib/components/TileViewButton';

const InventoryAppar = () => {


    const child = <div className='flex w-full gap-1 justify-end items-center'>
        <div className='block lg:hidden'><MenuButton /></div>
        <div className='hidden lg:block'>
            <Searchbar context='inventory' showEditIcon={true} />
        </div>
        <div className='flex-1' />
        <div className='hidden md:block'> <TileViewButton /></div>
        <CartIndicator />
        <FilterButton />

    </div>

    return (
        <Appbar
            title='Inventory'
            child={child}
        />
    )
}

export default InventoryAppar
