'use client';

import Appbar from '@/app/lib/components/Appbar/Appbar'
import MenuButton from '@/app/lib/components/Appbar/components/MenuButton'
import BackButton from '@/app/lib/components/BackButton';
import { useWindowSize } from '@/app/lib/utils/hooks/useGetWindowSize'
import React from 'react'

const OrderCompleteAppbar = () => {

    const w = useWindowSize().width;

    const isMobile = w < 576;

    const appbar = (
        <div className='w-full flex gap-2'>
            {isMobile && <>
                <BackButton />
                <MenuButton />
            </>}
        </div>
    )

    return (
        <Appbar title='Complete Order' child={appbar} />
    )
}

export default OrderCompleteAppbar
