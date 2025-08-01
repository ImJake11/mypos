'use client';

import React, { useState } from 'react'
import OrderCompleteItemTile from './OrderCompleteItemTile';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import { useFetchCart } from '@/app/ui/point-of-sale/services/useFetchCart';
import OrderComepleteLoadingTile from './OrderComepleteLoadingTile';
import Image from 'next/image';
import emptyImage from "../../../../../public/no-data-found.png";

const OrderCompleteItems = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [isLoading, setIsLoading] = useState(true);

  const { cartItems } = useSelector((state: RootState) => state.posSlice);

  useFetchCart({
    onSuccess() {
      setIsLoading(false);
    },
  })

  const body = <>{cartItems.length <= 0 ? <div className='w-full h-full flex flex-col justify-center items-center'>
    <Image src={emptyImage} alt='image' height={156} width={156} />
    <span className='translate-x-5'>No items found</span>
  </div> :
    cartItems.map((item, i) => <OrderCompleteItemTile key={item.variantID} data={item} index={i} />)
  }</>

  return (
    <div className='flex-1 flex flex-col overflow-y-auto p-3 gap-5'>

      {isLoading ? Array.from({ length: 15 }).map((_, i) => <OrderComepleteLoadingTile key={i} />) : body}
    </div>
  )
}

export default OrderCompleteItems;
