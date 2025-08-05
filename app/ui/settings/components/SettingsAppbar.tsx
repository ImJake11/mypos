

import Appbar from '@/app/lib/components/Appbar/Appbar'
import MenuButton from '@/app/lib/components/Appbar/components/MenuButton'
import React from 'react'

const SettingsAppbar = () => {

    const child = (
        <div className='w-full'>
            <div className='block md:hidden'> <MenuButton /></div>
        </div>
    )
    return (
        <Appbar title='Store Setup' child={child} />
    )
}

export default SettingsAppbar
