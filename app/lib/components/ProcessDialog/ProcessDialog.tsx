"use client"

import React from 'react';
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useWindowSize } from '../../utils/hooks/useGetWindowSize';

const ProcessDialog = () => {

    const processSlice = useSelector((state: RootState) => state.processSlice)

    const { maxValue, currentValue, message, isOpen } = processSlice;

    const w = useWindowSize().width;

    const isMobile = w < 576;

    if (!isOpen) return null;

    return (
        <div className='w-screen h-screen absolute bg-gray-900/90'
        >
            <div className={`
            ${isMobile && "w-[70vw] h-[30vh]"}
            w-[40vw] h-[30vh] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-[11px] bg-white dark:bg-[var(--main-bg-primary-dark)]`}
            >
                <span className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 font-semibold italic' >{message}</span>

                {/** loadin indicator */}
                <div className='overflow-hidden w-[70%] h-[1rem] rounded-[20px] border  border-gray-200 absolute top-1/2 left-1/2 translate-y-[2rem] -translate-x-1/2'>
                    <div className='w-full h-full bg-gray-100 overflow-hidden flex justify-start'>
                        <motion.div className={`bg-linear-120 from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] h-full rounded-[10px]`}
                            animate={{
                                width: `${(currentValue / maxValue) * 100}%`
                            }}

                            transition={{
                                ease: "easeInOut"
                            }}
                        ></motion.div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProcessDialog
