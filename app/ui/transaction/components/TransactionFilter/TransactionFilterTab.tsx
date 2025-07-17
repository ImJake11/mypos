'use client';

import React from 'react'
import TransactionDateFilter from './components/TransactionDateFilter'
import TransactionPriceRange from './components/TransactionPriceRange'
import CloseIcon from '@/app/lib/icons/closeIcon'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/lib/redux/store';
import { transactionToggleFilterTab, transactionUpdateFilterData } from '@/app/lib/redux/slice/transactionSlice';
import DatePicker from '@/app/lib/components/DatePicker/DatePicker';
import TransactionPaymentMethodOptions from './components/TransactionPaymentMethodOptions';
import TransactionStatus from './components/TransactionStatus';
import TransactionTaxOptions from './components/TransactionTaxOptions';
import { TransactionFilterKeys } from '@/app/lib/constants/TransactionFilterKeys';
import { TransactionFilterModel } from '@/app/lib/models/trnasactionFilterModel';

const TransactionFilterTab = () => {

    const dispatch = useDispatch();

    const { isFilterVisible, filterData } = useSelector((state: RootState) => state.transaction);

    const { productName } = filterData;

    const handleApplyFilter = () => {

    }

    if (!isFilterVisible) return null;

    return (
        <div className='w-screen h-screen absolute'
            style={{
                backgroundColor: "rgb(0,0,0, .5)",
            }}
        >
            <div className='h-full w-[30vw] bg-[var(--main-bg-primary-dark)] absolute right-0 p-5 flex flex-col gap-3'>
                <span className='w-full flex items-center justify-between'>
                    Filter Transaction
                    <button onClick={() => dispatch(transactionToggleFilterTab())}><CloseIcon size={32} /></button>
                </span>


                <div className='flex-1 flex flex-col gap-4 overflow-auto overflow-x-hidden p-1'>
                    {/** date filter */}
                    <TransactionDateFilter />
                    <div />
                    {/** price range */}
                    <TransactionPriceRange />

                    {/** filter product name */}
                    <div className='flex flex-col w-full gap-2'>
                        <span>Contains Product Name</span>
                        <input type="text" value={productName ?? ""} className='w-full h-[3rem] tf-attr p-2'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const { value } = e.target;

                                dispatch(transactionUpdateFilterData({
                                    data: value,
                                    name: TransactionFilterKeys.productName as keyof TransactionFilterModel
                                }))
                            }}
                        />
                    </div>

                    <TransactionStatus />

                    <TransactionPaymentMethodOptions />

                    <div className='min-h-[1rem]' />

                    <TransactionTaxOptions />

                    <div className='flex-1' />

                    {/** actions */}
                    <div className='flex w-full justify-end items-center gap-2'>
                        <ActionButton name='Clear All' borderColor="var(--tf-default-border)" />
                        <ActionButton name='Apply Filter' bgColor='button-primary-gradient' />
                    </div>
                </div>
            </div>

            {/** date picker */}
            <div className='absolute right-[31vw] w-[500px] h-[500px] top-1/2 -translate-y-1/2'>
                <DatePicker />
            </div>
        </div>
    )
}



function ActionButton({
    name, onClick, bgColor, borderColor,
}: {
    name: string,
    borderColor?: string,
    bgColor?: string,
    onClick?: () => void,
}) {
    return <button className={`w-fit p-[0_10px] h-[3rem] rounded-[8px] grid place-content-center ${bgColor ?? "bg-transparent"} border border-[${borderColor ?? "var(--color-brand-primary)"}]`}
    >
        {name}
    </button>
}

export default TransactionFilterTab
