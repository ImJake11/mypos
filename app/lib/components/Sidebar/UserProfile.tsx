import "remixicon/fonts/remixicon.css";
import React from 'react'
import { motion } from "framer-motion";

const UserProfile = () => {

    return (
        <div className='w-full h-[4rem]  p-[10px_8px] mt-[1rem] flex justify-center items-center gap-3'>
            {/** picture container */}
            <motion.div className='h-full rounded-[5px] text-[.8rem]'
                style={{
                    backgroundColor: "var(--secondary-background)"
                }}
                animate={{
                    width: "3rem"
                }}

            ></motion.div>
            <span className='flex-col flex h-full justify-center'>
                {/** name */}
                <span className='font-semibold'>Jake Juguilon</span>
                {/** email */}
                <span className='text-[.6rem] '
                    style={{
                        color: "var(--secondary-foreground)"
                    }}
                >jake@gmail.com</span>
            </span>

            <div className='flex-1' />
            <i className="ri-settings-4-fill"></i>
        </div>
    )
}

export default UserProfile
