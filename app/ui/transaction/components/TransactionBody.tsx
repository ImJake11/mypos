'use client'

import FilterIconTwo from '@/app/lib/icons/filter_icon_two'
import React from 'react'
import TransactionTile from './TransactionTile'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/lib/redux/store'
import { useFetchTransactions } from '@/app/ui/transaction/services/useFetchTransactions'
import Image from 'next/image'
import { transactionToggleFilterTab } from '@/app/lib/redux/transactionSlice'

const TransactionBody = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { transactionsData, isError, isLoading, } = useSelector((state: RootState) => state.transaction);

    useFetchTransactions({});

    if (isLoading) return <div className='w-full h-full grid place-content-center'>LOADING BOSSING!!!</div>

    if (isError) return <div className='w-full h-full grid place-content-center'>ERROR BOSS!!!</div>

    return (
        <div className='flex-1 min-h-0 bg-[var(--main-bg-secondary-dark)] rounded-[8px] p-3 flex flex-col'>
            <div className='flex-1 min-h-0 w-full bg-[var(--main-bg-primary-dark)] rounded-[8px] flex flex-col p-5 overflow-hidden'>
                <div className='flex w-full justify-between items-center min-h-0'>
                    <span>Recent transactions</span>
                    <button onClick={() => dispatch(transactionToggleFilterTab())}><FilterIconTwo size={26} /></button>
                </div>
                <div className='h-[1rem] min-h-0' />
                {transactionsData.length <= 0 ? <NoData /> :
                    <ul className='overflow-auto flex-1 min-h-0 flex flex-col'>
                        {transactionsData.map((data) => (
                            <TransactionTile key={data.transactionId} data={data} />
                        ))}
                    </ul>
                }
            </div>
        </div>
    )
}


function NoData() {
    return <div className='flex-1 flex flex-col justify-center items-center gap-4'>
        <Image src='/no-data-found.png' width={150} height={150} alt='image' />
        <span className='translate-x-4'>No data found</span>
    </div>
}

export default TransactionBody
