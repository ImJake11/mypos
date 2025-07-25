import React from 'react'

const StoreIcon = ({ size }: { size?: number }) => {
    return (
        <svg height={size ?? 12} width={size ?? 12} fill="var(--foreground)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M21.026,6.105a3.1,3.1,0,0,1-2.365,3.848A3.031,3.031,0,0,1,15.1,7.222l-.042-.5A3.03,3.03,0,0,1,12.041,10h-.082A3.03,3.03,0,0,1,8.94,6.719l-.031.375a3.121,3.121,0,0,1-2.83,2.9A3.03,3.03,0,0,1,2.941,6.236l.87-3.479A1,1,0,0,1,4.781,2H19.219a1,1,0,0,1,.97.757ZM18.121,12A5.021,5.021,0,0,0,20,11.631V21a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V11.631a4.914,4.914,0,0,0,4.907-.683A5.131,5.131,0,0,0,12.042,12a5.027,5.027,0,0,0,3.051-1.052A4.977,4.977,0,0,0,18.121,12ZM14,17a2,2,0,0,0-4,0v3h4Z"></path></g></svg>
    )
}

export default StoreIcon
