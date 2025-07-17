"use client";

import ToasEnum from '@/app/lib/enum/toastEnum';
import { toggleProcessDialog } from '@/app/lib/redux/slice/processSlice';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import { openToas } from '@/app/lib/redux/slice/toastSlice';
import SaveNewProduct from '@/app/ui/inventory/product-form/services/ProductFormServices';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const btnStyles = "w-fit min-h-[3rem]  rounded-[7px] p-[10px_15px]";

const Actions = () => {
    const router = useRouter();

    const dispatch = useDispatch<AppDispatch>();
    const productSlice = useSelector((state: RootState) => state.productSlice);

    const productData = productSlice.data;

    const productServices = useMemo(() => {
        return new SaveNewProduct({
            dispatch
        });
    }, [productData]);

    const handleSave = async (isSaveOnly: boolean) => {
        try {
            dispatch(toggleProcessDialog(true))
            await productServices.handleProduct();

            if (isSaveOnly) {
                router.replace("/ui/inventory");
            }
        } catch (e) {
            dispatch(toggleProcessDialog(false))
            dispatch(openToas({
                message: "Failed to upload product  ",
                type: ToasEnum.ERROR
            }));
        } finally {
            dispatch(toggleProcessDialog(false))
        }
    }

    return (
        <div className='w-full flex justify-end mt-14 gap-2'>
            <button className={` ${btnStyles}`}
                style={{
                    border: "solid 1px"
                }}
                onClick={() => router.back()}
            >Cancel</button>

            {!productSlice.isForUpdate &&
                <button className={`${btnStyles} button-primary-gradient`}
                    onClick={() => handleSave(false)}
                >Save & Add Another</button>
            }
            <button className={`${btnStyles} button-primary-gradient`}
                onClick={() => handleSave(true)}
            >{productSlice.isForUpdate ? "Update" : "Save"}</button>
        </div>
    )
}

export default Actions
