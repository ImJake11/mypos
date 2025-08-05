
import { ProductProps } from '@/app/lib/models/productModel'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import InventoryGridTile from './components/InventoryProductTiles/InventoryGridTile'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/lib/redux/store'
import InventoryLoadingState from './components/InventoryLoadingState'
import { useWindowSize } from '@/app/lib/utils/hooks/useGetWindowSize'
import Searchbar from '@/app/lib/components/Searchbar/Searchbar'

const InventoryGridView = ({ data }: {
    data: ProductProps[]
}) => {

    const { isLoading, isProductViewVisible } = useSelector((state: RootState) => state.inventorySlice);


    const { width } = useWindowSize();

    const isLarge = width >= 1000;
    const isMedium = width >= 830;
    const isSmall = width >= 650;
    const isXSmall = width <= 650;

    return (
        <div className='flex-1 bg-[var(--main-bg-secondary)] flex'>
            {isLoading ? <InventoryLoadingState /> : <ul className={`h-full w-full gap-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5`}>
                <AnimatePresence>
                    {data.map((product, index) => <InventoryGridTile index={index} data={product} key={product.id} />
                    )}
                </AnimatePresence>
            </ul>}
        </div>
    )
}

export default InventoryGridView
