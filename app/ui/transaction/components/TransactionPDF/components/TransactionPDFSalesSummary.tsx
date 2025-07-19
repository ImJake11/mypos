
import { TransactionDetailsModel } from '@/app/lib/models/transactionModel'
import React from 'react'

const TransactionPDFSalesSummary = ({ data }: {
    data: TransactionDetailsModel
}) => {

    const {
        amountPaid,
        changeGiven,
        totalValSales,
        taxablSales,
        netTotal,
        nonTaxableSales,
        exemptSales,
        paymentMethod,
        paymentProvider,
    } = data;

    const convertToCurrency = (value: number): string => {
        return Number(value).toLocaleString('en-US', {
            style: "currency",
            currency: "PHP"
        })
    }


    return (
        <div className='w-[50%] flex flex-col gap-1.5 place-self-end'>
            <Tile title='Amount paid:' data={convertToCurrency(amountPaid)} />
            <Tile title='Change:' data={convertToCurrency(changeGiven)} />
            <Tile title='Payment method:' data={`${paymentMethod} ${paymentProvider && `(${paymentProvider})`}`} />
            <Tile title='Sub Total:' data={convertToCurrency(totalValSales)} />
            <Tile title='Taxable Sales (VAT):' data={convertToCurrency(taxablSales)} />
            <Tile title='Zero-rated Sales:' data={convertToCurrency(nonTaxableSales)} />
            <Tile title='Exempt Sales:' data={convertToCurrency(exemptSales)} />


            {/** net total */}
            <div className='flex justify-between h-[3rem] w-full font-[600] items-center'
                style={{
                    borderTop: "solid 2px var(--color-brand-primary)",
                    borderBottom: "solid 2px var(--color-brand-primary)",
                    fontSize: "14px",
                color: "var(--color-brand-primary)"
                }}
            >
                <span>Net Total: </span>
                <span>{convertToCurrency(netTotal)}</span>
            </div>
        </div>
    )
}


function Tile({ title, data }: { title: string, data: string }) {
    return <span className='flex justify-between'>
        <span className='font-[600]'>{title}</span >
        <span className='opacity-60'>{data}</span>
    </span>
}


export default TransactionPDFSalesSummary
