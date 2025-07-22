
import { TransactionDetailsModel } from '@/app/lib/models/transactionModel'
import React from 'react'
import TransactionDetailsTile from './TransactionDetailsTile';

const TransactionDetailsSales = ({ data }: { data: TransactionDetailsModel }) => {

    const {
        totalValSales,
        netTotal,
        taxablSales,
        nonTaxableSales,
        exemptSales,
    } = data;

    return (
        <div
            className='w-full rounded-[12px] p-5 h-fit flex flex-col gap-5'
            style={{
                backgroundColor: "var(--main-bg-secondary-dark)"
            }}
        >
            <TransactionDetailsTile data={convertToCurrency(taxablSales)} title='Total Value Sales' />
            <TransactionDetailsTile data={convertToCurrency(totalValSales)} title='Taxable Sales (VAT)' />
            <TransactionDetailsTile data={convertToCurrency(nonTaxableSales)} title='Zero-rated Sales' />
            <TransactionDetailsTile data={convertToCurrency(exemptSales)} title='Exempt Sales' />
            <div className='w-full h-[1px] border-dashed border m-[1rem_0]' />
            <div className='flex justify-between w-full text-[1.5rem] font-semibold'>
                <span>Net Total</span>
                <span>{Number(netTotal).toLocaleString('en-US', {
                    style: "currency",
                    currency: "PHP"
                })}</span>
            </div>
        </div>
    )
}

function convertToCurrency(val: number): string {

    return Number(val).toLocaleString('en-US', {
        style: "currency",
        currency: "PHP"
    })
}


export default TransactionDetailsSales
