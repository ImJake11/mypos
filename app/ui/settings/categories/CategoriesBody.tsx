'use client'

import CircularLoadingIndicator from '@/app/lib/components/CircularLoadingIndicator';
import ToasEnum from '@/app/lib/enum/toastEnum';
import CategoriesIcon from '@/app/lib/icons/CategoriesIcon'
import { CategoryModel } from '@/app/lib/models/categoryModel';
import { openToas } from '@/app/lib/redux/toastSlice';
import { useSocketEvent } from '@/app/lib/utils/hooks/useSocket';
import { generateImageStringUrl } from '@/app/lib/utils/services/convertImageFileToString';
import Image from 'next/image';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux';
import { CategoryServices } from './CategoryServices';
import { fetchAllCategory } from '@/app/lib/utils/data/fetchCategories';


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
        <div className='flex-1 bg-[var(--main-bg-secondary-dark)] p-3 flex flex-col gap-2'>


            {/** appbar */}
            <div className='min-h-[4rem] w-full bg-[var(--main-bg-primary-dark)] rounded-[12px] place-content-end p-3'>
                <span className='flex gap-3 items-center text-[1.3rem]'><CategoriesIcon size={24} />Manage categories</span>
            </div>

            {/** body */}
            {isLoading ? <LoadingState /> : <div className='flex-1 flex flex-col rounded-[12px] bg-[var(--main-bg-primary-dark)] p-5'>

                <div className='w-full flex gap-5'>

                    {/** image container */}
                    <div className='w-[7rem] h-[7rem] rounded-[7px] bg-[var(--main-bg-secondary-dark)] relative overflow-hidden'>
                        {categoryData.url && <img src={categoryData.url} alt="category image" className=' w-full h-full object-cover absolute' />}
                        <input type="file" accept='image/**' className='h-full w-full opacity-0 absolute'
                            onChange={handleImageInput}
                        />
                    </div>


                    <div className='flex flex-col gap-2 justify-end flex-1'>
                        <span>Category name</span>
                        <div className='flex gap-3'>
                            {/** input */}
                            <input type="text" value={categoryData.content} className='tf-attr p-2 flex-1 h-[3rem]' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const { value } = e.target;

                                setCategoryData({
                                    ...categoryData, content: value,
                                });
                            }} />
                            {/** save button */}
                            <button className='h-[3rem] w-[7rem] rounded-[8px] button-primary-gradient' onClick={() => {
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
                            }}>Save</button>
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

function LoadingState() {
    return <div className='flex-1 grid place-content-center bg-[var(--main-bg-primary-dark)] rounded-[12px]'>
        <CircularLoadingIndicator size={56} />
    </div>
}

function NoDataState() {
    return <div className='flex-1 grid place-content-center rounded-[12px]'>
        <div className='flex flex-col gap-3'>
            <Image alt='image' src={"/no-data-found.png"} width={100} height={100} />
            <span>No data found</span>
        </div>
    </div>
}

function CategoryTile({ data, onUpdate }: {
    data: CategoryModel,
    onUpdate: () => void,
}) {
    return <div className='flex w-full min-h-[3rem] gap-3 items-center'>
        <div className='w-[3rem] h-[3rem] rounded-[4px] bg-[var(--main-bg-secondary-dark)] overflow-hidden'>
            {data.url && <img src={data.url} alt="image" />}
        </div>
        <span className='flex-1'>{data.content}</span>
        <button className='w-[7rem] h-[3rem] rounded-[var(--button-border-radius)] button-primary-gradient'
            onClick={onUpdate}
        >Update</button>
        <button className='w-[7rem] h-[3rem] rounded-[var(--button-border-radius)] button-primary-gradient-error'>Archive</button>
    </div>
}
export default CategoriesBody
