import React from 'react'
import OrderCompleteSummary from './components/OrderCompleteSummary'
import OrderCompleteItems from './components/OrderCompleteItems'
import OrderCompletePayment from './components/payment/OrderCompletePayment'
import Sidebar from '@/app/lib/components/Sidebar/Sidebar'

const page = () => {
    return (
        <div className='w-screen h-screen flex  overflow-hidden'>
            <Sidebar />
            <div className='flex-1 flex flex-col'>
                {/** app bar */}
                <div className='w-full min-h-[4rem] bg-[var(--main-bg-primary-dark)]'></div>

                <div className='h-[calc(100vh-4rem)] flex'>
                    {/** cart items list */}
                    <OrderCompleteItems />
                    {/**  */}
                    <div className='bg-[var(--main-bg-secondary-dark)] w-[35vw] box-border p-4 overflow-auto rounded-tl-[7px]'>
                        <OrderCompleteSummary />
                        <OrderCompletePayment />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
