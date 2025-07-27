

import React from 'react'
import { motion } from "framer-motion"
import { ProductSummaryProp } from '@/app/lib/redux/slice/dashboardSlice'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/lib/redux/store'
import Link from 'next/link'

const LowStockChild = () => {

    const { lowStockProducts } = useSelector((state: RootState) => state.dashboarSlice);
    return (
        <div className='w-full h-[100%] pt-3 flex flex-col gap-2 overflow-auto p-[0_2px]'>
            {lowStockProducts.map((product, i) => <Tile key={i} data={product} />)}
        </div>
    )
}

function Tile({ data }: {
    data: ProductSummaryProp
}) {
    return (
        <motion.div className='text-gray-500 w-full flex gap-2.5 items-center p-2 rounded-[4px] bg-gray-100/40'
        >
            <div className='w-[2.5rem] h-[2.5rem] rounded-full bg-gray-200 overflow-hidden'>
                <img src={data.url} alt="image" loading="lazy" className='h-full w-full object-contain' />
            </div>
            <span className='flex-1 flex flex-col'>
                <span>{data.name}</span>
                <span className='text-[.6rem] text-gray-400'>{data.stock}/{data.minStock}</span>
            </span>
            <button className='w-fit h-fit rounded-[4px] bg-red-500/10 p-[2px_5px] text-red-500 text-[.7rem]'><Link href={`/ui/inventory/product-form?product-id=${data.id}`}>Restock</Link></button>
        </motion.div>
    )
}
export default LowStockChild
