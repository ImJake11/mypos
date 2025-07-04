

import React from 'react'
import {motion} from "framer-motion";

const InventoryLoadingState = () => {
    return (
        <motion.div className='main-background-gradient w-full h-full overflow-hidden grid grid-cols-6 gap-5 p-5 '
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

                return <div key={i} className='w-full h-[20rem] bg-[var(--main-bg-primary-dark)] rounded-[20px] p-5 flex flex-col justify-around'>
                    <div className='rounded-[12px] h-[50%] w-full] bg-[var(--main-bg-secondary-dark)]'></div>
                    <div className='rounded-[12px] h-[1rem] w-full] bg-[var(--main-bg-secondary-dark)]'></div>
                    <div className='w-[4rem] h-[4rem] rounded-full bg-[var(--main-bg-secondary-dark)]'></div>
                </div>
            })}
        </motion.div>
    )
}

export default InventoryLoadingState
