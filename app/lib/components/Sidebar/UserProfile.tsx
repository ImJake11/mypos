'use client'

import "remixicon/fonts/remixicon.css";
import React from 'react'
import { motion } from "framer-motion";
import { IconSettingsFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const UserProfile = () => {

    const { isSidebarMinimize } = useSelector((state: RootState) => state.sidebarSlice);


    return (
        <div className='w-full h-[4rem] mb-1 p-3 flex items-center gap-3'>

            {/** picture container */}
            <motion.div className='w-[3rem] rounded-[4px] bg-gray-300 overflow-hidden'
            animate={{
                height: isSidebarMinimize? "2rem" : "3rem"
            }}
            >
                <Image src="/sample-profile.webp" alt="image" className="object-cover" width={100} height={100} />
            </motion.div>

            {!isSidebarMinimize && <span className='flex-col flex h-full justify-center text-nowrap'>
                {/** name */}
                <span className='font-[500]'>Jake Juguilon</span>
                {/** email */}
                <span className='text-[.6rem] text-gray-500'>jake@gmail.com</span>
            </span>}
        </div>
    )
}

export default UserProfile
