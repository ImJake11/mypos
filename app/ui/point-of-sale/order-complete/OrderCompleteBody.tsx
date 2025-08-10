'use client'

import React from 'react'
import OrderCompleteItems from './components/OrderCompleteItems'
import OrderCompleteSummary from './components/OrderCompleteSummary'
import OrderCompletePayment from './components/payment/OrderCompletePayment'

const OrderCompleteBody = () => {

    return (
        <div className={`flex-1 flex flex-col lg:flex-row overflow-auto`}>
            {/** cart items list */}
            <OrderCompleteItems />
            <div className={`bg-[var(--main-bg-secondary)] dark:bg-[var(--main-bg-secondary-dark)] box-border p-4 rounded-tl-[7px] w-full overflow-visible lg:w-[35vw] lg:overflow-auto`}>
                <OrderCompleteSummary />
                <OrderCompletePayment />
            </div>
        </div>
    )
}

export default OrderCompleteBody
