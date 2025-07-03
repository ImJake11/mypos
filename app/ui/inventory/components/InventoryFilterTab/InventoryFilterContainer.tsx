'use client';

import { FilterKeys } from '@/app/lib/constants/FilterKeys'
import CategoriesList from './InventoryCategoryList';
import { CategoryModel } from '@/app/lib/models/categoryModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import { FilterModel } from '@/app/lib/models/filterModel';
import { inventorySetFilterData, inventoryToggleFilterTab } from '@/app/lib/redux/inventorySlice';
import { motion } from "framer-motion";
import { AnimatePresence } from 'framer-motion';
import { inventoryServiceHandleFiltering } from '../../services/inventoryServiceFilterProduct';

interface Prop {
    categories: CategoryModel[], // passed data from parent component (ssr)
}

const InventoryFilterContainer = ({ categories }: Prop) => {

    const dispatch = useDispatch<AppDispatch>();

    const { filterData, isFilterTabVisible } = useSelector((state: RootState) => state.inventorySlice);

    const { name, maxPrice, minPrice, maxStock, minStock, withDiscount, withBulkPricing } = filterData;


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

            dispatch(inventorySetFilterData({ data: value, name: convertedKeys }));
            return;
        }


        dispatch(inventorySetFilterData({ data: value, name: convertedKeys }));

    }

    const handleCheckboxes = (name: string,) => {

        const convertedKey = name as keyof FilterModel;

        const data = filterData[convertedKey];

        dispatch(inventorySetFilterData({ name: convertedKey, data: !data }));
    }


    return (
        <AnimatePresence>
            {isFilterTabVisible &&
                <motion.div
                    className='w-full h-full absolute'
                    style={{
                        backgroundColor: "rgb(0,0,0,.5)",
                    }}
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
                    <motion.div className='absolute right-0 h-full w-[30vw] p-3 bg-[var(--main-bg-primary-dark)] flex flex-col'>
                        <span className='italic font-semibold flex w-full justify-between'>
                            Product Filter
                            <FontAwesomeIcon icon={faClose} onClick={() => dispatch(inventoryToggleFilterTab(false))} />
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
                            <div className='min-h-[4rem] border-dashed w-[1px] border-gray-600 border place-self-end -translate-x-[2rem]'></div>
                            <TextInput value={String(maxStock)} label='Max Stock' name={FilterKeys.maxStock} onChange={handleChange} showDesign={true} />


                            <div className='min-h-[3rem]' />
                            {/** pricing */}
                            <TextInput value={String(minPrice)} label='Min Price' name={FilterKeys.minPrice} onChange={handleChange} showDesign={true} />
                            <div className='min-h-[4rem] border-dashed w-[1px] border-gray-600 border place-self-end -translate-x-[2rem]'></div>
                            <TextInput value={String(maxPrice)} label='Max Price' name={FilterKeys.maxPrice} onChange={handleChange} showDesign={true} />


                            <div className='min-h-[3rem]' />
                            {/** promotional discount */}
                            <CheckBoxes isChecked={withDiscount ?? false} label='With Promotional Discount' onClick={() => handleCheckboxes(FilterKeys.withDiscount)} />
                            <div className='min-h-[1rem]' />
                            {/** with bulk pricings */}
                            <CheckBoxes isChecked={withBulkPricing ?? false} label='Enabled Bulk Pricing' onClick={() => handleCheckboxes(FilterKeys.withBulkPricing)} />
                            <div className='min-h-[3rem]' />
                            {/** actions */}
                            <div className='w-full flex gap-2 justify-end'>
                                <button className='button-primary-gradient h-[3rem] w-fit p-[0px_15px] rounded-[7px]'
                                    onClick={() => inventoryServiceHandleFiltering(
                                        filterData,
                                        dispatch,
                                    )}>Filter Products</button>
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
        <div className={`w-[1.5rem] h-[1.5rem] rounded-[3px] grid place-content-center ${isChecked ? "bg-[var(--color-brand-primary)]" : "bg-[var(--main-bg-secondary-dark)]"}`}
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
                <div className='w-[1rem] h-[1rem] bg-[var(--main-bg-secondary-dark)] rounded-[2px]' />
                <div className='w-[1rem] h-[1px] border border-[var(--main-bg-secondary-dark)] border-dashed' />
            </>}
            <input type="text" name={name} value={value === "undefined" ? "" : value} className='tf-attr flex-1 h-[3rem] p-3'
                onChange={onChange}
            />
        </div>
        <label className='absolute -top-[1.8rem] left-[2rem]'>{label}</label>
    </div>
}

export default InventoryFilterContainer
