'use client';

import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { motion } from "framer-motion";
import CustomNotification from './CustomNotification/CustomNotification';
import ViewProductTab from '@/app/ui/inventory/components/InventoryProductViewTab/ProductTab';
import Cart from '@/app/ui/pos/components/cart/Cart';
import ProcessDialog from './ProcessDialog/ProcessDialog';
import Toas from './Toas';

const GlobalWrapper = ({ child }: { child: React.JSX.Element }) => {

    const { isSidebarMinimize } = useSelector((state: RootState) => state.sidebarSlice);

    return (
        <motion.div className='flex-1 flex relative'
            initial={{
                marginLeft: "var(--sidebar-width)"
            }}
            animate={{
                marginLeft: isSidebarMinimize ? "var(--sidebar-width-minimized)" : "var(--sidebar-width)"
            }}
        >
            {child}
            <ViewProductTab />
            <Cart />
            <Toas />
            <ProcessDialog />
            <CustomNotification />
        </motion.div>

    )
}

export default GlobalWrapper
