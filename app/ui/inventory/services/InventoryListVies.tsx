
import { ProductProps } from '@/app/lib/models/productModel';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react'
import InventoryTableViewTile from '../components/InventoryProductTiles/InventoryTableViewTile';
import InventoryNoDataFound from '@/app/lib/components/PagesState/PageNoDataFoundPage';

const InventoryListVies = ({
    data
}: {
    data: ProductProps[]
}) => {
    return (
        <div className='h-full w-full bg-[var(--main-bg-secondary)] overflow-hidden'>
            <motion.div
                className='flex w-full h-[3rem] p-[0_0.5rem] bg-[var(--main-bg-primary)] rounded-tr-[12px] rounded-tl-[12px]'
                initial={{ y: "-100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
            >
                <TableHeaderTile flex='flex-[1]' title='Image' />
                <TableHeaderTile flex='flex-[3]' title='Name' />
                <TableHeaderTile flex='flex-[2]' title='Stock' />
                <TableHeaderTile flex='flex-[2]' title='Stock Status' />
                <TableHeaderTile flex='flex-[2]' title='Price' />
                <TableHeaderTile flex='flex-[2]' title='Variant' />
                <TableHeaderTile flex='flex-[2]' title='Availability' />
                <TableHeaderTile flex='flex-[1]' title='Action' />
            </motion.div>
            <ul className='w-full h-full flex flex-col overflow-auto gap-2'>
                <AnimatePresence>
                    {data.length <= 0 ? <InventoryNoDataFound /> : data.map(product => <InventoryTableViewTile
                        key={product.id}
                        data={product
                        } />)}
                </AnimatePresence>
            </ul>
        </div>
    )
}

function TableHeaderTile({ flex, title }: { flex: string; title: string }) {
    return (
        <div className={`${flex} h-full place-content-center grid font-semibold`}>
            {title}
        </div>
    );
}


export default InventoryListVies
