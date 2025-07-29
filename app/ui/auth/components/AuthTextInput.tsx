'use client';

import { IconEye, IconEyeFilled } from '@tabler/icons-react';
import React, { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"

function AuthTextfield({
    title,
    errorMsg,
    type = "text",
    onChange,
    onBlur,
    name,
    value,
}: {
    title: string,
    name: string,
    value: string,
    errorMsg: string,
    onBlur: () => void,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    type?: React.HTMLInputTypeAttribute,
}) {
    const [showPass, setShowPass] = useState(false);

    const iconSize = 16;

    const icon = showPass ? <IconEye size={16} /> : <IconEyeFilled size={16} />;


    return <div className='flex flex-col w-full gap-1'>
        <span className='text-white'>{title}</span>

        <div className='relative'>
            <input name={name}
                value={value}
                type={showPass ? "text" : type}
                className='p-2 w-full h-[2.5rem] rounded-[8px] border border-gray-500 bg-gray-950'
                onChange={onChange}
                onBlur={onBlur}
            />

            {type === "password" && <div className='absolute right-2 top-1/2 -translate-y-1/2' onClick={() => {
                setShowPass(true);

                setTimeout(() => {
                    setShowPass(false)
                }, 2000);
            }}>
                {icon}
            </div>}
        </div>

        <AnimatePresence>
            {errorMsg && <motion.span className='text-red-500'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: .2 }}
            >{errorMsg}</motion.span>}
        </AnimatePresence>
    </div>
}

export default AuthTextfield;
