"use client";

import NewVariantTile from './NewVariantTile'
import {  useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import { addVariant } from '@/app/lib/redux/newProductSlice';
import ErrorMessage from './components/ErrorMessage';


const Variants = () => {

    const dispatch = useDispatch<AppDispatch>();

    const newProductSlice = useSelector((state: RootState) => state.newProductSlice);

    const { variants } = newProductSlice.data;
    const { isForUpdate } = newProductSlice;

   
    return (
        <div className='flex flex-col w-full gap-3  rounded-[11px] p-[20px_10px]'
        style={{
            backgroundColor: "var(--background)"
        }}
        >
            <ErrorMessage isShow={variants.length === 0} message='At least one variant is required' />
            <div className='flex w-full justify-between'>
                <span className='italic font-semibold  '>Variants</span>
                <button className='linear-bg-40 p-[10px_20px] rounded-[7px] '
                    onClick={() => dispatch(addVariant())}
                >Add Variant</button>
            </div>
            {/** list of added variant */}
            <div className='flex flex-col'>
                {/** header */}
                {variants.length > 0 && <div className='flex'> {/** show only when variant list has content */}
                    <Header flex='flex-1' name='Image' />
                    <Header flex='flex-2' name='Variant' />
                    <Header flex='flex-2' name='Price Adjust (%)' />
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
