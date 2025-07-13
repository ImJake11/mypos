'use client';

import React from 'react'
import TransactionDateFilter from '../TransactionDateFilter'
import TransactionPriceRange from './TransactionPriceRange'
import CloseIcon from '@/app/lib/icons/closeIcon'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/lib/redux/store';
import { transactionToggleFilterTab } from '@/app/lib/redux/transactionSlice';
import DatePicker from '@/app/lib/components/DatePicker/DatePicker';

const TransactionFilterTab = () => {

    const dispatch = useDispatch();

    const { isFilterVisible } = useSelector((state: RootState) => state.transaction);

    const handleApplyFilter = () => {

    }

    if (!isFilterVisible) return null;

    return (
        <div className='w-screen h-screen absolute'
            style={{
                backgroundColor: "rgb(0,0,0, .5)",
            }}
        >
            <div className='h-full w-[30vw] bg-[var(--main-bg-primary-dark)] absolute right-0 p-5 flex flex-col gap-4'>
                <span className='w-full flex items-center justify-between'>
                    Filter Transaction
                    <button onClick={() => dispatch(transactionToggleFilterTab())}><CloseIcon size={32} /></button>
                </span>

                {/** date filter */}
                <TransactionDateFilter />
                <div />
                {/** price range */}
                <TransactionPriceRange />

                {/** filter product name */}
                <div className='flex flex-col w-full gap-2'>
                    <span>Contains Product Name</span>
                    <input type="text" className='w-full h-[3rem] tf-attr p-2' />
                </div>

                {/** includes tax */}
                <div className='flex gap-3 w-full items-center'>
                    {/** check box */}
                    <div className='w-[1.5rem] h-[1.5rem] rounded-[3px] border border-[var(--tf-border-default)]'></div>
                    <span>with VAT-able</span>
                </div>

                {/** includes tax */}
                <div className='flex gap-3 w-full items-center'>
                    {/** check box */}
                    <div className='w-[1.5rem] h-[1.5rem] rounded-[3px] border border-[var(--tf-border-default)]'></div>
                    <span>with VAT Zero-rated</span>
                </div>

                {/** includes zero tax */}
                <div className='flex gap-3 w-full items-center'>
                    {/** check box */}
                    <div className='w-[1.5rem] h-[1.5rem] rounded-[3px] border border-[var(--tf-border-default)]'></div>
                    <span>with VAT Exempt</span>
                </div>

                <div className='flex-1' />

                {/** actions */}
                <div className='flex w-full justify-end items-center gap-2'>
                    <ActionButton name='Clear All' borderColor="var(--tf-default-border)" />
                    <ActionButton name='Apply Filter' bgColor='button-primary-gradient' />
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
