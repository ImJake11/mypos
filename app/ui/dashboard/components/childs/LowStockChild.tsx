

import { IconAlertHexagon } from '@tabler/icons-react'
import React from 'react'
import {motion} from "framer-motion"

const LowStockChild = () => {
    return (
        <div className='w-full h-[100%] pt-3 flex flex-col gap-1 overflow-auto p-[0_2px]'>
            {Array.from({
                length: 25
            }).map((_, i) => <Tile key={i} maxStock={199} name='Sample Product' stock={29} />)}
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
            <IconAlertHexagon className='h-[1rem] w-[1rem]'/>
            <span>{name}</span>
            <div className='flex-1' />
            <span>{stock}/{maxStock}</span>
            <button className='w-fit h-fit rounded-[4px] bg-red-500/10 p-[2px_5px] text-red-500 text-[.7rem]'>Restock</button>
        </motion.div>
    )
}
export default LowStockChild
