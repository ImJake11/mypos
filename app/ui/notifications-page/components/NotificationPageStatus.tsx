'use client';

import { NotificationFilterType } from '@/app/lib/enum/notificationType';
import { notificationToggleFilter } from '@/app/lib/redux/slice/notificationSlice';
import { RootState } from '@/app/lib/redux/store';
import { capitalizeFirtLetter } from '@/app/lib/utils/services/capitalizeFirstLetter'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const names = [
    NotificationFilterType.TODAY,
    NotificationFilterType.ALL,
    NotificationFilterType.SUCCESSFUL,
    NotificationFilterType.WARNING,
    NotificationFilterType.ERROR,
    NotificationFilterType.SYSTEM
]

const NotificationPageStatus = () => {

    return (
        <div className='w-full h-[2rem] gap-1 flex mb-[.5rem]' style={{ backgroundColor: "var(--main-bg-primary-dark)" }}>
            {names.map((n, i) => <Tile name={n} key={i} />)}
        </div>
    )
}

function Tile({ name }: {
    name: NotificationFilterType
}) {
    const { currentFilter } = useSelector((state: RootState) => state.notificationSlice);

    const dispatch = useDispatch();

    const isSelected = currentFilter === name;

    return <button className='p-[5px_15px] min-w-[3rem] rounded-[15px]'
        style={{
            border: isSelected ? "solid 1px var(--color-brand-primary)" : "solid 1px var(--border-default-dark)",
            color: isSelected ? "var(--color-brand-primary)" : "var(--foreground)"
        }}
        onClick={() => dispatch(notificationToggleFilter(name))}
    >
        {capitalizeFirtLetter(name.toLowerCase())}
    </button>
}

export default NotificationPageStatus
