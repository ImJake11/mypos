


import { IconLayoutGridFilled, IconLayoutListFilled } from '@tabler/icons-react'
import { motion } from 'framer-motion';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ToasEnum from '../enum/toastEnum';
import { inventoryToggleInventoryListView } from '../redux/slice/inventorySlice';
import { openToas } from '../redux/slice/toastSlice';
import { AppDispatch, RootState } from '../redux/store';

const _buttonSize = 18;

const TileViewButton = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { isListView } = useSelector((state: RootState) => state.inventorySlice);

    const handleListViewToggle = () => {
        dispatch(inventoryToggleInventoryListView());
        dispatch(openToas({
            message: isListView ? "Switched to grid mode" : "Switched to table mode",
            type: ToasEnum.DEFAULT,
        }))
    }


    return (
        <motion.div className='flex border h-[2rem] gap-2 p-[0_10px] items-center border-gray-300 dark:border-gray-500 rounded-[8px] md:rounded-[20px] bg-gray-100 dark:bg-[var(--main-bg-tertiary-dark)]' layout>

            <IconLayoutGridFilled size={_buttonSize} className={`${!isListView ? "fill-[var(--color-brand-primary)]" : "fill-gray-400 dark:fill-gray-300"}`} onClick={handleListViewToggle} />

            <IconLayoutListFilled size={_buttonSize} className={` ${isListView ? "fill-[var(--color-brand-primary)]" : "fill-gray-400 dark:fill-gray-300"}`} onClick={handleListViewToggle} />

        </motion.div>
    )
}

export default TileViewButton
