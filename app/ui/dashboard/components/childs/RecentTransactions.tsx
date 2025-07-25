
import { gcashIcon, mastercartIcon, mayaIcon } from '@/app/lib/constants/IconLink'
import { IconCreditCardPay, IconTimeDurationOff } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import React from 'react'

const RecentTransactions = () => {
    return (
        <div className='w-full h-full flex flex-col gap-2 pt-3 overflow-auto'>
            {Array.from({
                length: 25
            }).map((_, i) => <Tile key={i} maxStock={293} stock={23} name='Sample Product' />)}
        </div>
    )
}


function Tile({
    name,
    stock,
    maxStock,
}: {
    name: string,
    maxStock: number,
    stock: number
}) {
    return (
        <motion.div className='text-gray-500 w-full flex gap-2.5 items-center pl-2 p-[5px_0] pr-2 rounded-[4px]'
            whileHover={{
                color: "black",
                boxShadow: "0px 1px 6px  rgb(0,0,0,.2)"
            }}
        >
            <IconCreditCardPay className='h-[1rem] w-[1rem]' />
            <span>October 24, 2001 - 5:00PM</span>
            <div className='flex-1' />
            <div className='w-[1.5rem] h-[1rem]'>
                <img src={gcashIcon} alt="i" className='object-contain w-full h-full' />
            </div>
        </motion.div>
    )
}

export default RecentTransactions
