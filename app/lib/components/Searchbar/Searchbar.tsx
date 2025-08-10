'use client';

import { IconEdit, IconEditCircle, IconSearch } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react'
import CircularLoadingIndicator from '../CircularLoadingIndicator';
import { useDispatch } from 'react-redux';
import { openToas } from '../../redux/slice/toastSlice';
import ToasEnum from '../../enum/toastEnum';
import { inventoryToggleProductView } from '../../redux/slice/inventorySlice';
import Link from 'next/link';
import { posSelectProduct } from '../../redux/slice/posSlice';
import { useWindowSize } from '../../utils/hooks/useGetWindowSize';

const Searchbar = ({
    context,
    showEditIcon,
}: {
    context: "inventory" | "pos",
    showEditIcon: boolean,
}) => {
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [noResult, setNoResult] = useState(false);
    const [searchResult, setSearchResult] = useState<{
        name: string,
        id: string
    }[]>([]);

    const dispatch = useDispatch();

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {

        const handleFocus = () => setIsFocused(true);
        const handleLostFocus = () => setIsFocused(false);

        const reference = inputRef.current;
        if (!reference) return;

        reference.addEventListener('focus', handleFocus);
        reference.addEventListener('blur', handleLostFocus)

        return () => {
            if (!reference) return;
            reference.removeEventListener('focus', handleFocus);
            reference.removeEventListener('blue', handleFocus);
        }
    }, []);


    const handleNameSelect = (id: string) => {
        if (context === "inventory") {
            dispatch(inventoryToggleProductView({
                id,
                isOpen: true,
            }))
        } else {
            dispatch(posSelectProduct(id));
        }
    }

    useEffect(() => {
        const search = async () => {

            if (!query) return;

            try {
                setNoResult(false);
                setIsLoading(true);

                const res = await fetch(`/api/product/search?query=${query}`, { method: "GET" });

                if (!res.ok) {
                    dispatch(openToas({
                        message: "Something went wrong",
                        type: ToasEnum.ERROR,
                    }))
                }

                const { results } = await res.json();

                setSearchResult(results);

            } catch (e) {
                dispatch(openToas({
                    message: "Something went wrong",
                    type: ToasEnum.ERROR,
                }))

            } finally {
                setIsLoading(false);
            }
        }

        // debounce
        const timeout = setTimeout(() => {
            search();
        }, 2000);

        return () => clearTimeout(timeout);
    }, [query]);


    return (
        <div className='w-fit h-fit relative'>
            <input ref={inputRef} value={query} placeholder='Search Product' type="text" className={`w-[90vw] md:w-[30rem] h-[2.3rem] border border-gray-300 dark:border-gray-500 bg-gray-100 dark:bg-[var(--main-bg-tertiary-dark)] rounded-[8px] pl-10 p-1 outline-0 focus:border-[var(--color-brand-primary)] focus:border-[2px]`}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const { value } = e.target;
                    setQuery(value);
                }}
            />

            <IconSearch size={18} className='stroke-gray-400 dark:stroke-gray-300 absolute left-2 top-1/2 -translate-y-1/2' />

            <AnimatePresence>
                {isFocused && <motion.div className='absolute top-[3rem] rounded-[8px] z-[1] max-h-[15rem] w-full bg-white dark:bg-[var(--main-bg-primary-dark)] shadow-[1px_1px_5px_rgb(0,0,0,.4)] flex flex-col gap-1 overflow-auto'
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                    exit={{
                        opacity: 0
                    }}
                >
                    {
                        isLoading ? <div className='flex w-full justify-center gap-2 h-[2rem] items-center p-2'>
                            <CircularLoadingIndicator size={18} borderWidth={1} />
                            <span className='text-gray-500'>Getting Results</span>
                        </div> :
                            searchResult.map((result, i) => <motion.div key={i} className='p-[0px_10px] w-full min-h-[2rem] cursor-pointer flex justify-between hover:text-[var(--color-brand-primary)] items-center'>
                                <span
                                    onClick={() => handleNameSelect(result.id)}
                                >{result.name}</span>

                                {showEditIcon && <Link href={`/ui/inventory/product-form?product-id=${result.id}`}> <IconEdit size={18} className='stroke-gray-400' /></Link>}
                            </motion.div>)}
                </motion.div>}
            </AnimatePresence>

        </div>
    )

}

export default Searchbar
