
import ArrowToRight from '@/app/lib/icons/arrowToRight'
import { TransactionIcon } from '@/app/lib/icons/transactionIcon'
import { TransactionDetailsModel } from '@/app/lib/models/transactionModel'
import { useFormatDateOnly, useFormatTime } from '@/app/lib/utils/services/dateFormatter'
import React from 'react'

const TransactionTile = ({
    data
}: {
    data: TransactionDetailsModel
}) => {

    const date = data.date;

    return (
        <div className='w-full flex min-h-[4rem] bg-[var(--main-bg-primary-dark)] border-b-[var(--main-bg-secondary-dark)] border-b p-2 justify-center items-start'>
            <TransactionIcon size={22} opacity={.2} />
            <div className='flex-1 h-full flex flex-col gap-2 ml-5'>
                <div className='w-[8rem]'>{useFormatDateOnly(date!)}</div>
                <div className='flex opacity-40 pl-4'>
                    <span className='w-[1rem] grid place-content-center'>-</span>
                    <div className='w-[8rem]'>{useFormatTime(date!)}</div>
                </div>
            </div>
            <div className='w-[9rem] flex items-center justify-between h-full'>
                <span className='flex gap-5'>₱ {data.netTotal.toLocaleString('en-us')}</span>
                <ArrowToRight color='var(--main-bg-secondary-dark)' size={16} />
            </div>
        </div>
    )
}

export default TransactionTile
