'use client';

import React, { useEffect } from 'react'
import TransactionRefundExistingItemTile from './components/TransactionRefundExistingItemTile'
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { refundMarkAllItem, refundResetState, refundSetTransactionData, refundToggleErrorState, refundToggleLoadingState } from '@/app/lib/redux/slice/refundSlice';
import { RootState } from '@/app/lib/redux/store';

const TransactionRefundList = () => {

  const params = useParams();
  const dispatch = useDispatch();

  const id = params.id;

  const { transactionData, isError, isLoading } = useSelector((state: RootState) => state.refundSlice);

  useEffect(() => {
    const fetchData = async () => {

      try {
        dispatch(refundResetState());
        dispatch(refundToggleLoadingState(true));

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

    fetchData();
  }, []);

  if (isLoading) return <div className='flex-1'>
    <span>Loading boss</span>
  </div>

  return (
    <div className='flex-1 p-2 rounded-[8px] flex gap-4 text-[.8rem] bg-[var(--main-bg-secondary)]'>

      <div className='flex-1 flex flex-col bg-[var(--main-bg-primary)] rounded-[8px] p-4 gap-3'>
        <span className='flex w-full justify-between p-[0_10px]'>
          <span>Transaction ID: 434-34324-23432</span>
          <span className='cursor-pointer' style={{ color: "var(--color-brand-primary)" }}
            onClick={() => dispatch(refundMarkAllItem())}
          >Mark All</span>
        </span>

        <div className='w-full h-[calc(100vh-8rem)] overflow-auto'>
          <ul>
            {transactionData?.purchasedItems.map(item => <TransactionRefundExistingItemTile key={item.id} data={item} />)}
          </ul>
        </div>
      </div>

    </div>
  )
}

export default TransactionRefundList
