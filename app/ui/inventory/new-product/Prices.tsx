'use client';

import TextInputField from '@/app/lib/components/TextInputField'
import React, { useEffect, useMemo, useState } from 'react'
import ErrorMessage from './components/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import { addBulkTire, toggleAutoComputeSellingPrice, togglePromotionalDiscount, updateNewProductState } from '@/app/lib/redux/newProductSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import BulkTable from './BulkTable';
import PromotionalDiscount from './PromotionalDiscount';
import { NewProductProps } from '@/app/lib/models/newProductModel';
import { NewProductKeys } from '@/app/lib/constants/NewProductKeys';

const Prices = () => {

    const dispatch = useDispatch<AppDispatch>();

    const newProductSlice = useSelector((state: RootState) => state.newProductSlice);

    const { sellingPrice, costPrice, tax, bulkEnabled, promotionalDiscount, } = newProductSlice.data;




    const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const convertedAsKey = name as keyof NewProductProps;

        const isNan = isNaN(Number(value));

        if (isNan) return;

        dispatch(updateNewProductState({ name: convertedAsKey, data: Number(value) }))
    }


    // auto computes selling price if its enable
    useEffect(() => {

        if (newProductSlice.isAutoComputeSellingPrice) {

            const name = NewProductKeys.sellingPrice as keyof NewProductProps;

            // convert tax to decimal
            const convertedTax = tax / 100;
            // comput selling price
            const total = costPrice * (1 + convertedTax);

            dispatch(updateNewProductState({ name, data: total }))
        }
    }, [costPrice, tax, newProductSlice.isAutoComputeSellingPrice]);


    return <div className='flex w-full flex-col gap-3 p-[20px_10px] rounded-[11px]'
        style={{
            backgroundColor: "var(--background)"
        }}>
        {/** auto compute selling price toggle toggle */}
        <div className='flex gap-1.5'><span>Auto Compute Selling Price</span>
            <CheckBox isChecked={newProductSlice.isAutoComputeSellingPrice} onClick={() => dispatch(toggleAutoComputeSellingPrice())} />
        </div>

        {/** error messages */}
        <div className='w-full flex'>
            <div className='flex-1'><ErrorMessage isShow={!costPrice} message='Cost price is required' /></div>
            <div className='flex-1'><ErrorMessage isShow={!sellingPrice} message='Tax is required' /></div>
            <div className='flex-1'><ErrorMessage isShow={!tax} message='Selling price is required' /></div>
        </div>
        <div className='w-full flex gap-2.5'>
            <div className='flex-1'>
                <TextInputField value={costPrice.toString()} isNumeric={true} label='Cost Price' name='costPrice' onChange={handleText} placeholder='Cost Price' /></div>
            <div className='flex-1'>
                <TextInputField value={tax.toString()} isNumeric={true} label='Tax Rate' name='tax' maxLenght={3} onChange={handleText} placeholder='Tax Rate' /></div>
            <div className='flex-1'>
                <TextInputField value={sellingPrice.toString()} isNumeric={true} label='Selling Price' name='sellingPrice' onChange={handleText} placeholder='Selling Price' />
            </div>
        </div>

        {/** advance pricing */}
        <span className='font-semibold italic mt-1.5'>Advance Pricing</span>

        {/** bulk discount toggle */}
        <div className='flex gap-1.5'><span>Bulk Discounts</span><CheckBox isChecked={bulkEnabled} onClick={() => dispatch(updateNewProductState({ name: "bulkEnabled", data: !bulkEnabled }))} /></div>

        {bulkEnabled && <BulkTable data={newProductSlice.data} />}
        {/** tier button */}
        {bulkEnabled && <button className='bg-[var(--primary)] p-[10px_15px] rounded-[7px] text-white w-[8rem]' onClick={() => dispatch(addBulkTire())}>Add tier</button>}


        {/** promotional discount */}
        <div className='flex gap-1.5'><span>Promotional Discount</span><CheckBox isChecked={newProductSlice.promotionalEnabled} onClick={() => dispatch(togglePromotionalDiscount())} /></div>
        {/** show only if promotional discount is enabled */}
        {newProductSlice.promotionalEnabled && <PromotionalDiscount data={promotionalDiscount} dispatch={dispatch} />}
    </div>
}



interface CheckboxProps {
    isChecked: boolean
    onClick: () => void,
}

function CheckBox({ isChecked, onClick }: CheckboxProps) {
    return <div
        className={`grid place-content-center h-[1.5rem] w-[1.5rem] rounded-[3px] `}
        style={{
            backgroundColor: isChecked? "var(--primary)" : "var(--foreground)"
        }}
        onClick={onClick}
    >
        <FontAwesomeIcon icon={faCheck}  />
    </div>
}

export default Prices
