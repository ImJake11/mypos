import React from 'react'
import { motion } from "framer-motion";
import { useWindowSize } from '@/app/lib/utils/hooks/useGetWindowSize';

const InventoryLoadingState = () => {

    const { width } = useWindowSize()

    const isXSmall = width < 576;

    return (
        <motion.div className={`bg-[var(--main-bg-secondary)] dark:bg-[var(--main-bg-secondary-dark)] w-full h-full overflow-hidden grid gap-2 p-2
            ${isXSmall ? "grid-cols-2" : "grid-cols-6 "}
            `}
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            exit={{
                opacity: 0,
            }}
        >
            {Array.from({ length: 15 }).map((_, i) => {

                return <div key={i} className='w-full h-[250px] bg-[var(--main-bg-primary)] dark:bg-[var(--main-bg-primary-dark)] rounded-[8px] p-2 flex flex-col justify-around'>
                    <div className='rounded-[12px] h-[50%] w-full] bg-[var(--main-bg-secondary)] dark:bg-[var(--main-bg-secondary-dark)]'></div>
                    <div className='rounded-[12px] h-[1rem] w-full] bg-[var(--main-bg-secondary)] dark:bg-[var(--main-bg-secondary-dark)]'></div>
                    <div className='w-[2rem] h-[2rem] rounded-full bg-[var(--main-bg-secondary)] dark:bg-[var(--main-bg-secondary-dark)]'></div>
                </div>
            })}
        </motion.div>
    )
}

export default InventoryLoadingState
