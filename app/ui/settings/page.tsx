

import GlobalWrapper from '@/app/lib/components/GlobalWrapper';
import React from 'react'
import SettingsAppbar from './components/SettingsAppbar';
import SettingsBody from './components/SettingsBody';

const page = () => {


    return (
        <div className='w-screen h-screen overflow-hidden'>
            <GlobalWrapper>
                <div className='flex-1 flex flex-col'>
                    <SettingsAppbar />
                    <SettingsBody />
                </div>
            </GlobalWrapper>
        </div>
    )
}

export default page
