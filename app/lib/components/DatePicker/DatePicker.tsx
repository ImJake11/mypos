"use client";

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from "framer-motion";
import { RootState } from '../../redux/store';
import monthsName from '../../constants/MonthsList';
import { datePickerSave, datePickerToggleVisibility } from '../../redux/slice/datePickerSlice';
import { useWindowSize } from '../../utils/hooks/useGetWindowSize';

interface DateProp {
    month: number,
    day: number,
    year: number,
}
const DatePicker = () => {

    const dispatch = useDispatch();

    const { isVisible, context } = useSelector((state: RootState) => state.datePickerSlice);

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
        const { day, month, year } = date;
        const isoDate = new Date(year, month, day).toISOString();

        console.log(isoDate);

        dispatch(datePickerSave({
            context: context,
            payload: isoDate,
        }));
    }

    const handleDateUpdate = (name: string, data: any) => {

        if (name === "month") {
            const monthIndex = monthsName.indexOf(data);

            setDate({ ...date, [name]: monthIndex });
        } else if (name === "day") {

            const modifiedData = data;

            setDate({ ...date, [name]: modifiedData });
        } else {
            setDate({ ...date, [name]: data })
        }
    }

    const { width } = useWindowSize();

    const isMobile = width < 576;

    return (
        <AnimatePresence>
            {isVisible && <motion.div className='w-full h-full absolute bg-black/20 backdrop-blur-[3px] grid place-content-center'
                initial={{
                    opacity: 0
                }}

                animate={{
                    opacity: 1,
                }}

                exit={{
                    opacity: 0
                }}>
                <motion.div className={`rounded-[11px] flex flex-col p-[20px_25px] bg-[var(--main-bg-primary)]
                ${isMobile ? "w-[90vw] h-[50vh]" : "w-[500px] h-[500px]"}
                `}
                >
                    <span className='italic font-semibold'>Pick Date</span>
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
                            {Array.from({ length: days }).map((d, i) => <Tile key={i} isSelected={date.day === i + 1} value={i + 1} name='day' onClick={handleDateUpdate} />)}
                        </ul>

                        {/** years */}
                        <ul className='flex-1 overflow-y-auto scrollbar-hide'>
                            {Array.from({ length: yearLength }).map((_, i) => <Tile key={i} isSelected={date.year === today.getFullYear() + i} value={today.getFullYear() + i} name='year' onClick={handleDateUpdate} />)}
                        </ul>
                    </div>

                    <div className='flex justify-end gap-3 mt-6'>
                        <button className='border border-gray-400 rounded-[4px] p-[10px_15px]' onClick={() => {
                            dispatch(datePickerToggleVisibility(null))
                        }}>Cancel</button>
                        <button className='bg-[var(--color-brand-primary)] rounded-[4px] p-[10px_15px] text-white' onClick={handleSave}>Save</button>
                    </div>
                </motion.div>
            </motion.div>}
        </AnimatePresence>
    )
}

interface TileProp {
    name: string,
    value: any,
    isSelected: boolean,
    onClick: (name: string, data: number) => void,

}
function Tile({ isSelected, value, onClick, name }: TileProp) {
    return <div className={`cursor-pointer w-full h-[2rem] grid place-content-center rounded-[4px] ${isSelected ? "bg-[var(--color-brand-primary)] text-white" : "bg-white"}`}
        onClick={() => onClick(name, value)}
    >
        <span>{value}</span></div>
}

const header = (name: string) => <div className='flex-1 border grid place-content-center h-[3rem] bg-[var(--main-bg-secondary-dark)] italic font-semibold'
    style={{
        border: "solid 2px var(--main-bg-primary-dark)"
    }}
>
    <span>{name}</span>
</div>

const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
};

export default DatePicker
