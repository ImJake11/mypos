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

    return <div className='pl-[3rem] pr-[1rem] pt-[.5rem] w-full gap-2 min-h-[5rem] mb-0.5 flex flex-col  border-b mr-[2rem border-gray-300'>

        <div className='flex gap-3'>
            <span className='text-[.6rem] text-white h-fit p-[3px_7px] rounded-[12px]' style={{ backgroundColor: getTypeColor() }}>{tileData.type}</span>
            <span className='font-[600]'>{tileData.title}</span >
            <div className="flex-1" />
            <span className='text-[.7rem] font-[600]'>{date} - {time}</span>
        </div>

        {/** content and date */}
        <span className='pl-[1rem] flex-1 flex text-gray-500 text-[.7rem]'>- {tileData.message}</span>

    </div>
}

export default NotificationPageTile;