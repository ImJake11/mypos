'use client';

import React, { useEffect, useRef } from 'react'
import Actions from './components/ProductFormActions'
import UploadMedia from './components/ProductFormMedia'
import Prices from './components/ProductFormPrices'
import ProductFormStatus from './components/ProductFormStatus'
import Stock from './components/ProductFormStock'
import Variants from './components/ProductFormVariants'
import ProductInformationDetails from './components/ProductInformationDetails'
import { useSearchParams } from 'next/navigation';
import { fetchSingleProductData } from '@/app/lib/utils/data/fetchSingeProductData';
import { useDispatch, useSelector } from 'react-redux';
import { formSetProductData, formToggleError, formToggleLoading } from '@/app/lib/redux/slice/productSlice';
import { openToas } from '@/app/lib/redux/slice/toastSlice';
import ToasEnum from '@/app/lib/enum/toastEnum';
import { RootState } from '@/app/lib/redux/store';
import CircularLoadingIndicator from '@/app/lib/components/CircularLoadingIndicator';

const ProductFormBody = () => {
    const dropAreaRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();

    const id = searchParams.get("product-id");

    const dispatch = useDispatch();

    const { isLoading, isError } = useSelector((state: RootState) => state.productSlice);


    const fetch = async () => {

        if (!id) return;

        dispatch(formToggleError(false));
        dispatch(formToggleLoading(true));

        try {
            const product = await fetchSingleProductData(id);

            dispatch(formSetProductData(product));
        } catch (e) {
            dispatch(openToas({
                message: "Failed to fetch product data",
                type: ToasEnum.ERROR,
            }))
            dispatch(formToggleError(true));
        } finally {
            dispatch(formToggleLoading(false));
        }
    }

    useEffect(() => {
        fetch();
    }, []);

    if (isLoading) return <LoadingState />;

    return (
        <div ref={dropAreaRef} className='gap-5 flex flex-col flex-1 rounded-[11px] m-1.5 p-3 overflow-auto bg-[var(--main-bg-secondary)]'
        >
            <ProductFormStatus />
            <ProductInformationDetails />
            <Prices />
            <Stock />
            <Variants />
            <UploadMedia />
            <Actions />
        </div>
    )
}

function LoadingState() {

    return (
        <div className='flex-1 grid place-content-center'>
            <div className='flex gap-2 text-[1rem]'>
                <CircularLoadingIndicator borderWidth={2} size={25} />
                <span>Prepairing Product Form...</span>
            </div>
        </div>
    )
}

export default ProductFormBody
