import "remixicon/fonts/remixicon.css";
import React from 'react'

const UserProfile = () => {
    return (
        <div className='w-full h-[4rem]  p-[10px_15px] mt-[1rem] flex justify-center items-center gap-3'>
            {/** picture container */}
            <div className='h-full w-[3rem]  rounded-[5px] text-[.8rem]'
            style={{
                backgroundColor: "var(--secondary-background)"
            }}
            ></div>
            <span className='flex-col flex h-full justify-center'>
                {/** name */}
                <span className='font-semibold'>Jake Juguilon</span>
                {/** email */}
                <span className='text-[.6rem] '
                    style={{
                        color: "var(--secondary-foreground)"
                    }}
                >jake@gmail.com</span>
            </span>
            <div className='flex-1' />
            <i className="ri-settings-4-fill"></i>
        </div>
    )
}

export default UserProfile
