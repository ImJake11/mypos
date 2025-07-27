import { NotificationModel } from "@/app/lib/models/notificationModel";
import React from "react";
import { motion } from "framer-motion";


function NotificationPageTile({ tileData }: { tileData: NotificationModel }) {

    const timestamp = new Date(tileData.createdAt);

    const date = timestamp.toLocaleDateString('en-US', { dateStyle: "medium" });

    const time = timestamp.toLocaleTimeString('en-US', { timeStyle: "short" });

    const textColor = (): string => {
        switch (tileData.type) {
            case "ERROR":
                return "text-red-500";
            case "SUCCESSFUL":
                return "text-green-500";
            case "WARNING":
                return "text-orange-500";
            default:
                return "text-gray-500";
        }
    }

    const bgColor = (): string => {
        switch (tileData.type) {
            case "ERROR":
                return "bg-red-500/10";
            case "SUCCESSFUL":
                return "bg-green-500/10";
            case "WARNING":
                return "bg-orange-500/10";
            default:
                return "bg-gray-500/10";
        }
    }

    return <motion.div className='pl-[3rem] pr-[1rem] pt-[.5rem] w-full gap-2 min-h-[5rem] mb-0.5 flex flex-col mr-[2rem'
       
        whileHover={{
            boxShadow: "0px 2px 5px rgb(0,0,0, .4)"
        }}
    >

        <div className='flex gap-3'>
            <span className={`${bgColor()} text-[.6rem] ${textColor()} font-[600] h-fit p-[3px_7px] rounded-[12px]`}>{tileData.type}</span>

            <span className='font-[600] text-black'>{tileData.title} {!tileData.isRead && "- Unread"}</span >
            <div className="flex-1" />
            <span className='text-[.7rem] font-[600] text-gray-400'>{date} - {time}</span>
        </div>

        {/** content and date */}
        <span className={`pl-[1rem] flex-1 flex  text-[.7rem] ${!tileData.isRead ? "font-semibold text-black" : "text-gray-500"}`}>- {tileData.message}</span>

    </motion.div>
}

export default NotificationPageTile;