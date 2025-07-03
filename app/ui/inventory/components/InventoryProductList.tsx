"use client"

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ProductProps } from '@/app/lib/models/productModel';
import { useDispatch, useSelector } from 'react-redux';
import { inventoryCategoryEvent, inventorySetErrorState, inventorySetLoadingState, inventorySetRawData, inventoryResetInventoryState } from '@/app/lib/redux/inventorySlice';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import { useSocketEvent } from '@/app/lib/utils/hooks/useSocket';
import { AnimatePresence } from 'framer-motion';
import { fetchAllProducts } from '@/app/lib/utils/api/product/productFetching';
import InventoryErrorState from './InvetoryAltPages/InventoryErrorState';
import InventoryLoadingState from './InvetoryAltPages/InventoryLoadingState';
import GridTile from './InventoryProductTiles/InventoryGridTile';
import InventoryTableViewTile from './InventoryProductTiles/InventoryTableViewTile';
import { motion } from "framer-motion";


const ProductList = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { isListView,
        isLoading,
        rawProductData,
        filteredProductData,
        isFiltering,
        isError } = useSelector((state: RootState) => state.inventorySlice);

    // display the raw data if filter data is empty
    const displayList: ProductProps[] = useMemo(() => {
        return isFiltering ? filteredProductData : rawProductData;
    }, [rawProductData, filteredProductData, isFiltering]);

    const handleSocketEvent = useCallback((data: any) => {
        dispatch(inventoryCategoryEvent(data));
    }, []);

    useSocketEvent("favorite_event", handleSocketEvent);

    // update product state based on socket event
    useEffect(() => {
        // reset initial inventory state 
        dispatch(inventoryResetInventoryState())

        // fetched all product 
        const fetch = async () => {

            try {
                dispatch(inventorySetLoadingState());
                const result = await fetchAllProducts();
                dispatch(inventorySetRawData(result));

            } catch (e) {
                dispatch(inventorySetErrorState(true));
                dispatch(inventorySetLoadingState());
            } finally {
                dispatch(inventorySetLoadingState());
            }
        }

        fetch();

    }, []);

    if (isError) return <InventoryErrorState />

    return (
        <AnimatePresence>
            {isLoading ? <InventoryLoadingState /> : <motion.div className='flex-1 flex'
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                exit={{
                    opacity: 0,
                }}
            >
                <div className={`main-background-gradient flex-1 overflow-auto gap-4 p-3.5  rounded-[11px]`}
                >
                    {/** table header */}
                    {isListView && <motion.div className='flex w-full h-[3rem] p-[0_0.5rem]'
                        initial={{
                            y: "-100%",
                        }}
                        animate={{
                            y: "0%",
                        }}
                        exit={{
                            y: "-100%"
                        }}
                    >
                        <TableHeaderTile flex='flex-[1]' title='Image' />
                        <TableHeaderTile flex='flex-[3]' title='Name' />
                        <TableHeaderTile flex='flex-[2]' title='Stock' />
                        <TableHeaderTile flex='flex-[2]' title='Stock Status' />
                        <TableHeaderTile flex='flex-[2]' title='Price' />
                        <TableHeaderTile flex='flex-[2]' title='Variant' />
                        <TableHeaderTile flex='flex-[2]' title='Availability' />
                        <TableHeaderTile flex='flex-[1]' title='Action' />
                    </motion.div>}

                    <div className='h-[.5rem]' />
                    <div className={`flex-1 h-[calc(100vh-9rem)] overflow-auto ${isListView ? "flex flex-col" : "grid grid-cols-6"} gap-3`}>
                        <AnimatePresence>
                            {displayList.map((d) => isListView ? <InventoryTableViewTile key={d.id} data={d} /> :
                                <GridTile key={d.id} data={d} />)}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>}
        </AnimatePresence>
    )
}


function TableHeaderTile({
    flex, title,
}:

    { flex: string, title: string }) {
    return <div className={`${flex} h-full border-[1px] border-[var(--color-brand-primary)] place-content-center grid font-semibold`}>
        {title}
    </div>

}

export default ProductList
