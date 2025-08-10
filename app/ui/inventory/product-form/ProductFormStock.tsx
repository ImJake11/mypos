"use client"

import TextInputField from '@/app/ui/inventory/product-form/components/ProductFormTextInputField'

import { ProductProps } from '@/app/lib/models/productModel'
import { formUpdateState } from '@/app/lib/redux/slice/productSlice'
import { RootState } from '@/app/lib/redux/store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from './components/ProductFormErrorMessage'
import { ProductKeys } from '@/app/lib/constants/ProductKeys'
import { IconMathGreater } from '@tabler/icons-react'
import ProductFormCard from './components/ProductFormCard'

const Stock = () => {

    const dispatch = useDispatch();

    const newProductSlice = useSelector((state: RootState) => state.productSlice);

    const { stock, lowStock, variants } = newProductSlice.data;

    const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;

        const convertedAsKey = name as keyof ProductProps;

        const isNan = isNaN(Number(value));

        if (isNan) return;

        dispatch(formUpdateState({ name: convertedAsKey, data: Number(value) }));

    }

    // update stock value
    useEffect(() => {

        const total = variants.reduce((prev, variant) => {

            return prev + variant.stock;
        }, 0);

        const name = ProductKeys.stock as keyof ProductProps;

        dispatch(formUpdateState({ name, data: total }));
    }, [variants]);


    return (
        <ProductFormCard>
            <div className='flex flex-col w-full gap-3 p-[var(--form-section-padding)] rounded-[var(--form-section-border-radius)]'
            >
                <div className={`w-full flex gap-2 flex-col md:flex-row md:items-center`}>
                    <div className='flex-1 flex flex-col'>
                        <ErrorMessage isShow={!stock} message='Current Stock is required' />
                        <span className={`italic font-semibold mb-2`}>Stock in units</span>
                        <div className={`w-full h-[2.5rem] border border-gray-300 rounded-[4px] p-2`}>
                            {stock}
                        </div>

                    </div>
                    <div className='flex-1'>
                        <ErrorMessage isShow={!lowStock || lowStock >= stock} message='Low Stock is required and cannot be higher than Stock' />
                        <TextInputField value={String(lowStock)} isNumeric={true} label='Low Stock Treshold' name={ProductKeys.lowStock} onChange={handleText} placeholder='Low Stock Treshold' />
                    </div>
                </div>
            </div>
        </ProductFormCard>
    )
}

export default Stock
