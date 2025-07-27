
import React from 'react'
import { Montserrat } from 'next/font/google'
import AuthTemplate from '../components/AuthTemplate'

const montserrat = Montserrat({
    style: "normal",
    weight: ["900", "500", '600', "800", "700", "400", "300"]
})


const page = () => {

    return (
        <div className='w-screen h-screen flex overflow-hidden bg-black'>

            <div className='flex-1'>
                <AuthTemplate />
            </div>
            <div className='flex-1 relative'>
                {/** image icon */}
                <div className='w-full h-full overflow-hidden'>
                    <img alt='cover image' src={"/login-cover.webp"} className='w-full h-full object-[0_60%] object-cover brightness-30 brightness-20' />
                </div>

                {/** title */}
                <span className={`${montserrat.className} font-[500] absolute bottom-[5%] left-[5%] right-[30%] text-gray-100 text-[1.5rem] flex flex-col items-start`}>
                    <span className='text-right'>Powering Seamless Transactions</span>
                    <span className='text-[.8rem] font-[300]'>Powering seamless transactions—because every second saved at checkout means happier customers and bigger sales</span>
                </span>
            </div>
        </div>
    )
}

export default page
