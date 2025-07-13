'use client';

import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { PaymentMethod } from '@/app/lib/enum/paymentMethod';
import PaymentButton from './components/PaymentButton';
import PaymentHelper from './services/paymentHelper';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import { AnimatePresence } from 'framer-motion';
import { motion } from "framer-motion";
import { TransactionDetailsModel } from '@/app/lib/models/transactionModel';
import { openToas } from '@/app/lib/redux/toastSlice';
import ToasEnum from '@/app/lib/enum/toastEnum';
import { useRouter } from 'next/navigation';
import { decimalValidation } from '@/app/lib/utils/services/decimalValidation';
import { saveTransaction } from '../../../services/saveTransaction';

const OrderCompletePayment = () => {

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const [input, setInput] = useState("");

    const posSlice = useSelector((state: RootState) => state.posSlice);

    const { cartItems, paymenMethod } = posSlice;

    const isCashMethod = paymenMethod === PaymentMethod.CASH;

    const paymentService = useMemo(() => {
        return new PaymentHelper({
            vatValue: 12,
        })
    }, [posSlice]);

    const exchange = paymentService.calculateExchange(Number(input));

    const handleExchangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        const isValid = decimalValidation({
            currentInputs: input,
            input: value,
        });

        if (!isValid) return;

        setInput(value);
    }

    const handleReferenceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const isNan = isNaN(Number(value));
        if (isNan) return;
        setInput(value);
    }

    const handleFinishTransaction = async () => {
        const transactionData: TransactionDetailsModel = paymentService.generateTransactionData(Number(input));

        if (cartItems.length <= 0) {
            dispatch(openToas({
                message: "Cart is empty",
                type: ToasEnum.ERROR,
            }))
            return;
        }
        if (transactionData === undefined) {
            dispatch(openToas({
                message: "Transaction data required",
                type: ToasEnum.ERROR,
            }))
            return;
        }

        if (paymenMethod === PaymentMethod.CASH && Number(input) < paymentService.getCartNetTotal()) {
            dispatch(openToas({
                message: "Insufficient payment. Please pay the full amount.",
                type: ToasEnum.ERROR,
            }));
            return;
        }

        if (paymenMethod === PaymentMethod.E_WALLET) {
            if (!input) {
                dispatch(openToas({
                    message: "Field cannot be empty",
                    type: ToasEnum.ERROR,
                }));
                return;
            }

            if (input.length < 13) {
                dispatch(openToas({
                    message: "Invalid reference number",
                    type: ToasEnum.ERROR,
                }));
                return;
            }

        }

        await saveTransaction({
            dispatch,
            transactionData,
        }).then(() => {
            router.replace("/ui/pos");
        });

    }
    return (
        <div className='w-full p-5 flex flex-col gap-5'
        >
            <span>Payment option</span>

            <div className='flex flex-col flex-1 gap-4'>
                <PaymentButton name={PaymentMethod.CASH} icon={""} />
                <PaymentButton name={PaymentMethod.E_WALLET} icon={<EWalletIcons />} />
            </div>

            <InputTitl title={isCashMethod ? "Customer payment" : "Transaction reference id"} />
            <AnimatePresence>
                {isCashMethod && <motion.span className='text-[1.3rem] font-semibold'
                    initial={{
                        x: "50%",
                        opacity: 0,
                    }}
                    animate={{
                        x: "0%",
                        opacity: 1
                    }}
                    exit={{
                        x: "50%",
                        opacity: 0,
                        transition: {
                            ease: "linear"
                        }
                    }}
                >Exchange: ₱ {exchange.toLocaleString('en-us')}</motion.span>}
            </AnimatePresence>
            <input type="text" maxLength={13} value={input} className='tf-attr w-full h-[3rem] p-2'
                onChange={isCashMethod ? handleExchangeInput : handleReferenceInput}
            />
            <div className='h-[.5rem]' />
            <button className='w-fit h-[3rem] button-primary-gradient rounded-[var(--button-border-radius)] p-[0_10px] place-self-end'
                onClick={handleFinishTransaction}
            >
                Finish Transaction
            </button>
        </div>
    )
}

function InputTitl({ title }: { title: string }) {
    return <motion.span
        key={title}
        initial={{
            opacity: 0,
            y: "50%",
        }}
        animate={{
            opacity: 1,
            y: "0%",
        }}
        exit={{
            opacity: 0,
            y: "-50%",
        }}
    >{title}</motion.span>;
}

const EWalletIcons = () => {
    return (
        <div className='flex gap-1'>
            {generateImageIcon("https://cdn.brandfetch.io/idoxgeC6I9/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1744350528543")}
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
