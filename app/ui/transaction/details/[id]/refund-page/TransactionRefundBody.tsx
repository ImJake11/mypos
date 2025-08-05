'use client';

import Appbar from '@/app/lib/components/Appbar/Appbar'
import React from 'react'
import TransactionRefundList from './TransactionRefundExistingItemList'
import TransactionRefundReturnItems from './TransactionRefundReturnItems'
import { useWindowSize } from '@/app/lib/utils/hooks/useGetWindowSize';

const TransactionRefundBody = () => {

    const w = useWindowSize().width;

    const isMobile = w < 576;

    return (
        <div className='w-full h-full flex flex-col'>
            <Appbar icon={
                <i className="ri-refund-line" />}
                title='Refund Transaction' />
            <div className={`flex-1 flex ${isMobile ? "flex-col overflow-auto" : "flex-row"}`}>
                <TransactionRefundList />
                <div className='flex-1'>
                    <TransactionRefundReturnItems />
                </div>
            </div>
        </div>
    )
}

export default TransactionRefundBody
