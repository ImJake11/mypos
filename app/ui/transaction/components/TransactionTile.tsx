'use client';

import { gcashIcon, mastercartIcon, mayaIcon } from '@/app/lib/constants/IconLink'
import { PaymentProvider } from '@/app/lib/enum/paymentMethod'
import { TransactionIcon } from '@/app/lib/icons/transactionIcon'
import { TransactionDetailsModel } from '@/app/lib/models/transactionModel'
import { useWindowSize } from '@/app/lib/utils/hooks/useGetWindowSize';
import { useFormatDateOnly } from '@/app/lib/utils/services/dateFormatter'
import Link from 'next/link';
import React from 'react'

const TransactionTile = ({
    data
}: {
    data: TransactionDetailsModel
}) => {

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

        <div className={`w-full flex items-center min-h-[3rem] bg-[var(--main-bg-primary)] dark:bg-[var(--main-bg-primary-dark)] border-b-[var(--main-bg-secondary)] dark:border-b-[var(--main-bg-secondary-dark)] border-b relative
        `}>

            {/** date */}
            <span className='flex-1 justify-center flex gap-2 items-center text-nowrap'>{useFormatDateOnly(date!)}</span>

            {/** id */}
            <span className='text-[var(--foreground-lighter)] flex-2 text-center hidden lg:block'>{data.transactionId}</span>

            {/** amount */}
            <span className='flex-1 text-center'>{Number(data.netTotal).toLocaleString("en-us", {
                style: "currency",
                currency: "PHP"
            })}</span>

            {/** status */}
            <span className='flex-1 text-center'>{data.status}</span>

            {/** method */}
            <div className='flex-1 grid place-content-center'>
                {data.paymentProvider ? <img src={getProviderIcon()} width={25} alt="icon" /> : "Cash"}
            </div>

            <div className='flex-1  place-content-center hidden md:grid md:visible'>
                <Link href={`/ui/transaction/details/${data.transactionId}`}>
                    <span className='underline underline-offset-4 text-[var(--color-brand-primary)] cursor-pointer'
                    >Details</span>
                </Link>
            </div>

            <div className='absolute left-2'>
                <TransactionIcon size={18} opacity={.2} />
            </div>

            <Link href={`/ui/transaction/details/${data.transactionId}`}> <div className='inset-0 absolute' /></Link>
        </div>

    )
}

export default TransactionTile
