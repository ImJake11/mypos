import React from 'react'

const AuthTitle = ({
    isLogin,
}: {
    isLogin: boolean
}) => {

    const title = isLogin ? "Sign In" : "Sign Up";
    const slogan = isLogin ? "We’ve missed you! Sign in to continue." : "Sign up today and experience effortless transactions.";

    return (
        <div className='flex flex-col gap-2'>
            <span className='text-[1rem] w-full place-self-center font-bold flex flex-col'>

                <span>{title}</span>
                <span className='text-[.8rem] text-gray-500 font-normal'>{slogan}</span>
            </span>
            <div className={`w-full place-self-center min-h-[5px] rounded-full bg-gray-500 relative 
    after:absolute 
    after:content-[""] 
    ${isLogin && "after:left-0"}
    ${!isLogin && "after:right-0"}
    after:w-[50%]
    after:h-full
    after:bg-[var(--color-brand-primary)]
    after:rounded-full`}
            />
        </div>
    )
}

export default AuthTitle
