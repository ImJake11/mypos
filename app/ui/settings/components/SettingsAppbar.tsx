

import Appbar from '@/app/lib/components/Appbar/Appbar'
import React from 'react'

const SettingsAppbar = () => {

    const child = (
        <div className='w-full'></div>
    )
    return (
        <Appbar title='Store Setup'  child={child}/>
    )
}

export default SettingsAppbar
