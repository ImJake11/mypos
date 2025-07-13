import Sidebar from '@/app/lib/components/Sidebar/Sidebar'
import React from 'react'
import CategoriesBody from './CategoriesBody'

const page = () => {
    return (
        <div className='w-screen h-screen flex'>
            <Sidebar />
            <CategoriesBody/>
        </div>
    )
}

export default page
