

import React from 'react'

const OrderComepleteLoadingTile = () => {
    return (
        <div className='min-h-[20rem] w-full p-5 flex gap-3'>

            {/** image container */}
            <div className='h-[15rem] w-[15rem] rounded-[12px] bg-[var(--main-bg-secondary)]' />
            <div className='flex-1 flex flex-col gap-2'>
                <div className='h-[3rem] bg-[var(--main-bg-secondary)] rounded-[8px]' />
                {Array.from({ length: 4 }).map((_,i) => <div key={i} className='h-[2rem] w-[15rem] rounded-[8px] bg-[var(--main-bg-secondary)]' />)}
            </div>
            <div className="h-full flex flex-col justify-end">
                <div className='h-[3rem] w-[10rem] rounded-[8px] bg-[var(--main-bg-secondary)]' />
            </div>
        </div>
    )
}

export default OrderComepleteLoadingTile
