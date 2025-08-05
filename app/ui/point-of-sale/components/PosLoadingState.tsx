import React from 'react'

const PosLoadingState = () => {

    return (
        <div className={`w-full h-full bg-[var(--main-bg-secondary)] rounded-[12px] p-3 grid gap-2 grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6`}>
            {Array.from({ length: 20 }).map((_, i) => {

                // product tile
                return <div key={i} className='w-full min-h-[14rem] rounded-[12px] bg-[var(--main-bg-primary)] flex flex-col p-2 items-center gap-2'>
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
