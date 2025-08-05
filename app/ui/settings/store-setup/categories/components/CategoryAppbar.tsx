

import Appbar from '@/app/lib/components/Appbar/Appbar'
import MenuButton from '@/app/lib/components/Appbar/components/MenuButton';
import { useWindowSize } from '@/app/lib/utils/hooks/useGetWindowSize';
import React from 'react'

const CategoryAppbar = () => {
  const w = useWindowSize().width;

  const isMobile = w < 768;
  const child = (
    <div className='w-full'>
      {isMobile && <MenuButton />}
    </div>
  )
  return (
    <Appbar title='Manage Categories' child={child} />
  )
}

export default CategoryAppbar
