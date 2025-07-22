import React from 'react'
import Sidebar from './lib/components/Sidebar/Sidebar'
import GlobalWrapper from './lib/components/GlobalWrapper'
import Appbar from './lib/components/Appbar/Appbar'
import CustomNotification from "@/app/lib/components/CustomNotification/CustomNotification";

const page = () => {

  const child = <div className='w-full h-full flex flex-col'>
    {/** appbar */}
    <Appbar title='Add Product Page' />
    <div className='flex-1 bg-gray-700'></div>
  </div>

  return (
    <div className='w-screen h-screen flex relative'>
      <Sidebar />
      {/** body */}
      <GlobalWrapper child={child} />
    </div>
  )
}

export default page
