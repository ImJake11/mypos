'use client';

import { TransactionDetailsModel } from '@/app/lib/models/transactionModel';
import React from 'react'
import TransactionDetailsSummary from './TransactionDetailsSummary';
import TransactionDetailsSales from './TransactionDetailsSales';
import TransactionDetailsItems from './TransactionDetailsItems';
import TransactionDetailsStatus from './TransactionDetailsStatus';
import { TransactionStatus } from '@/app/lib/enum/transactionStatus';
import TransactionDetailsBackButton from './TransactionDetailsBackButton';
import { useWindowSize } from '@/app/lib/utils/hooks/useGetWindowSize';

const TransactionDetailsBody = ({ data }: { data: TransactionDetailsModel }) => {

    const generateStatusColor = (): string => {

        const { status } = data;

        if (status === TransactionStatus.COMPLETED) {
            return "bg-green-500/30";

        } else if (status === TransactionStatus.REFUND) {
            return "bg-orange-500/30";
        } else {
            return "bg-red-500/30";
        }
    }

    return (
        <div className={`flex-1 rounded-[12px] overflow-hidden text-[.8rem] p-3 md:p-5`} style={{
            backgroundColor: "var(--main-bg-secondary)"
        }}>
            <div className={`w-full h-full rounded-[12px] flex overflow-auto flex-col ${generateStatusColor()} p-3 gap-2 md:p-5 md:gap-5`}>

                <TransactionDetailsStatus data={data} />
                <TransactionDetailsSummary data={data} />
                <TransactionDetailsItems data={data} />
                <TransactionDetailsSales data={data} />

                <div className='h-[2rem]' />
                <TransactionDetailsBackButton id={data.transactionId!} status={data.status} />
            </div>

        </div>
    )
}




export default TransactionDetailsBody
