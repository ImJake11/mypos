'use client'

import FilterIconTwo from '@/app/lib/icons/filter_icon_two'
import React from 'react'
import TransactionTile from './TransactionTile'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/lib/redux/store'
import { useFetchTransactions } from '@/app/ui/transaction/services/useFetchTransactions'
import { transactionToggleFilterTab, trnasactionTogglePDF } from '@/app/lib/redux/slice/transactionSlice'
import Appbar from '@/app/lib/components/Appbar/Appbar'
import { TransactionIcon } from '@/app/lib/icons/transactionIcon'
import DownloadIcon from '@/app/lib/icons/DownloadIcon'
import TransactionAppbar from '../TransactionAppbar'
import TransactionDetailsVoidConfirmationPrompt from '../details/components/TransactionDetailsVoidConfirmationPrompt'

const TransactionBody = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { transactionsData, filteredData, isError, isLoading, isFiltering } = useSelector((state: RootState) => state.transaction);

    useFetchTransactions({});

    const displayList = isFiltering ? filteredData : transactionsData;

    if (isError) return <div className='w-full h-full grid place-content-center'>ERROR BOSS!!!</div>

    return (
        <div className='flex-1 flex flex-col'>
            <TransactionAppbar />
            {/** data */}
            <div className='flex-1 min-h-0 bg-[var(--main-bg-secondary)] rounded-[8px] p-3 flex flex-col'>
                {isLoading ? <LoadingTile /> : <div className='flex-1 min-h-0 w-full bg-[var(--main-bg-primary)] rounded-[8px] flex flex-col p-5 overflow-hidden'>

                    {/** filter icon and title */}
                    <div className='flex w-full justify-between items-center min-h-0'>
                        <span>Recent transactions</span>
                    </div>

                    <div className='h-[1rem] min-h-0' />

                    {/** headers */}
                    <div className='w-full flex'>
                        <HeaderTile name='Date' />
                        <HeaderTile name='Transaction ID' flex='flex-2' />
                        <HeaderTile name='Amount' />
                        <HeaderTile name='Status' />
                        <HeaderTile name='Method' />
                        <HeaderTile name='Action' />
                    </div>

                    {displayList.length <= 0 && !isLoading ? <NoData /> :
                        <ul className='overflow-auto flex-1 min-h-0 flex flex-col'>
                            {displayList.map((data) => (
                                <TransactionTile key={data.transactionId} data={data} />
                            ))}
                        </ul>
                    }
                </div>}
            </div>
        </div>
    )
}

function HeaderTile({ name, flex }: {
    name: string,
    flex?: string
}) {

    return <div className={`flex-1 h-[2rem] grid place-content-center bg-gray-100 font-[600] ${flex ?? "flex-1"}`}>
        {name}
    </div>
}

function LoadingTile() {
    return <div className='w-full h-full flex flex-col gap-3 bg-[var(--main-bg-primary-dark)] rounded-[12px] p-5'>
        <div className='flex w-full gap-3'>
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className='flex-1 min-h-[3rem] rounded-[5px] bg-[var(--main-bg-secondary-dark)]'>
            </div>)}
        </div>
        {Array.from({ length: 15 }).map((_, i) => <div key={i} className='w-full min-h-[3rem] rounded-[5px] bg-[var(--main-bg-secondary-dark)]'>
        </div>)}
    </div>
}
function NoData() {
    return <div className='flex-1 flex flex-col justify-center items-center gap-4'>
        {/* <Image src='/no-data-found.png' width={150} height={150} alt='image' /> */}
        <span className='translate-x-4'>No data found</span>
    </div>
}

export default TransactionBody
