'use client';

import { NotificationFilterType } from '@/app/lib/enum/notificationType';
import { notificationToggleFilter, notificationToggleIsRead } from '@/app/lib/redux/slice/notificationSlice';
import { RootState } from '@/app/lib/redux/store';
import { capitalizeFirtLetter } from '@/app/lib/utils/services/capitalizeFirstLetter'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from "framer-motion";

const names = [
    NotificationFilterType.TODAY,
    NotificationFilterType.ALL,
    NotificationFilterType.SUCCESSFUL,
    NotificationFilterType.WARNING,
    NotificationFilterType.ERROR,
    NotificationFilterType.SYSTEM
]

const NotificationPageStatus = () => {

    const dispatch = useDispatch();

    const isRead = useSelector((state: RootState) => state.notificationSlice.isRead);

    const handleClick = (isRead: boolean) => {
        dispatch(notificationToggleIsRead(isRead));
    }

    return (
        <div className='flex flex-col gap-2 w-full'>
            <div className='flex w-full justify-around h-[2rem] items-center text-[1rem]'>
                <span className={`${isRead ? "text-[var(--color-brand-primary)]" : "text-gray500"} hover:bg-gray-100 w-full text-center p-[4px_0]`} onClick={()=> handleClick(true)}>Read</span>

                <span className={`${!isRead ? "text-[var(--color-brand-primary)]" : "text-gray500"} hover:bg-gray-100 w-full text-center p-[4px_0]`}  onClick={()=> handleClick(false)}>Unread</span>
            </div>
            <div className='w-full pl-5 h-[2rem] gap-1 flex mb-[.5rem]'>
                <AnimatePresence> {names.map((n, i) => <Tile name={n} key={i} />)}</AnimatePresence>
            </div>
        </div>
    )
}

function Tile({ name }: {
    name: NotificationFilterType
}) {
    const { currentFilter } = useSelector((state: RootState) => state.notificationSlice);

    const dispatch = useDispatch();

    const isSelected = currentFilter === name;

    return <motion.button key={name} className={`p-[5px_15px] min-w-[2.5rem] text-[.7rem] rounded-[15px] bg-gray-100 border ${isSelected ? "var(--color-brand-primary) text-[var(--color-brand-primary)]" : "border-gray-300 text-gray-500"}`}
        onClick={() => dispatch(notificationToggleFilter(name))}
    >
        {capitalizeFirtLetter(name.toLowerCase())}
    </motion.button>
}

export default NotificationPageStatus
