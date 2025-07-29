
import React from 'react'
import AuthTemplate from '../components/AuthTemplate'
import LoginImageContainer from './components/LoginImageContainer'
import AuthConfirmationContainer from '../components/AuthConfirmationContainer'

const page = () => {

    return (
        <div className='w-screen h-screen flex overflow-hidden bg-linear-120 from-black to-[#0C2340]'>

            <div className='flex-1 flex flex-col items-center'>
                <AuthTemplate isLoginPage={false} />
            </div>
            <LoginImageContainer />
            <AuthConfirmationContainer />
        </div>
    )
}

export default page
