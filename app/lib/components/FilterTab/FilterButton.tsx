

import React from 'react'
import { FilterIcon } from '../../icons/filterIcon'
import { filterToggleFilterTab } from '../../redux/slice/filterSlice'
import { useDispatch } from 'react-redux'

const FilterButton = () => {

    const dispatch = useDispatch();

    return (
        <button className='flex h-[2rem] p-[0_7px] rounded-[4px] gap-2 items-center border border-gray-500 shadow-[1px_1px_5px_rgb(0,0,0,.3)]'
            onClick={() => dispatch(filterToggleFilterTab(true))}
        >
            Filter <div className='w-[1.3rem] h-[1.3rem]'><FilterIcon /></div>
        </button>
    )
}

export default FilterButton
