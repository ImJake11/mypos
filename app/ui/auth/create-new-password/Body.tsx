'use client';

import React, { useState } from 'react';
import TextField from './TextField';
import { useSearchParams } from 'next/navigation';
import CircularLoadingIndicator from '@/app/lib/components/CircularLoadingIndicator';

const Body = () => {
    const searchParams = useSearchParams();

    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const [showSuccessfulMessage, setShowSuccessMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const query = searchParams.get("query");

    const validatePassword = (value: string) => {
        setPassword(value);
        if (!value) {
            setPasswordError('');
            setIsValid(false);
            return;
        }
        if (!passwordRegex.test(value.trim())) {
            setPasswordError('Password must be at least 8 characters and contain an uppercase letter and a number.');
            setIsValid(false);
        } else {
            setPasswordError('');
            setIsValid(true);
        }
    };

    const validateConfirmPassword = (value: string) => {
        setConfirmPass(value);
        if (!value) {
            setConfirmError('');
            return;
        }
        if (value !== password) {
            setConfirmError('Passwords do not match.');
            setIsValid(false);
        } else {
            setConfirmError('');
            setIsValid(true);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid) return;

        setGeneralError('');

        try {
            setIsLoading(true);
            const res = await fetch("/api/auth/reset-password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    query, password
                })
            });

            const data = await res.json();

            if (!res.ok) {
                const { error } = data;
                setGeneralError(error);
                return;
            }

            setShowSuccessMessage(true);

            const { redirect } = data;

            setTimeout(() => {
                window.location.href = redirect;
            }, 1000);


        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='bg-black w-[22rem] h-fit p-5 rounded-[8px] flex flex-col gap-5 items-center text-white border border-[var(--color-brand-primary)]'
        >
            <span className='text-[1.2rem] font-semibold'>Set new password</span>
            <span className='text-gray-500 text-center mb-2'>
                Enter your new password below. Make sure it's secure and easy to remember.
            </span>

            {generalError && (
                <div className="w-full bg-red-500/10 border border-red-500 text-red-500 p-2 rounded-[6px] text-sm text-center">
                    {generalError}
                </div>
            )}

            {showSuccessfulMessage && (<div className="w-full bg-green-400/10 border border-green-400 text-green-400 p-2 rounded-[6px] text-sm text-center">
                Password updated successfully
            </div>)}

            <div className='w-full flex flex-col gap-1'>
                <TextField
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => validatePassword(e.target.value)}
                    title='New Password'
                />
                <span className='text-red-500'>{passwordError}</span>
            </div>

            <div className='w-full flex flex-col gap-1'>
                <TextField
                    value={confirmPass}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => validateConfirmPassword(e.target.value)}
                    title='Confirm New Password'
                />
                <span className='text-red-500'>{confirmError}</span>
            </div>

            <button
                type='submit'
                disabled={!isValid}
                className={`w-full h-[3rem] flex gap-2 items-center justify-center rounded-[8px] text-white font-semibold ${isValid
                    ? 'bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)]'
                    : 'bg-gray-600 cursor-not-allowed'
                    }`}
            >
                {isLoading && (<CircularLoadingIndicator size={20} borderWidth={2} />)}
                <span>{isLoading ? "Saving" : "Save"}</span>
            </button>
        </form>
    );
};

export default Body;
