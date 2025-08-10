'use client';


import React from 'react'
import Logo from '../../Logo';



const SidebarLogo = ({ fontSize = "1rem" }: { fontSize?: string }) => {

    return (
        <div className='flex gap-2 justify-center items-end h-full p-2 pb-4'>
            <Logo />
        </div>
    )
}

export default SidebarLogo
