
import React from 'react'
import DashboardSummaryTile from './components/DashboardSummaryTile'
import DashboardChart from './components/DashboardChart'
import DashboardTransactionAndStockSummary from './components/DashboardTransactionAndStockSummary'

const DashboardBody = () => {
    return (
        <div className='w-full h-full bg-[var(--main-bg-secondary)] rounded-[8px] flex flex-col p-5 gap-5 overflow-auto'>

            <div className='flex w-full gap-5'>

                <div className='flex flex-3/4 flex-col gap-5'>
                    {/** today summaries */}
                    <div className='flex w-full gap-5'>
                        <DashboardSummaryTile />
                        <DashboardSummaryTile />
                        <DashboardSummaryTile />
                    </div>

                    {/** chart */}
                    <DashboardChart />
                </div>


                <div className='flex flex-1/4 flex-col gap-5'>
                    <DashboardSummaryTile />
                    <DashboardSummaryTile />
                    <DashboardSummaryTile />
                    <DashboardSummaryTile />
                </div>
            </div>

            <div className='w-full flex gap-5'>
                <DashboardTransactionAndStockSummary />
                <DashboardTransactionAndStockSummary />
                <DashboardTransactionAndStockSummary />
            </div>
        </div>
    )
}

export default DashboardBody
