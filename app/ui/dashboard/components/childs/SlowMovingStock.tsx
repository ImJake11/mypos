import { dashboardSetProductsSummary, ProductSummaryProp } from '@/app/lib/redux/slice/dashboardSlice';
import { RootState } from '@/app/lib/redux/store';
import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const SlowMovingStock = () => {

  const dispatch = useDispatch();

  const { slowMovingProducts } = useSelector((state: RootState) => state.dashboarSlice);

  useEffect(() => {
    const fecthData = async () => {
      try {
        const res = await fetch("/api/dashboard/daily-transaction-summary/product-summary", {
          method: "GET"
        });

        if (!res.ok) {
          throw new Error("Server Error");
        }

        const { slowProducts, lowStocks } = await res.json();

        dispatch(dashboardSetProductsSummary({
          lowStockProducts: lowStocks,
          slowProducts,
        }));

      } catch (e) {
        throw new Error('Failed to fetch');
      }
    }

    fecthData();

  }, []);
  return (
    <div className='w-full h-full flex flex-col gap-2 pt-3 overflow-auto'>
      {slowMovingProducts.map((product, i) => <Tile key={product.id} data={product} />)}
    </div>
  )
}

function Tile({
  data
}: { data: ProductSummaryProp }) {

  const soldDate = new Date(data.lastSoldDate ?? '');
  const displayDate = soldDate.toLocaleDateString('en-US', { dateStyle: "long" })

  return (
    <motion.div className='text-gray-500 w-full flex gap-2.5 items-center p-2 rounded-[4px] bg-gray-100/40'
    >
      <div className='w-[2.5rem] h-[2.5rem] rounded-full bg-gray-200 overflow-hidden'>
        <img src={data.url} alt="i" className='w-full h-full object-contain' />
      </div>
      <span className='flex-1 flex flex-col'>
        <span>{data.name}</span>
        <span className='text-[.6rem] text-gray-400'>{soldDate ? displayDate : "No record"}</span>
      </span>
    </motion.div>
  )
}

export default SlowMovingStock
