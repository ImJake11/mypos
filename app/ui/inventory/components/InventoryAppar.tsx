'use client';

import React from 'react'
import { inventoryToggleInventoryListView } from '@/app/lib/redux/slice/inventorySlice';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from "framer-motion";
import { openToas } from '@/app/lib/redux/slice/toastSlice';
import ToasEnum from '@/app/lib/enum/toastEnum';
import { FilterIcon } from '@/app/lib/icons/filterIcon';
import { filterToggleFilterTab } from '@/app/lib/redux/slice/filterSlice';
import CartIndicator from '@/app/lib/components/CartIndicator';
import Appbar from '@/app/lib/components/Appbar/Appbar';
import FilterButton from '@/app/lib/components/FilterTab/FilterButton';

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

    const child = <div className='flex gap-1'>
        <CartIndicator />
        <FilterButton />
        {/** tile type button */}
        <motion.div className='flex border h-[2rem] border-gray-500 rounded-[4px] overflow-hidden relative shadow-[1px_1px_5px_rgb(0,0,0,.3)]' layout>
            <motion.div className='w-[2.5rem] h-[2rem] absolute button-primary-gradient opacity-80'
                animate={{
                    transform: isListView ? "translateX(100%)" : "translateX(0%)"
                }}
            />
            <TileTypeButton icon='ri-layout-grid-fill' onClick={handleListViewToggle} isSelected={!isListView} />
            <TileTypeButton icon='ri-table-fill' onClick={handleListViewToggle} isSelected={isListView} />
        </motion.div>
    </div>

    return (
        <Appbar
            title='Inventory'
            child={child}
        />
    )
}

interface ButtonTileProp {
    icon: string,
    onClick: () => void,
    isSelected: boolean,
}

function TileTypeButton({ icon, onClick, isSelected }: ButtonTileProp) {

    return <div className='w-[2.5rem] h-[2rem] relative'>
        <motion.i className={`${icon} ${isSelected? "text-white" : "text-gray-700"} text-[1.2rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
            whileHover={{
                scale: 1.2
            }}
            onClick={onClick}
        ></motion.i>
    </div>
}

export default InventoryAppar
