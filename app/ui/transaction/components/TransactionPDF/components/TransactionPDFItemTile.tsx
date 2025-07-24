import { TransactionDetailsModel } from '@/app/lib/models/transactionModel'
import React from 'react'
import TransactionPDFProductTile from './TransactionPDFProductTile';
import TransactionPDFSalesSummary from './TransactionPDFSalesSummary';
import { BarChartIcon } from '@/app/lib/icons/BarChartIcon';

const TransactionPDFItemTile = ({
    data
}: {
    data: TransactionDetailsModel,
}) => {

    const {
        purchasedItems,
        status,
        userid,
        date,
        transactionId
    } = data;

    const transDate = new Date(date!).toLocaleDateString("en-US", {
        dateStyle: "short",
    })

    return (
        <div  className='flex flex-col p-4 gap-1 rounded-[4px]'
            style={{
                width: "794px",
                minHeight: "1123px",
                backgroundColor: "white",
                color: "black",
                padding: "30px",
                fontSize: "12px",
            }}
        >

            {/** title and id */}
            <div className='w-full flex h-[6rem]'
                style={{
                    borderBottom: "solid 1px rgb(0,0,0, .2)"
                }}
            >
                <span className='flex flex-1 flex-col gap-1'>
                    <span className='uppercase text-3xl font-[800]'>Transaction Report</span>
                    <span className='opacity-50 text-[12px]'>ID: {transactionId}</span>
                </span>
                <div className='place-self-start -translate-y-3'>
                    <BarChartIcon size={80} />
                </div>
            </div>

            <div className='h-[.5rem]'></div>

            {/** details */}
            <div className='flex w-full justify-baseline gap-5'>
                <Tile data={status} title='Transaction Status:' />
                <Tile data={transDate} title='Date:' />
                <Tile data={`U${userid}`} title='User:' />
            </div>
            <div className='h-[.5rem]' />

            {/** purchased items */}
            <Tile title='Purchased Items:' data='' />
            <div className='h-[.2rem]' />
            <TableHeaders />
            <div className='h-[.3rem]' />
            {purchasedItems.map(item => <TransactionPDFProductTile key={item.id} 
            id={item.productId} 
            price={item.unitPrice} 
            productName={item.product?.name!}
            quantity={item.quantity} />)}
            <div className='w-full h-[1px] mt-2'
                style={{
                    borderBottom: "solid 1px rgb(0,0,0, .2)"
                }}
            />

            <div className='h-[1rem]' />

            {/** sales summary  */}
            <TransactionPDFSalesSummary data={data} />
            <div className='flex-1' />

            <div style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                height: "fit",
                borderTop: "solid 1px rgb(0,0,0,.2)",
                padding: "20px",
                color: "rgb(0,0,0, .4)"
            }} >
                <span>Personalize pos inc.</span>
                <span>+639934184147</span>
                <span>jakejuguilon843@gmail.com</span>
            </div>
        </div>
    )
};

function TableHeaders() {
    return <div className='flex w-full font-[600] h-[1.5rem]'
        style={{
            borderBottom: "solid 1px rgb(0,0,0,.2)"
        }}
    >
        <span className='flex-3'>Item</span>
        <span className='flex-1 text-left'>Price</span>
        <span className='flex-1 text-center'>Qty</span>
        <span className='flex-1 text-center'>Total</span>
    </div>
}

function Tile({ title, data }: { title: string, data: string }) {
    return <span className='flex gap-2'>
        <span className='font-[600]'>{title}</span >
        <span className='opacity-60'>{data}</span>
    </span>
}

export default TransactionPDFItemTile
