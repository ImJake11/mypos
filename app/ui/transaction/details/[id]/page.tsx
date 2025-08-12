import React from 'react'
import TransactionDetailsBody from '../components/TransactionDetailsBody'
import GlobalWrapper from '@/app/lib/components/GlobalWrapper';
import { prisma } from '@/app/lib/utils/db/prisma';
import { TransactionDetailsModel } from '@/app/lib/models/transactionModel';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {

  const { id } = await params;

  const data = await prisma.transactionDetails.findUnique({
    where: {
      transactionId: id,
    },
    include: {
      purchasedItems: {
        select: {
          bulkTier: true,
          product: true,
          unitPrice: true,
          vatStatus: true,
          quantity: true,
          mainProductId: true,
          productId: true,
        }
      },

    }
  });

  if (!data) return <div></div>;

  const transactionData: TransactionDetailsModel = {
    ...data,
    date: new Date(data?.date).toISOString(),
    totalValSales: Number(data?.totalValSales),
    taxablSales: Number(data?.taxablSales),
    nonTaxableSales: Number(data?.nonTaxableSales),
    exemptSales: Number(data?.exemptSales),
    netTotal: Number(data?.netTotal),
    amountPaid: Number(data?.amountPaid),
    changeGiven: Number(data?.changeGiven),
  }

  return (
    <div className='w-screen h-screen flex'>
      <GlobalWrapper>
        <div className='w-full h-full flex flex-col'>
          <TransactionDetailsBody data={transactionData} />
        </div>
      </GlobalWrapper>
    </div>
  )
}

export default page
