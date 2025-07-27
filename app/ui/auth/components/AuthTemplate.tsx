import { Audiowide } from 'next/font/google';
import React from 'react'
import { LogosGoogleIcon } from './GoogleIcon';

const audioWide = Audiowide({
    weight: ['400'],
    subsets: ['latin'],
    style: "normal",
    display: 'swap',
    variable: '--font-poppins',
});


const AuthTemplate = () => {

    const indicator = (
        <div className='w-[80%] place-self-center min-h-[5px] rounded-full bg-gray-500 relative 
    after:absolute 
    after:content-[""] 
    after:w-[50%]
    after:h-full
    after:bg-[var(--color-brand-primary)]
    after:rounded-full'
        />
    )

    const term = (
        <div className='w-[80%] place-self-center flex gap-2'>
            <div className='w-[1rem] h-[1rem] bg-gray-500 rounded-[2px]'>
            </div>
            <span className='flex'>I agree with <span className='underline underline-offset-2'>Terms and Conditions</span></span>
        </div>
    )

    return (
        <div className='w-full h-full overflow-auto flex flex-col gap-2 text-white justify-center p-[1rem_7rem]'>
            <div className='min-h-[1rem]' />
            <span className={`${audioWide.className} text-center text-[1.2rem]`}>Nexustock</span>

            <div className='min-h-[1rem]' />
            <span className='text-[1rem] w-[80%] place-self-center font-bold flex flex-col'>

                <span>Sign Up</span>
                <span className='text-[.8rem] text-gray-500 font-normal'>Sign up today and experience effortless transactions.</span>
            </span>

            <div className='min-h-[.2rem]' />
            {/** indicator */}
            {indicator}
            <div className='min-h-[.2rem]' />

            <TextField title='Email Address' />
            <TextField title='Password' />
            <TextField title='Confirm Password' />

            {term}
            <div className='min-h-[1rem]' />

            <button className='w-[50%] min-h-[2.5rem] bg-[var(--color-brand-primary)] rounded-[8px] place-self-center text-white grid place-content-center font-[700]'>
                Login
            </button>

            <div className='min-h-[.1rem]' />
            <span className='place-self-center text-gray-500'>or</span>
            <div className='min-h-[.1rem]' />

            <button className='w-[50%] min-h-[2.5rem] flex items-center justify-center gap-2 place-self-center border border-gray-500 rounded-[8px]'>
                <LogosGoogleIcon />
                <span>Continue with Google</span>
            </button>

            <div className='flex-1' />
            <span className='w-full text-right'>
                Have an Account? <span className='underline underline-offset-2'>Sign in</span>
            </span>
        </div>
    )
}

function TextField({
    title,
}: {
    title: string
}) {

    return <div className='flex flex-col w-[80%] gap-1 place-self-center'>
        <span className='text-white'>{title}</span>
        <input type="text" className='p-2 w-full h-[2.5rem] rounded-[8px] border border-gray-500 bg-gray-950' />
    </div>
}

export default AuthTemplate
