'use client';

import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { PaymentMethod } from '@/app/lib/enum/paymentMethod';
import PaymentButton from './components/PaymentButton';
import PaymentHelper from './services/paymentHelper';
import { RootState } from '@/app/lib/redux/store';
import isValidDecimalInput from '@/app/lib/redux/utils/functions/validateDecimalInput';

const OrderCompletePayment = () => {

    const dispatch = useDispatch();

    const [input, setInput] = useState("");

    const { cartItems } = useSelector((state: RootState) => state.posSlice);

    const paymentService = useMemo(() => {
        return new PaymentHelper({
            cart: cartItems,
        })
    }, [cartItems]);

    const exchange = paymentService.calculateExchange(Number(input));

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        const isValid = isValidDecimalInput({
            currentInputs: input,
            input: value,
        });

        if (!isValid) return;

        setInput(value);
    }

    return (
        <div className='w-full p-5 flex flex-col gap-5'
        >
            <span>Payment option</span>

            <div className='flex flex-col flex-1 gap-4'>
                <PaymentButton name={PaymentMethod.CASH} icon={""} />
                <PaymentButton name={PaymentMethod.E_WALLET} icon={<EWalletIcons />} />
            </div>


            {/** user payment */}
            <span>User payment</span>
            <span className='text-[1.3rem] font-semibold'>Exchange: ₱ {exchange.toLocaleString('en-us')}</span>
            <input type="text" value={input} className='tf-attr w-full h-[3rem] p-2'
            onChange={handleInput}
            />


            <div className='h-[.5rem]' />
            <button className='w-fit h-[3rem] button-primary-gradient rounded-[var(--button-border-radius)] p-[0_10px] place-self-end'>
                Finish Transaction
            </button>



        </div>
    )
}

const EWalletIcons = () => {
    return (
        <div className='flex gap-1'>
            {generateImageIcon("https://cdn.brandfetch.io/id-Wd4a4TS/theme/dark/idCerXwXCa.svg?c=1bxid64Mup7aczewSAYMX&t=1727787911932")}
            {generateImageIcon("https://cdn.brandfetch.io/idoxgeC6I9/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1744350528543")}
            {generateImageIcon("https://cdn.brandfetch.io/id_IE4goUp/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1749609305324")}
        </div>
    )
}
// -- returns image icon
function generateImageIcon(link: string) {
    return <div className='w-[3rem] h-[2rem] rounded-[5px] p-1.5'>
        {link && <img src={link} alt="icon" className='h-full w-full object-contain' />}
    </div>
}


export default OrderCompletePayment
