'use client';

import { gcashIcon, mastercartIcon, mayaIcon } from '@/app/lib/constants/IconLink';
import { PaymentMethod, PaymentProvider } from '@/app/lib/enum/paymentMethod';
import { TransactionStatus } from '@/app/lib/enum/transactionStatus';
import { TransactionDetailsModel } from '@/app/lib/models/transactionModel'
import { useWindowSize } from '@/app/lib/utils/hooks/useGetWindowSize';
import { IconArrowBackUpDouble, IconChecks, IconProgressX } from '@tabler/icons-react';
import React from 'react'

const TransactionDetailsStatus = ({ data }: { data: TransactionDetailsModel }) => {

    const {
        status,
        paymentMethod,
        paymentProvider,
        netTotal,
    } = data;

    const getPaymentProviderIcon = (): string => {
        if (paymentMethod === PaymentMethod.CASH) return "";

        if (paymentProvider === PaymentProvider.GCASH) {
            return gcashIcon;
        } else if (paymentProvider === PaymentProvider.MASTERCARD) {
            return mastercartIcon;
        } else {
            return mayaIcon;
        }
    }

    const generateStatusIcon = (): React.JSX.Element => {

        const color = "stroke-gray-300 h-[2rem] w-[2rem]  md:h-[4rem] md:w-[4rem]";

        if (status === TransactionStatus.COMPLETED) {
            return <IconChecks className={color} />

        } else if (status === TransactionStatus.REFUND) {
            return <IconArrowBackUpDouble className={color} />

        } else {
            return <IconProgressX className={color} />
        }
    }


    return (
        <div className='w-full flex gap-3'>
            <div className={` rounded-full relative grid place-content-center bg-gray-100 dark:bg-[var(--main-bg-secondary-dark)] border-white dark:border-[var(--main-bg-primary-dark)] border-[5px] w-[5rem] h-[5rem] md:w-[8rem] md:h-[8rem]`}
            >
                {generateStatusIcon()}

                {/** payment provider icon container */}
                <div className={`absolute -right-2 bottom-0  rounded-full grid place-content-center bg-gray-100 dark:bg-[var(--main-bg-primary-dark)] border-[5px] border-white dark:border-[var(--main-bg-primary-dark)] w-[2rem] h-[2rem] md:w-[3rem] md:h-[3rem]`}
                >
                    {getPaymentProviderIcon() ? <img src={getPaymentProviderIcon()} alt="img" className='w-[15px] h-[15px] md:h-[20px] md:w-[20px]' /> : <span className='text-[1.5rem] font-bold'>C</span>}
                </div>

            </div>

            {/** details */}
            <div className={`flex-1 flex flex-col justify-en gap-1 md:gap-3}`}>
                <span>paid via <span className='font-bold'>{paymentMethod}</span>
                </span>

                {/** total */}
                <span className={`font-bold text-[1rem] md:text-[1.5rem]`}>{Number(netTotal).toLocaleString('en-US', {
                    style: "currency",
                    currency: "PHP"
                })}</span>
                <div className={`overflow-hidden rounded-[50px] grid place-content-center bg-white dark:bg-[var(--main-bg-primary-dark)] h-[2rem] w-[6rem] text-[.6rem] md:text-[1rem] md:h-[3rem] md:w-[10rem]`}
                >
                    {status.toUpperCase()}
                </div>
            </div>
        </div>
    )
}

export default TransactionDetailsStatus
