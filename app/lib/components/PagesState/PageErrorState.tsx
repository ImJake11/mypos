

import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/app/lib/redux/store';

const PageErrorState = () => {

    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className='w-full h-full flex flex-col justify-center items-center gap-5'>

            <span className='text-8xl'>404</span>
            <span>Oops! It looks like something went wrong</span>
            <button className='h-[3rem] w-[6rem] rounded-[8px] button-primary-gradient-error'

            >Retry</button>
        </div>
    )
}

export default PageErrorState
