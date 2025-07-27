import React from 'react'
import GlobalWrapper from '@/app/lib/components/GlobalWrapper'
import Appbar from '@/app/lib/components/Appbar/Appbar'
import ProductFormBody from './ProductFormBody'


const page = () => {

    const child = <div className='w-full h-full flex flex-col overflow-hidden'>
        {/** appbar */}
        <Appbar title='Product Form' />
        <ProductFormBody />
    </div>
    
    return (
        <div className='w-screen h-screen flex overflow-hidden relative'>
            <GlobalWrapper child={child} />
        </div>
    )
}

export default page
