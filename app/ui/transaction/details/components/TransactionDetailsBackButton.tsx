'use client';

import { TransactionIcon } from '@/app/lib/icons/transactionIcon';
import { useRouter } from 'next/navigation';
import React from 'react'

const TransactionDetailsBackButton = () => {

    const router = useRouter();

    return (
        <button className='w-fit min-h-[3rem] button-primary-gradient flex gap-3 items-center rounded-[50px] p-[0_20px] place-self-center' onClick={() => router.back()}><TransactionIcon /> Back to Transactions</button>
    )
}

export default TransactionDetailsBackButton
