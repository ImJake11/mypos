

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { AnimatePresence, motion } from 'framer-motion';
import MenuALTIcon from '../../../icons/MenuALTIcon';
import { sidebarToggleSidebar } from '../../../redux/slice/sidebarSlice';

const SidebarFloatingToggle = () => {
    const dispatch = useDispatch();

    const { isSidebarMinimize, isFloatingVisible } = useSelector((state: RootState) => state.sidebarSlice);

    const handleClick = () => {
        dispatch(sidebarToggleSidebar(!isSidebarMinimize))
    }

    return (
        <AnimatePresence>
            {isFloatingVisible && <motion.div className='w-[2rem] h-[2rem] rounded-full absolute left-[102%] top-2 grid place-content-center bg-[var(--main-bg-primary)]  border border-[var(--color-brand-primary)]'
                initial={{
                    opacity: 0,
                    x: "-40%",
                }}
                animate={{
                    opacity: 1,
                    x: "0%"
                }}
                exit={{
                    opacity: 0,
                    x: "-40%",
                }}

                transition={{
                    opacity: {
                        duration: .3,
                    },
                    x: {
                        duration: .1
                    }
                }}
                onClick={handleClick}
            >
                <MenuALTIcon size={20} />
            </motion.div>}
        </AnimatePresence>
    )
}

export default SidebarFloatingToggle
