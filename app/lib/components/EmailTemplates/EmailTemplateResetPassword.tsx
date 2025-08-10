


import React from 'react'

const EmailTemplateResetPassword = ({
    email,
    query,
}:
    {
        email: string,
        query: string,
    }) => {

    const link = `${process.env.NEXT_PUBLIC_DOMAIN}/ui/auth/create-new-password?query=${query}`;

    return (
        <div className='flex flex-col gap-2'>
            <span>Hello {email}</span><br />

            <p>We received a request to reset your password. If you made this request, please click the link below to create a new password:</p><br />

            <a href={link}>{link}</a><br />

            <span>If you did not request a password reset, please ignore this email. This link will expire in 30 minutes for your security.</span><br />

            <span>Thankyou,</span><br />
            <span>Nexustock</span>
        </div>
    )
}

export default EmailTemplateResetPassword
