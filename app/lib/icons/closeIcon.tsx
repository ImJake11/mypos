

import React from 'react'

const CloseIcon = ({ size }: { size?: number }) => {
    return (
        <svg height={size ?? 24} width={size ?? 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="var(--foreground)" strokeWidth="1.5"></path> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="var(--foreground)" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
    )
}

export default CloseIcon
