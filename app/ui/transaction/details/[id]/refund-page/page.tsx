

import Appbar from '@/app/lib/components/Appbar/Appbar'
import React from 'react'
import TransactionRefundList from './TransactionRefundExistingItemList'
import TransactionRefundReturnItems from './TransactionRefundReturnItems'
import GlobalWrapper from '@/app/lib/components/GlobalWrapper'
import TransactionRefundBody from './TransactionRefundBody'

const page = () => {

    return (
        <div className='w-screen h-screen flex flex-col overflow-hidden relative bg-[var(--main-bg-primary)]'>
            <GlobalWrapper child={<TransactionRefundBody />} />
        </div>
    )
}

export default page
