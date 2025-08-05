'use client';

import React from 'react'
import Appbar from '@/app/lib/components/Appbar/Appbar';
import FilterButton from '@/app/lib/components/FilterTab/FilterButton';
import Searchbar from '@/app/lib/components/Searchbar/Searchbar';
import MenuButton from '@/app/lib/components/Appbar/components/MenuButton';
import { useWindowSize } from '@/app/lib/utils/hooks/useGetWindowSize';
import CartIndicator from '@/app/lib/components/CartIndicator';

const PosAppbar = () => {


    const child = <div className='flex w-full items-center gap-2'>
        <MenuButton />
        <div className='hidden md:block'><Searchbar context='pos' showEditIcon={false} /></div>
        <div className='flex-1' />
        {/** filter iconn */}
        <div className='block lg:visible'><CartIndicator /></div>
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
