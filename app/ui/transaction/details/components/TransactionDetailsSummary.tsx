'use client';

import { PaymentMethod } from '@/app/lib/enum/paymentMethod';
import { TransactionDetailsModel } from '@/app/lib/models/transactionModel'
import React from 'react'
import TransactionDetailsTile from './TransactionDetailsTile';
import { IconFileDescriptionFilled } from '@tabler/icons-react';
import { useWindowSize } from '@/app/lib/utils/hooks/useGetWindowSize';

const TransactionDetailsSummary = ({ data }: { data: TransactionDetailsModel }) => {

    const {
        paymentMethod, purchasedItems,
        date,
        referenceId,
        transactionId,
    } = data;

    function getTransactionIDAsPrivate() {

        const id = transactionId!;

        const parts = id.split("-");

        const masked = [parts[0], ...parts.slice(1).map(() => "*******")].join("-");

        return masked;
    }


    return (
        <div className={`w-full h-fit rounded-[12px] flex flex-col gap-2 bg-gray-50 p-3 md:p-5`}>
            <div className='flex w-full gap-2 items-center mb-[1rem]'>
                <IconFileDescriptionFilled size={20} className='fill-gray-500' />
                <span className='text-[1rem]'>Details</span>
            </div>

            <TransactionDetailsTile data={new Date(date!).toLocaleDateString("en-US", { dateStyle: "long" })} title='Date' />
            <TransactionDetailsTile data={new Date(date!).toLocaleTimeString("en-US", { timeStyle: "short", timeZone: "Asia/Manila" })} title='Time' />
            <TransactionDetailsTile data={getTransactionIDAsPrivate()} title='Transaction ID' />
            <TransactionDetailsTile data={purchasedItems.length} title='Number of Items' />
            {paymentMethod === PaymentMethod.E_WALLET && <TransactionDetailsTile data={referenceId} title='Reference ID' />}
        </div>
    )
}

export default TransactionDetailsSummary
