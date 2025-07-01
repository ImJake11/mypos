"use client"

import React, { useEffect } from 'react'
import ProductTile from './InventoryProductTile';
import { ProductProps } from '@/app/lib/models/productModel';
import { useDispatch, useSelector } from 'react-redux';
import { resetInventoryState, setProductListData, toggleFilterTab } from '@/app/lib/redux/inventorySlice';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import { useSocketEvent } from '@/app/lib/utils/hooks/useSocket';
import { AnimatePresence } from 'framer-motion';
import InventoryFilterContainer from './InventoryFilterContainer';
import { CategoryModel } from '@/app/lib/models/categoryModel';

interface Prop {
    rawData: ProductProps[],
    categoryData: CategoryModel[],
}
const ProductList = ({ rawData, categoryData }: Prop) => {
 
    const dispatch = useDispatch<AppDispatch>();

    const { isListView, filterData, productsList } = useSelector((state: RootState) => state.inventorySlice);
    const { categoryID, name, maxPrice, maxStock, minPrice, minStock, withBulkPricing, withDiscount, } = filterData;

    // generate a list based on filter data
    useEffect(() => {
        // Start with the raw (unfiltered) data
        let currentFilteredList = rawData;

        // Apply category filter if categoryID is present
        if (categoryID) {
            currentFilteredList = currentFilteredList.filter(p => p.categoryID === categoryID);
        }

        // Apply name filter if name is present
        // Make sure 'name' is trimmed and converted to lowercase for case-insensitive search
        if (name) {
            const lowerCaseName = name.toLowerCase().trim();
            currentFilteredList = currentFilteredList.filter(p =>
                p.name.toLowerCase().includes(lowerCaseName) // Use .includes() for "contains" search
            );
        }

        // Set the state to the final filtered list
        dispatch(setProductListData(currentFilteredList))

    }, [categoryID, name, rawData]);

    // update product state based on socket event
    useEffect(() => {
        // reset initial inventory state 
        dispatch(resetInventoryState())

        // initially set product data to redux state
        dispatch(setProductListData(rawData));
    }, []);


    useSocketEvent("favorite_event", (data: any) => {
        const { id, isFavorite } = data;

        const updatedProductList: ProductProps[] = productsList.map(pro => pro.id === id ? { ...pro, isFavorite } : pro);
        dispatch(setProductListData(updatedProductList));
    })


    return (
        <div className='flex-1 flex'>
            <div className={`main-background-gradient flex-1 h-[calc(100vh-5rem)] overflow-auto gap-4 p-3.5 ${isListView ? "flex flex-col" : "grid grid-cols-5"} rounded-[11px]`}
            >
                <AnimatePresence>
                    {productsList ? productsList.map((d, i) => <ProductTile key={i} data={d} />) : null}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default ProductList
