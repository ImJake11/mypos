import { NotificationModel } from "@/app/lib/models/notificationModel";
import React from "react";



function NotificationPageTile({ tileData }: { tileData: NotificationModel }) {

    const timestamp = new Date(tileData.createdAt);

    const date = timestamp.toLocaleDateString('en-US', { dateStyle: "medium" });

    const time = timestamp.toLocaleTimeString('en-US', { timeStyle: "short" });

    const getTypeColor = (): string => {
        switch (tileData.type) {
            case "ERROR":
                return "var(--notification-error)";
            case "SUCCESSFUL":
                return "var(--notification-success)";
            case "WARNING":
                return "var(--notification-warning)";
            default:
                return "var(--notification-system)";
        }
    }

    return <div className='ml-3 w-full p-5 gap-1 h-[5rem] mb-0.5 flex flex-col'
        style={{
            borderBottom: "solid 1px var(--main-bg-secondary-dark)"
        }}
    >

        <div className='flex-1 flex gap-3'>
            <span className='text-[.6rem] h-fit p-[3px_7px] rounded-[12px]' style={{ backgroundColor: getTypeColor() }}>{tileData.type}</span>
            <span className='font-[600]'>{tileData.title}</span >
        </div>

        {/** content and date */}

        <div className='flex-1 flex' style={{ color: "var(--foreground-lighter)" }}>
            <span className='flex-1'>{tileData.message}</span>
            <span className='place-self-end'>{date} - {time}</span>
        </div>

    </div>
}

export default NotificationPageTile;