'use client';

import React from 'react'
import { inventoryToggleInventoryListView } from '@/app/lib/redux/slice/inventorySlice';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from "framer-motion";
import { openToas } from '@/app/lib/redux/slice/toastSlice';
import ToasEnum from '@/app/lib/enum/toastEnum';
import CartIndicator from '@/app/lib/components/CartIndicator';
import Appbar from '@/app/lib/components/Appbar/Appbar';
import FilterButton from '@/app/lib/components/FilterTab/FilterButton';
import { IconLayoutGridFilled, IconLayoutListFilled } from '@tabler/icons-react';
import Searchbar from '@/app/lib/components/Searchbar/Searchbar';
import { useWindowSize } from '@/app/lib/utils/hooks/useGetWindowSize';
import MenuButton from '@/app/lib/components/Appbar/components/MenuButton';

const _buttonDefaultColor = "fill-gray-400"
const _buttonSize = 18;

const InventoryAppar = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { isListView } = useSelector((state: RootState) => state.inventorySlice);

    const handleListViewToggle = () => {
        dispatch(inventoryToggleInventoryListView());
        dispatch(openToas({
            message: isListView ? "Switched to grid mode" : "Switched to table mode",
            type: ToasEnum.DEFAULT,
        }))
    }

    const { width } = useWindowSize();

    const isSmall = width < 768;


    const child = <div className='flex w-full gap-1 justify-end items-center'>
        {isSmall && <MenuButton />}
        {!isSmall && <Searchbar context='inventory' showEditIcon={true} />}

        <div className='flex-1' />
        {/** tile type button */}
        <motion.div className='flex border h-[2rem] gap-2 p-[0_10px] items-center border-gray-300 rounded-[20px] bg-gray-100' layout>


            <IconLayoutGridFilled size={_buttonSize} className={`${!isListView ? "fill-[var(--color-brand-primary)]" : "fill-gray-400"}`} onClick={handleListViewToggle} />

            <IconLayoutListFilled size={_buttonSize} className={` ${isListView ? "fill-[var(--color-brand-primary)]" : "fill-gray-400"}`} onClick={handleListViewToggle} />

        </motion.div>
        <CartIndicator />
        <FilterButton />

    </div>

    return (
        <Appbar
            title='Inventory'
            child={child}
        />
    )
}

export default InventoryAppar
