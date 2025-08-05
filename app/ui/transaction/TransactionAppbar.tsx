'use client';

import Appbar from '@/app/lib/components/Appbar/Appbar';
import MenuButton from '@/app/lib/components/Appbar/components/MenuButton';
import DownloadIcon from '@/app/lib/icons/DownloadIcon';
import { transactionToggleFilterTab, trnasactionTogglePDF } from '@/app/lib/redux/slice/transactionSlice';
import { useWindowSize } from '@/app/lib/utils/hooks/useGetWindowSize';
import { IconAdjustments, IconDownload } from '@tabler/icons-react';
import React from 'react'
import { useDispatch } from 'react-redux';

const TransactionAppbar = () => {

  const dispatch = useDispatch();

  const w = useWindowSize().width;

  const isMobile = w < 576;

  const child = (
    <div className='flex w-full justify-end gap-2'>

      {isMobile && <MenuButton />}
      <div className='flex-1' />

      <button className='min-w-[2rem] h-[2rem] rounded-full border border-gray-300 bg-gray-100 grid place-content-center' onClick={() => dispatch(transactionToggleFilterTab())}>
        <IconAdjustments size={20} className='stroke-gray-400' />
      </button>

      <button className='w-[2rem] h-[2rem] 5 grid place-content-center rounded-full border border-gray-300 bg-gray-100'
        onClick={() => dispatch(trnasactionTogglePDF())}
      >
        <IconDownload size={20} className='stroke-gray-400' />
      </button>
    </div>
  )

  return (
    <Appbar child={child} title='Transactions' />
  )
}

export default TransactionAppbar
