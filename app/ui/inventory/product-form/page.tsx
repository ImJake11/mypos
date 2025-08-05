import React, { Suspense } from 'react'
import GlobalWrapper from '@/app/lib/components/GlobalWrapper'
import ProductFormAppbar from './ProductFormAppbar'
import { ProductFormBody } from './ProductFormBody'


const page = () => {

    const child = <div className='w-full h-full flex flex-col overflow-hidden'>
        <ProductFormAppbar />
        <Suspense>
            <ProductFormBody />
        </Suspense>
    </div>

    return (
        <div className='w-screen h-screen flex overflow-hidden relative'>
            <GlobalWrapper child={child} />
        </div>
    )
}

export default page
