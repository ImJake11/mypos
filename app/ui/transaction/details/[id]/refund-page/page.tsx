

import React from 'react'
import GlobalWrapper from '@/app/lib/components/GlobalWrapper'
import TransactionRefundBody from './TransactionRefundBody'

const page = () => {

    return (
        <div className='w-screen h-screen flex flex-col overflow-hidden relative bg-[var(--main-bg-primary)] dark:bg-[var(--main-bg-primary-dark)]'>
            <GlobalWrapper>
                <TransactionRefundBody />
            </GlobalWrapper>
        </div>
    )
}

export default page
