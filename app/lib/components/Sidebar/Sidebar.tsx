"use client";

import React from 'react'
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import PosIcon from '../../icons/posIcon';
import InventoryIcon from '../../icons/inventoryIcon';
import { TransactionIcon } from '../../icons/transactionIcon';
import "remixicon/fonts/remixicon.css";
import DashboardIcon from '../../icons/DashboardIcon';
import SidebarMainButtonTile from './SidebarMainButtonTile';
import SidebarSubButton from './SidebarSubButtonTile';
import SidebarFloatingToggle from './SidebarFloatingToggle';
import { sidebarToggleFloatingButton } from '../../redux/slice/sidebarSlice';
import StoreIcon from '../../icons/StoreIcon';
import NotificationIcon from '../../icons/NotificationIcon';

const inventorySubRoute: React.JSX.Element[] = [
    <SidebarSubButton name='New Product' url='/ui/inventory/product-form' />,
];

const posSubroute: React.JSX.Element[] = [
    <SidebarSubButton name='Complete Transaction' url='/ui/pos/order-complete' />
]


const Sidebar = () => {
    const dispatch = useDispatch();

    const {
        isSidebarMinimize,
    } = useSelector((state: RootState) => state.sidebarSlice);

    const _notifCount = useSelector((state: RootState)=> state.notificationSlice.notificationCount);
    const iconSize = 22;

    return (
        <motion.div key="sidebar-component" className='h-screen flex flex-col fixed'
            style={{
                backgroundColor: "var(--main-bg-primary-dark)"
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
                {/** floating sidebar toggle */}
                <SidebarFloatingToggle />
            </div>
            <div className='w-full flex-1 flex flex-col overflow-auto gap-1 relative'>
                <SidebarMainButtonTile icon={<DashboardIcon size={iconSize} />} name='Overview' url='/' />

                {/** pos */}
                <SidebarMainButtonTile icon={<PosIcon size={iconSize} />} name='POS' url='/ui/pos' options={posSubroute} />

                {/** inventory button */}
                <SidebarMainButtonTile icon={<InventoryIcon size={iconSize} />} name='Inventory' url='/ui/inventory' options={
                    inventorySubRoute
                } />

                {/** trnasaction */}
                <SidebarMainButtonTile icon={<TransactionIcon size={iconSize} />} name='Transaction' url='/ui/transaction' />

                <SidebarMainButtonTile icon={<StoreIcon size={iconSize} />} name='Store Setup' url='' />

                <SidebarMainButtonTile icon={<NotificationIcon size={iconSize} />} name='Notifications' url='/ui/notifications-page' notificationLength={_notifCount} />
            </div>

            {/** profile container */}

            {/** 
            *  <UserProfile />
            */}
        </motion.div>
    )
}




export default Sidebar
