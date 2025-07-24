"use client";

import React from 'react'
import { TransactionIcon } from '@/app/lib/icons/transactionIcon'
import { motion } from "framer-motion"

interface Prop {
    title: string,
    content: string,
    icon: React.JSX.Element,
    performanceValue: number,
    isPositivePerformance: boolean,
}
const DashboardSummaryTile = () => {
    return (
        <motion.div className='flex-1/4 bg-[var(--main-bg-primary)] rounded-[8px] shadow- min-h-[6rem] flex p-2 gap-2'

            style={{
                boxShadow: "0px 1px 5px rgb(0,0,0,.2)",
            }}
            whileHover={{
                boxShadow: "0px 5px 7px rgb(0,0,0,.5)"
            }}
        >

            <div className='w-[2rem] h-full grid place-content-center'>
                <TransactionIcon size={20} attr='opacity-100' />
            </div>

            <div className='flex-1 flex flex-col justify-center'>
                <span className='text-[1rem] font-[600]'>20312</span>
                <span className='text-gray-500 text-[.6rem]'>Today Net Sales</span>
            </div>

            <div className='w-fit h-fit p-[1px_4px] bg-red-500/20 rounded-[10px] grid place-content-center place-self-end text-red-600 text-[.6rem]'>
                + 3.2 %
            </div>

        </motion.div>
    )
}

export default DashboardSummaryTile
