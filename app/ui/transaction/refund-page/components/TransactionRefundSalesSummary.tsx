

import React, { useMemo } from 'react'
import TransactionRefundServices from '../services/TransactionRefundServices';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/lib/redux/store';

const TransactionRefundSalesSummary = () => {

    const { returnedItems } = useSelector((state: RootState) => state.refundSlice);

    const covertToCurrency = (value: number) => {
        return Number(value).toLocaleString('en-US', {
            style: "currency",
            currency: "PHP",
        })
    }

    const refundServices = useMemo(() => {
        return new TransactionRefundServices();
    }, [returnedItems]);

    return (
        <div className='flex flex-col gap-1'>
            <SalesSummary data={covertToCurrency(refundServices.subTotal)} title='Sub Total' />
            <SalesSummary data={covertToCurrency(refundServices.taxSales)} title='Taxable Sales' />
            <SalesSummary data={covertToCurrency(refundServices.zeroRatedSales)} title='Zero-rated Sales' />
            <SalesSummary data={covertToCurrency(refundServices.exemptSales)} title='Exempt Sales' />

            <div className='w-full h-[1px] m-[.5rem_0]' style={{ borderBottom: "dashed 1px var(--main-bg-secondary-dark" }} />
            <SalesSummary data={covertToCurrency(refundServices.netTotal)} title='Void Net Total' />
        </div>

    )
}

function SalesSummary({ title, data, }: {
    title: string,
    data: string,
}) {
    return <span className='flex gap-1'>
        <span className='w-[10rem]'>{title}:</span>
        <span className='text-gray-500'>{data}</span>
    </span>
}

export default TransactionRefundSalesSummary
