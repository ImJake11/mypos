
import { ProductProps } from '@/app/lib/models/productModel'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { generateStockStatusFlag, StockStatusFlagProp } from '../../services/generateStockStatusFlag';
import { useDispatch } from 'react-redux';
import { inventoryToggleProductView } from '@/app/lib/redux/inventorySlice';

const InventoryTableViewTile = ({ data }: { data: ProductProps }) => {

    const dispatch = useDispatch();

    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    }

    const handleMouseLeave = () => {
        setIsHover(false);
    }

    return (
        <motion.div className='w-full h-fit relative flex bg-[var(--main-bg-primary-dark)] rounded-[12px]'
            layout
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
                padding: isHover? "1rem" : ".5rem 0",
                border: isHover? "solid 1px var(--color-brand-primary)" : "solid 1px transparent"
            }}

            exit={{
                opacity: 0,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/** image container */}
            <div className='flex-1 grid place-content-start  overflow-hidden'>
                <motion.img src={data.coverImage ?? null} alt="" className='object-fill w-[4rem] h-[4rem] rounded-[12px] translate-x-2'
                    animate={{
                        scale: isHover ? 1.2 : 1,
                    }}
                />
            </div>

            {/** name */}
            <TableCellTile content={data.name} flex='flex-[3]' />

            {/** stock */}
            <TableCellTile content={data.stock} flex='flex-[2]' />

            {/** stock status */}
            <TableCellTile content={stockStatus(generateStockStatusFlag(data.lowStock, data.stock))} flex='flex-[2]' />

            {/** price */}
            <TableCellTile content={`₱ ${data.sellingPrice.toLocaleString('en-us')}`} flex='flex-[2]' />

            {/** variants */}
            <TableCellTile content={data.variants.length} flex='flex-[2]' />

            {/** availability */}
            <TableCellTile content={data.isActive ? "Available" : "Unavailable"} flex='flex-[2]' />

            {/** action */}
            <button className='underline underline-offset-5 text-[var(--color-brand-primary)] flex-[1]'
                onClick={() => dispatch(inventoryToggleProductView(data))}
            >View</button>

        </motion.div>
    )
}

const stockStatus = (status: StockStatusFlagProp) => {
    return <div className='flex gap-1 items-center w-full'>
        <div className={`w-[1rem] h-[1rem] rounded-full`}
            style={{
                backgroundColor: status.color,
            }}
        />
        {status.text}
    </div>
}

function TableCellTile({ flex, content }:
    { flex: string, content: any }
) {
    return <div className={`${flex} grid place-content-center `}>
        {content}
    </div>
}

export default InventoryTableViewTile;
