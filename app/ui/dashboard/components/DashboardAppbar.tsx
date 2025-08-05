

import Appbar from '@/app/lib/components/Appbar/Appbar'
import MenuButton from '@/app/lib/components/Appbar/components/MenuButton'
import React from 'react'

const DashboardAppbar = () => {

    const child = (
        <div className='flex flex-1 justify-start'>
            <div className='lg:hidden'> <MenuButton /></div>
        </div>
    )

    return (
        <Appbar title='Dashboard' child={child} />
    )
}

export default DashboardAppbar
