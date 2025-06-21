"use client";

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import ToasEnum from '../enum/toastEnum';
import { closeToas, promptConfirmed } from '../redux/toastSlice';
import { AnimatePresence, motion } from "framer-motion";

const Toas = () => {

    const dispatch = useDispatch();

    const { message, isVisible, type, context, payload } = useSelector((state: RootState) => state.toasSlice);

    function generateColorAttr() {

        switch (type) {

            case ToasEnum.DEFAULT:
                return "bg-gray-900 text-white";
            case ToasEnum.PENDING:
                return "bg-yellow-600 text-white";
            case ToasEnum.SUCCESS:
                return "bg-blue-500 text-white";
            case ToasEnum.ERROR:
                return "bg-red-500 text-white";
            case ToasEnum.CONFIRMATION:
                return "bg-red-500 text-white"
        }
    }

    // close toas after 5 seconds
    useEffect(() => {

        if (type === ToasEnum.CONFIRMATION) return;

        setTimeout(() => {
            dispatch(closeToas())
        }, 5000);
    }, [isVisible]);


    const handleConfirmationn = () => {
        if (context && payload) {
            dispatch(promptConfirmed({
                context,
                payload,
            }));
        }
        dispatch(closeToas());
    }

    const handleCancellation = () => {
        dispatch(closeToas());
    }

    return (
        <AnimatePresence>
            {isVisible && <motion.div className={`flex gap-1.5 absolute h-fit w-[40rem] right-3 bottom-3 ${generateColorAttr()} rounded-[11px] box-border p-[15px_]`}
                initial={{
                    opacity: 0,
                    y: 20,
                }}

                animate={{
                    opacity: 1,
                    y: 0,
                }}

                exit={{
                    opacity: 0,
                }}
            >
                <i className="ri-error-warning-line"></i>
                <span>{message}</span>
                <div className='flex-1'></div>



                {/** actions 
                 * show onnly f the toas type is confirmation
                */}
                {type === ToasEnum.CONFIRMATION && <>
                    <button className='p-[7px_12px] bg-white rounded-[7px] text-red-500'
                        onClick={handleCancellation}
                    >Cancel</button>

                    <button className='p-[7px_12px] border border-white rounded-[7px] text-white'
                        onClick={handleConfirmationn}
                    >Confirm</button>
                </>}
            </motion.div>}
        </AnimatePresence>
    )
}



export default Toas
