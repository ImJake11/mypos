

import Appbar from '@/app/lib/components/Appbar/Appbar'
import React from 'react'

const CategoryAppbar = () => {

    const child = (
        <div className='w-full'></div>
    )
  return (
    <Appbar title='Manage Categories' child={child} />
  )
}

export default CategoryAppbar
