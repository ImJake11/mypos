"use client";

import React, { useState } from 'react'
import monthsName from '../../data/MonthsList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toggleDatePicker, updateNewProductState, updatePromotionalDiscount } from '../../redux/newProductSlice';
import { NewProductKeys, PromotionalDiscountKeys } from '../../constants/NewProductKeys';
import { NewProductProps, PromotionalDiscountProp } from '../../models/newProductModel';

interface DateProp {
    month: number,
    day: number,
    year: number,
}
const DatePicker = () => {

    const dispatch = useDispatch();

    const { isDatePickerOpen } = useSelector((state: RootState) => state.newProductSlice);

    const today = new Date();

    const [date, setDate] = useState<DateProp>({
        day: today.getDate(),
        month: today.getMonth(),
        year: today.getFullYear(),
    });

    const months = 12; // number of months
    const days = getDaysInMonth(date.year, date.month); // number of days
    const yearLength = 20; // number of years available in the date picker example, 2025 to 2045


    const handleSave = () => {

        const joinedDates = `${date.month}-${date.day}-${date.year}`

        const name = PromotionalDiscountKeys.expirationDate as keyof PromotionalDiscountProp;

        dispatch(updatePromotionalDiscount({ name: name, data: joinedDates }));
        dispatch(toggleDatePicker())
    }

    const handleDateUpdate = (name: string, data: any) => {

        if (name === "month") {
            const monthIndex = monthsName.indexOf(data);

            setDate({ ...date, [name]: monthIndex });
        } else if (name === "day") {

            const modifiedData = data - 1;

            setDate({ ...date, [name]: modifiedData });
        } else {
            setDate({ ...date, [name]: data })
        }

    }

    if (!isDatePickerOpen) return null;



    return (
        <div className='w-screen h-screen absolute grid place-content-center backdrop-blur-[2px]'
            style={{
                backgroundColor: "rgb(0, 0, 0, .8)"
            }}
        >

            <div className=' w-[500px] h-[70vh] rounded-[11px] flex flex-col
                            md:w-[40vw] p-[20px_25px]'
                style={{
                    backgroundColor: "var(--background)"
                }}
            >

                <span className='text-[1.5rem] italic font-semibold'>Pick Date</span>
                {/** header */}
                <div className='flex w-full mt-2.5'>
                    {header("Month")}
                    {header("Day")}
                    {header("Year")}
                </div>
                {/** data */}
                <div className='flex-1 flex overflow-hidden'>
                    {/** month */}
                    <ul className='flex-1 overflow-y-auto scrollbar-hide'>
                        {Array.from({ length: months }).map((d, i) => <Tile key={i} isSelected={date.month === i} value={monthsName[i]} name='month' onClick={handleDateUpdate} />)}
                    </ul>
                    {/** days */}
                    <ul className='flex-1 overflow-y-auto scrollbar-hide'>
                        {Array.from({ length: days }).map((d, i) => <Tile key={i} isSelected={date.day === i} value={i + 1} name='day' onClick={handleDateUpdate} />)}
                    </ul>

                    {/** years */}
                    <ul className='flex-1 overflow-y-auto scrollbar-hide'>
                        {Array.from({ length: yearLength }).map((_, i) => <Tile key={i} isSelected={date.year === today.getFullYear() + i} value={today.getFullYear() + i} name='year' onClick={handleDateUpdate} />)}
                    </ul>
                </div>

                <div className='flex justify-end gap-3 mt-6'>
                    <button className='border border-gray-400 rounded-[7px] p-[10px_15px]' onClick={() => {
                        dispatch(toggleDatePicker());
                    }}>Cancel</button>
                    <button className='linear-bg-40 rounded-[7px]  p-[10px_15px]' onClick={handleSave}>Save</button>
                </div>
            </div>

        </div>
    )
}

interface TileProp {
    name: string,
    value: any,
    isSelected: boolean,
    onClick: (name: string, data: number) => void,

}
function Tile({ isSelected, value, onClick, name }: TileProp) {
    return <div className={`cursor-pointer w-full h-[3rem] ${isSelected ? "linear-bg-40" : "no-linear-bg"}  grid place-content-center`}
    style={{
        border: "solid 1px var(--secondary-background)"
    }}
        onClick={() => onClick(name, value)}
    >
        <span>{value}</span></div>
}

const header = (name: string) => <div className='flex-1 border  grid place-content-center h-[3rem]  italic font-semibold'
style={{
    border: "solid 2px var(--secondary-foreground)"
}}
>
    <span>{name}</span>
</div>

const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
};

export default DatePicker
