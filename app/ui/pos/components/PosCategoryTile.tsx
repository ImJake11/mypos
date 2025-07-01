'use client';

import { CategoryModel } from '@/app/lib/models/categoryModel'
import "remixicon/fonts/remixicon.css";
import React from 'react'
import { useDispatch } from 'react-redux';
import { posSelectCategoryID } from '@/app/lib/redux/posSlice';

interface Prop {
    data?: CategoryModel,
    isSelected: boolean,
}
const CategoryTile = ({ data, isSelected }: Prop) => {

    const dispatch = useDispatch();

    return (
        <div className={`
        min-w-[9rem] max-w-[9rem] h-full bg-[var(--main-bg-primary-dark)] rounded-[7px] border-[2px] ${isSelected ? "border-[var(--color-brand-primary)]" : "border-[var(--main-bg-primary-dark)]"} overflow-hidden p-2 flex flex-col
         items-center gap-3
        `}
            style={{
                boxShadow: isSelected?  "0 0 5px var(--color-brand-primary)": undefined
            }}
            onClick={() => {
                dispatch(posSelectCategoryID(data ? data.id : ""))
            }}
        >
            <div className="bg-[var(--main-bg-secondary-dark)] min-h-[60%] max-h-[60%] w-full overflow-hidden grid rounded-[7px]">
                {data?.url ? <img src={data.url} alt='img' className='w-full h-full object-cover' /> :
                    <i className="ri-image-line text-[2rem] place-self-center" />}
            </div>

            <span className='text-[.8rem] text-center'>{data?.content ? data?.content : "All"}</span>
        </div>
    )
}

export default CategoryTile
