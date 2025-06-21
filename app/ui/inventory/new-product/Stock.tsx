"use client"

import TextInputField from '@/app/lib/components/TextInputField'
import { NewProductKeys } from '@/app/lib/constants/NewProductKeys'
import { NewProductProps } from '@/app/lib/models/newProductModel'
import { updateNewProductState } from '@/app/lib/redux/newProductSlice'
import { RootState } from '@/app/lib/redux/store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from './components/ErrorMessage'

const Stock = () => {

    const dispatch = useDispatch();

    const newProductSlice = useSelector((state: RootState) => state.newProductSlice);

    const { stock, lowStock, variants } = newProductSlice.data;

    const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;

        const convertedAsKey = name as keyof NewProductProps;

        const isNan = isNaN(Number(value));

        if (isNan) return;

        dispatch(updateNewProductState({ name: convertedAsKey, data: Number(value) }));

    }

    // update stock value
    useEffect(() => {

        const total = variants.reduce((prev, variant) => {

            return prev + variant.stock;
        }, 0);

        const name = NewProductKeys.stock as keyof NewProductProps;

        dispatch(updateNewProductState({ name, data: total }));
    }, [variants]);

    return (
        <div className='flex flex-col w-full gap-3  p-[20px_10px] rounded-[7px]'
        style={{
            backgroundColor: "var(--background)"
        }}
        >
            {/** error messages */}
            <div className='w-full flex'>
                <div className='flex-1'><ErrorMessage isShow={!stock} message='Current Stock is required' /></div>
                <div className='flex-1 pl-17'><ErrorMessage isShow={!lowStock || lowStock >= stock} message='Low Stock is required and cannot be higher than Stock' /></div>
            </div>
            <div className='w-full flex gap-2'>
                <div className='flex-1 flex flex-col gap-2'>
                    <span className='italic font-semibold '>Stock in units</span>
                    <div className='w-full h-[3rem] border border-gray-400 rounded-[7px] p-2'>
                        {stock}
                    </div>

                </div>
                <span className='text-[1.5rem] text-gray-700 font-semibold translate-y-[2.5rem] m-[0_20px]'>{">"}</span>
                <div className='flex-1'>
                    <TextInputField value={String(lowStock)} isNumeric={true} label='Low Stock Treshold' name={NewProductKeys.lowStock} onChange={handleText} placeholder='Low Stock Treshold' />
                </div>
            </div>
        </div>
    )
}

export default Stock
