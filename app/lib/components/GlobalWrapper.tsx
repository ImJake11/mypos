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

const GlobalWrapper = ({ child }: { child: React.JSX.Element }) => {



    return (
        <motion.div className='w-full h-full flex relative text-black dark:text-white transition-all ease-in-out duration-300'
            data-theme="light"
        >
            <Sidebar />
            <div className='flex-1 flex'>
                {child}
            </div>
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
