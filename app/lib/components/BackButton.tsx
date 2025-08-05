

import { IconChevronCompactLeft } from '@tabler/icons-react'
import { useRouter } from 'next/navigation';

import React from 'react'

const BackButton = () => {

    const router = useRouter();

    return (
        <div className='grid place-content-center w-[2rem] h-[2rem] rounded-full bg-gray-100' onClick={() => router.back()}>
            <IconChevronCompactLeft className='stroke-gray-400' />
        </div>
    )
}

export default BackButton
