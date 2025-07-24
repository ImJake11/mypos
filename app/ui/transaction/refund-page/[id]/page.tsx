

import Appbar from '@/app/lib/components/Appbar/Appbar'
import React from 'react'
import TransactionRefundList from '../TransactionRefundExistingItemList'
import TransactionRefundReturnItems from '../TransactionRefundReturnItems'
import ProcessDialog from '@/app/lib/components/ProcessDialog/ProcessDialog'
import Toas from '@/app/lib/components/Toas'
import Sidebar from '@/app/lib/components/Sidebar/Sidebar'
import GlobalWrapper from '@/app/lib/components/GlobalWrapper'

const page = () => {

    const child = (
        <div className='w-full h-full flex flex-col'>
            <Appbar icon={
                <i className="ri-refund-line" />}
                title='Refund Transaction' />
            <div className='flex-1 flex'>
                <TransactionRefundList />
                <TransactionRefundReturnItems />
            </div>
        </div>
    )
    return (
        <div className='w-screen h-screen flex flex-col overflow-hidden relative bg-[var(--main-bg-primary)]'>
            <GlobalWrapper child={child} />
        </div>
    )
}

export default page
