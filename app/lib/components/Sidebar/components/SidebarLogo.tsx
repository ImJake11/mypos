'use client';


import { Audiowide } from 'next/font/google';
import React from 'react'
import { motion } from "framer-motion";

const audioWide = Audiowide({
    weight: ['400'],
    subsets: ['latin'],
    style: "normal",
    display: 'swap',
    variable: '--font-poppins',
});

const SidebarLogo = ({
    isSidebarMinimize,
}: {
    isSidebarMinimize: boolean
}) => {

    const name = "NEXUSTOCK";

    const displayName = isSidebarMinimize ? name.charAt(0) : name;

    return (
        <div className='flex gap-2 justify-center items-end h-full p-2 pb-4'>
            <motion.span className={`${audioWide.className}  text-shadow-[3px_2px_3px_rgb(0,0,0,.6)] text-white`}
            initial={{
                fontSize: "1rem"
            }}
            animate={{
                fontSize: isSidebarMinimize ? "1.3rem" : "1rem"
            }}
            >{displayName}</motion.span >
        </div>
    )
}

export default SidebarLogo
