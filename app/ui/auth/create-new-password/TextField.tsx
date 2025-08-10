'use client';

import { IconEye, IconEyeFilled } from '@tabler/icons-react';
import React, { useState } from 'react'

const TextField = ({
    title,
    onChange,
    value,
}: {
    title: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: string,
}) => {

    const [isShow, setIsShow] = useState(false);
    const type = isShow ? "text" : "password";

    const handleShowPassword = () => {
        setIsShow(true);

        setTimeout(() => {
            setIsShow(false);
        }, 3000);
    }

    return (
        <div className='w-full flex flex-col gap-3'>
            <span>{title}</span>
            <div className='w-full relative'>
                <input type={type} value={value} className='w-full h-[3rem] border border-gray-500 rounded-[8px] p-2' onChange={onChange} />
                <IconEyeFilled size={18} className={`absolute right-2 top-1/2 -translate-y-2.5 ${isShow ? "fill-[var(--color-brand-primary)]" : "fill-white"}`} onClick={handleShowPassword} />
            </div>
        </div>
    )
}

export default TextField
