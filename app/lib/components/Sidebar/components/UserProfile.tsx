'use client'

import "remixicon/fonts/remixicon.css";
import React from 'react'
import { IconSettingsFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const UserProfile = () => {

    const { isSidebarMinimize } = useSelector((state: RootState) => state.sidebarSlice);


    return (
        <div className='h-[2rem] w-[4rem] border border-gray-300 flex justify-between rounded-[20px] items-center gap-2 pl-1 bg-gray-100'>
            <IconSettingsFilled size={18} className="fill-gray-400" />
            <div className="w-[2rem] h-full rounded-full overflow-hidden">
                <Image src="/sample-profile.webp" alt="image" className="object-cover" width={50} height={50} />
            </div>
        </div>
    )
}

export default UserProfile
