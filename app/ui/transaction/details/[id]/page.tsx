import Sidebar from '@/app/lib/components/Sidebar/Sidebar'
import React from 'react'
import TransactionDetailsBody from '../components/TransactionDetailsBody'
import { TransactionDetailsModel } from '@/app/lib/models/transactionModel';

const page = async ({ params }: { params: { id: string } }) => {

  const { id } = await params;

  const transactionID = id;

  const protocol = process.env.WEBSITE_PROTOCOL;
  const host = process.env.WEBSITE_HOST;
  const port = process.env.WEBSITE_PORT;

  const res = await fetch(`${protocol}://${host}:${port}/api/transactions/${transactionID}`);

  if (!res.ok) {
    return <div className='w-screen h-screen place-content-center grid'>
      SOMETHING WENT WRONG!!
    </div>
  }

  const { data } = await res.json();

  const fetchedData: TransactionDetailsModel = data;

  return (
    <div className='w-screen h-screen flex'>
      <Sidebar />
      <div className='flex-1 flex flex-col'>
        <div className='w-full' style={{
          height: "var(--appbar-height)",
          backgroundColor: "var(--appbar-bg)",
        }}></div>

        <TransactionDetailsBody data={fetchedData} />
      </div>

    </div>
  )
}

export default page
