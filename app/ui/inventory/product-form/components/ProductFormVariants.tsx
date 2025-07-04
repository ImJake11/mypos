"use client";

import NewVariantTile from './ProductFormNewVariantTile'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import { formAddVariant } from '@/app/lib/redux/productSlice';
import ErrorMessage from './ProductFormErrorMessage';


const Variants = () => {

    const dispatch = useDispatch<AppDispatch>();

    const newProductSlice = useSelector((state: RootState) => state.productSlice);

    const { variants } = newProductSlice.data;
    const { isForUpdate } = newProductSlice;


    return (
        <div className='flex flex-col w-full gap-3 rounded-[var(--form-section-border-radius)] p-[var(--form-section-padding)] bg-[var(--main-bg-primary-dark)]'
        >
            <ErrorMessage isShow={variants.length === 0} message='At least one variant is required' />
            <div className='flex w-full justify-between'>
                <span className='italic font-semibold  '>Variants</span>
                <button className='button-primary-gradient rounded-[var(--button-border-radius)] p-[10px_20px]'
                    onClick={() => dispatch(formAddVariant())}
                >Add Variant</button>
            </div>
            {/** list of added variant */}
            <div className='flex flex-col'>
                {/** header */}
                {variants.length > 0 && <div className='flex'> {/** show only when variant list has content */}
                    <Header flex='flex-1' name='Image' />
                    <Header flex='flex-2' name='Name' />
                    <Header flex='flex-2' name='Details' />
                    <Header flex='flex-1' name='Price Adjust (%)' />
                    <Header flex='flex-1' name='Stock' />
                    <Header flex='flex-1' name='Total' />
                    <Header flex='flex-1' name='Actions' />
                </div>}
                {/** body */}
                {variants.map((d, i) => <NewVariantTile key={i} index={i} data={d} sellingPrice={newProductSlice.data.sellingPrice} isForUpdate={isForUpdate} appDispatch={dispatch} />)}

            </div>
        </div>
    )
}

interface HeaderProps {
    flex: string,
    name: string,
}
const Header = ({ flex, name }: HeaderProps) => {
    return (
        <div className={`${flex} grid place-content-center min-h-[3rem]`}

            style={{
                border: "solid 1px var(--tertiary)"
            }}>
            <span>{name}</span>
        </div>
    )
}

export default Variants
