'use client';

import { TransactionIcon } from '@/app/lib/icons/transactionIcon';
import Link from 'next/link';
import React from 'react'

const TransactionDetailsActions = ({
    id,
}: { id: string }) => {

    return (
        <div className='flex w-full gap-2'>
            <Link href={`/ui/transaction`}>
                <button className='w-fit min-h-[2rem] button-primary-gradient flex gap-3 items-center rounded-[8px] p-[0_20px] place-self-center'><TransactionIcon /> Back to Transactions</button>
            </Link>

            <div className='flex-1' />
            <Link href={`/ui/transaction/refund-page/${id}`}>
                <button className='w-fit min-h-[2rem] button-primary-gradient flex gap-3 items-center rounded-[8px] p-[0_20px] place-self-center' ><TransactionIcon /> Initiate Refund</button>
            </Link>

            <button className='w-fit min-h-[2rem] button-primary-gradient-error flex gap-3 items-center rounded-[8px] p-[0_20px] place-self-center'><TransactionIcon /> Void Transaction</button>
        </div>
    )
}

export default TransactionDetailsActions
