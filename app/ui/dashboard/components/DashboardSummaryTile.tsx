"use client";

import React from 'react'
import { motion } from "framer-motion"
import AnimateNumber from '@/app/lib/components/AnimateNumber';
import { useWindowSize } from '@/app/lib/utils/hooks/useGetWindowSize';

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
    accentColor = "to-[var(--main-bg-primary)] dark:to-[var(--main-bg-primary-dark)]",
}: Prop) => {

    const fixedPastValue = pastValue === 0 ? 1 : pastValue;

    const performanceValue: number = ((currentValue - pastValue) / fixedPastValue) * 100;

    const isPositive = currentValue > pastValue;

    return (
        <motion.div className={`flex-1/4 bg-linear-to-b from-[var(--main-bg-primary)] dark:from-[var(--main-bg-primary-dark)] ${accentColor} rounded-[8px] shadow- min-h-[6rem] flex p-2 gap-2 shadow-[0px_1px_5px_rgb(0,0,0,.1)] dark:shadow-[0px_1px_5px_rgb(0,0,0,.5)] hover:shadow-[0px_1px_7px_rgb(0,0,0,.2)] hover:dark:shadow-[0px_1px_7px_rgb(0,0,0,.8)]`}
        >
            <div className='w-fit h-full grid place-content-center'>
                <div className="w-[2.5rem] h-[2.5rem] rounded-full bg-gray-100 dark:bg-[var(--main-bg-secondary-dark)] grid place-content-center text-gray-400">
                    <React.Fragment>
                        {icon}
                    </React.Fragment>
                </div>
            </div>

            <div className='flex-1 flex flex-col justify-center'>
                <motion.span className="font-semibold">
                    <AnimateNumber isCurrency={isCurrency} value={Number(currentValue)} />
                </motion.span>
                <span className='text-gray-500 dark:text-gray-300 text-[.7rem]'>{title}</span>
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
