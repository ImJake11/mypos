"use client";

import React from 'react'
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import "remixicon/fonts/remixicon.css";
import SidebarMainButtonTile from './SidebarMainButtonTile';
import SidebarFloatingToggle from './SidebarFloatingToggle';
import { sidebarToggleFloatingButton } from '../../redux/slice/sidebarSlice';
import SidebarIcons from './SidebarIcons';
import { SidebarButtonsProp } from '../../models/SidebarIconsProps';
import SidebarLogo from './SidebarLogo';
import UserProfile from './UserProfile';


const Sidebar = () => {
    const dispatch = useDispatch();

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
            url: "/ui/notifications-page",
            name: "Notifications",
            notificationCount: _notifCount,
        }
    ];


    return (
        <motion.div key="sidebar-component" className='h-screen flex flex-col relative bg-[var(--main-bg-primary)] p-[0_.1rem] scrollbar-hide'
            initial={{
                width: isSidebarMinimize ? "var(--sidebar-width-minimized)" : "var(--sidebar-width)"
            }}
            animate={{
                width: isSidebarMinimize ? "var(--sidebar-width-minimized)" : "var(--sidebar-width)",
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
            <UserProfile />
        </motion.div>
    )
}




export default Sidebar
