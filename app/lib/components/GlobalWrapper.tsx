'use client';

import React from 'react'
import { motion } from "framer-motion";
import CustomNotification from './CustomNotification/CustomNotification';
import ViewProductTab from '@/app/ui/inventory/components/InventoryProductViewTab/ProductTab';
import Cart from '@/app/ui/point-of-sale/components/cart/Cart';
import ProcessDialog from './ProcessDialog/ProcessDialog';
import Toas from './Toas';
import Sidebar from './Sidebar/Sidebar';
import SidebarSubmenu from './Sidebar/SidebarSubmenu';
import SidebarFloatingTab from './Sidebar/SidebarFloatingTab';
import { useWindowSize } from '../utils/hooks/useGetWindowSize';

const GlobalWrapper = ({ child }: { child: React.JSX.Element }) => {

    const { width } = useWindowSize();

    const isTablet = width < 1050;

    return (
        <motion.div className='w-full h-full flex relative text-black dark:text-white transition-all ease-in-out duration-300 overflow-hidden'
            data-theme="light"
        >
            {!isTablet && <Sidebar isFloating={false} />}
            <div className='flex-1 flex'>
                {child}
            </div>
            <SidebarFloatingTab />
            <SidebarSubmenu />
            <ViewProductTab />
            <Cart />
            <Toas />
            <ProcessDialog />
            <CustomNotification />
        </motion.div>

    )
}

export default GlobalWrapper
