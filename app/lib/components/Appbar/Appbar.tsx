

import React from 'react'

const Appbar = ({ child, title, icon }: {
    child?: React.JSX.Element,
    title: string,
    icon?: any,
}) => {
    return (
        <div className='w-full min-h-[4rem] flex justify-between items-end p-2 pr-5 gap-2'
            style={{
                backgroundColor: "var(--main-bg-primary-dark)",
            }}
        >
            <div className='flex gap-2 items-center'>
                {icon}
                <span className='font-semibold text-[1.2rem]'>{title}</span>
            </div>
            {child && child}
        </div>
    )
}

export default Appbar
