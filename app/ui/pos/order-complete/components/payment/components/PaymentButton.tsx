'use client';

import { PaymentMethod } from '@/app/lib/enum/paymentMethod';
import { posTogglePaymentMethod } from '@/app/lib/redux/posSlice';
import { RootState } from '@/app/lib/redux/store';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

interface Prop {
    name: string,
    icon: any,
}

const PaymentButton = ({ name, icon }: Prop) => {
    const dispatch = useDispatch();

    const paymentMethod = useSelector((state: RootState) => state.posSlice.paymenMethod);

    const isSelected = paymentMethod === name;

    const handlePayment = () => {

        dispatch(posTogglePaymentMethod(name as PaymentMethod))
    }
    return (
        <div className='h-[3.5rem] w-full rounded-[7px] p-[0_10px] border border-[var(--border-default-dark)] flex items-center gap-2'
            onClick={handlePayment}
        >
            <div className='h-[1.5rem] w-[1.5rem] border-[2px] border-[var(--border-default-dark)] rounded-full p-0.5 grid place-content-center'>
                {isSelected && <div className='w-[1rem] h-[1rem] rounded-full bg-[var(--color-brand-primary)]' />}
            </div>
            {name}
            <div className='flex-1'/>
            {icon}
        </div>
    )
}

export default PaymentButton
