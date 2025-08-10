
import { ProductProps } from '@/app/lib/models/productModel'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { generateStockStatusFlag, StockStatusFlagProp } from '../../services/generateStockStatusFlag';
import { useDispatch } from 'react-redux';
import { inventoryToggleProductView } from '@/app/lib/redux/slice/inventorySlice';
import { useWindowSize } from '@/app/lib/utils/hooks/useGetWindowSize';

const InventoryTableViewTile = ({ data }: { data: ProductProps }) => {

    const dispatch = useDispatch();

    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    }

    const handleMouseLeave = () => {
        setIsHover(false);
    }

    const { width } = useWindowSize();

    const isMobile = width < 700;

    return (
        <motion.div className={`w-full min-h-[3rem] relative flex bg-[var(--main-bg-primary)] dark:bg-[var(--main-bg-primary-dark)] rounded-[4px] p-1 items-center gap-1
            ${isMobile ? "text-[.7rem]" : "text-[.8rem]"}
            `}
            layout
            whileHover={{
                boxShadow: "1px 2px 5px rgb(0,0,0,.2)"
            }}
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/** image container */}
            <div className='flex-1 grid place-content-center'>
                <div className='w-[2rem] h-[2rem] bg-[var(--main-bg-primary)] rounded-[4px]  overflow-hidden'>
                    <motion.img src={data.coverImage ?? null} alt="" className='object-fill w-full h-full' />
                </div>
            </div>

            {/** name */}
            <TableCellTile content={data.name} flex='flex-[3]' />

            {/** stock */}
            <TableCellTile content={stock(data.stock, data.lowStock)} flex='flex-[2]' />

            {/** stock status */}
            <TableCellTile content={stockStatus(generateStockStatusFlag(data.lowStock, data.stock))} flex='flex-[2]' />

            {!isMobile && <>
                {/** price */}
                <TableCellTile content={`₱ ${data.sellingPrice.toLocaleString('en-us')}`} flex='flex-[2]' />

                {/** variants */}
                <TableCellTile content={data.variants.length} flex='flex-[2]' />

                {/** availability */}
                <TableCellTile content={data.isActive ? "Available" : "Unavailable"} flex='flex-[2]' />

                {/** action */}
                <button className='underline underline-offset-5 text-[var(--color-brand-primary)] flex-[1]'
                    onClick={() => dispatch(inventoryToggleProductView({ id: data.id!, isOpen: true }))}
                >View</button>
            </>}

        </motion.div>
    )
}

const stock = (stock: number, lowStock: number) => {
    return <span>{stock} / <span className='opacity-40'>{lowStock}</span></span>
}

const stockStatus = (status: StockStatusFlagProp) => {
    return <span className='text-[.7rem] font-semibold' style={{ color: status.color }}>{status.text}</span>
}

function TableCellTile({ flex, content }:
    { flex: string, content: any }
) {
    return <div className={`${flex} grid place-content-start `}>
        {content}
    </div>
}

export default InventoryTableViewTile;
