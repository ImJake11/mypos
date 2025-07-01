"use client"

import { motion } from "framer-motion";
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ProcessDialog = () => {

    const processSlice = useSelector((state: RootState) => state.processSlice)

    const { maxValue, currentValue, message, isOpen } = processSlice;

    if (!isOpen) return null;

    return (
        <div className='w-screen h-screen absolute'
            style={{
                backgroundColor: "rgba(0,0,0, .8)"
            }}
        >

            <div className='w-[50vw] md:w-[30vw] h-[40vh]  absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-[11px]'
                style={{
                    backgroundColor: "var(--main-bg-primary-dark)"
                }}
            >
                <span className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 font-semibold italic' >{message}</span>

                {/** loadin indicator */}
                <div className='overflow-hidden w-[70%] h-[1rem] rounded-[20px] border  border-gray-200 absolute top-1/2 left-1/2 translate-y-[2rem] -translate-x-1/2'>
                    <div className='w-full h-full bg-gray-100 overflow-hidden flex justify-start'>
                        <motion.div className={`button-primary-gradient h-full rounded-[10px]`}
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
