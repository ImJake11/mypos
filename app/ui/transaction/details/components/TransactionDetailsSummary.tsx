
import { PaymentMethod } from '@/app/lib/enum/paymentMethod';
import { TransactionDetailsModel } from '@/app/lib/models/transactionModel'
import React from 'react'
import TransactionDetailsTile from './TransactionDetailsTile';

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
        <div className='w-full h-fit rounded-[12px] flex flex-col gap-2 p-5 bg-gray-50'>
            <TransactionDetailsTile data={new Date(date!).toLocaleDateString("en-US", { dateStyle: "long" })} title='Date' />
            <TransactionDetailsTile data={new Date(date!).toLocaleTimeString("en-US", { timeStyle: "short", timeZone: "Asia/Manila" })} title='Time' />
            <TransactionDetailsTile data={getTransactionIDAsPrivate()} title='Transaction ID' />
            <TransactionDetailsTile data={purchasedItems.length} title='Number of Items' />
            {paymentMethod === PaymentMethod.E_WALLET && <TransactionDetailsTile data={referenceId} title='Reference ID' />}
        </div>
    )
}

export default TransactionDetailsSummary
