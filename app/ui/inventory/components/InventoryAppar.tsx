'use client';

import { toggleInventoryListView } from '@/app/lib/redux/inventorySlice';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { motion } from "framer-motion";
import { openToas } from '@/app/lib/redux/toastSlice';
import ToasEnum from '@/app/lib/enum/toastEnum';

const InventoryAppar = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { isListView } = useSelector((state: RootState) => state.inventorySlice);

    const handleListViewToggle = () => {
        dispatch(toggleInventoryListView());
        dispatch(openToas({
            message: isListView? "Switched to grid view mode" : "Switched to list view mode",
            type: ToasEnum.DEFAULT,
        }))
    }
    return (
        <div className='flex w-full min-h-[4rem] h-[4rem] justify-between items-center p-[0_20px]'
            style={{
                backgroundColor: "var(--background)"
            }}
        >
            <span className='text-[1.2rem] font-semibold italic'>Inventory</span>

            {/** tile type button */}
            <div className='flex'>
                <TileTypeButton icon='ri-layout-grid-fill' isSelected={isListView === false} onClick={handleListViewToggle} />
                <TileTypeButton icon='ri-list-view' isSelected={isListView === true} onClick={handleListViewToggle} />
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
