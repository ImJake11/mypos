'use client';

import React from 'react'
import { motion } from "framer-motion";

const CircularLoadingIndicator = ({ size, borderWidth = 3 }: { size: number, borderWidth?: number }) => {
    return (
        <motion.div className={`rounded-full
        border-b-white
        border-l-white
        border-r-[var(--color-brand-primary)]
        border-t-[var(--color-brand-primary)]`}
            style={{
                borderWidth: `${borderWidth}px`,
                width: `${size}px`,
                height: `${size}px`,
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
