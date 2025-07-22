'use client';

import Appbar from '@/app/lib/components/Appbar/Appbar'
import React from 'react'

const NotificationPageAppbar = () => {

    const child = (
        <div className='flex gap-2' style={{ color: "var(--color-brand-primary)" }}>
            <i className="ri-check-double-line"></i>
            <span>Mark All as Read</span>
        </div>
    )
    return (
        <Appbar title='Notifications'
            child={child}
        />
    )
}

export default NotificationPageAppbar
