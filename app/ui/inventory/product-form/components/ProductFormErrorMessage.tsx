

import React from 'react'

interface Props {
    message: string,
    isShow: boolean,
}
const ErrorMessage = ({ message, isShow }: Props) => {
    return isShow && <span className='text-red-500'>{message}</span>

}


interface Props {
    message: string,
    isShow: boolean,
}export default ErrorMessage
