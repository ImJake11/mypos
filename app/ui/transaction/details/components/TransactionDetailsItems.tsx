'use client';

import React from 'react'
import { TransactionPurchasedItemsTile } from './TransactionDetailsPurchasedItemTile'
import { TransactionDetailsModel } from '@/app/lib/models/transactionModel'
import { IconListDetails } from '@tabler/icons-react';

const TransactionDetailsItems = ({ data }: { data: TransactionDetailsModel }) => {

    const { purchasedItems } = data;

    return (
        <div className={`flex flex-col rounded-[12px] gap-3 bg-gray-50 dark:bg-[var(--main-bg-primary-dark)] p-3 md:p-5`}
        >
            <div className='flex w-full gap-2 items-center mb-[1rem]'>
                <IconListDetails size={20} className='fill-gray-500 stroke-gray-500' />
                <span className='text-[1rem]'>Items</span>
            </div>

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
