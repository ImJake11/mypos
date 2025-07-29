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

    const { width } = useWindowSize();

    const isMobile = width < 576;

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

        const color = "stroke-gray-300";
        const size = isMobile ? 30 : 70;

        if (status === TransactionStatus.COMPLETED) {
            return <IconChecks size={size} className={color} />

        } else if (status === TransactionStatus.REFUND) {
            return <IconArrowBackUpDouble size={size} className={color} />

        } else {
            return <IconProgressX size={size} className={color} />
        }
    }


    return (
        <div className='w-full flex gap-3'>
            <div className={` rounded-full relative grid place-content-center bg-gray-100 border-white border-[5px]
            ${isMobile ? "w-[5rem] h-[5rem]" : "w-[10rem] aspect-square"}
            `}
            >
                {generateStatusIcon()}

                {/** payment provider icon container */}
                <div className={`absolute -right-2 bottom-0  rounded-full grid place-content-center bg-gray-100 border-[5px] border-white
                ${isMobile ? "w-[2rem] h-[2rem]" : " w-[3rem] aspect-square"}
                `}
                >
                    {getPaymentProviderIcon() ? <img src={getPaymentProviderIcon()} alt="img" width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} /> : <span className='text-[1.5rem] font-bold'>C</span>}
                </div>

            </div>

            {/** details */}
            <div className={`flex-1 flex flex-col justify-en ${isMobile ? "gap-1" : "gap-3"}`}>
                <span>paid via <span className='font-bold'>{paymentMethod}</span>
                </span>

                {/** total */}
                <span className={`font-bold ${isMobile ? "text-[1rem]" : "text-[1.5rem]"}`}>{Number(netTotal).toLocaleString('en-US', {
                    style: "currency",
                    currency: "PHP"
                })}</span>
                <div className={`overflow-hidden rounded-[50px] grid place-content-center bg-white
                ${isMobile ? "h-[2rem] w-[6rem] text-[.6rem]" : "h-[3rem] w-[10rem]"}
                `}
                >
                    {status.toUpperCase()}
                </div>
            </div>
        </div>
    )
}

export default TransactionDetailsStatus
