

import React from 'react'
import { TransactionPurchasedItemsTile } from './TransactionDetailsPurchasedItemTile'
import { TransactionDetailsModel } from '@/app/lib/models/transactionModel'

const TransactionDetailsItems = ({ data }: { data: TransactionDetailsModel }) => {

    const { purchasedItems } = data;
    return (
        <div className='flex flex-col rounded-[12px] gap-3 p-6'
            style={{
                backgroundColor: "var(--main-bg-secondary-dark)"
            }}
        >
            <span className='w-full flex justify-between font-semibold'>
                <span>Items</span>
                <span>Total</span>
            </span>
            <div className='h-[1rem]' />
            {purchasedItems.map((d, i) => <TransactionPurchasedItemsTile key={i}
                name={d.product?.name!}
                url={d.product?.imageUrl!}
                price={d.unitPrice}
                productID={d.productId}
                quantity={d.quantity}
            />)}
        </div>
    )
}

export default TransactionDetailsItems
