"use client";

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBarChart, faChartPie, faCircleDot, faCreditCard, faList, faNewspaper, faTableColumns, faTableList, faTentArrowLeftRight, faTruck, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import UserProfile from './UserProfile';
import { motion } from "framer-motion";

const titleStyles = "text-[.8rem] text-gray-500 mb-[1rem]";

const Sidebar = () => {

    return (
        <div className='w-[18vw] h-screen flex flex-col overflow-hidden'
            style={{
                backgroundColor: "var(--background)"
            }}
        >
            {/** logo container */}
            <div className='w-full min-h-[4rem]'> </div>

            <div className='w-full flex-1 flex flex-col p-2.5 overflow-auto '>
                <ButtonTile icon={faChartPie} name='Overview' />
                <ButtonTile icon={faTableList} name='Orders' />
                <ButtonTile icon={faTableColumns} name='Categories' />
                <ButtonTile icon={faCreditCard} name='Transactions' />
                <ButtonTile icon={faCircleDot} name='Inventory' />
                <ButtonTile icon={faBarChart} name='Report' />
                <ButtonTile icon={faUser} name='User Management' />
                <ButtonTile icon={faTruck} name='Delivery Orders' />
            </div>
            {/** profile container */}
            <UserProfile />
        </div>
    )
}

interface ButtonProps {
    name: string,
    icon: IconProp,
}
const ButtonTile = ({ name, icon }: ButtonProps) => {


    // for development only
    const isSelected = name.toLowerCase() === "overview";


    return <motion.button className={`w-full h-[3rem] flex gap-1.5 items-center p-1.5 mb-1 rounded-[7px] overflow-hidden`}

        style={{
            backgroundSize: "200% 100%",
            backgroundPosition: "0% 0%",
            backgroundImage: isSelected ? "linear-gradient(45deg,var(--tertiary), var(--primary), var(--secondary), var(--tertiary))" : undefined,
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
        <FontAwesomeIcon icon={icon} size={"1x"} className="text-[1.2rem]" />
        <p>{name}</p>
    </motion.button>
}

export default Sidebar
