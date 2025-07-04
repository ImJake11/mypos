'use client'

import React, { useEffect, useMemo } from 'react'
import PosProductTile from './PosProductTile';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/lib/redux/store';
import { openToas } from '@/app/lib/redux/toastSlice';
import ToasEnum from '@/app/lib/enum/toastEnum';
import { posSetRawProductData, posToggleErrorState, posToggleLoadingState } from '@/app/lib/redux/posSlice';
import { fetchAllProducts } from '@/app/lib/utils/api/product/productFetching';
import PageNoDataFound from '@/app/lib/components/PagesState/PageNoDataFoundPage';
import PageErrorState from '@/app/lib/components/PagesState/PageErrorState';
import { ProductProps } from '@/app/lib/models/productModel';
import PosLoadingState from './PosLoadingState';


export const PosProductList = () => {

    const dispatch = useDispatch();

    const { rawProductData, isFiltering, isLoading, isError } = useSelector((state: RootState) => state.posSlice);

    const filteredData = useSelector((state: RootState) => state.filterSlice.filteredData);

    const displayList: ProductProps[] = useMemo(() => {
        return isFiltering ? filteredData : rawProductData;
    }, [isFiltering, filteredData, rawProductData]);


    useEffect(() => {
        const fetch = async () => {
            try {

                const result = await fetchAllProducts();

                dispatch(posSetRawProductData(result));

                dispatch(openToas({
                    message: "Fetched products successfully",
                    type: ToasEnum.SUCCESS,
                }))

            } catch (e) {
                dispatch(posToggleErrorState(true));
                dispatch(openToas({
                    message: "Failed to load products",
                    type: ToasEnum.ERROR,
                }));
                throw new Error("Failed to load product");
            } finally {
                dispatch(posToggleLoadingState(false));
            }
        }

        fetch();

    }, []);


    if (isError) return <PageErrorState />;


    return isLoading ? <PosLoadingState /> : <div className='w-[calc(100vw-var(--sidebar-width))] main-background-gradient overflow-hidden rounded-[12px] p-2 gap-3'>

        {/** body */}
        {displayList.length <= 0 ? <PageNoDataFound /> : <div className='w-full h-[calc(100vh-4rem)] grid-cols-5 grid  overflow-auto gap-3 p-2 items-start'>
            {displayList.map((p) => <PosProductTile key={p.id} data={p} />)}
        </div>}

    </div>
}
