"use client";

import { ProductKeys } from '@/app/lib/constants/ProductKeys';
import { CategoryModel } from '@/app/lib/models/categoryModel';
import { ProductProps } from '@/app/lib/models/productModel';
import { formToggleCategoryTab, formUpdateState } from '@/app/lib/redux/productSlice';
import { RootState } from '@/app/lib/redux/store';
import { useSocketEvent } from '@/app/lib/utils/hooks/useSocket';
import { faAdd, faCircleExclamation, faEdit, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

interface ButtonTileProp {
    isSelected: boolean,
    data: CategoryModel,
    onClose: () => void,


}


const Category = () => {

    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [mainData, setData] = useState<CategoryModel[]>([]);
    const [iserror, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const { categoryID } = useSelector((state: RootState) => state.productSlice.data);

    const categoryPreview = mainData.find(data => data.id === categoryID);


    // fetch categories 
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/category", {
                method: "GET"
            });

            if (!res.ok) {

                setError(true);
                setErrorMessage("Something went wrong");
                setIsLoading(false)
                return;
            }

            const { categoryData } = await res.json();
            console.log(categoryData);
            setData(categoryData);
            setIsLoading(false)
        }

        fetchData();

    }, []);

    const categoryEventHandler = useCallback((eventData: { payload: CategoryModel, type: string }) => {
        const { type, payload } = eventData;
        if (type === "CREATE") {
            setData(prev => [...prev, payload]);
        }
        else if (type === "UPDATE") {
            setData(prev => prev.map(cat => cat.id === payload.id ? { ...cat, ...payload } : cat));
        }
    }, []);


    useSocketEvent("category_event", categoryEventHandler);


    function ReturnBody() {

        if (!iserror) {

            if (mainData.length <= 0) {
                return <div className='w-full grid place-content-center'><span className='text-gray-700 italic mt-3'>No items found</span></div>
            }
            return mainData.map((d, i) => <ButtonTile key={d.id} data={d} isSelected={categoryID === d.id}
                onClose={() => setIsOpen(false)}
            />)
        } else {
            return <div className='w-full flex justify-center items-center gap-3 mt-3 text-red-400'>
                <span >{errorMessage}</span>
                <FontAwesomeIcon icon={faCircleExclamation} />
            </div>
        }
    }


    return (
        <div className='flex flex-col gap-1.5 h-fit max-h-[20rem] w-full overflow-hidden'>
            <div className='flex justify-between w-full min-h-[3rem] border-[var(--color-brand-primary)] border rounded-[7px] items-center p-[0px_10px]'
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                <span>{categoryPreview ? categoryPreview.content : <>Select Category</>}</span>
                <i className="ri-arrow-down-s-fill text-[1.5rem] text-gray-700"></i>
            </div>

            {/** options */}
            {isOpen && <ul className='flex-col flex items-start overflow-auto rounded-[7px]'>

                {/** create button */}
                <button className='button-primary-gradient flex w-full min-h-[3rem]  items-center gap-3 p-3.5'
                    onClick={() => dispatch(formToggleCategoryTab(null))}
                >
                    <span className='font-semibold italic'>Create </span><FontAwesomeIcon icon={faAdd} />
                </button>

                {isLoading ? <span className='w-full italic font-semibold text-center'></span> : <ReturnBody />}
            </ul>}
        </div>
    )
}


// --- components ---
function ButtonTile({ isSelected, data, onClose }: ButtonTileProp) {

    const dispatch = useDispatch();

    return (
        <div className={`flex w-full pr-2 justify-center items-center`}
            style={{
                backgroundColor: isSelected ? "var(--main-bg-secondary-dark)" : "var(--main-bg-primary-dark)"
            }}
        >
            <button key={data.id} className='w-full h-fit flex items-center p-[5px_15px] gap-2'
                onClick={() => {

                    const name = ProductKeys.categoryID as keyof ProductProps;

                    dispatch(formUpdateState({ name, data: data.id }));

                    onClose()
                }}
            >
                <div className='h-[3rem] w-[3rem] rounded-[5px] bg-[var(--tertiary)] overflow-hidden grid'>
                    {data.url ? <img src={data.url} alt='' className='h-full w-full' /> : <FontAwesomeIcon icon={faImage} className='place-self-center' />}
                </div>
                <span>{data.content}</span>
            </button>
            <FontAwesomeIcon icon={faEdit} className='text-gray-500'
                onClick={() => dispatch(formToggleCategoryTab(data))}
            />
        </div>
    )
}


export default Category
