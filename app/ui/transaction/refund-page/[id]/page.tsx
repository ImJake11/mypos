

import Appbar from '@/app/lib/components/Appbar/Appbar'
import React from 'react'
import TransactionRefundList from '../TransactionRefundExistingItemList'
import TransactionRefundReturnItems from '../TransactionRefundReturnItems'
import ProcessDialog from '@/app/lib/components/ProcessDialog/ProcessDialog'
import Toas from '@/app/lib/components/Toas'

const page = () => {
    return (
        <div className='w-screen h-screen flex flex-col overflow-hidden relative'
            style={{
                backgroundColor: "var(--main-bg-primary-dark)"
            }}
        >
            <Appbar icon={
                <i className="ri-refund-line" />}
                title='Refund Transaction' />
            <div className='flex-1 flex'>
                <TransactionRefundList />
                <TransactionRefundReturnItems />
            </div>
            <ProcessDialog />
            <Toas />
        </div>
    )
}

export default page
