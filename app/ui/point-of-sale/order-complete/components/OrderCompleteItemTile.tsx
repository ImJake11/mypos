
import { CartModel } from '@/app/lib/models/cartModel'
import { posUpdateCartItemQuantity } from '@/app/lib/redux/slice/posSlice';
import { useWindowSize } from '@/app/lib/utils/hooks/useGetWindowSize';
import { calculatePriceAdjustment } from '@/app/lib/utils/services/priceCalculations/calculatePriceAdjusment';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import React from 'react'
import { useDispatch } from 'react-redux';


export default React.memo(function OrderCompleteItemTile({ data, index }:
    {
        data: CartModel,
        index: number,
    }
) {

    const { details,
        quantity,
        variantUnitPrice,
        variantName,
        variantPhotoUrl,
        isPositive,
        promotionalDiscountRate,
    } = data;

    // get details parts
    const detailsParts: string[] = details ? details.split(",") : [];

    const w = useWindowSize().width;

    const isMobile = w < 576;

    return (
        <div className={`w-full gap-5 flex p-2
        ${isMobile ? "h-[5rem]" : "min-h-[11rem] h-[11rem]"}
        `}>

            {/** image container */}
            <div className={`aspect-square bg-[var(--main-bg-secondary)] rounded-[8px] overflow-hidden
                ${isMobile ? "h-[3rem]" : "h-[10rem] "}
                `}>
                {variantPhotoUrl && <img src={variantPhotoUrl} alt='variant image' className='w-full h-full object-cover' />}
            </div>

            {/** detaills */}
            <div className='flex flex-col flex-1 gap-2'>
                <span className={`${isMobile ? "text-[.8rem]" : "text-[1rem]"}`}>{variantName}</span>
                {detailsParts.map((detail, i) => <span key={i} className='text-gray-500'>
                    {detail}
                </span>)}
            </div>

            {/** price && quantity action */}
            <div className='h-full flex justify-between flex-col items-end'>
                <span className={`${isMobile ? "text-[.8rem]" : "text-[1rem]"}`}><span>₱ {variantUnitPrice.toLocaleString('en-us')}</span></span>
                <div className='flex-1' />
                <QuantityAction index={index} quantity={quantity} isMobile={isMobile} />
            </div>
        </div>
    )
}
)

interface QuantityProp {
    quantity: number,
    index: number,
    isMobile: boolean,
}
const QuantityAction = ({ quantity, index }: QuantityProp) => {

    const dispatch = useDispatch();


    return <div className='w-fit gap-2 h-[2rem] rounded-[3px] flex justify-evenly items-center text-[1rem] text-white'>
        <button className="border border-[var(--color-brand-primary)] rounded-[4px] bg-gray-100"
            onClick={() => dispatch(posUpdateCartItemQuantity({
                index,
                isAddition: true,
            }))}
        ><IconPlus size={23} className='stroke-[var(--color-brand-primary)]' /></button>
        <span className='w-[3rem] text-center text-gray-500'>{quantity}</span>
        <button className="border border-gray-400 rounded-[4px] bg-gray-100"
            onClick={() => dispatch(posUpdateCartItemQuantity({
                index,
                isAddition: false,
            }))}
        ><IconMinus className='stroke-gray-400' /></button>
    </div>

}
