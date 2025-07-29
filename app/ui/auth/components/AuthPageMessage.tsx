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


        hasMessage && <span className={`${isError ? "bg-red-500" : "bg-green-400"} w-full m-[.5rem_0] p-2 text-white place-self-center rounded-[4px] flex gap-2 items-center`}>
            <IconExclamationCircle size={16} />
            {message}
        </span>

    )
}

export default AuthPageMessage
