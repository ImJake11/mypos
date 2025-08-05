import React from 'react'
import GlobalWrapper from '@/app/lib/components/GlobalWrapper'
import Appbar from '@/app/lib/components/Appbar/Appbar'
import ProductFormBody from './ProductFormBody'
import ProductFormAppbar from './ProductFormAppbar'


const page = () => {

    const child = <div className='w-full h-full flex flex-col overflow-hidden'>
        <ProductFormAppbar />
        <ProductFormBody />
    </div>

    return (
        <div className='w-screen h-screen flex overflow-hidden relative'>
            <GlobalWrapper child={child} />
        </div>
    )
}

export default page
