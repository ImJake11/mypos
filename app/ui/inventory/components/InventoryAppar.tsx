'use client';

import React from 'react'
import { inventoryToggleFilterTab, inventoryToggleInventoryListView } from '@/app/lib/redux/inventorySlice';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from "framer-motion";
import { openToas } from '@/app/lib/redux/toastSlice';
import ToasEnum from '@/app/lib/enum/toastEnum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const InventoryAppar = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { isListView, isFilterTabVisible } = useSelector((state: RootState) => state.inventorySlice);

    const handleListViewToggle = () => {
        dispatch(inventoryToggleInventoryListView());
        dispatch(openToas({
            message: isListView ? "Switched to grid mode" : "Switched to table mode",
            type: ToasEnum.DEFAULT,
        }))
    }
    return (
        <div className='flex w-full min-h-[4rem] h-[4rem] justify-between items-center p-[0_20px]'
            style={{
                backgroundColor: "var(--background)"
            }}
        >
            <label className='italic font-semibold'>Inventory</label >
            <div className='flex gap-3'>

                {/** filter button */}
                <AnimatePresence>
                    {!isFilterTabVisible && <motion.div className='button-primary-gradient p-[10px_15px] rounded-[7px] h-fit w-fit'
                        onClick={() => dispatch(inventoryToggleFilterTab(true))}
                        initial={{
                            y: "-5rem",
                        }}

                        animate={{
                            y: "0rem",
                        }}

                        exit={{
                            y: "-5rem"
                        }}

                        transition={{
                            ease: "linear"
                        }}
                    >
                        Filter <FontAwesomeIcon icon={faFilter} />
                    </motion.div>}
                </AnimatePresence>

                {/** tile type button */}
                <motion.div className='flex border h-[2.5rem] border-[var(--color-brand-primary)] rounded-[4px] overflow-hidden relative' layout>
                    <motion.div className='w-[2.5rem] h-[2.5rem] absolute button-primary-gradient'
                        animate={{
                            transform: isListView ? "translateX(100%)" : "translateX(0%)"
                        }}
                    />
                    <TileTypeButton icon='ri-layout-grid-fill'  onClick={handleListViewToggle} />
                    <TileTypeButton icon='ri-table-fill'  onClick={handleListViewToggle} />
                </motion.div>

            </div>
        </div>
    )
}

interface ButtonTileProp {
    icon: string,
    onClick: () => void,
}

function TileTypeButton({ icon, onClick }: ButtonTileProp) {

    return <div className='w-[2.5rem] h-[2.5rem] relative'>
        <motion.i className={`${icon} text-[1.5rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
        whileHover={{
        scale: 1.2
        }}
            onClick={onClick}
        ></motion.i>
    </div>
}

export default InventoryAppar
