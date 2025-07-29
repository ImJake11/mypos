

import Appbar from '@/app/lib/components/Appbar/Appbar'
import React from 'react'

const DashboardAppbar = () => {

    const child = (
        <div className='flex flex-1 justify-end'></div>
    )

    return (
        <Appbar title='Dashboard' child={child} />
    )
}

export default DashboardAppbar
