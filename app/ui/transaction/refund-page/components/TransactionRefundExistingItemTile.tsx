'use client';

import { TransactionItemModel } from '@/app/lib/models/transactionModel';
import { refundReturnItem } from '@/app/lib/redux/slice/refundSlice';
import { RootState } from '@/app/lib/redux/store';
import { capitalizeFirtLetter } from '@/app/lib/utils/services/capitalizeFirstLetter';
import React, { } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "remixicon/fonts/remixicon.css";

const TransactionRefundExistingItemTile = ({ data }:
    { data: TransactionItemModel }
) => {

    const dispatch = useDispatch();

    const { returnedItems } = useSelector((state: RootState) => state.refundSlice);

    const isSelected = returnedItems.find(item => item.id === data.id)

    return (
        <div className='flex w-full h-[2rem] rounded-[8px] p-2 items-center gap-3 min-h-0 mb-1'
            style={{
                backgroundColor: "var(--main-bg-primary-dark)"
            }}
        >
            {/** checkbox */}
            <div className='w-[1rem] h-[1rem] rounded-[4px] grid place-content-center'
                style={{
                    border: "solid 1px var(--border-default-dark)",
                    backgroundColor: isSelected ? "var(--color-brand-primary)" : "transparent"
                }}
                onClick={() => dispatch(refundReturnItem(data))}
            >
                {isSelected && <i className="ri-check-fill text-[1rem]" />}
            </div>

            {/** image container */}
            <div className='w-[2rem] h-[2rem] rounded-[4px] overflow-hidden'
                style={{ backgroundColor: "var(--main-bg-secondary-dark)" }}
            >
                <img src={data.product?.imageUrl} alt="imiage" />
            </div>

            {/** name */}
            <strong>{capitalizeFirtLetter(data.product?.name!)}</strong>
            <div className='flex-1' />

            <span className='w-[5rem]'>x{data.quantity}</span>
            <span className='w-[8rem] text-right'>{Number(data.unitPrice * data.quantity).toLocaleString('en-US', {
                style: "currency",
                currency: "PHP",
            })}</span>
        </div>
    )
}

export default TransactionRefundExistingItemTile

