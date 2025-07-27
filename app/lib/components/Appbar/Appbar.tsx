

import React from 'react'
import UserProfile from '../Sidebar/components/UserProfile'
import NotificationButton from './components/NotificationIcon'

const Appbar = ({ child, title, icon }: {
    child?: React.JSX.Element,
    title: string,
    icon?: any,
}) => {
    return (
        <div className='w-full min-h-[3rem] flex items-center p-2 pr-5 gap-2 bg-[var(--main-bg-primary)] relative'>
            {child && child}
            <NotificationButton />
            <UserProfile />
        </div>
    )
}

export default Appbar
