import React from 'react'
import Sidebar from './lib/components/Sidebar/Sidebar'

const page = () => {
  return (
    <div className='w-screen h-screen flex'>
      <Sidebar />
      {/** body */}
      <div className='flex-1 flex flex-col'>
        {/** appbar */}
        <div className='flex w-full bg-white h-[4rem] justify-between items-center p-[0_20px]'>
          <span className='text-[1.2rem] font-[500]'>Add Product Page</span>
          {/** save btn */}
          <button className='p-[10px_20px] h-fit text-white bg-[var(--primary)] rounded-[7px]'>Save</button>
        </div>
      </div>
    </div>
  )
}

export default page
