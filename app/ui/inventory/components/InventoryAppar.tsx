'use client';

import { setFilterData, toggleFilterTab, toggleInventoryListView } from '@/app/lib/redux/inventorySlice';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from "framer-motion";
import { openToas } from '@/app/lib/redux/toastSlice';
import ToasEnum from '@/app/lib/enum/toastEnum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FilterKeys } from '@/app/lib/constants/FilterKeys';
import { FilterModel } from '@/app/lib/models/filterModel';

const InventoryAppar = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { isListView, isFilterTabVisible } = useSelector((state: RootState) => state.inventorySlice);

    const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = FilterKeys.name as keyof FilterModel;
        const data = e.target.value;

        dispatch(setFilterData({ name, data }))
    }

    const handleListViewToggle = () => {
        dispatch(toggleInventoryListView());
        dispatch(openToas({
            message: isListView ? "Switched to grid view mode" : "Switched to list view mode",
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
                {/** tile type button */}
                <motion.div className='flex' layout>
                    <TileTypeButton icon='ri-layout-grid-fill' isSelected={isListView === false} onClick={handleListViewToggle} />
                    <TileTypeButton icon='ri-list-view' isSelected={isListView === true} onClick={handleListViewToggle} />
                </motion.div>

                {/** filter button */}
                <AnimatePresence>
                    {!isFilterTabVisible && <motion.div className='linear-bg-40 p-[10px_15px] rounded-[7px] h-fit w-fit'
                        onClick={() => dispatch(toggleFilterTab(true))}
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
            </div>
        </div>
    )
}

interface ButtonTileProp {
    icon: string,
    isSelected: boolean,
    onClick: () => void,
}

function TileTypeButton({ icon, isSelected, onClick }: ButtonTileProp) {

    return <div className='w-[2.5rem] h-[2.5rem] relative'>
        <motion.div className={`h-[2.5rem] rounded-[5px] w-[2.5rem]  linear-bg-40 absolute`}
        layout
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: isSelected ? 1 : 0,
            }}

            transition={{
                duration: .25,
                ease: "easeInOut",
            }}

            onClick={onClick}
        />
        <i className={`${icon} text-[1.5rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
            onClick={onClick}
        ></i>
    </div>
}

export default InventoryAppar
