
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

        const color = "var(--main-bg-secondary-dark)";
        const size = 70;

        if (status === TransactionStatus.COMPLETED) {
            return "var(--transaction-successful)";

        } else if (status === TransactionStatus.REFUND) {
            return "var(--transaction-returned)";
        } else {
            return "var(--transaction-void)";
        }
    }

    return (
        <div className='flex-1 rounded-[12px] p-5 overflow-hidden' style={{
            backgroundColor: "var(--main-bg-secondary-dark)"
        }}>
            <div className='w-full h-full rounded-[12px] flex overflow-auto flex-col gap-7 p-6' style={{
                backgroundColor: "var(--main-bg-primary-dark)",
                backgroundImage: `linear-gradient(180deg, ${generateStatusColor()}, var(--main-bg-primary-dark), var(--main-bg-primary-dark), var(--main-bg-primary-dark))`
            }}>

                <TransactionDetailsStatus data={data} />
                <TransactionDetailsSummary data={data} />
                <TransactionDetailsItems data={data} />
                <TransactionDetailsSales data={data} />

                <div className='h-[2rem]' />
               <TransactionDetailsBackButton />
            </div>

        </div>
    )
}




export default TransactionDetailsBody
