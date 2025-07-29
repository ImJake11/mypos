'use client';

import CircularLoadingIndicator from '@/app/lib/components/CircularLoadingIndicator'
import React, { useEffect, useState } from 'react'

const AuthConfirmationContainer = () => {
    const [email, setEmail] = useState("");

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const gmailAppUrl = `googlegmail:///co?subject=Your+Confirmation+Email`;
    const webGmailUrl = `https://mail.google.com/mail/u/0/#search/from%3A`;

    const handleEmailButton = () => {

        if (isMobile) {
            window.location.href = gmailAppUrl;

            setTimeout(() => {
                window.open(webGmailUrl, '_blank');
            }, 500);
        } else {
            window.open(webGmailUrl, "_blank");
        }
    }

    useEffect(() => {

        const interval = setInterval(() => {

            const storedEmail = window.localStorage.getItem("email");


            if (storedEmail) {
                setEmail(storedEmail);
            } else {
                setEmail("");
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!email) return null;

    return (
        <div className='w-screen fixed h-screen grid place-content-center backdrop-blur-[5px]'>
            <div className='w-[20rem] h-[15rem] gap-3 bg-[#101010] rounded-[20px] border border-[var(--color-brand-primary)] p-5 text-white flex flex-col'>
                <div className='mb-1.5 flex gap-2 items-center'>
                    <CircularLoadingIndicator borderWidth={2} size={18} />
                    <span className='text-[1.2rem] font-semibold'>Confirming your email</span>
                </div>
                <span>Please wait while we verify your account</span>
                <div className='flex-1' />
                <button className='min-h-[2.5rem] bg-[var(--color-brand-primary)] rounded-[8px] p-[0_10px]'
                    onClick={handleEmailButton}
                >Check my email</button>

                <button className='min-h-[2.5rem] border border-[var(--color-brand-primary)] rounded-[8px] p-[0_10px]'
                    onClick={() => {
                        setEmail("");
                        window.localStorage.removeItem("email");
                    }}
                >Cancel</button>
            </div>
        </div>
    )
}

export default AuthConfirmationContainer
