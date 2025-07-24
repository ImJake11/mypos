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
import GridTile from './InventoryProductTiles/InventoryGridTile';
import InventoryTableViewTile from './InventoryProductTiles/InventoryTableViewTile';
import InventoryNoDataFound from '../../../lib/components/PagesState/PageNoDataFoundPage';
import { filterWebSocketFavoriteEvent } from '@/app/lib/redux/slice/filterSlice';
import { useFetchProductList } from '@/app/lib/utils/hooks/useFetchProducts';

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
          <div className='bg-gray-100  flex flex-col flex-1 min-h-0 overflow-auto gap-2 p-2 rounded-[8px]'>
            {/** Table Header */}
            {isListView && (
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
            )}
            {displayList.length <= 0 ? (
              <InventoryNoDataFound />
            ) : (
              <ul className={`flex-1 overflow-auto ${isListView ? "flex flex-col" : `grid ${isSidebarMinimize ? "grid-cols-7" : "grid-cols-6"}`} gap-2`}>
                <AnimatePresence>
                  {displayList.map((d) =>
                    isListView ? (
                      <InventoryTableViewTile key={d.id} data={d} />
                    ) : (
                      <GridTile key={d.id} data={d} />
                    )
                  )}
                </AnimatePresence>
              </ul>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function TableHeaderTile({ flex, title }: { flex: string; title: string }) {
  return (
    <div className={`${flex} h-full place-content-center grid font-semibold`}>
      {title}
    </div>
  );
}

export default ProductList;
