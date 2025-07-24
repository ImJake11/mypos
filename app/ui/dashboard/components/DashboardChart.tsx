'use client';

import { AnnualChartModel } from '@/app/lib/models/AnnualChartModel';
import { AnnualTransactionModel } from '@/app/lib/models/annualTransactionModel';
import { dashboardSetAnnualTransactionData, dashboarSetChartData } from '@/app/lib/redux/slice/dashboardSlice';
import { RootState } from '@/app/lib/redux/store';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";


const DashboardChart = () => {
  const dispatch = useDispatch();

  const { annualChartData } = useSelector((state: RootState) => state.dashboarSlice);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const convertToMonthlyData = (data: AnnualTransactionModel[]) => {

    let chartData: AnnualChartModel[] = [
      { data: 0, month: "January" },
      { data: 0, month: "February" },
      { data: 0, month: "March" },
      { data: 0, month: "April" },
      { data: 0, month: "May" },
      { data: 0, month: "June" },
      { data: 0, month: "July" },
      { data: 0, month: "August" },
      { data: 0, month: "September" },
      { data: 0, month: "October" },
      { data: 0, month: "November" },
      { data: 0, month: "December" },
    ];

    data.forEach((t, i) => {

      const date = new Date(t.date);

      const month = date.getMonth();

      chartData[month].data += Number(t._sum.netTotal);
    })

    console.log(chartData);

    dispatch(dashboarSetChartData(chartData))
  }

  useEffect(() => {
    const fetchData = async () => {

      try {

        const res = await fetch("/api/dashboard/annual-transactions", {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("Failed to get data")
        }

        const { transactions } = await res.json();

        dispatch(dashboardSetAnnualTransactionData(transactions));

        convertToMonthlyData(transactions);
      } catch (e) {
        console.log("Failed to get annual transactions");
        throw new Error("Failed to get data");
      }

    }

    fetchData();
  }, []);


  return (
    <div className='flex-3/4 max-h-[21rem] bg-[var(--main-bg-primary)] rounded-[8px] shadow-[0px_1px_5px_rgb(0,0,0,.2)] grid place-content-center relative'>

      <AreaChart width={800} height={230}
        style={{
          transform: "translateX(-1%) translateY(13%)",
        }}
        data={annualChartData}
        onMouseLeave={() => setHoveredIndex(null)}
        onMouseMove={(e) => {
          if (e.activeTooltipIndex) {
            setHoveredIndex(Number(e.activeTooltipIndex));
          }
        }}
      >
        <defs>
          <linearGradient id="data" x1="0" y1="0" x2="0" y2="1">
            <stop offset="25%" stopColor="var(--color-brand-primary)" stopOpacity={0.8} />
            <stop offset="85%" stopColor="var(--color-brand-secondary)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0} />

        <Area fill='url(#data)' fillOpacity={1} dataKey="data" stroke='var(--color-brand-primary)' type="linear" dot={{
          r: 5,
          fill: "var(--color-brand-primary)",
          stroke: "var(--main-bg-secondary)",
          strokeWidth: 2,
        }} />


        {/** x-axis */}
        <XAxis dataKey="month" strokeOpacity={0} fontSize={10} tick={(props) => {  // Custom tick renderer
          const { x, y, payload } = props;
          const isHovered = hoveredIndex === annualChartData.findIndex(item => item.month === payload.value);
          return (
            <g transform={`translate(${x},${y})`}>
              <text
                x={0}
                y={0}
                dy={16}
                textAnchor="middle"
                className={`${isHovered ? "fill-[var(--color-brand-primary)]" : "fill-gray-500 dark:fill-black"} text-[.7rem]`}

                fontWeight={isHovered ? "bold" : "normal"}
              >
                {payload.value}
              </text>
            </g>
          );
        }} />

        {/** y-axis */}
        <YAxis dataKey="data" width="auto" strokeOpacity={0} fontSize={10} />

        <Tooltip animationDuration={340}
          formatter={(value, name) => [
            `${Number(value).toLocaleString('en-US', { style: "currency", currency: "PHP" })}`
          ]}
          cursor={{
            stroke: "var(--color-brand-primary)",
            strokeWidth: 2,
            opacity: .7,
            strokeDasharray: "5 5",
          }}
        />
      </AreaChart>

      {/** title */}
      <span className='absolute text-[.9rem] left-4 top-2 flex flex-col'>
        <span>Annual Net Sales Total</span>
        <span className='text-[.7rem] text-green-600 font-[600]'>+ 3.4 %</span>
      </span>
    </div>
  )
}



export default DashboardChart;