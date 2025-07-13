'use client';

import ItemIcon from '@/app/lib/icons/itemIcon';
import { RootState } from '@/app/lib/redux/store';
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';
import PaymentHelper from './payment/services/paymentHelper';

const OrderCompleteSummary = () => {

    const posSlice = useSelector((state: RootState) => state.posSlice);

    const {cartItems} = posSlice;

    const paymentService = useMemo(() => {
  
        return new PaymentHelper({
            vatValue: 12,
        });

    }, [posSlice]);

    const { exempt, vat, zeroRated, taxableSale } = paymentService.getVatSalesBreakdown();

    return (
        <div className='w-full h-fit bg-[var(--main-bg-primary-dark)] rounded-[12px] p-5 flex flex-col gap-2'>
            <span className='text-[1.5rem]'>Transaction Summary</span>
            <div className='h-[1rem]' />
            {/** items list */}
            <div className='flex flex-col w-full gap-3'>
                {cartItems.map((item, i) => <OrderTile key={i}
                    name={item.variantName}
                    quantity={item.quantity}
                    total={item.total}
                />)}
            </div>
            <div className='h-[3rem]' />
            <div className='w-full h-[1px] border border-dashed border-[var(--main-bg-secondary-dark)]' />
            <span className='flex justify-between items-center'>VATable sales (Net) <span>₱ {taxableSale.toLocaleString('en-us')}</span></span>
            <span className='flex justify-between items-center'>VAT Exempt sales <span>₱ {exempt.toLocaleString('en-us')}</span></span>
            <span className='flex justify-between items-center'>Zero-rated sales <span>₱ {zeroRated.toLocaleString('en-us')}</span></span>
            <div className='w-full h-[1px] border border-dashed border-[var(--main-bg-secondary-dark)]' />
            <span className='flex justify-between items-center'>Subtotal <span>₱ {paymentService.getCartSubTotal().toLocaleString('en-us')}</span></span>
            <span className='flex justify-between items-center'>Total VAT (12%) <span>₱ {vat.toLocaleString('en-us')}</span></span>
            <div className='w-full h-[1px] border border-dashed border-[var(--main-bg-secondary-dark)]' />
            <span className='w-full flex justify-between m-[1.5rem_0] text-[1.5rem]'>
                Total:
                <span>₱ {paymentService.getCartNetTotal().toLocaleString('en-us')}</span>
            </span>
        </div>
    )
}

function OrderTile({
    total, quantity, name,
}:
    {
        total: number,
        quantity: number,
        name: string,
    }) {
    return <div className='flex w-full gap-4'>
        {/** icon */}
        <div className='w-[1.5rem] h-[1.5rem]'>
            <ItemIcon />
        </div>
        <span className='flex-1.5'>{name}</span>
        <div className='flex-1' />
        <span>x{quantity}</span>
        <span className='w-[8rem] grid place-content-end'>₱ {total.toLocaleString("en-us")}</span>
    </div>
}

export default OrderCompleteSummary
