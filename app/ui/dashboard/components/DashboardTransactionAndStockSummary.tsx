'use client'

import { TransactionIcon } from '@/app/lib/icons/transactionIcon'
import React from 'react'
import {motion}from "framer-motion";

const DashboardTransactionAndStockSummary = () => {
    return (
        <motion.div className='min-h-[25rem] flex-1/3 rounded-[8px] bg-[var(--main-bg-primary)] p-3'

        style={{
            boxShadow: "0px 1px 5px rgb(0,0,0,.2)",
        }}

        whileHover={{
            boxShadow: "0px 2px 7px rgb(0,0,0,.5)",
        }}
        >
            <div className='flex w-full gap-3 items-center'>
                <TransactionIcon attr='opacity-60' size={24} />
                <span className='text-[1rem] font-[600]'>Products on Low Stock</span>
            </div>
        </motion.div>
    )
}

export default DashboardTransactionAndStockSummary
