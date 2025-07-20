
import { PaymentMethod, PaymentProvider } from '@/app/lib/enum/paymentMethod'
import { refundSetReferenceID, refundTogglePaymentMethod, refundTogglePaymentProvider } from '@/app/lib/redux/slice/refundSlice'
import { RootState } from '@/app/lib/redux/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const TransactionRefundPaymentMethod = () => {
    const dispatch = useDispatch();

    const { paymenthMethod, paymentProvider, referenceID } = useSelector((state: RootState) => state.refundSlice);

    const handleUpdate = (name: string, type: "method" | "provider") => {

        if (type === "method") {
            dispatch(refundTogglePaymentMethod(name as PaymentMethod))
        } else {
            dispatch(refundTogglePaymentProvider(name as PaymentProvider));
        }
    }

    return (
        <div className='w-full flex flex-col gap-1'>
            <span>Method:</span>
            <Options name={PaymentMethod.CASH} onClick={() => handleUpdate(PaymentMethod.CASH, "method")} isSelected={paymenthMethod === PaymentMethod.CASH} />
            <Options name={PaymentMethod.E_WALLET} onClick={() => handleUpdate(PaymentMethod.E_WALLET, "method")} isSelected={paymenthMethod === PaymentMethod.E_WALLET} />

            {paymenthMethod === PaymentMethod.E_WALLET && <div className='flex flex-col w-full pl-8'>
                <Options name={PaymentProvider.GCASH} isSelected={paymentProvider === PaymentProvider.GCASH} onClick={() => handleUpdate(PaymentProvider.GCASH, "provider")} />

                <Options name={PaymentProvider.MASTERCARD} isSelected={paymentProvider === PaymentProvider.MASTERCARD} onClick={() => handleUpdate(PaymentProvider.MASTERCARD, "provider")} />

                <Options name={PaymentProvider.MAYA} isSelected={paymentProvider === PaymentProvider.MAYA} onClick={() => handleUpdate(PaymentProvider.MAYA, "provider")} />
            </div>}

            <div className='w-full flex flex-col gap-2'>
                <span>Reference ID:</span>
                <input value={String(referenceID ?? "")} type="text" maxLength={20} className='tf-attr h-[2rem] m-[0_5px] p-2'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const { value } = e.target;

                        const isNan = isNaN(Number(value));

                        if (isNan) return;

                        dispatch(refundSetReferenceID(value));
                    }}
                />
            </div>
        </div>
    )
}

function Options({
    name,
    isSelected,
    onClick,
}: {
    name: string,
    isSelected: boolean,
    onClick: () => void,
}) {


    return <div className='w-full flex gap-2 ml-6'>
        <div className='w-[1rem] h-[1rem] rounded-full relative'
            style={{
                border: "var(--main-bg-secondary-dark) 2px solid"
            }}
            onClick={onClick}
        >
            {isSelected && <div className='absolute inset-0.5 rounded-full button-primary-gradient' />}
        </div>
        <span>{name}</span>
    </div>
}

export default TransactionRefundPaymentMethod
