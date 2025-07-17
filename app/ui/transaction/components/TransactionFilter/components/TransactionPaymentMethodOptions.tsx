

import { gcashIcon, mastercartIcon, mayaIcon } from '@/app/lib/constants/IconLink'
import { TransactionFilterKeys } from '@/app/lib/constants/TransactionFilterKeys'
import { PaymentMethod } from '@/app/lib/enum/paymentMethod'
import { RootState } from '@/app/lib/redux/store'
import { transactionUpdateFilterData } from '@/app/lib/redux/slice/transactionSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "framer-motion";

const TransactionPaymentMethodOptions = () => {

    const { paymentOption } = useSelector((state: RootState) => state.transaction.filterData);

    return (
        <motion.div className='w-full flex flex-col gap-4'
            layout
        >
            <span>Payment Option</span>

            <ButtonTile name='All' isSelected={paymentOption === undefined} paymentMethodKey={undefined} />
            <ButtonTile name='Cash' isSelected={paymentOption === PaymentMethod.CASH} paymentMethodKey={PaymentMethod.CASH} />
            <ButtonTile name='E-Wallet' isSelected={paymentOption === PaymentMethod.E_WALLET} paymentMethodKey={PaymentMethod.E_WALLET} />
            {paymentOption === PaymentMethod.E_WALLET && <EWalletOption />}
        </motion.div>
    )
}

function EWalletOption() {
    return <>
        <SubButtonTile icon={gcashIcon} name='Gcash' />
        <SubButtonTile icon={mayaIcon} name='Maya' />
        <SubButtonTile icon={mastercartIcon} name='Mastercard' />
    </>
}

function SubButtonTile({ name, icon }: {
    name: string,
    icon: string
}) {

    const dispatch = useDispatch();

    const { providedPayment } = useSelector((state: RootState) => state.transaction.filterData);

    const isSelected = providedPayment && providedPayment === name;

    const handleAction = () => {
        if (isSelected) {
            dispatch(transactionUpdateFilterData({
                data: undefined,
                name: TransactionFilterKeys.providedPayment,
            }))
            return;
        }
        dispatch(transactionUpdateFilterData({
            data: name,
            name: TransactionFilterKeys.providedPayment,
        }))
    }

    return <div className='ml-5 flex w-full gap-3 p-[0_25px]'>
        <div className='w-[1.5rem] h-[1.5rem] border border-[var(--border-default-dark)] rounded-[4px] overflow-hidden relative'
            onClick={handleAction}
        >
            {isSelected && <div className='absolute inset-0 button-primary-gradient grid place-content-center'>
                <i className="ri-check-fill"></i>
            </div>}
        </div>
        <span>{name}</span>
        <div className='flex-1' />
        <img src={icon} alt="icon" width={24} />
    </div>
}

function ButtonTile({ name, icon, isSelected, paymentMethodKey }: {
    name: string,
    icon?: string,
    isSelected: boolean,
    paymentMethodKey?: PaymentMethod,
}) {

    const dispatch = useDispatch();

    const handleHandleAction = () => {
        dispatch(transactionUpdateFilterData({
            data: paymentMethodKey,
            name: TransactionFilterKeys.paymentOption,
        }))
    }

    return <div className='flex w-full h-[3rem] rounded-[8px] border border-[var(--border-default-dark)] items-center gap-3 p-2'
        onClick={handleHandleAction}
    >

        <div className='w-[1.5rem] h-[1.5rem] rounded-full border border-[var(--border-default-dark)] relative'>
            {isSelected && <div className='absolute inset-0.5 button-primary-gradient rounded-full' />}
        </div>
        <span>{name}</span>
        <div className='flex-1' />
        {icon && <img src={icon} alt="" />}
    </div>
}

export default TransactionPaymentMethodOptions
