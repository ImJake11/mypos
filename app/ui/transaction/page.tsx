

import Sidebar from '@/app/lib/components/Sidebar/Sidebar'
import React from 'react'
import TransactionBody from './components/TransactionBody'
import TransactionFilterTab from './components/TransactionFilter/TransactionFilterTab'

const page = () => {
    return (
        <div className='w-screen h-screen flex overflow-hidden relative'>
            <Sidebar />
            <div className='flex-1 flex flex-col'>
                <div className='min-h-[5rem] w-full items-end text-[1.3rem] flex pl-5 bg-[var(--main-bg-primary-dark)] p-2.5'>
                    <span>Transaction</span>
                </div>
                <TransactionBody />
            </div>
            <TransactionFilterTab />
        </div>
    )
}

export default page
