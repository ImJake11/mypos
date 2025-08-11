'use client';

import React from 'react'
import { motion } from "framer-motion";
import CustomNotification from './CustomNotification/CustomNotification';
import ViewProductTab from '@/app/ui/inventory/components/InventoryProductViewTab/ProductTab';
import Cart from '@/app/ui/point-of-sale/components/cart/Cart';
import ProcessDialog from './ProcessDialog/ProcessDialog';
import Toas from './Toas';
import Sidebar from './Sidebar/Sidebar';
import SidebarFloatingTab from './Sidebar/SidebarFloatingTab';
import { useTheme } from '../utils/hooks/useTheme';

const GlobalWrapper = ({ children }: { children: React.ReactNode }) => {

    const { theme } = useTheme();

    return (

        <motion.div className='w-full h-full flex relative text-black dark:text-white transition-all ease-in duration-200 overflow-hidden bg-[var(--main-bg-primary)] dark:bg-[var(--main-bg-primary-dark)]'
            data-theme={theme}
        >
            <div className='hidden lg:block'><Sidebar isFloating={false} /></div>
            <div className='flex-1 flex p-2'>
                {children}
            </div>
            <SidebarFloatingTab />
            <ViewProductTab />
            <Cart />
            <Toas />
            <ProcessDialog />
            <CustomNotification />
        </motion.div>
    )
}

export default GlobalWrapper
