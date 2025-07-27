
import Sidebar from '@/app/lib/components/Sidebar/Sidebar'
import React from 'react'
import { PosProductList } from './components/PosProductList'
import PosProductDetailsTab from './components/product_details_tab/PosProductDetailsTab'
import PosAppbar from './components/PosAppbar'
import FilterTab from '@/app/lib/components/FilterTab/FilterTab'
import { PosActionEnum } from '@/app/lib/redux/utils/enums/posActionEnum'
import GlobalWrapper from '@/app/lib/components/GlobalWrapper'
import PosCartList from './components/PosCartList'

const page = () => {

  const child = <div className='w-full h-full flex flex-col'>
    <PosAppbar />
    {/** body */}
    <div className='flex-1 flex bg-[var(--background)] min-h-0'>
      <PosProductList />
      <PosCartList />
    </div>
  </div>

  return (
    <div className='w-screen h-screen bg-[var(--main-bg-primary)] flex relative overflow-hidden'>
      <GlobalWrapper child={child} />
      <PosProductDetailsTab />
      <FilterTab onClearFilterContext={PosActionEnum.POST_CLEAR_FILTER_DATA}
        onPrimaryButtonContext={PosActionEnum.POS_FILTER_DATA} />
    </div>
  )
}

export default page
