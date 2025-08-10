'use client';

import Appbar from '@/app/lib/components/Appbar/Appbar'
import CircularLoadingIndicator from '@/app/lib/components/CircularLoadingIndicator';
import ToasEnum from '@/app/lib/enum/toastEnum';
import { openToas } from '@/app/lib/redux/slice/toastSlice';
import { IconCheck, IconChecks } from '@tabler/icons-react';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

const NotificationPageAppbar = () => {
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const handleMarkAll = async () => {

        try {
            setIsLoading(true);

            const res = await fetch("/api/notification", {
                method: "PUT"
            });

            if (!res.ok) {
                dispatch(openToas({
                    message: "Failed to mark all as read",
                    type: ToasEnum.ERROR,
                }));
            }

            dispatch(openToas({
                message: "Successfully mark all as read",
                type: ToasEnum.SUCCESS,
            }))

        } catch (e) {
            dispatch(openToas({
                message: "Failed to mark all as read",
                type: ToasEnum.ERROR,
            }))
        } finally {
            setIsLoading(false);
        }
    }

    const child = (
        <div className='flex gap-2 w-full justify-end'>

            <button className='flex gap-2 h-[2rem] rounded-[20px] border dark:border-gray-500 border-gray-300 bg-gray-100 dark:bg-[var(--main-bg-tertiary-dark)] p-[0_10px]
            items-center' onClick={handleMarkAll}>
                {isLoading ? <CircularLoadingIndicator size={20} borderWidth={1} /> : <IconChecks size={20} className='stroke-gray-400' />}
                <span className='text-gray-400'>Mark All as Read</span>
            </button>
        </div>
    )
    return (
        <Appbar title='Notifications'
            child={child}
        />
    )
}

export default NotificationPageAppbar
