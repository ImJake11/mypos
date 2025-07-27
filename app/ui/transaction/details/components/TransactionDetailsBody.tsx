
import { TransactionDetailsModel } from '@/app/lib/models/transactionModel';
import React from 'react'
import TransactionDetailsSummary from './TransactionDetailsSummary';
import TransactionDetailsSales from './TransactionDetailsSales';
import TransactionDetailsItems from './TransactionDetailsItems';
import TransactionDetailsStatus from './TransactionDetailsStatus';
import { TransactionStatus } from '@/app/lib/enum/transactionStatus';
import TransactionDetailsBackButton from './TransactionDetailsBackButton';

const TransactionDetailsBody = async ({ data }: { data: TransactionDetailsModel }) => {

    const generateStatusColor = (): string => {

        const { status } = data;

        if (status === TransactionStatus.COMPLETED) {
            return "var(--transaction-successful)";

        } else if (status === TransactionStatus.REFUND) {
            return "var(--transaction-returned)";
        } else {
            return "var(--transaction-void)";
        }
    }

    return (
        <div className='flex-1 rounded-[12px] p-5 overflow-hidden text-[.8rem]' style={{
            backgroundColor: "var(--main-bg-secondary)"
        }}>
            <div className='w-full h-full rounded-[12px] flex overflow-auto flex-col gap-7 p-6' style={{
                backgroundColor: "var(--main-bg-primary)",
                backgroundImage: `linear-gradient(180deg, ${generateStatusColor()}, var(--main-bg-primary), var(--main-bg-primary), var(--main-bg-primary))`
            }}>

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
