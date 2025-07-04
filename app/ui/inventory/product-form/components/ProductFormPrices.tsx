'use client';

import TextInputField from '@/app/ui/inventory/product-form/components/ProductFormTextInputField'
import React, { useEffect, useMemo, useState } from 'react'
import ErrorMessage from './ProductFormErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import { formAddBulkTier, formToggleAutoComputeSellingPrice, formUpdateState } from '@/app/lib/redux/productSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import BulkTable from './ProductFormBulkTable';
import PromotionalDiscount from './ProductFormPromotionalDiscount';
import { ProductProps } from '@/app/lib/models/productModel';
import { ProductKeys } from '@/app/lib/constants/ProductKeys';
import { VatModel } from '@/app/lib/models/vatModel';
import { fetchVats } from '@/app/lib/utils/api/vat/fetchVats';
import { AnimatePresence, motion } from "framer-motion";
import { InformationIcon } from '@/app/lib/icons/informationIcon';
import { computeSellingPrice } from '../services/computeSellingPrice';

const Prices = () => {

    const dispatch = useDispatch<AppDispatch>();

    const productSlice = useSelector((state: RootState) => state.productSlice);

    const { sellingPrice, costPrice, tax, bulkEnabled, promotionalDiscount, vatId } = productSlice.data;

    const [vats, setVat] = useState<VatModel[]>([]);

    useEffect(() => {

        const fetch = async () => {
            try {
                const res = await fetchVats();
                setVat(res);
            } catch (e) {
                throw new Error("Failed to fetch vats");
            }
        }
        fetch();

    }, []);

    const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const convertedAsKey = name as keyof ProductProps;

        const isNan = isNaN(Number(value));

        if (isNan) return;

        dispatch(formUpdateState({ name: convertedAsKey, data: Number(value) }))
    }


    // auto computes selling price if its enable
    useEffect(() => {

        const name = ProductKeys.sellingPrice as keyof ProductProps;

        //  get the data of the current selected vat
        const vatData = vats.find(vat => vat.id === vatId);

        if (productSlice.isAutoComputeSellingPrice) {

            const total = computeSellingPrice(
                costPrice, tax, vatData?.rate ?? 0
            )

            dispatch(formUpdateState({ name, data: total }))
        }
    }, [costPrice, tax, productSlice.isAutoComputeSellingPrice, vatId]);


    return <div className='flex w-full flex-col gap-3 p-[var(--form-section-padding)] rounded-[var(--form-section-border-radius)] bg-[var(--main-bg-primary-dark)]'>
        {/** auto compute selling price toggle toggle */}
        <div className='flex gap-1.5'>
            <span>Auto Compute Selling Price</span>
            <CheckBox isChecked={productSlice.isAutoComputeSellingPrice} onClick={() => dispatch(formToggleAutoComputeSellingPrice())} />
        </div>

        {/** vats options */}
        <VatOptions vats={vats} selectedVat={vatId!} />

        {/** error messages */}
        <div className='w-full flex'>
            <div className='flex-1'><ErrorMessage isShow={!costPrice} message='Cost price is required' /></div>
            <div className='flex-1'><ErrorMessage isShow={!sellingPrice} message='Tax is required' /></div>
            <div className='flex-1'><ErrorMessage isShow={!tax} message='Selling price is required' /></div>
        </div>
        <div className='w-full flex gap-2.5'>
            <div className='flex-1'>
                <TextInputField value={costPrice.toString()} isNumeric={true} label='Cost Price' name='costPrice' onChange={handleText} placeholder='Cost Price' /></div>
            <div className='flex-1'>
                <TextInputField value={tax.toString()} isNumeric={true} label='Tax Rate' name='tax' maxLenght={3} onChange={handleText} placeholder='Tax Rate' /></div>
            <div className='flex-1'>
                <TextInputField value={sellingPrice.toString()} isNumeric={true} label='Selling Price' name='sellingPrice' onChange={handleText} placeholder='Selling Price' />
            </div>
        </div>

        {/** advance pricing */}
        <span className='font-semibold italic mt-1.5'>Advance Pricing</span>

        {/** bulk discount toggle */}
        <div className='flex gap-1.5'><span>Bulk Discounts</span><CheckBox isChecked={bulkEnabled} onClick={() => dispatch(formUpdateState({ name: "bulkEnabled", data: !bulkEnabled }))} /></div>

        {bulkEnabled && <BulkTable data={productSlice.data} />}
        {/** tier button */}
        {bulkEnabled && <button className='button-primary-gradient rounded-[var(--button-border-radius)] h-[3rem] p-[10px_15px w-[8rem]' onClick={() => dispatch(formAddBulkTier())}>Add tier</button>}


        {/** promotional discount */}
        <div className='flex gap-1.5'><span>Promotional Discount</span><CheckBox isChecked={productSlice.data.discountEnabled} onClick={() => dispatch(formUpdateState({
            data: !productSlice.data.discountEnabled,
            name: ProductKeys.discountEnabled as keyof ProductProps,
        }))} /></div>
        {/** show only if promotional discount is enabled */}
        {productSlice.data.discountEnabled && <PromotionalDiscount data={promotionalDiscount} dispatch={dispatch} />}
    </div>
}

function VatOptions({ vats, selectedVat }: { vats: VatModel[], selectedVat: string }) {
    const [isDesctiptionVisible, setDescriptionVisible] = useState(false);

    const dispatch = useDispatch();

    const handleDescriptionToggle = () => {
        setDescriptionVisible(!isDesctiptionVisible);
    }

    return <div className='flex flex-col w-full gap-1'>

        <div className='flex w-full gap-2 items-center text-[var(--foreground-lighter)]'>
            <div className='w-[1rem] h-[1rem] relative'>
                <InformationIcon color='var(--foreground-lighter)' />
            </div>
            <span className='underline underline-offset-4' onClick={handleDescriptionToggle}>Learn about VAT</span>
        </div>

        {/** vat explanation */}
        <AnimatePresence>
            {isDesctiptionVisible && <motion.div className='w-[60%] flex flex-col p-3 gap-2 text-[var(--foreground-lighter)] ml-3'
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                exit={{
                    opacity: 0,
                }}
            >

                <span className='font-semibold'>Value-Added Tax (VAT) in the Philippines:</span>
                <p>VAT is a 12% consumption tax levied on the sale of goods and services. While collected by businesses, it's ultimately paid by the consumer. Correctly classifying products as VAT Taxable, VAT Exempt, or Zero-Rated is crucial for accurate calculation and BIR compliance.
                    <span className='underline underline-offset-4 italic ml-0.5' onClick={handleDescriptionToggle}>Hide description.</span>
                </p>
            </motion.div>}
        </AnimatePresence>


        {vats.map((v, i) => {

            const isSelected = selectedVat === v.id;

            // setting key is named by underscore
            const settingKeyParts = v.settingKey.split("_");

            return <div key={i} className='ml-6 w-full h-[2.5rem] flex gap-2 items-center cursor-pointer'
                onClick={() => dispatch(formUpdateState({
                    data: v.id,
                    name: ProductKeys.vatId as keyof ProductProps,
                }))}
            >

                {/** radio */}
                <div className={`w-[1rem] h-[1rem] rounded-full border border-[var(--color-brand-primary)] p-0.5`}>
                    {isSelected && <motion.div className='w-full h-full rounded-full button-primary-gradient'
                        initial={{
                            scale: 0,
                        }}
                        animate={{
                            scale: 1,
                        }}
                        exit={{
                            scale: 0,
                        }}
                    />}
                </div>
                <div className='w-full flex gap-2'>{settingKeyParts.map((part, i) => <span key={i}>{part}</span>)}
                    <span className='text-[var(--foreground-lighter)]'>({v.rate}%)</span>
                </div>
            </div>
        })}
    </div>
}


interface CheckboxProps {
    isChecked: boolean
    onClick: () => void,
}

function CheckBox({ isChecked, onClick }: CheckboxProps) {
    return <div
        className={`grid place-content-center h-[1.5rem] w-[1.5rem] rounded-[3px] `}
        style={{
            backgroundColor: isChecked ? "var(--color-brand-primary)" : "var(--main-bg-secondary-dark)"
        }}
        onClick={onClick}
    >
        <FontAwesomeIcon icon={faCheck} className={`${isChecked ? "text-white" : "text-transparent"}`} />
    </div>
}

export default Prices
