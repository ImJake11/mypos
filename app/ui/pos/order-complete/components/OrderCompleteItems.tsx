'use client';

import React from 'react'
import OrderCompleteItemTile from './OrderCompleteItemTile';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/lib/redux/store';

const OrderCompleteItems = () => {

  const { cartItems } = useSelector((state: RootState) => state.posSlice);

  return (
    <div className='flex-1 flex flex-col overflow-y-auto p-3 gap-5'>
      {cartItems.map((item, i) => <OrderCompleteItemTile key={i} data={item} index={i} />)}
    </div>
  )
}

export default OrderCompleteItems;
