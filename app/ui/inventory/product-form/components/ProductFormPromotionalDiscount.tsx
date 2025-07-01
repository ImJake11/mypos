"use client"

import { PromotionalDiscountKeys } from '@/app/lib/constants/ProductKeys';
import monthsName from '@/app/lib/data/MonthsList';
import { PromotionalDiscountProp } from '@/app/lib/models/productModel';
import { updatePromotionalDiscount, toggleDatePicker } from '@/app/lib/redux/productSlice';
import { AppDispatch } from '@/app/lib/redux/store';
import React from 'react'


interface Props {
    data: PromotionalDiscountProp,
    dispatch: AppDispatch,
}
const PromotionalDiscount = ({ data, dispatch }: Props) => {

    const { description, discountRate, expirationDate } = data;


    function convertExpirationDate(): string { // this will convert expiration date to more readable, example February 24, 2001

        // check if expiration date is not empty
        if (!expirationDate) return "";
        // get expiration date parts
        const parts = expirationDate.split("-");

        const [m, d, y] = parts;

        // conver [m] to number bec [parts] is a string[] so we can retrieve month name depends on index
        const convertedM = monthsName[Number(m)];

        return `${convertedM} ${Number(d) + 1}, ${y}`;
    }


    const headers = (title: string) => <span className='flex-1 text-center p-[10px_0]'
        style={{
            border: "solid 1px var(--tertiary)"
        }}
    >{title}</span>


    return (
        <div className='flex flex-col w-full'>
            {/** headers */}
            <div className='flex w-full'>
                {headers("Description")}
                {headers("Discount Rate (%)")}
                {headers("Expiration Date")}
            </div>
            {/** body */}
            <div className='flex w-full mt-2 gap-1'>
                {/** description */}
                <div className='flex-1'>
                    <textarea name={PromotionalDiscountKeys.description}
                        maxLength={200}
                        value={description}
                        className='tf-attr w-full h-[3rem] min-h-[3rem] max-h-[8rem] p-2'
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            const { name, value } = e.target;

                            const convertedAsKey = name as keyof PromotionalDiscountProp;

                            dispatch(updatePromotionalDiscount({ name: convertedAsKey, data: value }))
                        }}

                    ></textarea>
                </div>

                {/** discount */}
                <div className='flex-1'>
                    <input type="text" maxLength={3} value={discountRate} name={PromotionalDiscountKeys.discountRate}
                        className='tf-attr w-full max-h-[3rem] min-h-[3rem] p-2'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const { name, value } = e.target;

                            const convertedAsKey = name as keyof PromotionalDiscountProp;

                            // check input if number
                            const isNan = isNaN(Number(value));

                            if (isNan) return;

                            dispatch(updatePromotionalDiscount({ name: convertedAsKey, data: Number(value) }))
                        }}
                    />
                </div>
                {/** date picker */}
                <div className='flex-1 flex max-h-[3rem] min-h-[3rem]'>
                    {/** means show only this component if the function is not empty */}
                    {convertExpirationDate() && <div className='flex-1 grid place-content-center'><span>{convertExpirationDate()}</span></div>}
                    <button className='button-primary-gradient flex-1 rounded-[7px]'
                        onClick={() => dispatch(toggleDatePicker())}
                    >Pick Date</button>
                </div>
            </div>

        </div>
    )
}


export default PromotionalDiscount
