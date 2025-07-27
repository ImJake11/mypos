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
            dispatch(posToggleCartTab(false))
        }, 2500);
    }


    return (
        <div className='bg-gray-50 flex-1 rounded-br-[20px] rounded-bl-[20px] flex flex-col p-2 gap-2 '>
            <div className='flex justify-between text-[.8rem]'>
                <span>Total: </span>
                <span className='font-[600]'>{Number(overallCartTotal).toLocaleString('en-us', { style: "currency", currency: "PHP" })}</span>
            </div>
            <div className='flex-1' />

            {/** actions */}
            <div className='flex w-full gap-2 justify-end'>
                {/** close icon */}
                <button className='rounded-[8px] border-gray-500 border p-[0_8px] w-fit h-[2rem]'
                    onClick={() => dispatch(posToggleCartTab(false))}
                >
                    Close
                </button>

                {/** pay icon */}
                <button className='button-primary-gradient h-[2rem] items-center gap-1 w-fit p-[0_5px] rounded-[8px] rounded-br-[15px] flex text-white'
                    onClick={handlePay}
                >

                    {isLoading ? <CircularLoadingIndicator size={22} /> : <div className='w-[1.5rem] h-[1.5rem]'>
                        <IconCreditCardFilled />
                    </div>}
                    Continue Payment
                </button>
            </div>
        </div>
    )
}

export default CartOrderSummary
