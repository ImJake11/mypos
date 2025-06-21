"use client";

import CustomTextArea from '@/app/lib/components/TextArea';
import TextInputField from '@/app/lib/components/TextInputField';
import React from 'react'
import Category from './Category';
import ErrorMessage from './components/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/lib/redux/store';
import { updateNewProductState } from '@/app/lib/redux/newProductSlice';
import { NewProductProps } from '@/app/lib/models/newProductModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { NewProductKeys } from '@/app/lib/constants/NewProductKeys';

const ProductInformationDetails = () => {

  const dispatch = useDispatch();

  const newProductSlice = useSelector((state: RootState) => state.newProductSlice);

  const { description, categoryID, name, highlights } = newProductSlice.data;

  return (
    <div className=' flex flex-col w-full gap-3  p-[15px] rounded-[20px_10px]'
      style={{
        backgroundColor: "var(--background)"
      }}
    >
      <div className='flex flex-col gap-2.5'>
        <ErrorMessage isShow={!name} message='Product Name is Required' />

        {/** name */}
        <TextInputField value={name} isNumeric={false} label='Product Name' name='name' onChange={(e) => {
          const convertedAsKey = e.target.name as keyof NewProductProps;

          const { value } = e.target;
          dispatch(updateNewProductState({ data: value, name: convertedAsKey }))

        }} placeholder='Product Name' />

        {/** desctiption */}
        <CustomTextArea name='description' label='Product Description' placeholder='' value={description ?? ""} onChange={(e) => {

          const convertedAsKey = e.target.name as keyof NewProductProps;

          const { value } = e.target;
          dispatch(updateNewProductState({ name: convertedAsKey, data: value }))

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
              color: "var(--secondary-foreground)"
            }}
          >
            <span>Example:</span>
            <span>Highlight one. </span>
            <span>Hightlight two.</span>
          </div>

          {/** textarea */}
          <textarea maxLength={500} value={highlights ?? ""} className='w-full min-h-[6rem] max-h-[10rem] rounded-[11px] border border-[var(--primary)] p-2'
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              const { value } = e.target;

              const name = NewProductKeys.hightlighs as keyof NewProductProps;

              dispatch(updateNewProductState({ data: value, name }));
            }}

          >

          </textarea>

        </div>
      </div>

    </div>
  )
}

export default ProductInformationDetails;
