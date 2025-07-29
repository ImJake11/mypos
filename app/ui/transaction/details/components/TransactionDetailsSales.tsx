'use client';

import { TransactionDetailsModel } from '@/app/lib/models/transactionModel'
import React from 'react'
import TransactionDetailsTile from './TransactionDetailsTile';
import { IconCoinFilled } from '@tabler/icons-react';
import { useWindowSize } from '@/app/lib/utils/hooks/useGetWindowSize';

const TransactionDetailsSales = ({ data }: { data: TransactionDetailsModel }) => {

    const {
        totalValSales,
        netTotal,
        taxablSales,
        nonTaxableSales,
        exemptSales,
    } = data;

    const { width } = useWindowSize();

    const isMobile = width < 576;

    return (
        <div
            className={`w-full rounded-[12px] h-fit flex flex-col gap-3 bg-gray-50 ${isMobile ? "p-3" : "p-5"}`}>

            <div className='flex w-full gap-2 items-center mb-[1rem]'>
                <IconCoinFilled size={20} className='fill-gray-500' />
                <span className='text-[1rem]'>Details</span>
            </div>


            <TransactionDetailsTile data={convertToCurrency(taxablSales)} title='Total Value Sales' />
            <TransactionDetailsTile data={convertToCurrency(totalValSales)} title='Taxable Sales (VAT)' />
            <TransactionDetailsTile data={convertToCurrency(nonTaxableSales)} title='Zero-rated Sales' />
            <TransactionDetailsTile data={convertToCurrency(exemptSales)} title='Exempt Sales' />
            <div className='w-full h-[1px] border-dashed border border-gray-300' />
            <div className={`flex justify-between w-full font-semibold ${isMobile ? "text-[.8rem]" : "text-[1rem]"}`}>
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
