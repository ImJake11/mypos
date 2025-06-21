"use client";

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBarChart, faChartPie, faCircleDot, faCreditCard, faList, faNewspaper, faTableColumns, faTableList, faTentArrowLeftRight, faTruck, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import UserProfile from './UserProfile';

const titleStyles = "text-[.8rem] text-gray-500 mb-[1rem]";

const Sidebar = () => {

    return (
        <div className='w-[20vw] h-screen flex flex-col overflow-hidden'
            style={{
                backgroundColor: "var(--background)"
            }}
        >
            {/** logo container */}
            <div className='w-full min-h-[4rem] border-b-gray-300  border-b'> </div>

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


    return <button className={`
        ${isSelected ? "linear-bg-40" : "no-linear-bg"}
        w-full h-[3rem] flex gap-1.5 items-center p-1.5 mb-1 rounded-[7px] overflow-hidden`}
    >
        <FontAwesomeIcon icon={icon} size={"1x"} className="text-[1.2rem]" />
        <p>{name}</p>
    </button>
}

export default Sidebar
