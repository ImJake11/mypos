"use client";

import React, { HTMLAttributes } from 'react'

interface ButtonProps {
    placeholder: string,
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    label: string,
    isNumeric: boolean
    value: string,
    maxLenght?: number,
}

const TextInputField = ({ isNumeric, onChange, placeholder, name, label, value, maxLenght }: ButtonProps) => {

    return <div className='flex flex-col gap-2'>
        <span className='font-semibold italic '>{label}</span>
        <input type="text" name={name}
        value={value}
        onChange={onChange}
        maxLength={maxLenght ? maxLenght : undefined}
        inputMode={isNumeric ? "numeric" : "text"}
        className='border h-[3rem] w-full border-[var(--primary)] rounded-[7px] p-1.5'
    />
    </div>
}

export default TextInputField
