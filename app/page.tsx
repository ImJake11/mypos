import React from 'react'
import GlobalWrapper from './lib/components/GlobalWrapper'
import DashboardBody from './ui/dashboard/DashboardBody'
import DashboardAppbar from './ui/dashboard/components/DashboardAppbar'
import { verifyToken } from './api/services/token/verifyToken'
import { redirect } from 'next/navigation'

const page = async () => {
  const isVerified = await verifyToken();

  if (!isVerified) redirect("/ui/auth/sign-in-page");

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
