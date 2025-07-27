'use client';

import { notificationChangeVisiblity } from '@/app/lib/redux/slice/notificationSlice'
import { RootState } from '@/app/lib/redux/store'
import { IconBellFilled } from '@tabler/icons-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "framer-motion"
import { openToas } from '@/app/lib/redux/slice/toastSlice';
import ToasEnum from '@/app/lib/enum/toastEnum';

const NotificationButton = () => {

    const dispatch = useDispatch();

    const { notificationCount, notifications } = useSelector((state: RootState) => state.notificationSlice);

    return (
        <motion.div className='min-w-[2rem] h-[2rem] rounded-full  border border-gray-300 grid place-content-center bg-gray-100 relative text-nowrap' onClick={() => {

            if (notifications.length <= 0) {
                dispatch(openToas({
                    message: "No Notifications Today",
                    type: ToasEnum.DEFAULT,
                }));
                return;
            }
            dispatch(notificationChangeVisiblity(true))
        }}
        >
            <IconBellFilled size={18} className='fill-gray-400' />

            <div className='absolute h-[1rem] w-[1rem] rounded-full bg-red-400 text-white text-[.6rem] grid place-content-center right-0'>
                {notificationCount}
            </div>
        </motion.div>
    )
}

export default NotificationButton
