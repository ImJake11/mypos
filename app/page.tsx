import React from 'react'
import GlobalWrapper from './lib/components/GlobalWrapper'
import Appbar from './lib/components/Appbar/Appbar'
import DashboardBody from './ui/dashboard/DashboardBody'
import DashboardAppbar from './ui/dashboard/components/DashboardAppbar'

const page = () => {

  const child = <div className='w-full h-full flex flex-col'>
    {/** appbar */}
    <DashboardAppbar />
    <DashboardBody />
  </div>

  return (
    <div className='w-screen h-screen flex relative'
      style={{

      }}
    >
      <GlobalWrapper child={child} />
    </div>
  )
}

export default page
