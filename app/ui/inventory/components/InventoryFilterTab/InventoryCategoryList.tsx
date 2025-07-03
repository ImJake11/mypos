"use client";

import { FilterKeys } from '@/app/lib/constants/FilterKeys';
import { CategoryModel } from '@/app/lib/models/categoryModel'
import { FilterModel } from '@/app/lib/models/filterModel';
import { inventorySetFilterData } from '@/app/lib/redux/inventorySlice';
import { RootState } from '@/app/lib/redux/store';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { motion } from "framer-motion";
import { fetchAllCategory } from '@/app/lib/utils/api/cateogry/categoryFetching';

const CategoriesList = () => {

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [categories, setCategories] = useState<CategoryModel[]>([]);

    const { categoryID, maxPrice, maxStock, minPrice, minStock, withBulkPricing, withDiscount } = useSelector((state: RootState) => state.inventorySlice.filterData);

    const handleChangeCategory = (id: string) => {
        dispatch(inventorySetFilterData({
            name: FilterKeys.categoryID as keyof FilterModel,
            data: id,
        }));
    }

    useEffect(() => {

        const fetch = async () => {

            try {

                setIsLoading(true);

                const res = await fetchAllCategory();

                setCategories(res);

                setIsLoading(false);

            } catch (e) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }

        fetch();

    }, []);

    return (
        <motion.div className='flex w-full h-[4rem] gap-1.5 items-center p-[0_10px] overflow-x-auto bg-[var(--background)]'
        >
            <ButtonTile isSelected={!categoryID} onClick={() => handleChangeCategory("")} />
            {!isLoading ? categories.map((cat, i) => <ButtonTile key={cat.id} data={cat} isSelected={categoryID === cat.id}
                onClick={() => handleChangeCategory(cat.id)}
            />) : Array.from({ length: 10 }).map((_, i) => <LoadingTile key={i} />)}
        </motion.div>
    )
}

interface ButtonProp {
    data?: CategoryModel,
    isSelected: boolean,
    onClick: () => void
}

function ButtonTile({ data, isSelected, onClick }: ButtonProp) {
    return <div className={`w-fit h-fit p-[8px_10px] flex gap-2 items-center rounded-[7px] ${isSelected ? "button-primary-gradient" : "main-background-gradient"} text-nowrap whitespace-nowrap`}
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

function LoadingTile() {
    return <div className='min-w-[5rem] h-[3rem] rounded-[4px] bg-[var(--main-bg-secondary-dark)]'></div>
}
export default CategoriesList
