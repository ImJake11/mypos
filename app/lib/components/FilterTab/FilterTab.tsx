'use client';

import CategoriesList from './FilterTabCategoryList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import { FilterModel } from '@/app/lib/models/filterModel';
import { motion } from "framer-motion";
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { filterResetData, filterToggleFilterTab, filterUpdateData } from '@/app/lib/redux/slice/filterSlice';
import { InventoryAction } from '@/app/lib/redux/utils/enums/inventoryActionEnums';
import {
    createdActionInventoryClearFilters,
    createdActionInventoryFiltering
} from '@/app/lib/redux/slice/inventorySlice';
import { PosActionEnum } from '../../redux/utils/enums/posActionEnum';
import { createdActionPosClearFilter, createdActionPosFiltering } from '../../redux/slice/posSlice';
import { FilterKeys } from '../../constants/FilterKeys';
import { useWindowSize } from '../../utils/hooks/useGetWindowSize';

interface Prop {
    onPrimaryButtonContext: string,  // onPrimaryButtonContext that is uses for middleware listener
    onClearFilterContext: string,
}

const FilterTab = ({ onPrimaryButtonContext, onClearFilterContext }: Prop) => {

    const dispatch = useDispatch<AppDispatch>();

    const { filterData, isVisible } = useSelector((state: RootState) => state.filterSlice);

    const { name,
        maxPrice,
        minPrice,
        maxStock,
        minStock,
        withDiscount,
        withBulkPricing,
        categoryID } = filterData;


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;

        const convertedKeys = name as keyof FilterModel;

        const isExpectedNumberVal = name === FilterKeys.maxPrice ||
            name === FilterKeys.minPrice ||
            name === FilterKeys.maxStock ||
            name === FilterKeys.minStock;

        if (isExpectedNumberVal) {

            const isNan = isNaN(Number(value));

            if (isNan) return;

            dispatch(filterUpdateData({ data: value, name: convertedKeys }));
            return;
        }
        dispatch(filterUpdateData({ data: value, name: convertedKeys }));
    }

    const handleCheckboxes = (name: string,) => {

        const convertedKey = name as keyof FilterModel;

        const data = filterData[convertedKey];

        // if use unchecked it, instead of false we set just undefined so it cannot be passed to search parameters
        dispatch(filterUpdateData({ name: convertedKey, data: !data }));
    }

    const checkFilterData = (): boolean => {

        if (name || maxPrice
            || minPrice || maxStock
            || minStock || withBulkPricing
            || withDiscount || categoryID) {
            return true;
        } else {
            return false;
        }
    }


    const handleFilter = () => {

        // inventory filter data
        if (onPrimaryButtonContext === InventoryAction.INVENTORY_FILTER_DATA) {
            dispatch(createdActionInventoryFiltering({
                context: onPrimaryButtonContext,
                payload: filterData,
            }))
        }

        // pos
        if (onPrimaryButtonContext === PosActionEnum.POS_FILTER_DATA) {
            dispatch(createdActionPosFiltering({
                context: onPrimaryButtonContext,
                payload: filterData,
            }))
        }
    }

    const handleClearFilter = () => {

        dispatch(filterResetData());

        // inventory clear data
        if (onClearFilterContext === InventoryAction.INVENTORY_CLEAR_FILTER_DATA) {
            dispatch(createdActionInventoryClearFilters({
                context: onClearFilterContext,
                payload: null,
            }));
        }

        // pos clear filter data
        if (onClearFilterContext === PosActionEnum.POST_CLEAR_FILTER_DATA) {
            dispatch(createdActionPosClearFilter({
                context: onClearFilterContext,
                payload: null,
            }))
        }
    }

    return (
        <AnimatePresence>
            {isVisible &&
                <motion.div
                    className='w-screen h-screen absolute bg-black/70'
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                    }}
                >
                    <motion.div className={`absolute right-0 bg-[var(--main-bg-primary)] flex flex-col h-full w-[85vw] p-5 sm:w-[60vw] md:w-[60vw] lg:w-[35vw]`}
                        initial={{
                            x: "100%",
                        }}
                        animate={{
                            x: "0%"
                        }}
                        exit={{
                            x: "100%",
                        }}
                        transition={{
                            delay: .2,
                            duration: .2,
                            ease: "linear"
                        }}
                    >
                        <span className='italic font-semibold flex items-center w-full justify-between'>
                            Product Filter

                            {/** close icon */}
                            <div className='w-[1.5rem] h-[1.5rem] rounded-[4px] grid place-content-center border border-[var(--foreground)]'>
                                <FontAwesomeIcon icon={faClose} onClick={() => dispatch(filterToggleFilterTab(false))} />
                            </div>
                        </span>
                        <div className='min-h-[1.5rem]' />
                        <CategoriesList />
                        <div className='min-h-[1.5rem]' />
                        <div className='flex-1 flex flex-col overflow-y-auto scrollbar-hide'>
                            <div className='min-h-[2rem]' />
                            <TextInput label='Product name' name={FilterKeys.name} onChange={handleChange} showDesign={true} value={name ?? ""} />
                            <div className='min-h-[3rem]' />
                            {/** stock */}
                            <TextInput value={String(minStock)} label='Min Stock' name={FilterKeys.minStock} onChange={handleChange} showDesign={true} />
                            <div className='min-h-[4rem] border-dashed w-[1px] border-gray-300 border place-self-end -translate-x-[2rem]'></div>
                            <TextInput value={String(maxStock)} label='Max Stock' name={FilterKeys.maxStock} onChange={handleChange} showDesign={true} />


                            <div className='min-h-[3rem]' />
                            {/** pricing */}
                            <TextInput value={String(minPrice)} label='Min Price' name={FilterKeys.minPrice} onChange={handleChange} showDesign={true} />
                            <div className='min-h-[4rem] border-dashed w-[1px] border-gray-300 border place-self-end -translate-x-[2rem]'></div>
                            <TextInput value={String(maxPrice)} label='Max Price' name={FilterKeys.maxPrice} onChange={handleChange} showDesign={true} />


                            <div className='min-h-[2rem]' />
                            {/** promotional discount */}
                            <CheckBoxes isChecked={withDiscount ?? false} label='With Promotional Discount' onClick={() => handleCheckboxes(FilterKeys.withDiscount)} />
                            <div className='min-h-[.5rem]' />
                            {/** with bulk pricings */}
                            <CheckBoxes isChecked={withBulkPricing ?? false} label='With Bulk Pricing' onClick={() => handleCheckboxes(FilterKeys.withBulkPricing)} />
                            <div className='min-h-[3rem]' />
                            {/** actions */}
                            <div className='w-full flex gap-2 justify-end text-white'>
                                {/** clear filter */}
                                <button className='w-fit h-[2.5rem] rounded-[8px] button-primary-gradient p-[0_15px]'
                                    onClick={handleClearFilter}
                                >
                                    Clear All
                                </button>
                                {/** filter button */}
                                <button className={`${checkFilterData() ? "button-primary-gradient" : "button-primary-disabled-gradient"} h-[2.5rem] w-fit p-[0px_15px] rounded-[8px]`}
                                    onClick={handleFilter}>Filter Products</button>
                            </div>
                        </div>

                    </motion.div>
                </motion.div>}
        </AnimatePresence>
    )
}

interface CheckBoxesProp {
    isChecked: boolean,
    label: string,
    onClick: () => void,
}

function CheckBoxes({ isChecked, label, onClick }: CheckBoxesProp) {
    return <div className='flex w-full  gap-2.5'>
        <div className={`w-[1rem] h-[1rem] rounded-[3px] grid place-content-center ${isChecked ? "bg-[var(--color-brand-primary)]" : "bg-gray-300"} text-white`}
            onClick={onClick}
        >
            {isChecked && <FontAwesomeIcon icon={faCheck} />}
        </div>
        <label>{label}</label>
    </div>
}

interface InputProp {
    label: string,
    name: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    showDesign: boolean,
    value?: string,
}


function TextInput({ label, name, onChange, showDesign, value }: InputProp) {

    return <div className='relative '>

        <div className='flex w-full items-center pr-1'>
            {showDesign && <>
                <div className='w-[1rem] h-[1rem] bg-gray-300 rounded-[2px]' />
                <div className='w-[1rem] h-[1px] border border-gray-300 border-dashed' />
            </>}
            <input type="text" name={name} value={value === "undefined" ? "" : value} className='border border-gray-300 focus:outline-[var(--color-brand-primary)] rounded-[8px] flex-1 h-[2.5rem] p-3'
                onChange={onChange}
            />
        </div>
        <label className='absolute -top-[1.8rem] left-[2rem]'>{label}</label>
    </div>
}

export default FilterTab
