
import React from 'react'
import AuthTemplate from '../components/AuthTemplate'
import LoginImageContainer from '../sign-up-page/components/LoginImageContainer'

const page = () => {

    return (
        <div className='w-screen h-screen flex overflow-hidden bg-linear-120 from-black to-[#0C2340] relative'>

            <div className='flex-1 flex flex-col items-center'>
                <AuthTemplate isLoginPage={true} />
            </div>
            <LoginImageContainer />
        </div>
    )
}

export default page
