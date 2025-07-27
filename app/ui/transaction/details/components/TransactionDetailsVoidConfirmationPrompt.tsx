'use client';

import React, { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { IconArrowDown, IconChevronDown } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { openToas } from '@/app/lib/redux/slice/toastSlice';
import ToasEnum from '@/app/lib/enum/toastEnum';
import { toggleProcessDialog, updateProcessDialogCurrentValue, updaterPocessDialogMessage } from '@/app/lib/redux/slice/processSlice';
import { useRouter } from 'next/navigation';

const voidReasons = [
    "Customer changed mind",
    "Duplicate transaction",
    "System/Payment error",
    "Item unavailable",
    "Other (specify)"
];

const TransactionDetailsVoidConfirmationPrompt = ({
    onCancel,
    id,
}: {
    onCancel: () => void,
    id: string,
}) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [selectedReason, setSelectedReason] = useState(-1);
    const [inputReason, setInputReason] = useState("");
    const [password, setPassword] = useState("");

    const handleVoid = async () => {

        try {

            dispatch(toggleProcessDialog(true));
            dispatch(updaterPocessDialogMessage("Processsing.."));
            dispatch(updateProcessDialogCurrentValue(60));

            const res = await fetch(`/api/transactions/${id}/void`, {
                method: "PUT",
                body: JSON.stringify({
                    reason: inputReason,
                    password,
                })
            })

            if (!res.ok) {
                dispatch(openToas({
                    message: "Failed to process transaction",
                    type: ToasEnum.ERROR,
                }));
                return;
            }

            dispatch(updaterPocessDialogMessage("Processsing.."));
            dispatch(updateProcessDialogCurrentValue(100));
            dispatch(openToas({
                message: "Transaction void successfully",
                type: ToasEnum.SUCCESS,
            }));

            router.replace("/ui/transaction");
        } catch (e) {
            dispatch(openToas({
                message: "Failed to process transaction",
                type: ToasEnum.ERROR,
            }))
        } finally {
            dispatch(toggleProcessDialog(false))
        }
    }

    return (
        <div className='w-full min-h-[15rem] border border-red-300 rounded-[12px] p-3 flex flex-col relative gap-2'>

            <span className='italic'>Are you sure you want to void this transaction? This action cannot be undone.</span>

            <div className='w-[30rem] h-[2.5rem] p-2 border border-gray-300 bg-gray-100 rounded-[8px] flex justify-between' onClick={() => setIsOpen(true)}>
                {selectedReason === -1 ? "Select Reason" : voidReasons[selectedReason]}
                <IconChevronDown size={20} />
            </div>

            <AnimatePresence mode='wait'>
                {selectedReason === 4 && !isOpen && <motion.textarea key="textarea" className='w-full max-h-[5rem] min-h-[3rem] border border-gray-300 rounded-[8px] p-2' maxLength={400} initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    value={inputReason}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        setInputReason(e.target.value)
                    }}
                />}
            </AnimatePresence>


            <motion.div key="reasons" className='w-[30rem] bg-white flex flex-col overflow-auto rounded-[8px] border-gray-300 border'
                initial={{ opacity: 0, height: "0rem" }}
                animate={{
                    opacity: isOpen ? 1 : 0,
                    height: isOpen ? "6rem" : "0rem",
                    padding: isOpen ? "8px" : "0px",
                }}
            >
                {voidReasons.map((reason, index) => <motion.div key={index} className='min-h-[2rem] bg-white hover:bg-gray-100 p-1 items-center' onClick={() => {
                    setSelectedReason(index);
                    setIsOpen(false);
                }}>
                    {reason}
                </motion.div>)}
            </motion.div>

            <div className='flex-1' />

            <div className='w-full flex justify-end gap-3'>

                <input type="password" className='w-[30rem] h-[2.5rem] border border-gray-300 rounded-[8px] p-2 bg-gray-100' placeholder='Input password' value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />

                <div className='flex-1' />

                <button className='w-fit h-[2.5rem] rounded-[8px] p-[7px_15px] bg-red-500 text-white border-red-500 border' onClick={onCancel}>Cancel</button>

                <button className='w-fit h-[2.5rem] rounded-[8px] p-[7px_15px] border-gray-300 border' onClick={handleVoid}>Proceed</button>
            </div>


        </div>
    )
}

export default TransactionDetailsVoidConfirmationPrompt 
