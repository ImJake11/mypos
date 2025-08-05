'use client';

import "remixicon/fonts/remixicon.css";
import React, { useEffect, useState } from 'react'
import { IconLogout, IconSettings, IconSettingsFilled } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { sidebarSetUserData } from "@/app/lib/redux/slice/sidebarSlice";
import CircularLoadingIndicator from "../../CircularLoadingIndicator";
import { openToas } from "@/app/lib/redux/slice/toastSlice";
import ToasEnum from "@/app/lib/enum/toastEnum";
import { useRouter } from "next/navigation";

const UserProfile = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const { photoUrl, username, } = useSelector((state: RootState) => state.sidebarSlice.userData);

    const usernameFirstChar = username[0];

    const handleLogout = async () => {

        try {
            setIsLoggingOut(true)
            const res = await fetch("/api/auth/logout", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (res.ok) {
                router.replace("/ui/auth/sign-in-page");
            }

        } catch (e) {
            dispatch(openToas({
                message: "Failed to sign out",
                type: ToasEnum.ERROR,
            }))
            setIsLoggingOut(false);
        }
    }

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
            <div className='h-[2rem] min-w-fit border border-[var(--color-brand-primary)] flex justify-between rounded-[20px] items-center gap-2 px-2 bg-gray-100'>

                <span className="text-gray-500">Hi {username}!</span>
                <div className={`min-w-[1.5rem] h-[1.5rem] rounded-full overflow-hidden border border-gray-300`}>
                    <div className="w-full h-full bg-[var(--color-brand-primary)] text-white grid place-content-center">
                        {usernameFirstChar}
                    </div>
                </div>
            </div>

            <div className="absolute w-[10rem] h-fit max-h-[20rem] bg-white shadow-[-1px_1px_5px_rgb(0,0,0,.5)] right-0 top-9 rounded-[4px] gap-1 flex-col py-1 hidden group-hover:flex hover:flex">

                <MenuTiles>
                    <IconSettings size={18} className="text-gray-400" />
                    <span>Profile Settings</span>
                </MenuTiles>
                <MenuTiles onClick={handleLogout}>
                    {isLoggingOut ? <CircularLoadingIndicator size={18} borderWidth={1} /> : <IconLogout size={18} className="text-gray-400" />}
                    <span>Logout</span>
                </MenuTiles>
            </div>
        </div>
    )
}


function MenuTiles({ children, onClick }: {
    children: React.ReactNode,
    onClick?: () => void,
}) {
    return (
        <button className="w-full px-2 py-1.5 flex gap-1 items-center hover:bg-gray-100"
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default UserProfile
