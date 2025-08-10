'use client';

import CircularLoadingIndicator from '@/app/lib/components/CircularLoadingIndicator';
import { IconCheck } from '@tabler/icons-react';
import Link from 'next/link';
import React, { useState } from 'react';

const Body = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [isLinkSent, setIsLinkSent] = useState(false);

    const validateEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
            setError('Email is required');
            setIsValid(false);
        } else if (!emailRegex.test(value)) {
            setError('Please enter a valid email address (e.g., user@example.com)');
            setIsValid(false);
        } else {
            setError('');
            setIsValid(true);
        }
    };

    const handleSend = async () => {
        validateEmail(email);
        if (!isValid) return;

        try {
            setIsSending(true);

            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) {
                setError('Failed to send link');
                return;
            }

            setIsLinkSent(true);
        } catch (err) {
            console.error('Failed to send link', err);
            setError('Something went wrong. Please try again.');
        } finally {
            setIsSending(false);
        }
    };

    const defaultView = (
        <>
            <span className="text-[1.2rem] font-semibold">Reset your password</span>
            <span className="text-gray-500 text-center mb-2">
                Enter your email address and we'll send you a link to reset your password.
            </span>

            <div className="w-full flex flex-col gap-3">
                <label>Email Address</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={(e) => validateEmail(e.target.value)}
                    className="w-full h-[3rem] border border-gray-500 rounded-[8px] p-2 text-white"
                    placeholder="you@example.com"
                />
                {error && <span className="text-red-500">{error}</span>}

                <button
                    type="button"
                    onClick={handleSend}
                    disabled={isSending}
                    className="w-full h-[3rem] rounded-[8px] bg-linear-120 from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] flex justify-center items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSending ? (
                        <>
                            <CircularLoadingIndicator size={20} borderWidth={1} />
                            <span>Sending Link...</span>
                        </>
                    ) : (
                        <span>Confirm</span>
                    )}
                </button>
            </div>
        </>
    );

    const successView = (
        <>
            <IconCheck className="text-green-400 place-self-center" size={60} />
            <span className="text-[1.3rem] font-semibold text-center">Success!</span>
            <span className="text-gray-500 text-center">
                Password link sent successfully. Please check your email to reset your password.
            </span>

            <Link href="/ui/auth/sign-in-page" className="w-full">
                <button className="w-full h-[3rem] rounded-[8px] bg-linear-120 from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] flex justify-center items-center gap-3">
                    Go to Login
                </button>
            </Link>
        </>
    );

    return (
        <div className="bg-black w-[22rem] h-fit p-5 rounded-[8px] flex flex-col gap-5 text-white border border-[var(--color-brand-primary)]">
            {isLinkSent ? successView : defaultView}
        </div>
    );
};

export default Body;
