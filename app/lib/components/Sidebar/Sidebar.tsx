"use client";

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight, faBarChart, faChartPie, faCircleDot, faCreditCard, faList, faMaximize, faMinimize, faNewspaper, faTableColumns, faTableList, faTentArrowLeftRight, faTruck, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react'
import UserProfile from './UserProfile';
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toggleSidebar } from '../../redux/sidebarSlice';
import PosIcon from '../../icons/posIcon';
import InventoryIcon from '../../icons/inventoryIcon';


const Sidebar = () => {

    return (
        <motion.div className='h-screen flex flex-col overflow-hidden min-w-[var(--sidebar-width)] w-[var(--sidebar-width)]'
            style={{
                backgroundColor: "var(--main-bg-primary-dark)"
            }}
        >
            {/** logo container */}
            <div className='w-full min-h-[3.5rem] relative'>

            </div>
            <div className='w-full flex-1 flex flex-col p-2.5 overflow-auto '>
                <ButtonTile icon={<PosIcon />} name='POS' />
                <ButtonTile icon={<InventoryIcon />} name='Inventory' />
            </div>
            {/** profile container */}
            <UserProfile />
        </motion.div>
    )
}

interface ButtonProps {
    name: string,
    icon: any,
}
const ButtonTile = ({ name, icon }: ButtonProps) => {

    const { isSidebarMinimize } = useSelector((state: RootState) => state.sidebarSlice);

    // for development only
    const isSelected = name.toLowerCase() === "inventory";


    return <motion.button className={`w-full h-[3rem] flex gap-1.5 items-center p-1.5 mb-1 rounded-[7px] overflow-hidden`}
        style={{
            backgroundSize: "200% 100%",
            backgroundPosition: "0% 0%",
            backgroundImage: isSelected ? "linear-gradient(45deg,var(--main-bg-primary-dark), var(--color-brand-primary), var(--color-brand-secondary), var(--main-bg-primary-dark))" : undefined,
        }}
        animate={{
            backgroundPosition: "100% 0%"
        }}
        transition={{
            duration: 3,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
        }}
    >
        <motion.div
            animate={{
                x: isSidebarMinimize ? ".6rem" : "0rem",
            }}>
            <div className='w-[1.5rem] h-[1.5rem]'>{icon}</div>
        </motion.div>
        {!isSidebarMinimize && <p>{name}</p>}
    </motion.button>
}

function SubButton({ name, }: { name: string }) {
    return <div className='w-[80%] h-[3rem] rounded-[3px] bg-[var(--tertiary)] p-2 flex items-center gap-2 place-self-end'
    >
        <i className="ri-arrow-right-s-fill"></i>
        {name}
    </div>
}


export default Sidebar
