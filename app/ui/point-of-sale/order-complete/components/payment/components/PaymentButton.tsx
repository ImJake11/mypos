'use client';

import { PaymentMethod, PaymentProvider } from '@/app/lib/enum/paymentMethod';
import { posTogglePaymentMethod, posTogglePaymentProvider } from '@/app/lib/redux/slice/posSlice';
import { RootState } from '@/app/lib/redux/store';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { motion } from "framer-motion";
import { gcashIcon, mastercartIcon, mayaIcon } from '@/app/lib/constants/IconLink';

interface Prop {
    name: string,
    icon: any,
    padding?: string,
}

const PaymentButton = ({ name, icon, padding }: Prop) => {
    const dispatch = useDispatch();

    const paymentMethod = useSelector((state: RootState) => state.posSlice.paymenMethod);

    const isSelected = paymentMethod === name;

    const handlePayment = () => {
        dispatch(posTogglePaymentMethod(name as PaymentMethod))
    }
    return (
        <motion.div className='min-h-[2.5rem] w-full rounded-[7px] p-2 border border-gray-500 flex flex-col gap-2 items-center'
            onClick={handlePayment}

            animate={{
                height: isSelected && name === PaymentMethod.E_WALLET ? "9rem" : "2.5rem"
            }}
        >
            <div className='flex gap-2 items-center w-full'>
                <div className='h-[1rem] w-[1rem] border-[1px] border-gray-500 rounded-full p-0.5 grid place-content-center'>
                    {isSelected && <div className='h-[.7rem] w-[.7rem] rounded-full bg-[var(--color-brand-primary)]' />}
                </div>
                {name}
                <div className='flex-1' />
                <span className='text-gray-400'>{icon}</span>
            </div>

            {name === PaymentMethod.E_WALLET && isSelected && <>
                <SubButtonTile name='Gcash' icon={gcashIcon} />

                <SubButtonTile name='Maya' icon={mayaIcon} />

                <SubButtonTile name='Mastercard' icon={mastercartIcon} />
            </>}


        </motion.div>
    )
}

function SubButtonTile({ name, icon }: {
    name: string, icon: string
}) {

    const dispatch = useDispatch();

    const provider = useSelector((state: RootState) => state.posSlice.paymentProvider);

    const isSelected = provider === name;

    return <button className='w-[90%] place-self-end flex items-center gap-3'
        onClick={() => dispatch(posTogglePaymentProvider(name as PaymentProvider))}
    >
        <div className='h-[1rem] w-[1rem] rounded-full border-[1px] border-ray-500 grid place-content-center'>
            {isSelected && <div className='h-[.7rem] w-[.7rem]  rounded-full bg-[var(--color-brand-primary)]'></div>}
        </div>

        <span className='flex-1 text-left'>{name}</span>
        <img src={icon} alt="icon" height={16} width={16} />
    </button>
}

export default PaymentButton
