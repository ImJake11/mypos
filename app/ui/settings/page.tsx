

import GlobalWrapper from '@/app/lib/components/GlobalWrapper';
import React from 'react'
import SettingsAppbar from './components/SettingsAppbar';
import SettingsBody from './components/SettingsBody';

const page = () => {

    const child = (
        <div className='flex-1 flex flex-col'>
            <SettingsAppbar />
            <SettingsBody />
        </div>
    );

    return (
        <div className='w-screen h-screen overflow-hidden'>
            <GlobalWrapper child={child} />
        </div>
    )
}

export default page
