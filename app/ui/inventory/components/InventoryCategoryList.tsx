"use client";

import { FilterKeys } from '@/app/lib/constants/FilterKeys';
import { CategoryModel } from '@/app/lib/models/categoryModel'
import { FilterModel } from '@/app/lib/models/filterModel';
import { setFilterData } from '@/app/lib/redux/inventorySlice';
import { RootState } from '@/app/lib/redux/store';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { motion } from "framer-motion";

const CategoriesList = ({
    data,
    isDynamic, // this will prevent categories to hide if some filter values are gived by user
}:
    { data: CategoryModel[], isDynamic: boolean }) => {

    const dispatch = useDispatch();

    const { categoryID, maxPrice, maxStock, minPrice, minStock, withBulkPricing, withDiscount } = useSelector((state: RootState) => state.inventorySlice.filterData);

    const handleChangeCategory = (id: string) => {
        dispatch(setFilterData({
            name: FilterKeys.categoryID as keyof FilterModel,
            data: id,
        }));
    }


    return (
        <motion.div className='flex w-full h-[4rem] gap-1.5 items-center p-[0_10px] overflow-x-auto bg-[var(--background)]'
        >
            <ButtonTile isSelected={!categoryID} onClick={() => handleChangeCategory("")} />
            {data.map((cat, i) => <ButtonTile key={cat.id} data={cat} isSelected={categoryID === cat.id}
                onClick={() => handleChangeCategory(cat.id)}
            />)}
        </motion.div>
    )
}

interface ButtonProp {
    data?: CategoryModel,
    isSelected: boolean,
    onClick: () => void
}


function ButtonTile({ data, isSelected, onClick }: ButtonProp) {
    return <div className={`w-fit h-fit p-[8px_10px] flex gap-2 items-center rounded-[7px] ${isSelected ? "button-primary-gradient" : " button-primary-no-gradient"} text-nowrap whitespace-nowrap`}
        style={{
            border: "solid var(--primary) 1px",
        }}
        onClick={onClick}
    >
        <div className='w-[1.2rem] h-[1.2rem] rounded-full border border-[var(--foreground)] grid place-content-center text-[.8rem]'>
            C
        </div>
        {data?.content ? data?.content : "All"}
    </div>
}
export default CategoriesList
