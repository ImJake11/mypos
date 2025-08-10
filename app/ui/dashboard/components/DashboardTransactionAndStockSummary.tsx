'use client'

import React from 'react'
import { motion } from "framer-motion";
import { useWindowSize } from '@/app/lib/utils/hooks/useGetWindowSize';

const DashboardTransactionAndStockSummary = ({
    icon,
    title,
    child,
    subTitle,
}: {
    icon?: React.JSX.Element,
    title?: string,
    child?: React.JSX.Element,
    subTitle?: string,
}) => {

    const { width } = useWindowSize();

    const isMedium = width <= 768;

    return (
        <motion.div className={`rounded-[8px] bg-[var(--main-bg-primary)] dark:bg-[var(--main-bg-primary-dark)] p-3 flex flex-col overflow-hidden
            ${isMedium ? "h-full min-w-[20rem]" : "min-h-[25rem] max-h-[25rem] flex-1/3"}
            `}

            style={{
                boxShadow: "0px 1px 5px rgb(0,0,0,.2)",
            }}

            whileHover={{
                boxShadow: "0px 2px 7px rgb(0,0,0,.5)",
            }}
        >
            <div className='flex w-full gap-3 items-center'>
                <div className='w-[2.5rem] h-[2.5rem] rounded-full bg-gray-300/40 dark:bg-[var(--main-bg-secondary-dark)] grid place-content-center'>
                    <React.Fragment>
                        {icon}
                    </React.Fragment>
                </div>
                <span className='text-[1rem] flex-1 flex flex-col font-[500]'>
                    <span>{title}</span>
                    <span className='text-[.6rem] text-gray-400'>{subTitle}</span>
                </span>
            </div>

            {/** content */}
            <div className='w-full h-[21.5rem]'>{child}</div>
        </motion.div>
    )
}

export default DashboardTransactionAndStockSummary
