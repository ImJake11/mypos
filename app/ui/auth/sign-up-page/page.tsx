import React from 'react'
import AuthTemplate from '../components/AuthTemplate'
import LoginImageContainer from './components/LoginImageContainer'
import { verifyToken } from '@/app/api/services/token/verifyToken'
import { redirect } from 'next/navigation'

const page = async () => {
    const isVerified = await verifyToken();

    if (isVerified) {
        redirect("/")
    };

    return (
        <div className='w-screen h-screen flex overflow-hidden bg-linear-120 from-black to-[#0C2340]'>

            <div className='flex-1 flex flex-col items-center'>
                <AuthTemplate isLoginPage={false} />
            </div>
            <LoginImageContainer />
        </div>
    )
}

export default page
