import GlobalWrapper from '@/app/lib/components/GlobalWrapper'
import React from 'react'
import NotificationPageBody from './NotificationBody'
import NotificationPageAppbar from './components/NotificationPageAppbar'
import NotificationPageStatus from './components/NotificationPageStatus'
import { NotificationModel } from '@/app/lib/models/notificationModel'
import { NotificationFilterType } from '@/app/lib/enum/notificationType'
import { prisma } from '@/app/lib/utils/db/prisma'


const page = async () => {

    const now = new Date();

    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    const notifications = await prisma.notifications.findMany({
        where: {
            createdAt: {
                gte: start,
                lte: end,
            }
        },
    })


    const child = (
        <div className='w-full h-full flex flex-col overflow-hidden'>
            <NotificationPageAppbar />
            {/** notification status */}
            <NotificationPageStatus />
            <NotificationPageBody data={notifications as NotificationModel[]} />
        </div>
    )

    return (
        <div className='w-screen h-screen flex overflow-hidden'>
            <GlobalWrapper child={child} />
        </div>
    )
}

export default page
