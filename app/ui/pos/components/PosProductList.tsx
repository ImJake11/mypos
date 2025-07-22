'use client'

import React, { useEffect, useMemo } from 'react'
import PosProductTile from './PosProductTile';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import { openToas } from '@/app/lib/redux/slice/toastSlice';
import ToasEnum from '@/app/lib/enum/toastEnum';
import { posSetRawProductData, posToggleErrorState, posToggleLoadingState } from '@/app/lib/redux/slice/posSlice';
import PageNoDataFound from '@/app/lib/components/PagesState/PageNoDataFoundPage';
import PageErrorState from '@/app/lib/components/PagesState/PageErrorState';
import { ProductProps } from '@/app/lib/models/productModel';
import PosLoadingState from './PosLoadingState';
import { useFetchProductList } from '@/app/lib/utils/hooks/useFetchProducts';


export const PosProductList = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { rawProductData, isFiltering, isLoading, isError } = useSelector((state: RootState) => state.posSlice);

    const { isSidebarMinimize } = useSelector((state: RootState) => state.sidebarSlice);

    const filteredData = useSelector((state: RootState) => state.filterSlice.filteredData);

    const displayList: ProductProps[] = useMemo(() => {
        return isFiltering ? filteredData : rawProductData;
    }, [isFiltering, filteredData, rawProductData]);

    useFetchProductList({
        onSuccess: (data: ProductProps[]) => dispatch(posSetRawProductData(data)),
        onLoad: () => dispatch(posToggleLoadingState(true)),
        onError: () => dispatch(posToggleErrorState(true)),
        onFinal: () => dispatch(posToggleLoadingState(false)),
    });

    if (isError) return <PageErrorState />;

    return isLoading ? <PosLoadingState /> : <div className='flex-1 min-h-0 main-background-gradient overflow-auto rounded-[12px]  gap-3'>

        {/** body */}
        {displayList.length <= 0 ? <PageNoDataFound /> : <ul className={`w-full min-h-0 flex-1 ${isSidebarMinimize? "grid-cols-7" : "grid-cols-6"} grid gap-3 p-2 items-start overflow-auto`}>
            {displayList.map((p) => <PosProductTile key={p.id} data={p} />)}
        </ul>}

    </div>
}
