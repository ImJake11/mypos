'use client';

import { gcashIcon, mastercartIcon, mayaIcon } from '@/app/lib/constants/IconLink'
import { PaymentMethod, PaymentProvider } from '@/app/lib/enum/paymentMethod'
import ArrowToRight from '@/app/lib/icons/arrowToRight'
import { TransactionIcon } from '@/app/lib/icons/transactionIcon'
import { TransactionDetailsModel } from '@/app/lib/models/transactionModel'
import { useFormatDateOnly, useFormatTime } from '@/app/lib/utils/services/dateFormatter'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React from 'react'

const TransactionTile = ({
    data
}: {
    data: TransactionDetailsModel
}) => {
    const router = useRouter();

    const date = data.date;

    const getProviderIcon = (): string => {
        if (!data.paymentProvider) return "";

        switch (data.paymentProvider) {
            case PaymentProvider.GCASH:
                return gcashIcon;
            case PaymentProvider.MAYA:
                return mayaIcon;
            default:
                return mastercartIcon;
        }
    }

    return (
        <div className='w-full flex items-center min-h-[3rem]  bg-[var(--main-bg-primary-dark)] border-b-[var(--main-bg-secondary-dark)] border-b text-[.9rem] relative'>


            {/** date */}
            <span className='flex-1 justify-center flex gap-2 items-center'>{useFormatDateOnly(date!)}</span>

            {/** id */}
            <span className='text-[var(--foreground-lighter)] flex-2 text-center'>{data.transactionId}</span>

            {/** amount */}
            <span className='flex-1 text-center'>₱ {data.netTotal.toLocaleString("en-us", {
                style: "currency"
            })}</span>

            {/** status */}
            <span className='flex-1 text-center'>{data.status}</span>

            {/** method */}
            <div className='flex-1 grid place-content-center'>
                {data.paymentProvider ? <img src={getProviderIcon()} width={25} alt="icon" /> : "Cash"}
            </div>

            <div className='flex-1 grid place-content-center'>
                <Link href={`/ui/transaction/details/${data.transactionId}`}>
                    <span className='underline underline-offset-4 text-[var(--color-brand-primary)] cursor-pointer'
                    >Details</span>
                </Link>
            </div>

            <div className='absolute left-2'>
                <TransactionIcon size={18} opacity={.2} />
            </div>
        </div>
    )
}

export default TransactionTile
