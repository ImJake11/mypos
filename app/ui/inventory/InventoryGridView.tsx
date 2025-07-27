
import { ProductProps } from '@/app/lib/models/productModel'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import InventoryGridTile from './components/InventoryProductTiles/InventoryGridTile'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/lib/redux/store'
import InventoryLoadingState from './components/InventoryLoadingState'

const InventoryGridView = ({ data }: {
    data: ProductProps[]
}) => {

    const { isLoading, isProductViewVisible } = useSelector((state: RootState) => state.inventorySlice);

    return (
        <div className='flex-1 bg-[var(--main-bg-secondary)] flex'>
            {isLoading ? <InventoryLoadingState /> : <ul className='h-full grid grid-cols-6 w-full gap-3'>
                <AnimatePresence>
                    {data.map((product) => <InventoryGridTile data={product} key={product.id} />
                    )}
                </AnimatePresence>
            </ul>}
        </div>
    )
}

export default InventoryGridView
