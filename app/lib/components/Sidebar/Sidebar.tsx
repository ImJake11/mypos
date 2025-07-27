"use client";

import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import "remixicon/fonts/remixicon.css";
import SidebarMainButtonTile from './components/SidebarMainButtonTile';
import SidebarFloatingToggle from './components/SidebarFloatingToggle';
import { sidebarOpen, sidebarToggleFloatingButton } from '../../redux/slice/sidebarSlice';
import SidebarIcons from './components/SidebarIcons';
import { SidebarButtonsProp } from '../../models/SidebarIconsProps';
import SidebarLogo from './components/SidebarLogo';
import { usePathname } from 'next/navigation';


const Sidebar = ({
    isFloating,
}: {
    isFloating: boolean,
}) => {
    const dispatch = useDispatch();
    const path = usePathname();

    const [isAllowed, setIsAllowed] = useState(true);

    const {
        isSidebarMinimize, hasScreenOverlay,
    } = useSelector((state: RootState) => state.sidebarSlice);

    const _notifCount = useSelector((state: RootState) => state.notificationSlice.notificationCount);
    const iconSize = 22;

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
                dispatch(sidebarOpen(false))
            }
        });

    }, [path]);

    if (!isAllowed && !isFloating) return null;

    return (
        <AnimatePresence>
            <motion.div key="sidebar-component" className='h-screen flex flex-col relative bg-[#353535] p-[0_.1rem] scrollbar-hide'
                initial={{
                    x: "-100%",
                    width: isSidebarMinimize ? "var(--sidebar-width-minimized)" : "var(--sidebar-width)"
                }}
                animate={{
                    x: "0%",
                    width: isSidebarMinimize ? "var(--sidebar-width-minimized)" : "var(--sidebar-width)",
                }}
                exit={{
                    opacity: 0,
                }}
                transition={{
                    ease: "linear"
                }}
            >

                {/** logo container */}
                <div className='w-full min-h-[4rem] relative'
                    onMouseEnter={() => dispatch(sidebarToggleFloatingButton(true))}
                    onMouseLeave={() => dispatch(sidebarToggleFloatingButton(false))}
                >
                    <SidebarLogo isSidebarMinimize={isSidebarMinimize} />
                    {/** floating sidebar toggle */}
                    <SidebarFloatingToggle />

                </div>
                <div className='w-full flex-1 flex flex-col overflow-auto gap-1 relative'>
                    {sidebarButtonDetails.map((button, index) => {

                        const icon = <SidebarIcons url={button.url} />;

                        return <SidebarMainButtonTile key={index}
                            yTranslation={button.yTranslation ?? 0}
                            icon={icon}
                            name={button.name}
                            notificationLength={button.notificationCount ?? 0}
                            url={button.url}
                            options={button.subroutes}
                        />
                    })}
                </div>
            </motion.div>
        </AnimatePresence>
    )
}




export default Sidebar
