'use client'

import { posSearchQuery } from '@/app/lib/redux/posSlice';
import React from 'react'
import { useDispatch } from 'react-redux'

const SearchBar = () => {

    const dispatch = useDispatch();

    return (
        <div className='w-[35vw] h-[3.5rem] rounded-[7px] flex overflow-hidden relative p-0.5'>
            <input type="text" className="tf-attr flex-1 h-full p-2"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const { value } = e.target;

                    dispatch(posSearchQuery(value))
                }}
            />
            <div className=' absolute -right-2.5 top-1/2 -translate-y-1/2 w-[5rem] h-full linear-bg-40 grid place-content-center'>
                <i className="ri-search-fill text-[1.5rem]" />
            </div>
        </div>
    )
}

export default SearchBar

