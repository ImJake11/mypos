'use client';

import CircularLoadingIndicator from '@/app/lib/components/CircularLoadingIndicator';
import { IconChevronCompactLeft } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import OtpInput from "react-otp-input";


const ConfirmationBody = ({ }) => {
    let email = "";

    const [remainingTime, setRemainingTime] = useState(0);
    const [otp, setOtp] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [isResendingCode, setIsResendingCode] = useState(false);

    const router = useRouter();

    function convertTimestamp(token_exp: string): void {
        const now = new Date();
        const expTime = new Date(token_exp);
        const diffMins = expTime.getTime() - now.getTime();

        if (diffMins < 0 || !token_exp) {
            router.replace("/ui/auth/sign-up-page");
            return;
        }
        const convertToSeconds = Math.floor(diffMins / 1000);
        setRemainingTime(convertToSeconds);
    }

    const handleResend = async () => {

        try {
            setMessage("");
            setIsResendingCode(true);

            const res = await fetch(`/api/auth/${email}/validation/resend-code`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (!res.ok) {
                const { error } = await res.json();
                setMessage(error);
                setIsError(true);
                return;
            }
            const { new_exp_date } = await res.json();
            convertTimestamp(new_exp_date);
        } catch (e) {
            throw new Error("Failed to resend code");
        } finally {
            setIsResendingCode(false);
        }
    }

    const handleVerify = async () => {

        try {
            setMessage("")
            setIsVerifying(true);
            const res = await fetch(`/api/auth/${email}/validation`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    otp,
                })
            });

            if (!res.ok) {
                const { error } = await res.json();
                setMessage(error);
                setIsError(true)
                return;
            }

            router.push("/");

        } catch (e) {
            throw new Error("Failed to verify otp");
        } finally {
            setIsVerifying(false)
        }
    }

    useEffect(() => {

        const interval = setInterval(() => {
            if (remainingTime > 0) {
                setRemainingTime(remainingTime - 1);
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval)
    }, [remainingTime]);

    useEffect(() => {

        const fetchData = async () => {

            const res = await fetch(`/api/auth/${email}/validation`, {
                method: "GET",
            });

            if (!res.ok) {
                router.push("/ui/auth/sign-up-page");
            }

            const { token_exp } = await res.json();
            convertTimestamp(token_exp)
        }

        fetchData();
    }, []);

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    const formattedMin = String(minutes).padStart(2, "0");
    const formattedSec = String(seconds).padStart(2, "0");


    return (

        <div className='w-[20rem] h-fit gap-4 bg-[#101010] rounded-[20px] border border-[var(--color-brand-primary)] p-5 text-white flex flex-col'>

            <div className='w-full'>
                <IconChevronCompactLeft />
            </div>

            <span className='text-[1.2rem] font-semibold'>Confirmation</span>
            {message && <span className={`w-full h-[2rem] rounded-[4px] p-2 ${isError ? "bg-red-500/20 text-red-500" : "bg-green-500/20 text-green-500"}`}>
                {message}
            </span>}
            <span className='text-gray-400'>Please confirm the code we sent to {email}</span>

            <div className='flex-1'>
                <OtpInput
                    containerStyle={{
                        flex: "row",
                        display: "flex",
                        gap: 2,
                        justifyItems: "center"
                    }}
                    inputType="number"
                    value={otp}
                    shouldAutoFocus={true}
                    renderSeparator={<span className='w-[4px]' />}
                    numInputs={6}
                    onChange={(otp) => setOtp(otp)}
                    renderInput={(inputProps, index) => (
                        <input {...inputProps}
                            autoFocus={index === 0}
                            className={`min-w-[2.5rem] h-[2.5rem] text-[1.5rem] text-center border ${inputProps.value ? "border-[var(--color-brand-primary)]" : "border-gray-400"} rounded-[4px] focus:border-[var(--color-brand-primary)] focus:border-[2px] outline-0 text-[var(--color-brand-primary)] p-2`}
                        />
                    )}
                />
            </div>

            <div className='flex gap-2'>
                <span className={`font-[500] ${remainingTime <= 0 ? "text-[var(--color-brand-primary)]" : "text-gray-500"} text-[.9rem]`}
                    onClick={handleResend}
                >Resend</span>
                {isResendingCode ? <CircularLoadingIndicator size={16} /> :
                    <span>{formattedMin}:{formattedSec}</span>}
            </div>


            <button className='min-h-[2.5rem] items-center flex-1 flex gap-2 justify-center bg-linear-120 from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] rounded-[4px] p-[0_10px]'
                onClick={handleVerify}
            >
                {isVerifying && <CircularLoadingIndicator size={20} />}
                <span>Verify</span>
            </button>

        </div>
    )
}

export default ConfirmationBody
