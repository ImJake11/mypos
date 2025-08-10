'use client';

import React, { useMemo } from 'react'
import TransactionRefundPaymentMethod from './components/TransactionRefundPaymentMethod'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import { refundSetReason, refundUpdateQuantity } from '@/app/lib/redux/slice/refundSlice';
import TransactionRefundServices from './services/TransactionRefundServices';
import TransactionRefundSalesSummary from './components/TransactionRefundSalesSummary';
import { useRouter } from 'next/navigation';
import { useWindowSize } from '@/app/lib/utils/hooks/useGetWindowSize';

const TransactionRefundReturnItems = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const refundSlice = useSelector((state: RootState) => state.refundSlice);

    const { returnedItems, reason } = refundSlice;

    const covertToCurrency = (value: number) => {
        return Number(value).toLocaleString('en-US', {
            style: "currency",
            currency: "PHP",
        })
    }

    const refundServices = useMemo(() => {
        return new TransactionRefundServices();
    }, [refundSlice]);

    const isMobile = useWindowSize().width < 768;

    return (
        <div className='w-full h-full flex-1 flex flex-col pl-5 pr-5 text-[.8rem] bg-[var(--main-bg-primary)] dark:bg-[var(--main-bg-primary-dark)]'>

            <span>Returned Items: </span>
            <div className='h-[1rem]' />

            <div className={`w-full flex flex-col
                ${isMobile ? "overflow-visible h-full" : "h-[calc(100vh-6rem)] overflow-auto"}
                `}>
                <div className='flex w-full pb-2 mb-2' style={{ borderBottom: "solid 1px var(--main-bg-secondary)" }}>
                    <Headers title='Item' flex={3} />
                    <Headers title='Qty' flex={2} textAlign='left' />
                    {!isMobile && <Headers title='Price' textAlign='center' />}
                    <Headers title='Total' textAlign='center' />
                </div>

                {returnedItems.length <= 0 ? <span className='text-center'>
                    No Item.
                </span> : <ul className='flex flex-col w-full gap-2'>
                    {returnedItems.map((item, index) => <DataTile
                        key={item.id}
                        bulkDiscount={item.bulkTier?.discount}
                        bulkTierQty={item.bulkTier?.quantity}
                        id={item.id!}
                        index={index}
                        name={item.product?.name!}
                        price={covertToCurrency(item.unitPrice)}
                        total={covertToCurrency(refundServices.computeItemTotal(item.id!))}
                        qty={item.quantity}
                    />)}
                </ul>}

                <div className='min-h-[2rem]' />

                <TransactionRefundSalesSummary />

                <div className='min-h-[2rem]' />
                <TransactionRefundPaymentMethod />
                <div className='min-h-[1rem]' />

                <div className='flex flex-col w-full gap-2 p-1'>
                    <span>Reason (Optional)</span>
                    <textarea value={reason ?? ""}
                        className='w-full max-h-[5rem] min-h-[1rem] h-[3rem] border rounded-[8px] border-gray-400 p-2 focus:outline-[var(--color-brand-primary)]'
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            dispatch(refundSetReason(e.target.value))
                        }}
                    >
                    </textarea>
                </div>

                <div className='min-h-[2rem]' />
                <div className='w-full flex gap-2 justify-end'>
                    <button className='min-h-[2rem] w-[7rem] rounded-[8px] border border-gray-400 text-gray-500'
                        onClick={() => router.back()}
                    >Cancel</button>

                    <button className='bg-linear-120 from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] min-h-[2rem] w-[7rem] rounded-[8px] text-white'
                        onClick={() => refundServices.saveTransaction(dispatch as AppDispatch, router)}
                    >Process Return</button>
                </div>
                <div className='min-h-[2rem]' />
            </div>
        </div>
    )
}

function DataTile(
    { name, qty, price, total, index, id, bulkTierQty, bulkDiscount }:
        {
            id: string,
            name: string,
            qty: number,
            price: string,
            total: string,
            index: number,
            bulkTierQty?: number,
            bulkDiscount?: number
        }
) {

    const dispatch = useDispatch();

    const handleUpdate = (action: "all" | "minus" | "plus") => {
        dispatch(refundUpdateQuantity({
            id,
            index,
            payloadAction: action,
        }))
    }

    const isMobile = useWindowSize().width < 768;

    return <div className='flex flex-col w-full'>

        {/** bulk tier  */}
        {bulkTierQty && bulkTierQty <= qty && <span className='text-[.6rem] italic opacity-30'>Bulk Tier Discount Applied ({bulkDiscount}%)</span>}
        <div className='flex w-full'>
            <span className='flex-2'>{name}</span>
            <span className='flex-2 flex gap-3'>

                <div className={`flex cursor-pointer text-[1rem] items-center ${isMobile ? "gap-3" : "gap-5"}`}>

                    {/** plus */}
                    <button style={{ color: "var(--color-brand-primary)" }}
                        onClick={() => handleUpdate("plus")}
                    >+</button>
                    <span className='text-[.8rem]'>{qty}</span>
                    {/** minus */}
                    <button onClick={() => handleUpdate("minus")}>-</button>
                </div>
                <button style={{ color: "var(--color-brand-primary)" }}
                    onClick={() => handleUpdate("all")}
                >All</button>
            </span>
            {!isMobile && <span className='flex-1 text-center'>{price}</span>}
            <span className='flex-1 text-center'>{total}</span>
        </div>
    </div>
}

function Headers({ title, flex, textAlign }: {
    title: string,
    flex?: number,
    textAlign?: "left" | "right" | "center",
}) {
    return <span style={{
        flex: `${flex ?? "1"}`,
        textAlign: textAlign ?? "left",
    }}>
        {title}
    </span>
}

export default TransactionRefundReturnItems
