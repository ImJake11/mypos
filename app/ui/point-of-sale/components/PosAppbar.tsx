'use client';

import React from 'react'
import Appbar from '@/app/lib/components/Appbar/Appbar';
import FilterButton from '@/app/lib/components/FilterTab/FilterButton';
import Searchbar from '@/app/lib/components/Searchbar/Searchbar';
import MenuButton from '@/app/lib/components/Appbar/components/MenuButton';

const PosAppbar = () => {

    const child = <div className='flex w-full items-center gap-2'>
        <MenuButton />
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
