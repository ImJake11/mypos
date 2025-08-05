'use client'

import React, { useMemo } from 'react'
import PosProductTile from './PosProductTile';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import { posSetRawProductData, posToggleErrorState, posToggleLoadingState } from '@/app/lib/redux/slice/posSlice';
import PageNoDataFound from '@/app/lib/components/PagesState/PageNoDataFoundPage';
import PageErrorState from '@/app/lib/components/PagesState/PageErrorState';
import { ProductProps } from '@/app/lib/models/productModel';
import PosLoadingState from './PosLoadingState';
import { useFetchProductList } from '@/app/lib/utils/hooks/useFetchProducts';
import Searchbar from '@/app/lib/components/Searchbar/Searchbar';


export const PosProductList = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { rawProductData, isFiltering, isLoading, isError } = useSelector((state: RootState) => state.posSlice);

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

    return isLoading ? <PosLoadingState /> : <div className='flex-1 bg-[var(--main-bg-secondary)] gap-3'>

        {displayList.length <= 0 ? <PageNoDataFound /> : <div className='flex-1 flex flex-col'>

            <div className='w-full flex justify-center m-[.5rem_0rem] md:hidden'>
                <Searchbar context='pos' showEditIcon={false} />
            </div>

            <div className={`w-full h-[84vh] md:h-[91vh]`}>
                <ul className={`w-full h-full grid gap-3 p-2 items-start overflow-auto grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5`}>
                    {displayList.map((p, index) => <PosProductTile key={p.id} index={index} data={p} />)}
                </ul>
            </div>
        </div>}

    </div>
}
