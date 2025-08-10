'use client'

import ToasEnum from '@/app/lib/enum/toastEnum';
import { CategoryModel } from '@/app/lib/models/categoryModel';
import { openToas } from '@/app/lib/redux/slice/toastSlice';
import { useSocketEvent } from '@/app/lib/utils/hooks/useSocket';
import { generateImageStringUrl } from '@/app/lib/utils/services/convertImageFileToString';
import Image from 'next/image';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux';
import { CategoryServices } from './CategoryServices';
import { fetchAllCategory } from '@/app/lib/utils/data/fetchCategories';
import { CategoryTile, LoadingState } from './components/CategoriesComponents';
import CategoryAppbar from './components/CategoryAppbar';
import { IconChecks, IconUpload } from '@tabler/icons-react';


const initialState = {
    content: "",
    id: "",
    imageId: "",
    url: undefined,
}

const CategoriesBody = () => {

    const dispatch = useDispatch();

    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryData, setCategoryData] = useState<CategoryModel>(initialState) // for edit


    const categoryServices = useMemo(() => {
        return new CategoryServices({
            categoryData
        })
    }, [categoryData]);

    const handleUpdate = (data: CategoryModel) => {
        setIsLoading(true);

        setCategoryData(data);

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }

    const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        generateImageStringUrl({
            dispatch, file: file,
        }).then((dataUrl: string) => {
            setCategoryData({
                ...categoryData, url: dataUrl
            });

        }).catch(() => {
            setCategoryData({
                ...categoryData, url: undefined,
            });
        })
    }

    const categoryEventHandler = useCallback((eventData: { payload: CategoryModel, type: string }) => {
        const { type, payload } = eventData;
        if (type === "CREATE") {
            setCategories(prev => [...prev, payload]);
        }
        else if (type === "UPDATE") {
            setCategories(prev => prev.map(cat => cat.id === payload.id ? { ...cat, ...payload } : cat));
        }
    }, []);


    useSocketEvent("category_event", categoryEventHandler);

    useEffect(() => {

        const fetchData = async () => {

            try {
                setIsLoading(true);

                const data = await fetchAllCategory();

                setCategories(data);

            } catch (e) {

                throw new Error('Failed to get categories');
            } finally {
                setIsLoading(false)
            }
        }

        fetchData();

    }, []);

    return (
        <div className='flex-1 bg-[var(--main-bg-primary)] dark:bg-[var(--main-bg-primary-dark)] flex flex-col gap-2'>
            <CategoryAppbar />
            {/** body */}
            {isLoading ? <LoadingState /> :

                <div className='flex-1 flex flex-col rounded-[12px] p-5'>

                    <div className={`w-full flex gap-3 flex-col md:flex-row`}>

                        {/** image container */}
                        <div className='w-[7rem] h-[7rem] rounded-[7px] relative overflow-hidden border-gray-300 dark:border-gray-500 border bg-gray-100 dark:bg-[var(--main-bg-secondary-dark)]'>
                            {categoryData.url && <img src={categoryData.url} alt="category image" className=' w-full h-full object-cover absolute' loading='lazy' />}

                            <input type="file" accept='image/**' className='h-full w-full opacity-0 absolute'
                                onChange={handleImageInput}
                            />

                            <IconUpload size={35} className='stroke-gray-400 absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-[2rem]' />

                            <span className='text-gray-400 absolute left-0 text-center bottom-[2rem] w-full'>Upload Image</span>
                        </div>


                        <div className='flex flex-col gap-2 justify-end flex-1'>
                            <span>Category name</span>
                            <div className='flex justify-between gap-2'>
                                {/** input */}
                                <input type="text" value={categoryData.content} className={`border border-gray-300 dark:border-gray-500 rounded-[4px] focus:outline-[var(--color-brand-primary)] p-2 h-[2.5rem]
                                w-full md:w-[35rem]`} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const { value } = e.target;

                                        setCategoryData({
                                            ...categoryData, content: value,
                                        });
                                    }} />
                                {/** save button */}
                                <button className='h-[2.5rem] w-[7rem] rounded-[4px] button-primary-gradient flex gap-2 justify-center text-white items-center' onClick={() => {
                                    categoryServices.handleSave({
                                        onError: () => { },
                                        onLoading: (isLoading) => setIsLoading(isLoading),
                                        onSuccess: () => {
                                            setCategoryData(initialState);
                                            dispatch(openToas({
                                                message: "Category saved succesfully",
                                                type: ToasEnum.SUCCESS,
                                            }))
                                        },
                                    });
                                }}>
                                    <IconChecks size={20} stroke={"white"} />
                                    <span>Save</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='h-[2rem]' />
                    {/** current categories */}
                    {categories.length <= 0 ? <NoDataState /> : <ul className='flex-1 overflow-auto flex flex-col gap-4'>
                        {categories.map(data => <CategoryTile key={data.id} data={data} onUpdate={() => handleUpdate(data)} />)}
                    </ul>}
                </div>}
        </div>
    )
}

function NoDataState() {
    return <div className='flex-1 grid place-content-center rounded-[12px]'>
        <div className='flex flex-col gap-3'>
            <Image alt='image' src={"/no-data-found.png"} width={100} height={100} />
            <span>No data found</span>
        </div>
    </div>
}



export default CategoriesBody
