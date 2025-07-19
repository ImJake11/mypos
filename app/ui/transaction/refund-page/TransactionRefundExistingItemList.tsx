'use client';

import React, { useEffect } from 'react'
import TransactionRefundExistingItemTile from './components/TransactionRefundExistingItemTile'
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { refundSetTransactionData, refundToggleErrorState, refundToggleLoadingState } from '@/app/lib/redux/slice/refundSlice';
import { RootState } from '@/app/lib/redux/store';

const TransactionRefundList = () => {

  const params = useParams();
  const dispatch = useDispatch();

  const id = params.id;

  const { transactionData, isError, isLoading, } = useSelector((state: RootState) => state.refundSlice);

  useEffect(() => {
    const fetchData = async () => {

      try {
        dispatch(refundToggleLoadingState(true))

        // fetch
        const res = await fetch(`/api/transactions/${id}`, {
          method: "GET",
        })

        if (!res.ok) {
          dispatch(refundToggleErrorState(true));
          throw new Error("Server Error");
        }

        const { data } = await res.json();

        dispatch(refundSetTransactionData(data));

      } catch (e) {
        throw new Error("Failed to fetch transaction");
      } finally {
        dispatch(refundToggleLoadingState(false))
      }
    }

    fetchData()
  }, []);

  if (isLoading) return <div className='flex-1'>
    <span>Loading boss</span>
  </div>

  return (
    <div className='flex-1 p-2 rounded-[8px] flex flex-col gap-2 text-[.8rem]'
      style={{
        backgroundColor: "var(--main-bg-secondary-dark)"
      }}
    >
      <span className='flex w-full justify-between p-[0_10px]'>
        <span>Transaction ID: 434-34324-23432</span>
        <span style={{ color: "var(--color-brand-primary)" }}>Mark All</span>
      </span>

      <div className='w-full h-[calc(100vh-8rem)] overflow-auto'>
        <ul>
          {transactionData?.purchasedItems.map(item => <TransactionRefundExistingItemTile key={item.id} data={item} />)}
        </ul>
      </div>

    </div>
  )
}

export default TransactionRefundList
