
import React from 'react'

const ExportToPDFIcon = ({ size }: { size?: number }) => {
    return (
        <svg height={size ?? 12} width={size ?? 12} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 20C7.58172 20 4 16.4183 4 12M20 12C20 14.5264 18.8289 16.7792 17 18.2454" stroke="var(--foreground)" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M12 14L12 4M12 4L15 7M12 4L9 7" stroke="var(--foreground)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
    )
}

export default ExportToPDFIcon
