"use client";

import React from 'react'
import { motion } from "framer-motion"
import AnimateNumber from '@/app/lib/components/AnimateNumber';

interface Prop {
    title?: string,
    currentValue?: number,
    pastValue?: number,
    icon?: React.JSX.Element,
    isCurrency?: boolean,
    accentColor?: string,
    showPerformanceIndicator?: boolean,
}
const DashboardSummaryTile = ({
    title,
    currentValue = 0,
    pastValue = 0,
    icon,
    showPerformanceIndicator = true,
    isCurrency,
    accentColor = "to-[var(--main-bg-primary)]",
}: Prop) => {

    const fixedPastValue = pastValue === 0 ? 1 : pastValue;

    const performanceValue: number = ((currentValue - pastValue) / fixedPastValue) * 100;

    const isPositive = currentValue > pastValue;

    return (
        <motion.div className={`flex-1/4 bg-linear-to-b from-[var(--main-bg-primary)] ${accentColor} rounded-[8px] shadow- min-h-[6rem] flex p-2 gap-2`}

            style={{
                boxShadow: "0px 1px 5px rgb(0,0,0,.2)",
            }}
            whileHover={{
                boxShadow: "0px 5px 7px rgb(0,0,0,.5)"
            }}
        >

            <div className='w-[2.5rem] h-full grid place-content-center'>
                <div className='w-[2.5rem] h-[2.5rem] rounded-full bg-gray-300/40 grid place-content-center'>
                    <React.Fragment>
                        {icon}
                    </React.Fragment>
                </div>
            </div>

            <div className='flex-1 flex flex-col justify-center'>
                <motion.span className='text-[1rem] font-[600]'>
                    <AnimateNumber isCurrency={isCurrency} value={Number(currentValue)} />
                </motion.span>
                <span className='text-gray-500 text-[.7rem]'>{title}</span>
            </div>

            {showPerformanceIndicator && <div className={`${isPositive ? "text-green-500" : "text-red-500"}  w-fit h-fit p-[1px_4px] ${isPositive ? "bg-green-500/20" : "bg-red-500/20"} rounded-[10px] flex justify-between place-self-end text-[.6rem] gap-1`}>
                {isPositive && <span>+</span>}
                {performanceValue.toFixed(1)}
                <span>%</span>
            </div>}

        </motion.div>
    )
}

export default DashboardSummaryTile
