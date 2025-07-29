'use client';

import { sidebarOpen } from '@/app/lib/redux/slice/sidebarSlice'
import { IconMenu3 } from '@tabler/icons-react'
import React from 'react'
import { useDispatch } from 'react-redux'

const MenuButton = () => {

    const dispatch = useDispatch();

    return (
        <div className='w-[2rem] h-[2rem] rounded-full bg-gray-100 border border-gray-300 grid place-content-center'
            onClick={() => dispatch(sidebarOpen(true))}>
            <IconMenu3 size={20} className='stroke-gray-400' />
        </div>
    )
}

export default MenuButton
