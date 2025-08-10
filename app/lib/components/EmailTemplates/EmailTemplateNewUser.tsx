
import React from 'react'
import { capitalizeFirtLetter } from '../../utils/services/capitalizeFirstLetter'

function EmailTemplateNewUser({
    email,
    username,
    otp,
}: {
    email: string,
    username: string,
    otp: string,
}) {

    return (
        <div className='flex h-auto flex-col gap-2'>
            <strong>Welcome to Nexustock - Verify your email</strong><br />
            <div className='h-5px' />
            <strong>Hi {capitalizeFirtLetter(username)},</strong>

            <p>Thank you for signing up! To activate your account and ensure it's really you, please confirm your email address using this OTP (One Time Pin) below:</p>

            <strong className='text-[1.5rem] text-[var(--color-brand-primary)]'>{otp}</strong><br />

            <span>This code will expire in 15 minutes for security reasons.</span><br />

            <span>Best Regards,</span><br />
            <span>Nexustock</span>

        </div>
    )
}

export default EmailTemplateNewUser
