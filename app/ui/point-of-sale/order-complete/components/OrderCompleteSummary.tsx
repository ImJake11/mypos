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
        <div className='w-full h-fit bg-[var(--main-bg-primary)] rounded-[12px] p-5 flex flex-col gap-2 text-gray-500'>
            <span className='text-[1rem] text-black'>Transaction Summary</span>
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
            <div className='w-full h-[1px] border border-dashed border-[var(--main-bg-secondary)]' />

            {/** sales */}
            <SalesTile title='VATable sales (Net)' total={taxableSale} />
            <SalesTile title='VAT Exempt sales' total={exempt} />
            <SalesTile title='Zero-rated sales ' total={zeroRated} />

            {/** dashed line */}
            <div className='w-full h-[1px] border border-dashed border-[var(--main-bg-secondary)]' />

            {/** sub total && total vat */}
            <SalesTile title='Sub Total' total={paymentService.getCartSubTotal()} />
            <SalesTile title='Total VAT (12%)' total={vat} />

            {/** total */}
            <div className='w-full h-[1px] border border-dashed border-[var(--main-bg-secondary)]' />
            <span className='w-full flex justify-between m-[.5rem_0] text-[1rem] text-black font-semibold'>
                <span>Total:</span>
                <span>{Number(paymentService.getCartNetTotal()).toLocaleString('en-US', {
                    currency: "PHP",
                    style: "currency",
                })}</span>
            </span>
        </div>
    )
}

function SalesTile({ title, total }: {
    title: string,
    total: number
}) {
    return <span className='flex justify-between items-center text-[.7rem]'>
        <span className='text-black'>{title}</span>
        <span>{total.toLocaleString('en-US', { style: "currency", currency: "PHP" })}</span>
    </span>
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
                <span className='line-through'>₱ {originalTotal.toLocaleString('en-us')}
                </span> ~ ₱ {currentTotal}
            </span>;
        }

        return <span>₱ {currentTotal}</span>;
    }

    return <div className='w-full flex flex-col gap-0.5'>
        {bulkTierApplied && <span className='text-[.7rem] ml-8 italic'>Bulk pricing applied({bulkTierApplied.discount}%)</span>}
        <div className='flex w-full gap-4 items-center text-black'>
            {/** icon */}
            {ItemIcon(20)}
            <span className='flex-1.5'>{name}</span>
            <span>x{quantity}</span>
            <span className='flex-1 grid place-content-end'>{getItemTotal()}</span>
        </div>
    </div>
}

export default OrderCompleteSummary
