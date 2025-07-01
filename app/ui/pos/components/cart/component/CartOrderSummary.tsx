import PayIcon from '@/app/lib/icons/payIcon';
import { posToggleCartTab } from '@/app/lib/redux/posSlice';
import { toggleCategoryTab } from '@/app/lib/redux/productSlice';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useDispatch } from 'react-redux';

const CartOrderSummary = ({ overallCartTotal }: { overallCartTotal: number }) => {

    const router = useRouter();

    const dispatch = useDispatch();

    return (
        <div className='bg-[var(--main-bg-secondary-dark)] flex-1 rounded-br-[20px] rounded-bl-[20px] flex flex-col p-5 gap-5 '>
            <div className='flex justify-between text-[1.2rem]'>
                <span>Total: </span>
                <span className='font-semibold'>Php {overallCartTotal.toLocaleString('en-us')}</span>
            </div>
            <div className='flex-1' />
            {/** actions */}
            <div className='flex w-full gap-4 justify-end'>
                {/** close icon */}
                <button className='rounded-[7px] border-[var(--border-default-dark)] border p-[0_20px] w-fit h-[3rem]'
                    onClick={() => dispatch(posToggleCartTab())}
                >
                    Close
                </button>

                {/** pay icon */}
                <button className='button-primary-gradient h-[3rem] items-center gap-2 w-fit p-[0_10px] rounded-[7px] rounded-br-[15px] flex'
                    onClick={() => router.push("/ui/pos/order-complete")}
                >
                    <div className='w-[1.5rem] h-[1.5rem]'>
                        <PayIcon />
                    </div>
                    Pay
                </button>
            </div>
        </div>
    )
}

export default CartOrderSummary
