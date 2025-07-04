import Image from 'next/image'
import React from 'react'
import noFoundImage from "@/public/no-data-found.png";

const PageNoDataFound = () => {
    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>

            <div className='w-[15rem] h-[15rem]'>
                <Image src={noFoundImage} alt='no found image' className='w-full h-full' />
            </div>

            <span className='translate-x-8 -translate-y-9'>No item found</span>

        </div>
    )
}

export default PageNoDataFound
