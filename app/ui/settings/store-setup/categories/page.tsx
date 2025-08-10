import React from 'react'
import CategoriesBody from './CategoriesBody'
import GlobalWrapper from '@/app/lib/components/GlobalWrapper'

const page = () => {

    return (
        <div className='w-screen h-screen flex'>
            <GlobalWrapper>
                <CategoriesBody />
            </GlobalWrapper>
        </div>
    )
}

export default page
