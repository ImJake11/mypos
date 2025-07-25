'use client';

import React, { useEffect } from 'react'
import DashboardSummaryTile from './components/DashboardSummaryTile'
import DashboardChart from './components/DashboardChart'
import DashboardTransactionAndStockSummary from './components/DashboardTransactionAndStockSummary'
import { DashboardServices } from './services/DashboardServices'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/lib/redux/store';
import { IconArrowLeftDashed, IconArrowNarrowDownDashed, IconArrowsTransferUpDown, IconCircleDashedNumber0, IconFileInvoiceFilled, IconHistoryToggle, IconProgressCheck } from "@tabler/icons-react";
import { TransactionStatus } from '@/app/lib/enum/transactionStatus';
import LowStockChild from './components/childs/LowStockChild';
import SlowMovingStock from './components/childs/SlowMovingStock';
import RecentTransactions from './components/childs/RecentTransactions';


const DashboardBody = () => {
    const dispatch = useDispatch();
    const dashboardService = new DashboardServices();

    const { dailySummary, yesterSummary, transactionStatus } = useSelector((state: RootState) => state.dashboarSlice);

    const { netTotal, totalValSales, expenses, } = dailySummary;

    let successful = 0;
    let refunded = 0;
    let voids = 0;

    transactionStatus.forEach(s => {
        if (s.status === TransactionStatus.COMPLETED) {
            successful += 1;
        } else if (s.status === TransactionStatus.REFUND) {
            refunded += 1;
        } else {
            voids += 1;
        }
    })


    useEffect(() => {
        dashboardService.fetchDailySummary(dispatch);
    }, []);

    return (
        <div className='w-full h-full bg-[var(--main-bg-secondary)] rounded-[8px] flex flex-col p-5 gap-5 overflow-auto'>

            <div className='flex w-full gap-5'>

                {/** 
                 * GROSS SALES
                 * TAX SALES
                 * PROFIT
                 */}
                <div className='flex flex-3/4 flex-col gap-5'>
                    <div className='flex w-full gap-5'>
                        <DashboardSummaryTile
                            title="Revenue"
                            currentValue={netTotal}
                            pastValue={yesterSummary.netTotal}
                            icon={
                                <IconFileInvoiceFilled />
                            } />

                        <DashboardSummaryTile
                            title='Tax Sales'
                            currentValue={totalValSales}
                            icon={<i className="ri-government-fill text-[1.4rem]"></i>}
                        />

                        <DashboardSummaryTile
                            title='Monetary Profit'
                            currentValue={netTotal - totalValSales}
                            pastValue={yesterSummary.netTotal - yesterSummary.totalValSales}
                            icon={<i className="text-[1.4rem] ri-money-dollar-circle-fill"></i>}
                        />

                    </div>

                    {/** chart */}
                    <DashboardChart />
                </div>


                <div className='flex flex-1/4 flex-col gap-5'>
                    <DashboardSummaryTile
                        title="Expenses"
                        pastValue={expenses}
                        icon={<i className="text-[1.3rem] ri-receipt-fill"></i>}
                        currentValue={expenses}
                    />

                    <DashboardSummaryTile
                        isCurrency={false}
                        currentValue={successful}
                        icon={<IconProgressCheck />}
                        showPerformanceIndicator={false}
                        accentColor='to-green-500/20'
                        title='Successful Transactions'
                    />
                    <DashboardSummaryTile
                        isCurrency={false}
                        currentValue={voids}
                        icon={<IconCircleDashedNumber0 />}
                        showPerformanceIndicator={false}
                        accentColor='to-red-500/20'
                        title='Void Transactions'
                    />
                    <DashboardSummaryTile
                        isCurrency={false}
                        currentValue={refunded}
                        icon={<IconArrowLeftDashed />}
                        showPerformanceIndicator={false}
                        accentColor='to-orange-500/20'
                        title='Refunded Transactions'
                    />
                </div>
            </div>

            <div className='w-full flex gap-5'>
                <DashboardTransactionAndStockSummary
                    icon={<IconArrowNarrowDownDashed />}
                    title='Low Stock Products'
                    child={<LowStockChild />}
                />
                <DashboardTransactionAndStockSummary
                    icon={<IconArrowsTransferUpDown className='h-[1.1rem]' />}
                    title='Slow Moving Products'
                    child={<SlowMovingStock />}
                />
                <DashboardTransactionAndStockSummary
                    icon={<IconHistoryToggle className='h-[1.3rem]'
                    />}
                    title='Recent Transactions'
                    child={<RecentTransactions />}
                />
            </div>
        </div>
    )
}

export default DashboardBody
