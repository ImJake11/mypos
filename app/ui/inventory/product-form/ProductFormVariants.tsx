"use client";

import NewVariantTile from './components/ProductFormNewVariantTile'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import { formAddVariant } from '@/app/lib/redux/slice/productSlice';
import ErrorMessage from './components/ProductFormErrorMessage';
import ProductFormCard from './components/ProductFormCard';


const Variants = () => {

    const dispatch = useDispatch<AppDispatch>();

    const newProductSlice = useSelector((state: RootState) => state.productSlice);

    const { variants } = newProductSlice.data;

    return (
        <ProductFormCard>
            <div className='flex flex-col w-full gap-3'>
                <ErrorMessage isShow={variants.length === 0} message='At least one variant is required' />
                <div className='flex w-full justify-between items-center'>
                    <span className='italic font-semibold  '>Variants</span>
                    <button className='bg-linear-120 from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] rounded-[4px] px-3 py-2 text-white'
                        onClick={() => dispatch(formAddVariant())}
                    >Add Variant</button>
                </div>
                {/** list of added variant */}
                <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3'>
                    {/** body */}
                    {variants.map((d, i) => <NewVariantTile key={i} index={i} data={d} sellingPrice={newProductSlice.data.sellingPrice} />)}
                </div>
            </div>
        </ProductFormCard>
    )
}

interface HeaderProps {
    flex: string,
    name: string,
}
const Header = ({ flex, name }: HeaderProps) => {
    return (
        <div className={`${flex} grid place-content-center min-h-[2.5rem] border border-gray-200`}>
            <span>{name}</span>
        </div>
    )
}

export default Variants
