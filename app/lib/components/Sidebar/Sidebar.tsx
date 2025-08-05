"use client";

import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import "remixicon/fonts/remixicon.css";
import SidebarMainButtonTile from './components/SidebarMainButtonTile';
import SidebarIcons from './components/SidebarIcons';
import { SidebarButtonsProp } from '../../models/SidebarIconsProps';
import SidebarLogo from './components/SidebarLogo';
import { usePathname } from 'next/navigation';
import { useWindowSize } from '../../utils/hooks/useGetWindowSize';


const Sidebar = ({
    isFloating,
}: {
    isFloating: boolean,
}) => {
    const path = usePathname();

    const [isAllowed, setIsAllowed] = useState(true);

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

    return (
        <AnimatePresence>
            <motion.div key="sidebar-component" className='h-screen flex flex-col relative bg-[#353535] p-[0_.1rem] scrollbar-hide w-[15rem]'
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
                    <SidebarLogo isSidebarMinimize={false} />
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
            </motion.div>
        </AnimatePresence>
    )
}




export default Sidebar
