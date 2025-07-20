
import { TransactionStatus } from '@/app/lib/enum/transactionStatus';
import { TransactionIcon } from '@/app/lib/icons/transactionIcon';
import React, { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/lib/redux/store';
import { transactionUpdateFilterData } from '@/app/lib/redux/slice/transactionSlice';
import { TransactionFilterKeys } from '@/app/lib/constants/TransactionFilterKeys';
import { TransactionFilterModel } from '@/app/lib/models/transactionFilterModel';

const TransactionStatusComponent = () => {

    const [isOpen, setIsOpen] = useState(false);

    const { transactionStatus } = useSelector((state: RootState) => state.transaction.filterData);

    const options = [
        TransactionStatus.COMPLETED,
        TransactionStatus.REFUND,
        TransactionStatus.VOID,
    ];

    return (
        <motion.div className='w-full flex flex-col gap-2'
            initial={{
                height: "5rem"
            }}
            animate={{
                height: isOpen ? "16rem" : "5rem"
            }}
        >
            <span>Transaction Status</span>

            <div className='w-full border border-[var(--border-default-dark)] rounded-[8px] h-[2rem] items-center justify-between flex p-2'
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{transactionStatus ?? "All"}</span>
                <i className="text-[1.5rem] ri-arrow-down-s-fill" />
            </div>

            {isOpen && <>
                <OptionTile name='All' />
                {options.map((d, i) => <OptionTile name={d} key={i} />)}
            </>}
        </motion.div>
    )
}

function OptionTile({ name }: { name: string }) {

    const dispatch = useDispatch();

    const { transactionStatus } = useSelector((state: RootState) => state.transaction.filterData);

    const selectedTransactionStatus = transactionStatus ?? "All";

    const isSelected = name === selectedTransactionStatus;

    return <div className={`ml-7 flex w-full gap-2 h-[2rem] items-center ${isSelected ? "bg-[var(--main-bg-secondary-dark)]" : "bg-Otransparent"} rounded-[4px] p-2`}
        onClick={() => dispatch(transactionUpdateFilterData({
            data: name,
            name: TransactionFilterKeys.transactionStatus
        }))}
    >
        <TransactionIcon size={16} />
        <span>{name}</span>
    </div>

}

export default TransactionStatusComponent;
