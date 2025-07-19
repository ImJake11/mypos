'use client';

import { TransactionIcon } from '@/app/lib/icons/transactionIcon';
import { useRouter } from 'next/navigation';
import React from 'react'

const TransactionDetailsActions = ({
    id,
}: { id: string }) => {

    const router = useRouter();

    return (
        <div className='flex w-full gap-2'>
            <button className='w-fit min-h-[2rem] button-primary-gradient flex gap-3 items-center rounded-[8px] p-[0_20px] place-self-center' onClick={() => router.back()}><TransactionIcon /> Back to Transactions</button>

            <div className='flex-1' />
            <button className='w-fit min-h-[2rem] button-primary-gradient flex gap-3 items-center rounded-[8px] p-[0_20px] place-self-center' onClick={() => router.push(`/ui/transaction/refund-page/${id}`)}><TransactionIcon /> Initiate Refund</button>

            <button className='w-fit min-h-[2rem] button-primary-gradient-error flex gap-3 items-center rounded-[8px] p-[0_20px] place-self-center' onClick={() => router.back()}><TransactionIcon /> Void Transaction</button>
        </div>
    )
}

export default TransactionDetailsActions
