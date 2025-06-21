"use client";

import ToasEnum from '@/app/lib/enum/toastEnum';
import { toggleCategoryTab } from '@/app/lib/redux/newProductSlice';
import { RootState } from '@/app/lib/redux/store';
import { openToas } from '@/app/lib/redux/toastSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const NewCategoryTab = () => {

    const dispatch = useDispatch();

    const [category, setCategory] = useState<string>("");
    const [isUpdate, setIsUpdate] = useState(false);

    const { showCategoryTab, updateCategory } = useSelector((state: RootState) => state.newProductSlice);

    const handleSave = async () => {

        if (!isUpdate) {

            const res = await fetch("/api/category", {
                method: "POST",
                body: JSON.stringify({
                    content: category,
                })
            });

            if (!res.ok) return;

            dispatch(openToas({ message: "Category Added", type: ToasEnum.SUCCESS }));

        } else {
            const res = await fetch("/api/category", {
                method: "PUT",
                body: JSON.stringify({
                    content: category,
                    id: updateCategory.id,
                })
            });

            if (!res.ok) return;

            dispatch(openToas({ message: "Category Updated", type: ToasEnum.SUCCESS }))
        }

        setCategory("")
        dispatch(toggleCategoryTab());
    }

    // if [updateCategory] is not empty means category tas is on update mode
    useEffect(() => {
        if (updateCategory.id) {
            setCategory(updateCategory.content);
            setIsUpdate(true);
        }
    }, [updateCategory]);

    if (!showCategoryTab) return null;

    return (
        <div className='w-screen h-screen absolute backdrop-blur-[2px]'
            style={{
                backgroundColor: "rgba(0,0,0, .8)"
            }}
        >
            <div className='absolute flex p-[20px_15px] flex-col w-[90vw] gap-3.5 h-fit rounded-[7px] right-3 bottom-3 md:w-[40vw]'
            style={{
                backgroundColor: "var(--background)",
                border: "solid 1px var(--primary)"
            }}
            >

                <span className='italic font-semibold '>New Category</span>

                <input type="text" value={category} className='border border-[var(--primary)] rounded-[7px] h-[3rem] p-3'
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {

                        if (e.key === "Enter") {
                            handleSave()
                        }

                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const { value } = e.target;

                        setCategory(value);
                    }}
                />

                <div className='flex w-full justify-end gap-2.5'>
                    <button className='w-[6rem] h-[3rem] rounded-[7px] '
                    style={{
                        border: "solid 1px var(--foreground)"
                    }}
                        onClick={() => dispatch(toggleCategoryTab())}
                    >Cancel</button>
                    <button className='linear-bg-40 w-[6rem] h-[3rem] rounded-[7px] ' onClick={handleSave} >Save</button>
                </div>
            </div>
        </div>
    )
}

export default NewCategoryTab
