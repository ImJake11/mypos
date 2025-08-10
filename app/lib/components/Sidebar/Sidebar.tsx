"use client";

import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import "remixicon/fonts/remixicon.css";
import SidebarMainButtonTile from './components/SidebarMainButtonTile';
import SidebarIcons from './components/SidebarIcons';
import { SidebarButtonsProp } from '../../models/SidebarIconsProps';
import SidebarLogo from './components/SidebarLogo';
import { usePathname, useRouter } from 'next/navigation';
import { IconLogout2 } from '@tabler/icons-react';
import { AuthServices } from '@/app/ui/auth/services/auth-service';
import CircularLoadingIndicator from '../CircularLoadingIndicator';
import { useDispatch } from 'react-redux';
import { openToas } from '../../redux/slice/toastSlice';
import ToasEnum from '../../enum/toastEnum';


const Sidebar = ({
    isFloating,
}: {
    isFloating: boolean,
}) => {
    const path = usePathname();
    const dispatch = useDispatch();

    const [isAllowed, setIsAllowed] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const authService = new AuthServices({});

    const sidebarButtonDetails: SidebarButtonsProp[] = [
        {
            url: "/",
            name: "Overview",
        },
        {
            url: "/ui/point-of-sale",
            name: "Point of Sale",
            subroutes: [
                {
                    name: "Complete Orders",
                    route: '/ui/point-of-sale/order-complete',
                }
            ],
            yTranslation: 18,
        },
        {
            url: "/ui/inventory",
            name: "Products",
            subroutes: [
                {
                    route: "/ui/inventory/product-form",
                    name: "Create Product"
                }
            ],
            yTranslation: 23.1,
        },
        {
            url: "/ui/transaction",
            name: "Transactions",
        },
        {
            name: "Notifications",
            url: "/ui/notifications-page"
        },
        {
            name: "Settings",
            url: "/ui/settings",
        },
    ];


    useEffect(() => {
        const pagesWithOut = ['/ui/point-of-sale'];

        pagesWithOut.forEach(element => {
            if (path === element) {
                setIsAllowed(false);
            } else {
                setIsAllowed(true);
            }
        });

    }, [path]);

    if (!isAllowed && !isFloating) return null;

    async function handleSignOut() {
        await authService.signout({ dispatch });
    }

    return (
        <AnimatePresence>
            <motion.div key="sidebar-component" className='h-screen flex flex-col relative bg-[#353535] dark:bg-[var(--main-bg-primary-dark)] scrollbar-hide w-[15rem]'
                initial={{
                    x: "-100%",
                }}
                animate={{
                    x: "0%",
                }}
                exit={{
                    opacity: 0,
                }}
                transition={{
                    ease: "easeInOut",
                    duration: .2,
                }}
            >

                {/** logo container */}
                <div className='w-full min-h-[4rem] relative'>
                    <SidebarLogo />
                </div>
                <div className='w-full flex-1 flex flex-col overflow-auto gap-1 relative'>
                    {sidebarButtonDetails.map((button, index) => {

                        const icon = <SidebarIcons url={button.url} />;

                        return <SidebarMainButtonTile key={index}
                            icon={icon}
                            name={button.name}
                            notificationLength={button.notificationCount ?? 0}
                            url={button.url}
                            options={button.subroutes}
                        />
                    })}
                </div>

                <div className='flex-1' />

                <button className='items-center w-auto h-[3rem] text-white flex justify-center gap-2 bg-black/20 m-2 rounded-[10px]'
                    onClick={handleSignOut}>
                    {isLoading ? <CircularLoadingIndicator size={20} borderWidth={1} />
                        : <IconLogout2 className='text-gray-300' />
                    }
                    <span>Sign out</span>
                </button>
            </motion.div>
        </AnimatePresence>
    )
}




export default Sidebar
