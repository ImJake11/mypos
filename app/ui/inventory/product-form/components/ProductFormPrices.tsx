'use client';

import TextInputField from '@/app/ui/inventory/product-form/components/ProductFormTextInputField'
import React, { useEffect, useState } from 'react'
import ErrorMessage from './ProductFormErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import { formAddBulkTier, formToggleAutoComputeSellingPrice, formUpdateState } from '@/app/lib/redux/slice/productSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import BulkTable from './ProductFormBulkTable';
import { ProductProps } from '@/app/lib/models/productModel';
import { VatModel } from '@/app/lib/models/vatModel';
import { fetchVats } from '@/app/lib/utils/data/fetchVats';
import { computeSellingPrice } from '../services/computeSellingPrice';
import { ProductKeys } from '@/app/lib/constants/ProductKeys';
import ProductFormVAT from './ProductFormVat';

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
        <ProductFormVAT vats={vats} selectedVat={vatId!} />

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
