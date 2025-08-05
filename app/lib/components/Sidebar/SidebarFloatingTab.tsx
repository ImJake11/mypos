'use client'

import React from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { AnimatePresence, motion } from 'framer-motion'
import { sidebarOpen } from '../../redux/slice/sidebarSlice'

const SidebarFloatingTab = () => {
    const dispatch = useDispatch();

    const { isVisible } = useSelector((state: RootState) => state.sidebarSlice);

    return (
        <AnimatePresence>
            {isVisible && (<motion.div className='w-screen h-screen absolute bg-black/60'
                onClick={() => dispatch(sidebarOpen(false))}

                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                exit={{
                    opacity: 0
                }}
            >
                <Sidebar isFloating={true} />
            </motion.div>)}
        </AnimatePresence>
    )
}

export default SidebarFloatingTab
