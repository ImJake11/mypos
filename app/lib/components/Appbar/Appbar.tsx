'use client';

import React from 'react'
import UserProfile from '../Sidebar/components/UserProfile'
import NotificationButton from './components/NotificationIcon'
import { useWindowSize } from '../../utils/hooks/useGetWindowSize';

const Appbar = ({ child, title, icon }: {
    child?: React.JSX.Element,
    title: string,
    icon?: any,
}) => {

    const { width } = useWindowSize();

    const isMobile = width < 576;



    return (
        <div className='w-full min-h-[3rem] flex items-center p-2 gap-2 bg-[var(--main-bg-primary)]'>

            {child && child}
            <NotificationButton />
            <UserProfile />
        </div>
    )
}

export default Appbar
