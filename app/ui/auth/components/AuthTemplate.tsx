'use client'

import { Audiowide } from 'next/font/google';
import React, { useMemo, useState } from 'react'
import { LogosGoogleIcon } from './GoogleIcon';
import { IconChecks } from '@tabler/icons-react';
import AuthTextfield from './AuthTextInput';
import AuthTitle from './AuthTitle';
import Link from 'next/link';
import { UserModel } from '@/app/lib/models/UserModel';
import { AuthServices } from '../services/auth-service';
import CircularLoadingIndicator from '@/app/lib/components/CircularLoadingIndicator';
import AuthPageMessage from './AuthPageMessage';
import { useRouter } from 'next/navigation';
import Toas from '@/app/lib/components/Toas';
import Logo from '@/app/lib/components/Logo';

const audioWide = Audiowide({
    weight: ['400'],
    subsets: ['latin'],
    style: "normal",
    display: 'swap',
    variable: '--font-poppins',
});


const AuthTemplate = ({
    isLoginPage,
}: {
    isLoginPage: boolean,
}) => {

    const [isLoading, setIsLoading] = useState(false);

    const [userInput, setInput] = useState<UserModel>({
        confirmPassword: "",
        email: "",
        password: "",
        username: "",
        isAgree: false,
    });

    const router = useRouter();

    const authServices = useMemo(() => {
        return new AuthServices({ credential: userInput })
    }, [userInput]);

    const [errorMsg, setErrorMsg] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
    });

    const [pageMessage, setPageMessage] = useState<{
        isError: boolean,
        message: string,
        hasMessage: boolean,
    }>({
        isError: false,
        message: "",
        hasMessage: false,
    });


    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;

        if (pageMessage.hasMessage) {
            setPageMessage({ ...pageMessage, hasMessage: false })
        }

        setInput({
            ...userInput,
            [name]: value,
        })
    }

    const handleEmailValidation = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const { email } = userInput;

        if (isLoginPage) return;

        if (!email!.trim()) {
            setErrorMsg({
                ...errorMsg,
                email: "Email is required",
            });
        } else if (!emailRegex.test(email!)) {
            setErrorMsg({
                ...errorMsg,
                email: "Please enter a valid email address (e.g., user@example.com)",
            });
        } else {
            setErrorMsg({
                ...errorMsg,
                email: "",
            })
        }
    };

    const handlePassword = () => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const { password } = userInput;

        if (isLoginPage) return;

        if (!password) {
            setErrorMsg({
                ...errorMsg,
                password: "",
            });
            return;
        }


        if (password && !passwordRegex.test(password)) {
            setErrorMsg({
                ...errorMsg,
                password: "Password must be atleast 8 characters and contains an uppercase and number"
            })
        } else {
            setErrorMsg({
                ...errorMsg,
                password: "",
            })
        }
    }

    const handleConfirmPassword = () => {
        const { confirmPassword, password } = userInput;

        if (!confirmPassword!.trim()) {
            setErrorMsg({
                ...errorMsg,
                confirmPassword: "",
            });
            return;
        }


        if (confirmPassword !== password) {
            setErrorMsg({
                ...errorMsg,
                confirmPassword: "Passwords did not match"
            })
        } else {
            setErrorMsg({
                ...errorMsg,
                confirmPassword: ""
            })
        }
    }

    const handleUsername = () => {
        if (!userInput.username) {
            setErrorMsg({
                ...errorMsg,
                username: "Username is required",
            })
        }
    }

    const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // reset page message
        setPageMessage({
            ...pageMessage,
            hasMessage: false,
        })

        if (isLoginPage) {
            await authServices.signInWithEmail({
                onLoading: (isLoading) => setIsLoading(isLoading),
                onError: (error) => setPageMessage({
                    hasMessage: true,
                    isError: true,
                    message: error
                }),
                onSuccess: () => router.push("/"),
                router,
            });
        } else {
            await authServices.signUpWithEmail({
                onLoading: (isLoading) => setIsLoading(isLoading),
                onError: (message) => setPageMessage({ hasMessage: true, isError: true, message, }),
                onSuccess: (message) => {
                    setPageMessage({ hasMessage: true, isError: false, message });
                    router.push(`/ui/auth/confirm-email`);
                }
            })
        }

    }

    const term = (
        <div className='w-full place-self-center flex gap-2'>
            <div className={`${userInput.isAgree ? "bg-[var(--color-brand-primary)]" : "bg-gray-500"} w-[1rem] h-[1rem] rounded-[2px] grid place-content-center`}
                onClick={() => {
                    setInput({
                        ...userInput,
                        isAgree: !userInput.isAgree,
                    })
                }}
            >
                {userInput.isAgree && <IconChecks size={12} />}
            </div>
            <span className='flex gap-0.5'>I agree with<span className='underline underline-offset-2 text-[var(--color-brand-primary)]'>Terms and Conditions</span></span>
        </div>
    )



    return (
        <div className={`h-screen overflow-auto flex flex-col relative text-white gap-3 w-full py-4 px-8 md:py-4 sm:px-28 md:px-[10rem] lg:px-14`}>

            <div className='min-h-[2rem]' />
            <Logo />
            <AuthTitle isLogin={isLoginPage} />
            <div className='min-h-[.5rem]' />

            <AuthPageMessage hasMessage={pageMessage.hasMessage} isError={pageMessage.isError} message={pageMessage.message} />

            <form className='flex flex-col gap-5' onSubmit={handleAuth} method='POST' action={"/ui/auth/sign-up-page"}>

                {!isLoginPage && <AuthTextfield name="username" value={userInput.username ?? ""} onChange={handleInput} errorMsg={errorMsg.username} title='Username' type='text' onBlur={handleUsername} />
                }
                <AuthTextfield name="email" value={userInput.email ?? ""} onChange={handleInput} errorMsg={errorMsg.email} title='Email Address' type='email' onBlur={handleEmailValidation} />

                <AuthTextfield name='password' value={userInput.password ?? ""} onChange={handleInput} type='password' errorMsg={errorMsg.password} title='Password' onBlur={handlePassword} />

                {!isLoginPage && <AuthTextfield name='confirmPassword' value={userInput.confirmPassword ?? ""} onChange={handleInput} type='password' errorMsg={errorMsg.confirmPassword} title='Confirm Password' onBlur={handleConfirmPassword} />}

                {isLoginPage ? <span className='w-full text-center'>Forgot password?
                    <span className='text-[var(--color-brand-primary)] ml-1'><Link href={"/ui/auth/reset-password"}>
                        Click here
                    </Link></span></span> : term}

                <div className='min-h-[1rem]' />

                <div className='flex flex-col gap-3'>
                    <button className='w-[50%] min-h-[2.5rem] min-w-[15rem] bg-[var(--color-brand-primary)] rounded-[8px] place-self-center text-white flex justify-center items-center gap-3 font-[700]'>
                        {isLoading && <CircularLoadingIndicator borderWidth={2} size={20} />}
                        {isLoading && <span> Signing in</span>}
                        {!isLoading && <span>{isLoginPage ? "Sign In" : "Sign Up"}</span>}
                    </button>

                    <span className='place-self-center text-gray-500'>or</span>

                    <button className='w-[50%] min-w-[15rem] min-h-[2.5rem] flex items-center justify-center gap-2 place-self-center border border-gray-500 rounded-[8px]'>
                        <LogosGoogleIcon />
                        <span>Continue with Google</span>
                    </button>
                </div>
            </form>

            <div className='min-h-[2rem]' />
            <span className='w-full text-right'>
                {isLoginPage ? "Doesn't have an account?" : "Have an Account?"} <Link href={isLoginPage ? "/ui/auth/sign-up-page" : "/ui/auth/sign-in-page"}>
                    <span className='text-[var(--color-brand-primary)] underline underline-offset-2'>{isLoginPage ? "Sign Up" : "Sign In"}</span>
                </Link>
            </span>
            <div className='min-h-[2rem]' />
            <Toas />
        </div>

    )
}


export default AuthTemplate
