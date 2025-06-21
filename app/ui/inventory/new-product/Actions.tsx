"use client";

import { NewProductProps } from '@/app/lib/models/newProductModel';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import SaveNewProduct from '@/app/lib/utils/services/SaveProductServices';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const btnStyles = "w-fit min-h-[3rem]  rounded-[7px] p-[10px_15px]";

const Actions = () => {
    const router = useRouter();

    const dispatch = useDispatch<AppDispatch>();
    const newProductSlice = useSelector((state: RootState) => state.newProductSlice);

    const data: NewProductProps = newProductSlice.data;
    const { promotionalEnabled, isForUpdate } = newProductSlice;


    let saveProductService = useRef<SaveNewProduct>(null);

    function isValid(): boolean {

        // required data validation (seperated for more readability)
        const requiredDataIsValid = data.name &&
            data.categoryID &&
            data.costPrice &&
            data.sellingPrice &&
            data.tax &&
            data.stock &&
            data.lowStock &&
            data.stock > data.lowStock &&
            data.coverImage;

        // 1. check required data
        if (requiredDataIsValid) {

            const { description, discountRate, expirationDate } = data.promotionalDiscount;


            // 2. if bulk pricing is enabled then check all of its data are filled with the expected data
            if (data.bulkEnabled) {
                if (data.bulkTier.length > 0) {
                    const results: boolean[] = data.bulkTier.map(tier => {

                        if (tier.quantity <= 0) {
                            return false;
                        } else {
                            return true;
                        }
                    });

                    const hasInvalidData = results.some(res => res === false);

                    if (hasInvalidData) return false;

                    return true;
                } else {
                    return false;
                }
            }

            // 3. check if use added a variant and if has check the required data if its all filled
            else if (data.variants.length > 0) {

                // we collect the list of boolean for every variants that will return true or false only

                const results: boolean[] = data.variants.map(variant => {
                    if (!variant.imageUrl || !variant.name || variant.price <= 0 || variant.stock <= 0) {
                        return false;
                    } else {
                        return true;
                    }
                });

                // then in our list we will check the data if there is a false existing 
                // then if it has we will return false even one false exist it will return false
                const hasInvalidVariants = results.some(res => res == false);


                if (hasInvalidVariants) return false;

                return true;
            }

            // 4. check promotional discount
            // either one of this field has a data the validation will start and means the user has put any data one of it
            else if (promotionalEnabled) {

                const isValid: boolean = description && discountRate > 0 && expirationDate ? true : false;

                return isValid;

            } else {
                return true;
            }

        }

        return false;
    }


    useEffect(() => {
        saveProductService.current = new SaveNewProduct({
            dispatch, newProductData: data, router,
        });
    }, [data]);

    if (!saveProductService) return null;

    return (
        <div className='w-full flex justify-end mt-14 gap-2'>
            <button className={` ${btnStyles}`}
            style={{
                border: "solid 1px"
            }}
            >Cancel</button>

            {!isForUpdate &&

                <button className={`${btnStyles} ${isValid() ? "linear-bg-40" : "gray-linear-bg"}`}
                    onClick={() => saveProductService.current?.saveProduct({ isSaveOnly: false })}
                >Save & Add Another</button>

            }

            <button className={`${btnStyles} ${isValid() ? "linear-bg-40" : "gray-linear-bg"}`}

                onClick={() => {

                    if (isForUpdate) {
                        saveProductService.current?.updateProduct();
                    } else {
                        saveProductService.current?.saveProduct({ isSaveOnly: true })
                    }
                }}
            >{isForUpdate ? "Update" : "Save"}</button>
        </div>
    )
}

export default Actions
