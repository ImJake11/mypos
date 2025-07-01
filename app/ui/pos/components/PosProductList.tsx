'use client'

import React, { useMemo, useState } from 'react'
import CategoryTile from './PosCategoryTile'
import { CategoryModel } from '@/app/lib/models/categoryModel';
import PosProductTile from './PosProductTile';
import { ProductProps } from '@/app/lib/models/productModel';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/lib/redux/store';

interface Prop {
    categories: CategoryModel[],
    products: ProductProps[],
}
export const PosProductList = ({ categories, products }: Prop) => {

    const posSlice = useSelector((state: RootState) => state.posSlice);

    const { searchQuery, selectedCategoryID } = posSlice;

    const productList = useMemo(() => {

        let currentList: ProductProps[] = products;

        if (selectedCategoryID) {
            currentList = currentList.filter(pro => pro.categoryID === selectedCategoryID);
        }

        if (searchQuery) {
            currentList = currentList.filter(pro => pro.name.toLowerCase().includes(searchQuery.toLowerCase()))
        }

        return currentList;

    }, [searchQuery, selectedCategoryID, products]);

    return (
        <div className='w-[calc(100vw-var(--sidebar-width))] main-background-gradient flex flex-col overflow-hidden rounded-[11px] p-2 gap-3'>
            {/** categories */}
            <div className='w-[calc(100vw-var(--sidebar-width))] h-[10rem] flex gap-3 p-1.5 overflow-auto'>
                <CategoryTile isSelected={!selectedCategoryID} />
                {categories.map((cat, i) => <CategoryTile key={cat.id} data={cat} isSelected={cat.id === selectedCategoryID} />)}
            </div>

            {/** body */}
            <div className='w-full h-[calc(100vh-16rem)] grid-cols-8 grid  overflow-auto gap-3'>
                {productList.map((p) => <PosProductTile key={p.id} data={p} />)}
            </div>

        </div>
    )
}
