"use client";

import { NewProductKeys } from '@/app/lib/constants/NewProductKeys';
import ToasEnum from '@/app/lib/enum/toastEnum';
import { CategoryModel } from '@/app/lib/models/categoryModel';
import { NewProductProps } from '@/app/lib/models/newProductModel';
import { toggleCategoryTab, updateNewProductState } from '@/app/lib/redux/newProductSlice';
import { RootState } from '@/app/lib/redux/store';
import { openToas } from '@/app/lib/redux/toastSlice';
import { faAdd, faCircleExclamation, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import io from "socket.io-client";

interface ButtonTileProp {
    id: string,
    isSelected: boolean,
    content: string,
}


const Category = () => {

    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [mainData, setData] = useState<CategoryModel[]>([]);
    const [iserror, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    let socket: typeof Socket;

    const { categoryID } = useSelector((state: RootState) => state.newProductSlice.data);

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

            const { data } = await res.json();

            setData(data);
            setIsLoading(false)
        }

        fetchData();

    }, []);


    // listen to web socket changes 
    useEffect(() => {
        socket = io(String(process.env.NEXT_PUBLIC_SOCKET_URL));

        socket.on("connection", () => {
            console.log("Connected to web socket");
        });

        socket.on("added_category", (newData: CategoryModel) => {
            setData(prev => [...prev, newData])

        })

        socket.on("updated_category", (updatedData: CategoryModel) => {
            setData(prev => prev.map(d => d.id === updatedData.id ? { ...d, ...updatedData } : d));
        });

        socket.on("disconnect", () => {
            console.log("Disconnected to web socket")
        });

        return () => {
            socket.disconnect()
        }
    }, []);


    function ButtonTile({ content, id, isSelected }: ButtonTileProp) {

        return (
            <div className={`flex w-full pr-2 justify-center items-center`}
            style={{
                backgroundColor: isSelected? "var(--secondary-background)" : "var(--background)"
            }}
            >
                <button key={id} className='w-full min-h-[3rem] flex items-center p-[0_15px] '
                    onClick={() => {

                        const name = NewProductKeys.categoryID as keyof NewProductProps;

                        dispatch(updateNewProductState({ name, data: id }));

                        setTimeout(() => {
                            setIsOpen(false)
                        }, 800);
                    }}
                ><span>{content}</span>
                </button>
                <FontAwesomeIcon icon={faEdit} className='text-gray-500'
                    onClick={() => dispatch(toggleCategoryTab({ content: content, id: String(id) }))}
                />
            </div>
        )
    }

    function ReturnBody() {

        if (!iserror) {

            if (mainData.length <= 0) {
                return <div className='w-full grid place-content-center'><span className='text-gray-700 italic mt-3'>No items found</span></div>
            }
            return mainData.map((d, i) => <ButtonTile key={d.id} content={d.content} id={d.id} isSelected={categoryID === d.id} />)
        } else {
            return <div className='w-full flex justify-center items-center gap-3 mt-3 text-red-400'>
                <span >{errorMessage}</span>
                <FontAwesomeIcon icon={faCircleExclamation} />
            </div>
        }
    }


    return (
        <div className='flex flex-col gap-1.5 h-fit max-h-[20rem] w-full overflow-hidden'>
            <div className='flex justify-between w-full min-h-[3rem] border-[var(--primary)] border rounded-[7px] items-center p-[0px_10px]'
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
                <button className='linear-bg-40 flex w-full min-h-[3rem]  items-center gap-3 p-3.5'
                    onClick={() => dispatch(toggleCategoryTab())}
                >
                    <span className='font-semibold italic'>Create New</span><FontAwesomeIcon icon={faAdd} />
                </button>

                {isLoading ? <span className='w-full italic font-semibold text-center'></span> : <ReturnBody />}
            </ul>}
        </div>
    )
}


export default Category
