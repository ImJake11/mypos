'use client'

import { RootState } from '@/app/lib/redux/store';
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TransactionPDFItemTile from './components/TransactionPDFItemTile';
import TransactionDownloadPDFBtn from '../TransactionDownloadPDFBtn';
import { AnimatePresence, motion } from "framer-motion";
import CloseIcon from '@/app/lib/icons/closeIcon';
import { trnasactionTogglePDF } from '@/app/lib/redux/slice/transactionSlice';

const TransactionPDFLayout = () => {
    const pdfRef = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();

    const { filteredData, isPDFVisible } = useSelector((state: RootState) => state.transaction);

    return (
        <AnimatePresence>
            {isPDFVisible && <motion.div className='w-screen h-screen absolute backdrop-blur-[3px]'
                style={{
                    backgroundColor: "rgb(0,0,0,.8)"
                }}
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                exit={{
                    opacity: 0
                }}
            >

                <div ref={pdfRef} className='w-fit h-full absolute overflow-auto flex flex-col items-center left-1/2 -translate-x-1/2 gap-2 pt-[20px]'>
                    {

                        filteredData.length <= 0 ? <div className='w-full h-full grid place-content-center'>
                            <span className='text-white dark: black'><strong>
                                No Data found
                            </strong></span>
                        </div>
                            :
                            filteredData.map((data) => <TransactionPDFItemTile data={data} key={data.transactionId} />)}
                </div>

                <button className='absolute top-3 right-[15%]'
                    onClick={() => dispatch(trnasactionTogglePDF())}
                >
                    <CloseIcon size={30} attr='stroke-white'/>
                </button>

                <TransactionDownloadPDFBtn dataLength={filteredData.length} pdfRef={pdfRef} />
            </motion.div>}
        </AnimatePresence>
    )
}

export default TransactionPDFLayout
