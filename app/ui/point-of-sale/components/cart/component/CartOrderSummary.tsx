import CircularLoadingIndicator from '@/app/lib/components/CircularLoadingIndicator';
import PayIcon from '@/app/lib/icons/payIcon';
import { posToggleCartTab } from '@/app/lib/redux/slice/posSlice';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { IconCreditCardFilled } from '@tabler/icons-react';

const CartOrderSummary = ({ overallCartTotal }:
    {
        overallCartTotal: number
    }) => {

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const dispatch = useDispatch();


    const handlePay = async () => {
        setIsLoading(true);

        setTimeout(() => {
            router.push("/ui/point-of-sale/order-complete");
            dispatch(posToggleCartTab())
        }, 2500);
    }


    return (
        <div className='bg-[var(--main-bg-secondary)] flex-1 rounded-br-[20px] rounded-bl-[20px] flex flex-col p-5 gap-5 '>
            <div className='flex justify-between text-[1rem]'>
                <span>Total: </span>
                <span className='font-[600]'>{Number(overallCartTotal).toLocaleString('en-us', { style: "currency", currency: "PHP" })}</span>
            </div>
            <div className='flex-1' />
            {/** actions */}
            <div className='flex w-full gap-4 justify-end'>
                {/** close icon */}
                <button className='rounded-[7px] border-gray-500 border p-[0_20px] w-fit h-[2.5rem]'
                    onClick={() => dispatch(posToggleCartTab())}
                >
                    Close
                </button>

                {/** pay icon */}
                <button className='button-primary-gradient h-[2.5rem] items-center gap-2 w-fit p-[0_10px] rounded-[7px] rounded-br-[15px] flex text-white'
                    onClick={handlePay}
                >
                    {isLoading ? <CircularLoadingIndicator size={30} /> :
                        <> <div className='w-[1.5rem] h-[1.5rem]'>
                            <IconCreditCardFilled />
                        </div>
                            Pay</>}
                </button>
            </div>
        </div>
    )
}

export default CartOrderSummary
