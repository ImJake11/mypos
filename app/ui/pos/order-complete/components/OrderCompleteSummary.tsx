'use client';

import ItemIcon from '@/app/lib/icons/itemIcon';
import { RootState } from '@/app/lib/redux/store';
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';
import PaymentHelper from './payment/services/paymentHelper';
import { BulkTableProp } from '@/app/lib/models/productModel';

const OrderCompleteSummary = () => {

    const posSlice = useSelector((state: RootState) => state.posSlice);

    const { cartItems } = posSlice;

    const paymentService = useMemo(() => {
        return new PaymentHelper({
            vatValue: 12,
        });

    }, [posSlice]);

    const { exempt, vat, zeroRated, taxableSale } = paymentService.getVatSalesBreakdown();

    return (
        <div className='w-full h-fit bg-[var(--main-bg-primary-dark)] rounded-[12px] p-5 flex flex-col gap-2'>
            <span className='text-[1rem]'>Transaction Summary</span>
            <div className='h-[1rem]' />
            {/** items list */}
            <div className='flex flex-col w-full gap-3'>
                {cartItems.map((item, i) => <OrderTile key={i}
                    name={item.variantName}
                    quantity={item.quantity}
                    total={item.total}
                    bulkTierApplied={item.bulkPricing}
                />)}
            </div>
            <div className='h-[3rem]' />

            {/**dashed line */}
            <div className='w-full h-[1px] border border-dashed border-[var(--main-bg-secondary-dark)]' />

            {/** sales */}
            <span className='flex justify-between items-center'>VATable sales (Net) <span>₱ {taxableSale.toLocaleString('en-us')}</span></span>
            <span className='flex justify-between items-center'>VAT Exempt sales <span>₱ {exempt.toLocaleString('en-us')}</span></span>
            <span className='flex justify-between items-center'>Zero-rated sales <span>₱ {zeroRated.toLocaleString('en-us')}</span></span>

            {/** dashed line */}
            <div className='w-full h-[1px] border border-dashed border-[var(--main-bg-secondary-dark)]' />

            {/** sub total && total vat */}
            <span className='flex justify-between items-center'>Subtotal <span>₱ {paymentService.getCartSubTotal().toLocaleString('en-us')}</span></span>
            <span className='flex justify-between items-center'>Total VAT (12%) <span>₱ {vat.toLocaleString('en-us')}</span>
            </span>

            {/** total */}
            <div className='w-full h-[1px] border border-dashed border-[var(--main-bg-secondary-dark)]' />
            <span className='w-full flex justify-between m-[.5rem_0] text-[1.2rem]'>
                Total:
                <span>₱ {paymentService.getCartNetTotal().toLocaleString('en-us')}</span>
            </span>
        </div>
    )
}

function OrderTile({
    total,
    quantity,
    name,
    bulkTierApplied,
}:
    {
        total: number,
        quantity: number,
        name: string,
        bulkTierApplied?: BulkTableProp,
    }) {

    const getItemTotal = (): React.JSX.Element => {

        const currentTotal = total.toLocaleString('en-us');

        if (bulkTierApplied) {

            // when no bulk pricing applied
            const originalTotal = total + (total * (bulkTierApplied.discount / 100));

            return <span>
                <span className='line-through text-[var(--foreground-lighter)]'>₱ {originalTotal.toLocaleString('en-us')}
                </span> ~ ₱ {currentTotal}
            </span>;
        }

        return <span>₱ {currentTotal}</span>;
    }

    return <div className='w-full flex flex-col gap-0.5'>
        {bulkTierApplied && <span className='text-[.7rem] ml-8 italic'>Bulk pricing applied({bulkTierApplied.discount}%)</span>}
        <div className='flex w-full gap-4 items-center'>
            {/** icon */}
            {ItemIcon(20)}
            <span className='flex-1.5'>{name}</span>
            <span>x{quantity}</span>
            <span className='flex-1 grid place-content-end'>{getItemTotal()}</span>
        </div>
    </div>
}

export default OrderCompleteSummary
