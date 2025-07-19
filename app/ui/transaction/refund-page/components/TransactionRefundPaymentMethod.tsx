
import { PaymentMethod } from '@/app/lib/enum/paymentMethod'
import React from 'react'

const TransactionRefundPaymentMethod = () => {
    return (
        <div className='w-full flex flex-col gap-1'>
            <span>Method:</span>
            <Options isSelected={true} name={PaymentMethod.CASH} />
            <Options isSelected={false} name={PaymentMethod.E_WALLET} />
        </div>
    )
}

function Options({
    isSelected, name,
}: {
    isSelected: boolean,
    name: string,
}) {
    return <div className='w-full flex gap-2 ml-6'>
        <div className='w-[1rem] h-[1rem] rounded-full'
            style={{
                border: "var(--main-bg-secondary-dark) 1px solid",
            }}
        ></div>
        <span>{name}</span>
    </div>
}

export default TransactionRefundPaymentMethod
