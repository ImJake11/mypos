

import React, { Suspense } from 'react'
import Body from './Body'

const page = () => {
    return (
        <div className='w-screen h-screen bg-linear-120 from-black to-[#0C2340] grid place-content-center'>
            <Suspense>
                <Body />
            </Suspense>
        </div>
    )
}

export default page
