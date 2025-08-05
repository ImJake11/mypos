"use client";

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import ToasEnum from '../enum/toastEnum';
import { closeToas, promptConfirmed } from '../redux/slice/toastSlice';
import { AnimatePresence, motion } from "framer-motion";
import { useWindowSize } from '../utils/hooks/useGetWindowSize';

const Toas = () => {

    const dispatch = useDispatch();

    const { message, isVisible, type, context, payload } = useSelector((state: RootState) => state.toasSlice);

    function generateBorderColor(): string {

        switch (type) {

            case ToasEnum.PENDING:
                return "border-yellow-500";
            case ToasEnum.SUCCESS:
                return "border-green-600"
            case ToasEnum.ERROR:
                return "border-red-500";
            case ToasEnum.CONFIRMATION:
                return "border-red-700";
            default:
                return "border-[var(--color-brand-primary)]"
        }
    }

    function generateIcon(): { color: string, icon: string } {

        let icon = "";
        let color = "";

        switch (type) {
            case ToasEnum.CONFIRMATION:
                icon = "ri-error-warning-line";
                color = "text-white";
                break;
            case ToasEnum.DEFAULT:
                icon = "ri-notification-2-line"
                color = "text-[var(--color-brand-primary)]"
                break;
            case ToasEnum.ERROR:
                color = 'text-red-500'
                icon = "ri-error-warning-line";
                break;
            case ToasEnum.PENDING:
                color = 'text-yellow-500'
                icon = "ri-loader-2-line"
                break;
            case ToasEnum.SUCCESS:
                color = 'text-green-600'
                icon = "ri-check-double-line";
                break;

        }

        return { icon, color }
    }

    const handleConfirmationn = () => {
        if (context !== undefined) {
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

    // close toas after 5 seconds
    useEffect(() => {

        let timeOut: NodeJS.Timeout;

        if (type !== ToasEnum.CONFIRMATION) {

            timeOut = setTimeout(() => {
                dispatch(closeToas())
            }, 3000);
        }

        return () => {
            if (timeOut) {
                clearTimeout(timeOut);
            }
        }


    }, [isVisible]);


    return (
        <AnimatePresence>
            {isVisible && <motion.div className={`rounded-[8px] flex gap-1.5 absolute h-fit left-3 box-border p-2 ${type === ToasEnum.CONFIRMATION ? "bg-red-500" : "bg-white"} border text-[.8rem] text-white bottom-3 w-[80%] lg:w-[40rem]
            ${generateBorderColor()}`}
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
                <div className={`w-full flex ${type === ToasEnum.CONFIRMATION ? 'items-start' : 'items-center'} gap-1 ${generateIcon().color}`}>
                    <i className={generateIcon().icon}
                        style={{
                            fontSize: "1.3rem",
                        }}
                    />
                    <span>{message}</span>
                </div>

                {type === ToasEnum.CONFIRMATION && <div className='flex justify-end gap-2 items-end'>
                    <button className='p-[7px_12px] h-[2.5rem] bg-white rounded-[3px] text-red-500'
                        onClick={handleCancellation}
                    >Cancel</button>

                    <button className='p-[7px_12px] h-[2.5rem] border border-white rounded-[3px] text-white'
                        onClick={handleConfirmationn}
                    >Confirm</button>
                </div>}
            </motion.div>}
        </AnimatePresence>
    )
}



export default Toas
