
import React, { useCallback, useEffect, useRef } from 'react'

interface Props {
    name: string,
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    value: string,
    label?: string,
}
const CustomTextArea = ({ onChange, placeholder, value, name, label }: Props) => {

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Function to resize the textarea based on its content
    const resizeTextarea = useCallback(() => {
        if (textareaRef.current) {
            // Reset height to 'auto' first to calculate the true scrollHeight
            textareaRef.current.style.height = 'auto';

            const minHeightPx = 96; // 6rem * 16px/rem
            const maxHeightPx = 160; // 10rem * 16px/rem

            let newHeight = textareaRef.current.scrollHeight;

            if (newHeight < minHeightPx) {
                newHeight = minHeightPx;
            } else if (newHeight > maxHeightPx) {
                newHeight = maxHeightPx;
            }

            textareaRef.current.style.height = `${newHeight}px`;

            // If content exceeds maxHeight, show scrollbar
            textareaRef.current.style.overflowY = newHeight >= maxHeightPx ? 'auto' : 'hidden';
        }
    }, []);

    // Effect to resize initially and whenever the 'highlights' value changes
    useEffect(() => {
        resizeTextarea();
    }, [value, resizeTextarea]);


    return <div className='flex flex-col gap-2'>
        {label && <span className=' font-semibold italic'>{label}</span>}
        <textarea ref={textareaRef} name={name} id=""
            maxLength={500}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className='rounded-[8px] border border-black dark:border-gray-300 p-1.5 w-full h-[3rem] max-h-[7rem] min-h-[3rem]
            focus:outline-[var(--color-brand-primary)]
            '
        >

        </textarea>
    </div>
}

export default CustomTextArea
