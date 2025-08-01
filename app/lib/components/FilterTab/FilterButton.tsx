

import React from 'react'
import { FilterIcon } from '../../icons/filterIcon'
import { filterToggleFilterTab } from '../../redux/slice/filterSlice'
import { useDispatch } from 'react-redux'
import { IconAdjustmentsHorizontal, IconFilter, IconFilter2 } from '@tabler/icons-react'

const FilterButton = () => {

    const dispatch = useDispatch();

    return (
        <button className='h-[2rem] w-[2rem] rounded-full border-gray-300 bg-gray-100 border grid place-content-center'
            onClick={() => dispatch(filterToggleFilterTab(true))}
        >
            <IconAdjustmentsHorizontal size={20} className='stroke-gray-400' />
        </button>
    )
}

export default FilterButton
