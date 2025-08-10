'use client';

import { AnnualChartModel } from '@/app/lib/models/AnnualChartModel';
import { AnnualTransactionModel } from '@/app/lib/models/annualTransactionModel';
import { dashboardSetAnnualTransactionData, dashboarSetChartData } from '@/app/lib/redux/slice/dashboardSlice';
import { RootState } from '@/app/lib/redux/store';
import { useWindowSize } from '@/app/lib/utils/hooks/useGetWindowSize';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


const DashboardChart = () => {
  const dispatch = useDispatch();
  const theme = localStorage.getItem("theme") ?? "dark";

  const isDark = theme === "dark";

  const { annualChartData } = useSelector((state: RootState) => state.dashboarSlice);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const convertToMonthlyData = (data: AnnualTransactionModel[]) => {

    let chartData: AnnualChartModel[] = [
      { data: 0, month: "Jan" },
      { data: 0, month: "Feb" },
      { data: 0, month: "Mar" },
      { data: 0, month: "Apr" },
      { data: 0, month: "May" },
      { data: 0, month: "Jun" },
      { data: 0, month: "Jul" },
      { data: 0, month: "Aug" },
      { data: 0, month: "Sep" },
      { data: 0, month: "Oct" },
      { data: 0, month: "Nov" },
      { data: 0, month: "Dec" },
    ];

    data.forEach((t, i) => {

      const date = new Date(t.date);

      const month = date.getMonth();

      chartData[month].data += Number(t._sum.netTotal);
    })
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


  const child = (
    <BarChart
      className='translate-y-5'
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
          <stop offset="85%" stopColor="var(--color-brand-secondary)" stopOpacity={.8} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0} />

      <Bar dataKey="data" fill='url(#data)' radius={5} opacity={.4} activeBar={{
        opacity: 1,
      }} />

      <XAxis dataKey="month" className='text-black dark:text-white' tick={(props) => {  // Custom tick renderer
        const { x, y, payload } = props;
        const isHovered = hoveredIndex === annualChartData.findIndex(item => item.month === payload.value);
        return (
          <g transform={`translate(${x},${y})`}>
            <text
              x={0}
              y={0}
              dy={16}
              textAnchor="middle"
              className={`${isHovered ? "fill-[var(--color-brand-primary)]" : "fill-gray-500 dark:fill-white"} text-[.7rem] `}

              fontWeight={isHovered ? "bold" : "normal"}
            >
              {payload.value}
            </text>
          </g>
        );
      }} />

      <YAxis dataKey="data" className='w-auto stroke-0 text-[.6rem] md:text-[.6rem]'
        tickFormatter={(value) => toShortNumber(value)}
      />

      <Tooltip animationDuration={340}
        formatter={(value, name) => [
          `${Number(value).toLocaleString('en-US', { style: "currency", currency: "PHP" })}`
        ]}
        contentStyle={{
          borderRadius: "12px",
          border: "solid var(--color-brand-primary) 1px",
          backgroundColor: isDark ? "var(--main-bg-primary-dark)" : "var(--main-bg-primary)"
        }}
        cursor={{
          stroke: "var(--color-brand-primary)",
          strokeWidth: 2,
          opacity: .0,
          strokeDasharray: "5 5",
        }}
      />
    </BarChart>
  )


  return (
    <div className={`flex-3/4 bg-[var(--main-bg-primary)] dark:bg-[var(--main-bg-primary-dark)] rounded-[8px] shadow-[0px_1px_5px_rgb(0,0,0,.2)] relative min-h-[16rem] max-w-[calc(100vw*0.95)] sm:max-w-[calc(100vw*0.93)] md:"max-w-[calc(100vw*0.95)] lg:min-h-[74%]`}
    >
      <ResponsiveContainer children={child} width="100%" height="100%" className="p-[2rem_1rem] box-border" />

      {/** title */}
      <span className='absolute text-[.9rem] left-4 top-2 flex flex-col'>
        <span>Annual Net Sales Total</span>
        <span className='text-[.7rem] text-green-600 font-[600]'>+ 3.4 %</span>
      </span>
    </div>
  )
}

function toShortNumber(num: number) {

  if (num >= 1000) {
    return "₱" + (num / 1000) + "k";
  }

  return num.toLocaleString("en-US", { currency: "PHP", style: "currency" });
}

export default DashboardChart;