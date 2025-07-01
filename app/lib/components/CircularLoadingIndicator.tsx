

import React from 'react'
import { motion } from "framer-motion";

const CircularLoadingIndicator = ({ size }: { size: number }) => {
    return (
        <motion.div className='rounded-full border-[3px] 
        border-b-white
        border-l-white
        border-r-[var(--color-brand-primary)]
        border-t-[var(--color-brand-primary)]
        '
            style={{
                width: `${size}px`,
                height: `${size}px`
            }}

            animate={{
                rotateZ: "360deg"
            }}

            transition={{
                repeat: Infinity,
                duration: .3,
                repeatType: "loop"
            }}
        >

        </motion.div>
    )
}

export default CircularLoadingIndicator
