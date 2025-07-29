
import React from 'react'
import { capitalizeFirtLetter } from '../../utils/services/capitalizeFirstLetter'

function EmailTemplateNewUser({
    email,
    username,
}: {
    email: string,
    username: string
}) {

    return (
        <div className='flex flex-col gap-2'>
            <strong>Welcome to Nexustock - Verify your email</strong>

            <strong>Hi {capitalizeFirtLetter(username)},</strong>

            <p>Thank you for signing up! To activate your account and ensure it's really you, please confirm your email address by clicking below:</p>

            <a href={`/ui/auth/confirm-email?email=${email}`}>Confirm Email Address</a>

            <span>This link will expire in 24 hours for security reasons.</span>

            <span>Best Regards,</span>
            <span>Nexustock</span>

        </div>
    )
}

export default EmailTemplateNewUser
