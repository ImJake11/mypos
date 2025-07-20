"use client";

import React from 'react'
import UserProfile from './UserProfile';
import { motion } from "framer-motion";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import PosIcon from '../../icons/posIcon';
import InventoryIcon from '../../icons/inventoryIcon';
import { TransactionIcon } from '../../icons/transactionIcon';
import { usePathname, useRouter } from 'next/navigation';
import ArrowToRight from '../../icons/arrowToRight';
import Link from 'next/link';

const Sidebar = () => {

    const pathName = usePathname();

    const urlParts = pathName.split("/");

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
                <ButtonTile icon={<PosIcon size={22} />} name='POS' isSelected={urlParts[2] == 'pos'} url='/ui/pos' />

                {/** inventory button */}
                <div className='w-full flex flex-col '>
                    <ButtonTile icon={<InventoryIcon size={22} />} name='Inventory' isSelected={urlParts[2] === 'inventory'} url='/ui/inventory' />

                    {/** sub buttons */}
                    <ButtonTile icon={<ArrowToRight size={12} color='var(--foreground)' />} name='Create Product' isSelected={urlParts[2] === 'inventory'} url='/ui/inventory' width='w-[90%]' />

                </div>

                {/** trnasaction */}
                <ButtonTile icon={<TransactionIcon size={24} />} name='Transaction' isSelected={urlParts[2] === 'transaction'} url='/ui/transaction' />
            </div>
            {/** profile container */}
            <UserProfile />
        </motion.div>
    )
}

interface ButtonProps {
    name: string,
    icon: React.JSX.Element,
    url: string,
    width?: string,
    isSelected: boolean
}
const ButtonTile = ({ name, icon, url, isSelected, width }: ButtonProps) => {

    const pathName = usePathname();

    return <Link href={url}>
        <motion.button className={`${width ?? "w-full"} place-self-end h-[2.5rem] flex gap-1.5 items-center p-1.5 mb-1 rounded-[7px] overflow-hidden`}
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
            {icon}
            <p>{name}</p>
        </motion.button>
    </Link>
}


export default Sidebar
