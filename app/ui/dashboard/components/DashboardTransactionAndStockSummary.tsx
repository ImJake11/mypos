'use client'

import React from 'react'
import { motion } from "framer-motion";

const DashboardTransactionAndStockSummary = ({
    icon,
    title,
    child,
}: {
    icon?: React.JSX.Element,
    title?: string,
    child?: React.JSX.Element,
}) => {
    return (
        <motion.div className='min-h-[25rem] max-h-[25rem] flex-1/3 rounded-[8px] bg-[var(--main-bg-primary)] p-3 flex flex-col overflow-hidden'

            style={{
                boxShadow: "0px 1px 5px rgb(0,0,0,.2)",
            }}

            whileHover={{
                boxShadow: "0px 2px 7px rgb(0,0,0,.5)",
            }}
        >
            <div className='flex w-full gap-3 items-center'>
                <div className='w-[2rem] h-[2rem] rounded-full bg-gray-300/40 grid place-content-center'>
                    <React.Fragment>
                        {icon}
                    </React.Fragment>
                </div>
                <span className='text-[1rem] font-[500]'>
                    {title}
                </span>
            </div>

            {/** content */}
            <div className='w-full h-[21.5rem]'>{child}</div>
        </motion.div>
    )
}

export default DashboardTransactionAndStockSummary
