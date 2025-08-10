import { IconExclamationCircle } from '@tabler/icons-react'
import React from 'react'

const AuthPageMessage = ({
    hasMessage,
    isError,
    message,
}: {
    hasMessage: boolean,
    isError: boolean,
    message: string,
}) => {
    return (
        hasMessage && <span className={`${isError ? "bg-red-500/10 border-red-500 text-red-500" : "bg-green-400/10 border-green-500 text-green-400"} border  w-full m-[.5rem_0] p-2 place-self-center rounded-[4px] text-center`}>
            {message}
        </span>

    )
}

export default AuthPageMessage
