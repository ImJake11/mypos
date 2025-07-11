'use client';

import React from 'react'
import { inventoryToggleInventoryListView } from '@/app/lib/redux/inventorySlice';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from "framer-motion";
import { openToas } from '@/app/lib/redux/toastSlice';
import ToasEnum from '@/app/lib/enum/toastEnum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FilterIcon } from '@/app/lib/icons/filterIcon';
import { filterToggleFilterTab } from '@/app/lib/redux/filterSlice';

const InventoryAppar = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { isListView } = useSelector((state: RootState) => state.inventorySlice);
    const isFilterTabVisible = useSelector((state: RootState) => state.filterSlice.isVisible);

    const handleListViewToggle = () => {
        dispatch(inventoryToggleInventoryListView());
        dispatch(openToas({
            message: isListView ? "Switched to grid mode" : "Switched to table mode",
            type: ToasEnum.DEFAULT,
        }))
    }
    return (
        <div className='flex w-full min-h-[3rem] h-[3rem] justify-between items-center p-[0_20px]'
            style={{
                backgroundColor: "var(--background)"
            }}
        >
            <label className='italic font-semibold'>Inventory</label >
            <div className='flex gap-3'>

                {/** filter button */}
                <AnimatePresence>
                    {!isFilterTabVisible && <motion.div className='button-primary-gradient p-[0_15px] flex items-center gap-1 rounded-[7px] h-[2rem] w-fit'
                        onClick={() => dispatch(filterToggleFilterTab(true))}
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
                        Filter <div className='w-[1.5rem] h-[1.5rem]'>
                            <FilterIcon />
                        </div>
                    </motion.div>}
                </AnimatePresence>

                {/** tile type button */}
                <motion.div className='flex border h-[2rem] border-[var(--color-brand-primary)] rounded-[4px] overflow-hidden relative' layout>
                    <motion.div className='w-[2.5rem] h-[2.5rem] absolute button-primary-gradient'
                        animate={{
                            transform: isListView ? "translateX(100%)" : "translateX(0%)"
                        }}
                    />
                    <TileTypeButton icon='ri-layout-grid-fill' onClick={handleListViewToggle} />
                    <TileTypeButton icon='ri-table-fill' onClick={handleListViewToggle} />
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

    return <div className='w-[2.5rem] h-[2rem] relative'>
        <motion.i className={`${icon} text-[1.2rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
            whileHover={{
                scale: 1.2
            }}
            onClick={onClick}
        ></motion.i>
    </div>
}

export default InventoryAppar
