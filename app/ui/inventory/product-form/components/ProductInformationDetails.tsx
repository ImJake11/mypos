"use client";

import CustomTextArea from '@/app/ui/inventory/product-form/components/ProductFormTextArea';
import TextInputField from '@/app/ui/inventory/product-form/components/ProductFormTextInputField';
import React, { useCallback, useEffect, useRef } from 'react'
import Category from './ProductFormCategory';
import ErrorMessage from './ProductFormErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import { formUpdateState } from '@/app/lib/redux/slice/productSlice';
import { ProductProps } from '@/app/lib/models/productModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { ProductKeys } from '@/app/lib/constants/ProductKeys';


const ProductInformationDetails = () => {

  const dispatch = useDispatch<AppDispatch>();

  const productSlice = useSelector((state: RootState) => state.productSlice);

  const { description, categoryID, name, highlights } = productSlice.data;

  return (
    <div className=' flex flex-col w-full gap-3 p-[var(--form-section-padding)] rounded-[var(--form-section-border-radius)] bg-[var(--main-bg-primary-dark)]'>
      <div className='flex flex-col gap-2.5'>
        <ErrorMessage isShow={!name} message='Product Name is Required' />

        {/** name */}
        <TextInputField value={name} isNumeric={false} label='Product Name' name='name' onChange={(e) => {
          const convertedAsKey = e.target.name as keyof ProductProps;

          const { value } = e.target;
          dispatch(formUpdateState({ data: value, name: convertedAsKey }))

        }} placeholder='Product Name' />

        {/** desctiption */}
        <CustomTextArea name='description' label='Product Description' placeholder='' value={description ?? ""} onChange={(e) => {

          const convertedAsKey = e.target.name as keyof ProductProps;

          const { value } = e.target;
          dispatch(formUpdateState({ name: convertedAsKey, data: value }))

        }} />
        <ErrorMessage isShow={!categoryID} message='Product Category is required' />
        {/** category */}
        <Category />


        {/** product highlights */}
        <div className='flex flex-col w-full gap-2'>
          <span className='flex w-full gap-3 items-center '
            style={{
              color: "var(--secondary-foreground)"
            }}
          >
            <FontAwesomeIcon icon={faCircleInfo} />
            <span>List key highlights. Separate each with a period.</span>
          </span>

          <div className='flex flex-col gap-1.5  italic pl-6'
            style={{
              color: "var(--foreground-lighter)"
            }}
          >
            <span>Example:</span>
            <span>Highlight one. </span>
            <span>Hightlight two.</span>
          </div>

          {/** textarea */}
          <textarea maxLength={500} value={highlights ?? ""} className='w-full min-h-[6rem] max-h-[10rem] p-2 tf-attr'
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              const { value } = e.target;

              const name = ProductKeys.hightlighs as keyof ProductProps;

              dispatch(formUpdateState({ data: value, name }));
            }}

          />
        </div>
      </div>

    </div>
  )
}

export default ProductInformationDetails;
