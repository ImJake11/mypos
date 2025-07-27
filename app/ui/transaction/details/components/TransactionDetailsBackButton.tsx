'use client';

import { TransactionStatus } from '@/app/lib/enum/transactionStatus';
import { IconArrowBackUpDouble, IconProgressX, IconTransitionLeftFilled } from '@tabler/icons-react';
import Link from 'next/link';
import React, { useState } from 'react'
import TransactionDetailsVoidConfirmationPrompt from './TransactionDetailsVoidConfirmationPrompt';

const TransactionDetailsActions = ({
    id,
    status
}: {
    id: string,
    status: string,
}) => {
    const [isVoid, setIsVoid] = useState(false);
    const isComplete = status === TransactionStatus.COMPLETED;

    if (isVoid) return <TransactionDetailsVoidConfirmationPrompt onCancel={() => setIsVoid(false)} id={id} />;

    return (
        <div className='w-full flex flex-col gap-2'>
            <div className='flex w-full gap-2'>
                <Link href={`/ui/transaction`}>
                    <button className='text-white w-fit min-h-[2rem] button-primary-gradient flex gap-3 items-center rounded-[4px] p-[0_10px] place-self-center'>
                        <IconTransitionLeftFilled size={20} />
                        Back to Transactions
                    </button>
                </Link>

                <div className='flex-1' />
                {isComplete && <Link href={`/ui/transaction/refund-page/${id}`}>
                    <button className='w-fit min-h-[2rem] border border-[var(--color-brand-primary)] flex gap-3 items-center rounded-[8px] p-[0_20px] text-[var(--color-brand-primary)] place-self-center' >
                        <IconArrowBackUpDouble size={20} className='stroke-[var(--color-brand-primary)]' />
                        Initiate Refund
                    </button>
                </Link>}

                {isComplete && <button className='w-fit min-h-[2rem] text-red-500 border border-red-500 flex gap-3 items-center rounded-[8px] p-[0_20px] place-self-center' onClick={() => setIsVoid(true)}
                >
                    <IconProgressX size={20} className='stroke-red-500' />
                    Void Transaction
                </button>}
            </div>
        </div>
    )
}

export default TransactionDetailsActions
