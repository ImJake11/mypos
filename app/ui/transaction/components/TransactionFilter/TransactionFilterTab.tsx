'use client';

import React from 'react'
import TransactionDateFilter from './components/TransactionDateFilter'
import TransactionPriceRange from './components/TransactionPriceRange'
import CloseIcon from '@/app/lib/icons/closeIcon'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/lib/redux/store';
import { transactionSetFilteredData, transactionSetLoading, transactionToggleFilterTab, transactionToggleIsFiltering } from '@/app/lib/redux/slice/transactionSlice';
import DatePicker from '@/app/lib/components/DatePicker/DatePicker';
import TransactionPaymentMethodOptions from './components/TransactionPaymentMethodOptions';
import TransactionStatus from './components/TransactionStatus';
import TransactionTaxOptions from './components/TransactionTaxOptions';
import TransactionServices from './TransactionService';
import { openToas } from '@/app/lib/redux/slice/toastSlice';
import ToasEnum from '@/app/lib/enum/toastEnum';
import { AnimatePresence, motion } from "framer-motion";
import { useWindowSize } from '@/app/lib/utils/hooks/useGetWindowSize';

const TransactionFilterTab = () => {

    const dispatch = useDispatch();

    const { isFilterVisible, filterData } = useSelector((state: RootState) => state.transaction);

    const handleApplyFilter = async () => {

        const transactionService = new TransactionServices();

        try {
            dispatch(transactionToggleFilterTab())
            dispatch(transactionSetLoading(true));

            const data = await transactionService.applyFilterData();

            dispatch(transactionSetFilteredData(data));
            dispatch(transactionToggleIsFiltering(true));

        } catch (e) {
            dispatch(openToas({
                message: "Failed to fetch the products",
                type: ToasEnum.ERROR,
            }))
        } finally {
            dispatch(transactionSetLoading(false));
        }
    }

    const { width } = useWindowSize();

    const isMobile = width < 576;

    return (
        <AnimatePresence>
            {isFilterVisible && <motion.div className='w-screen h-screen absolute backdrop-blur-[5px]'
                style={{
                    backgroundColor: "rgb(0,0,0,.5)",
                }}

                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                exit={{
                    opacity: 0,
                }}
            >
                <motion.div className={`h-full bg-[var(--main-bg-primary)] absolute right-0 p-5 flex flex-col gap-3
                ${isMobile ? "w-full" : "w-[35-rem]"}
                `}
                    initial={{
                        x: "100%"
                    }}
                    animate={{
                        x: "0%"
                    }}
                    exit={{
                        x: "100%",
                    }}
                    transition={{
                        duration: .4,
                        type: "spring",
                        bounce: .1,

                    }}
                >
                    <div className='w-full flex items-center justify-between'>
                        Filter Transaction
                        <button onClick={() => dispatch(transactionToggleFilterTab())}><CloseIcon attr='stroke-gray-600' size={25} /></button>
                    </div >


                    <div className='flex-1 flex flex-col gap-4 overflow-auto overflow-x-hidden p-1'>
                        {/** date filter */}
                        <TransactionDateFilter />
                        <div />
                        {/** price range */}
                        <TransactionPriceRange />

                        <TransactionStatus />

                        <TransactionPaymentMethodOptions />

                        <div className='min-h-[1rem]' />

                        <TransactionTaxOptions />

                        <div className='flex-1' />

                        {/** actions */}
                        <div className='flex w-full justify-end items-center gap-2'>
                            <ActionButton name='Clear All' borderColor="var(--tf-default-border)" />
                            <ActionButton name='Apply Filter' bgColor='button-primary-gradient'
                                onClick={handleApplyFilter}
                            />
                        </div>
                    </div>
                </motion.div>

                {/** date picker */}
                <DatePicker />
            </motion.div>}
        </AnimatePresence>
    )
}



function ActionButton({
    name, onClick, bgColor, borderColor,
}: {
    name: string,
    borderColor?: string,
    bgColor?: string,
    onClick?: () => void,
}) {
    return <button className={`w-fit p-[0_10px] h-[2.5rem] rounded-[8px] grid place-content-center ${bgColor ?? "bg-transparent"} border border-[${borderColor ?? "var(--color-brand-primary)"}] text-white`}
        onClick={onClick}
    >
        {name}
    </button>
}

export default TransactionFilterTab
