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

    function generateColorAttr(): React.CSSProperties {

        let attr: React.CSSProperties = {};


        switch (type) {

            case ToasEnum.DEFAULT:
                attr = {
                    backgroundColor: "var(--main-bg-primary)",
                    border: "solid 2px var(--toas-default)",
                }
                break;

            case ToasEnum.PENDING:
                attr = {
                    backgroundColor: "var(--backgrouxnd",
                    border: "solid 2px var(--toas-pending)",
                }
                break;
            case ToasEnum.SUCCESS:
                attr = {
                    backgroundColor: "var(--main-bg-primary)",
                    border: "solid 2px var(--toas-success)",
                }
                break;
            case ToasEnum.ERROR:
                attr = {
                    backgroundColor: "var(--main-bg-primary)",
                    border: "solid 2px var(--toas-error)",
                }
                break;
            case ToasEnum.CONFIRMATION:
                attr = {
                    backgroundColor: "red",
                    border: "solid 2px var(--toas-error)",
                }
                break;

            default:
                attr = {
                    backgroundColor: "var(--main-bg-primary)",
                    border: "solid 2px var(--toas-primary)",
                }
        }

        return attr;
    }

    function generateIcon(): { color: string, icon: string } {

        let icon = "";
        let color = "";

        switch (type) {
            case ToasEnum.CONFIRMATION:
                icon = "ri-error-warning-line";
                color = "white";
                break;
            case ToasEnum.DEFAULT:
                icon = "ri-notification-2-line"
                color = "var(--primary)"
                break;
            case ToasEnum.ERROR:
                color = 'red'
                icon = "ri-error-warning-line";
                break;
            case ToasEnum.PENDING:
                color = 'yellow'
                icon = "ri-loader-2-line"
                break;
            case ToasEnum.SUCCESS:
                color = 'green'
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

    const { width } = useWindowSize();

    const isMedium = width >= 768;

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
            {isVisible && <motion.div className={`rounded-[var(--toas-border-radius)] flex items-center gap-1.5 absolute h-fit left-3 bottom-3 box-border p-[.2rem_.5rem] text-[.8rem]
            ${isMedium ? "w-[40rem]" : "w-[80%]"}
            `}
                style={generateColorAttr()}

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
                <i className={generateIcon().icon}
                    style={{
                        fontSize: "1.3rem",
                        color: generateIcon().color,
                    }}
                ></i>
                <span>{message}</span>
                <div className='flex-1'></div>
                {/** actions 
                 * show onnly f the toas type is confirmation
                */}
                {type === ToasEnum.CONFIRMATION && <>
                    <button className='p-[7px_12px] bg-white rounded-[3px] text-red-500'
                        onClick={handleCancellation}
                    >Cancel</button>

                    <button className='p-[7px_12px] border border-white rounded-[3px] text-white'
                        onClick={handleConfirmationn}
                    >Confirm</button>
                </>}
            </motion.div>}
        </AnimatePresence>
    )
}



export default Toas
