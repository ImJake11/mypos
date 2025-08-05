'use client'

import Appbar from '@/app/lib/components/Appbar/Appbar'
import MenuButton from '@/app/lib/components/Appbar/components/MenuButton';
import { useWindowSize } from '@/app/lib/utils/hooks/useGetWindowSize';
import React from 'react'

const ProductFormAppbar = () => {

    const w = useWindowSize().width;

    const isMobile = w < 576;

    const child = (
        <div className='flex-1 '>
            {isMobile && <MenuButton />}
        </div>
    );
    return (
        <Appbar title='Product Form' child={child} />
    )
}

export default ProductFormAppbar
