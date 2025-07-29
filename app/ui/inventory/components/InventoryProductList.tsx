"use client"

import React, { useCallback, useMemo } from 'react'
import { ProductProps } from '@/app/lib/models/productModel';
import { useDispatch, useSelector } from 'react-redux';
import {
  inventoryCategoryEvent,
  inventorySetErrorState,
  inventorySetLoadingState,
  inventorySetRawData
} from '@/app/lib/redux/slice/inventorySlice';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import { useSocketEvent } from '@/app/lib/utils/hooks/useSocket';
import { AnimatePresence, motion } from 'framer-motion';
import InventoryErrorState from '../../../lib/components/PagesState/PageErrorState';
import InventoryLoadingState from './InventoryLoadingState';
import { filterWebSocketFavoriteEvent } from '@/app/lib/redux/slice/filterSlice';
import { useFetchProductList } from '@/app/lib/utils/hooks/useFetchProducts';
import InventoryListVies from '../services/InventoryListVies';
import InventoryGridView from '../InventoryGridView';
import { useWindowSize } from '@/app/lib/utils/hooks/useGetWindowSize';
import Searchbar from '@/app/lib/components/Searchbar/Searchbar';

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { isSidebarMinimize } = useSelector((state: RootState) => state.sidebarSlice);

  const {
    isListView,
    isLoading,
    rawProductData,
    isFiltering,
    isError
  } = useSelector((state: RootState) => state.inventorySlice);

  const filteredProductData = useSelector(
    (state: RootState) => state.filterSlice.filteredData
  );

  const displayList: ProductProps[] = useMemo(() => {
    return isFiltering ? filteredProductData : rawProductData;
  }, [rawProductData, filteredProductData, isFiltering]);

  const handleSocketEvent = useCallback((data: any) => {
    dispatch(inventoryCategoryEvent(data));
    if (isFiltering) {
      dispatch(filterWebSocketFavoriteEvent(data));
    }
  }, [isFiltering]);

  useSocketEvent("favorite_event", handleSocketEvent);

  useFetchProductList({
    onSuccess: (data: ProductProps[]) => dispatch(inventorySetRawData(data)),
    onLoad: () => dispatch(inventorySetLoadingState(true)),
    onError: () => dispatch(inventorySetErrorState(true)),
    onFinal: () => dispatch(inventorySetLoadingState(false)),
  });

  if (isError) return <InventoryErrorState />;

  const { width } = useWindowSize();

  const isMedium = width < 768;

  return (
    <AnimatePresence>
      {isLoading ? (
        <InventoryLoadingState />
      ) : (
        <motion.div
          className='flex-1 flex min-h-0'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className='bg-gray-100  flex flex-col flex-1 min-h-0 overflow-auto p-3 rounded-[8px]'>

            {isMedium && <div className='w-full grid place-content-center mb-2'><Searchbar context='inventory' showEditIcon={true} /></div>}

            <div className='flex-1 overflow-auto'>
              {isListView ? <InventoryListVies data={displayList} /> : <InventoryGridView data={displayList} />}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


export default ProductList;
