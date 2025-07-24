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
                <button className='text-white w-fit min-h-[2rem] button-primary-gradient flex gap-3 items-center rounded-[8px] p-[0_20px] place-self-center'><TransactionIcon attr='fill-white' /> Back to Transactions</button>
            </Link>

            <div className='flex-1' />
            <Link href={`/ui/transaction/refund-page/${id}`}>
                <button className='w-fit min-h-[2rem] border border-[var(--color-brand-primary)] flex gap-3 items-center rounded-[8px] p-[0_20px] text-[var(--color-brand-primary)] place-self-center' ><TransactionIcon attr='fill-[var(--color-brand-primary)] tex-[var(--color-brand-primary)]' /> Initiate Refund</button>
            </Link>

            <button className='w-fit min-h-[2rem] text-red-500 border border-red-500 flex gap-3 items-center rounded-[8px] p-[0_20px] place-self-center'><TransactionIcon attr='fill-red-500' /> Void Transaction</button>
        </div>
    )
}

export default TransactionDetailsActions
