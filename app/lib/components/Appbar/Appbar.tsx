'use client';

import React from 'react'
import UserProfile from '../Sidebar/components/UserProfile'
import NotificationButton from './components/NotificationIcon'
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';

const Appbar = ({ child, title, icon }: {
    child?: React.JSX.Element,
    title: string,
    icon?: any,
}) => {

    return (
        <header className='w-full min-h-[3rem] flex items-center p-2 gap-2 bg-[var(--main-bg-primary)] dark:bg-[var(--main-bg-primary-dark)]'>

            {child && child}
            <NotificationButton />
            <DarkModeToggle />
            <UserProfile />
        </header>
    )
}

export default Appbar
