"use client";

import { CategoryModel } from '@/app/lib/models/categoryModel'
import { FilterModel } from '@/app/lib/models/filterModel';
import { RootState } from '@/app/lib/redux/store';
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from "framer-motion";
import { fetchAllCategory } from '@/app/lib/utils/data/fetchCategories';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { filterUpdateData } from '@/app/lib/redux/slice/filterSlice';
import { FilterKeys } from '../../constants/FilterKeys';

const CategoriesList = () => {

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const { categoryID } = useSelector((state: RootState) => state.filterSlice.filterData);

    const categoryPreview: string = categories.find(prev => prev.id === categoryID)?.content ?? "All";

    const displayList: CategoryModel[] = useMemo(() => {
        return searchQuery && categories.length > 0 ? categories.filter(prev => prev.content.toLowerCase().includes(searchQuery.toLowerCase())) : categories
    }, [searchQuery, categories]);

    const handleChangeCategory = (id: string) => {
        dispatch(filterUpdateData({
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
        <div className='flex w-full flex-col gap-2 mt-4'>

            {/** category */}
            <div className='relative '>

                {/** category preview container */}
                <div className='flex w-full items-center pr-1'
                    onClick={() => {
                        setSearchQuery("");
                        setIsOpen(!isOpen);
                    }}
                >
                    <div className='w-[1rem] h-[1rem] bg-gray-300  rounded-[2px]' />
                    <div className='w-[1rem] h-[1px] border border-gray-300 border-dashed' />
                    <div className='w-full h-[2.5rem] border-[2px] border-gray-300 flex items-center rounded-[8px] p-2'>
                        {categoryPreview}
                    </div>
                </div>

                {/** dropdown icon */}
                <motion.div className='absolute right-4 bottom-3'
                    animate={{
                        rotate: isOpen ? "180deg" : "0deg"
                    }}
                >
                    <FontAwesomeIcon icon={faCaretDown} />
                </motion.div>
                <label className='absolute -top-[1.8rem] left-[2rem]'>Category</label>
            </div>

            {/** input */}
            <AnimatePresence>
                {isOpen && <motion.input type="text" className='border border-gray-300 outline-0 focus:border-[var(--color-brand-primary)] rounded-[8px] h-[2.5rem] ml-[2rem] p-2 mr-1' placeholder='Search category' value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const { value } = e.target;

                        setSearchQuery(value);
                    }}
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0
                    }}
                />}
            </AnimatePresence>

            {/** options */}
            <AnimatePresence>
                {isOpen && <motion.div className='flex w-full h-fit max-h-[20rem] flex-col gap-1.5 items-center pl-[2rem] overflow-x-auto'
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0
                    }}
                >
                    <ButtonTile isSelected={!categoryID} onClick={() => handleChangeCategory("")} />
                    {!isLoading ? <AnimatePresence>
                        {displayList.map((cat) => <ButtonTile key={cat.id} data={cat} isSelected={categoryID === cat.id}
                            onClick={() => handleChangeCategory(cat.id)}
                        />)}
                    </AnimatePresence> : Array.from({ length: 10 }).map((_, i) => <LoadingTile key={i} />)}
                </motion.div>}
            </AnimatePresence>
        </div>
    )
}

interface ButtonProp {
    data?: CategoryModel,
    isSelected: boolean,
    onClick: () => void
}

function ButtonTile({ data, isSelected, onClick }: ButtonProp) {
    return <motion.div className={`w-full min-h-[2.5rem] px-2.5 flex gap-2 items-center rounded-[7px] ${isSelected ? "bg-[var(--color-brand-primary)]" : "bg-gray-200 dark:bg-[var(--main-bg-secondary-dark)]"} text-nowrap whitespace-nowrap ${isSelected ? "text-white" : "text-black dark:text-white"}`}
        style={{
            border: "solid var(--primary) 1px",
        }}
        onClick={onClick}

        initial={{
            opacity: 0,
        }}
        animate={{
            opacity: 1,
        }}
        exit={{
            opacity: 0,
            x: "-100%"
        }}
    >
        {data && <div className='w-[1.5rem] h-[1.5rem] rounded-full border border-[var(--foreground)] grid place-content-center text-[.8rem] overflow-hidden'>
            {data?.url && <img src={data.url} alt="c" />}
        </div>}
        {data?.content ? data?.content : "All"}
    </motion.div>
}

function LoadingTile() {
    return <div className='w-full min-h-[3rem] rounded-[4px] bg-[var(--main-bg-secondary)]'></div>
}
export default CategoriesList
