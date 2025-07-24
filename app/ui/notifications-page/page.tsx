import GlobalWrapper from '@/app/lib/components/GlobalWrapper'
import Sidebar from '@/app/lib/components/Sidebar/Sidebar'
import React from 'react'
import NotificationPageBody from './NotificationBody'
import NotificationPageAppbar from './components/NotificationPageAppbar'
import NotificationPageStatus from './components/NotificationPageStatus'
import { NotificationModel } from '@/app/lib/models/notificationModel'
import { NotificationFilterType } from '@/app/lib/enum/notificationType'


const page = async () => {

    const protocol = process.env.WEBSITE_PROTOCOL;
    const host = process.env.WEBSITE_HOST;
    const port = process.env.WEBSITE_PORT;

    const baseUrl = `${protocol}://${host}:${port}`;

    let data: NotificationModel[] = [];


    const res = await fetch(`${baseUrl}/api/notification?filter=${NotificationFilterType.TODAY}&&limit=10`);

    if (!res.ok) {
        return <div></div>
    }

    const { notifications } = await res.json();

    const child = (
        <div className='w-full h-full flex flex-col overflow-hidden'>
            <NotificationPageAppbar />
            {/** notification status */}
            <NotificationPageStatus />
            <NotificationPageBody data={notifications as NotificationModel[]} />
        </div>
    )

    return (
        <div className='w-screen h-screen flex relative overflow-hidden'>
            <GlobalWrapper child={child} />
        </div>
    )
}

export default page
