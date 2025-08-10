

import { motion } from 'framer-motion'
import { Audiowide } from 'next/font/google';
import React from 'react'

const audioWide = Audiowide({
    weight: ['400'],
    subsets: ['latin'],
    style: "normal",
    display: 'swap',
    variable: '--font-poppins',
});

const Logo = () => {
    return (
        <motion.span className={`${audioWide.className} text-shadow-[3px_2px_3px_rgb(0,0,0,.6)] text-white text-[1rem] w-full text-center`}
        >NEXU<span className='text-[var(--color-brand-primary)]'>STOCK</span></motion.span >
    )
}

export default Logo
