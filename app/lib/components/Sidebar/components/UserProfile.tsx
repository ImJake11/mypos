'use client';

import "remixicon/fonts/remixicon.css";
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { sidebarSetUserData } from "@/app/lib/redux/slice/sidebarSlice";

const UserProfile = () => {
    const dispatch = useDispatch();

    const { photoUrl, username, } = useSelector((state: RootState) => state.sidebarSlice.userData);

    const usernameFirstChar = username[0];

    useEffect(() => {
        const fetchUserData = async () => {

            const res = await fetch("/api/user/user-data", {
                method: "GET"
            });

            if (res.ok) {
                const { userData } = await res.json();
                dispatch(sidebarSetUserData(userData));
            }
        }

        fetchUserData()
    }, []);

    return (
        <div className="relative min-w-fit group">
            <div className='h-[2rem] min-w-fit border border-transparent md:border-[var(--color-brand-primary)] flex justify-between rounded-[20px] items-center gap-2 md:px-2 bg-transparent md:bg-gray-100 md:dark:bg-[var(--main-bg-tertiary-dark)]'>

                <span className="text-gray-500 dark:text-white hidden md:block">Hi {username}!</span>
                <div className={`w-[2rem] h-[2rem] md:min-w-[1.5rem] md:h-[1.5rem] rounded-full overflow-hidden border border-gray-300`}>
                    <div className="w-full h-full bg-[var(--color-brand-primary)] text-white grid place-content-center">
                        {usernameFirstChar}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default UserProfile
