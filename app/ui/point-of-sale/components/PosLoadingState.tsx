

import React from 'react'

const PosLoadingState = () => {
    return (
        <div className='w-full h-full main-background-gradient rounded-[12px] p-3 grid grid-cols-6 gap-2'>
            {Array.from({ length: 20 }).map((_, i) => {

                // product tile
                return <div key={i} className='w-full rounded-[12px] min-h-[14rem] bg-[var(--main-bg-primary)] flex flex-col p-2 items-center gap-2'>
                    <div className='w-full h-[50%] bg-[var(--main-bg-secondary)] rounded-[12px]' />
                    <div className='w-[70%] h-[1rem] bg-[var(--main-bg-secondary)] rounded-[4px]' />
                    <div className='flex-1' />
                    <div className='w-[50%] h-[1rem] bg-[var(--main-bg-secondary)] rounded-[4px]' />
                </div>;
            })}
        </div>
    )
}

export default PosLoadingState
