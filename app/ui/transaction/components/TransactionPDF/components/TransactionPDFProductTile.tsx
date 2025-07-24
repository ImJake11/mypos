'use client';

import { fetchVariantName } from '@/app/lib/utils/data/fetchVariantNname';
import { capitalizeFirtLetter } from '@/app/lib/utils/services/capitalizeFirstLetter';
import React, { useEffect, useState } from 'react'

const TransactionPDFProductTile = ({
    id, quantity, price,productName
}: {
    id: string,
    quantity: number,
    price: number,
    productName: string,
}) => {


    return (
        <span className='flex'>
            {/** name */}
            <span className='flex-3 font-[600]'>{capitalizeFirtLetter(productName)}
            </span>
            {/** price */}
            <span className='flex-1 text-left'>{Number(price).toLocaleString('en-US', {
                currency: "PHP",
                style: "currency"
            })}</span>
            {/** quantity */}
            <span className='flex-1 text-center'>x{quantity}</span>
            <span className='flex-1 text-center'>{Number(quantity * price).toLocaleString('en-US', {
                style: "currency",
                currency: "PHP"
            })}</span>
        </span>
    )
}

export default TransactionPDFProductTile
