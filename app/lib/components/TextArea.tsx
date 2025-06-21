
import React from 'react'

interface Props {
    name: string,
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    value: string,
    label?: string,
}
const CustomTextArea = ({ onChange, placeholder, value, name, label }: Props) => {
    return <div className='flex flex-col gap-2'>
        {label && <span className=' font-semibold italic'>{label}</span>}
        <textarea name={name} id=""
            maxLength={200}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className='p-1.5 w-full h-[3rem] max-h-[7rem] min-h-[3rem] border border-[var(--primary)] rounded-[7px]'
        >

        </textarea>
    </div>
}

export default CustomTextArea
