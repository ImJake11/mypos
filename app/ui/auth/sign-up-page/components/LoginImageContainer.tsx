'use client'

import { useWindowSize } from '@/app/lib/utils/hooks/useGetWindowSize'
import { Montserrat } from 'next/font/google'
import React from 'react'

const montserrat = Montserrat({
    style: "normal",
    weight: ["900", "500", '600', "800", "700", "400", "300"]
})


const LoginImageContainer = () => {

    return (
        <div className='hidden lg:flex flex-1 relative p-5 box-border'>
            {/** image icon */}
            <div className='w-full h-full overflow-hidden rounded-[20px]'>
                <img alt='cover image' src={"/login-cover.webp"} className='w-full h-full object-[0_60%] object-cover brightness-30 brightness-20' />
            </div>

            {/** title */}
            <div className='w-[80%] h-fit p-2 absolute left-7 bottom-7
            backdrop-blur-lg
            bg-white/10
            border border-white/20
            rounded-[20px]
            shadow-xl
            '>
                <span className={`${montserrat.className} font-[700]  text-gray-100 text-[3rem] flex flex-col items-start p-2`}>
                    <span className='text-left leading-12 tracking-tighter'>Powering Seamless Transactions</span>
                    <span className='text-[.8rem] font-[300] pl-2 text-white/80'>Powering seamless transactions—because every second saved at checkout means happier customers and bigger sales</span>
                </span>
            </div>
        </div>
    )
}

export default LoginImageContainer
