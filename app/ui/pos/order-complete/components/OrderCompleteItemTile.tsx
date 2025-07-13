
import { CartModel } from '@/app/lib/models/cartModel'
import { posUpdateCartItemQuantity } from '@/app/lib/redux/posSlice';
import { calculatePriceAdjustment } from '@/app/lib/utils/services/priceCalculations/calculatePriceAdjusment';
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

    return (
        <div className='w-full min-h-[20rem] h-[20rem] gap-5 flex p-5'>

            {/** image container */}
            <div className='h-[15rem] w-[15rem] bg-[var(--main-bg-secondary-dark)] rounded-[8px] overflow-hidden'>
                {variantPhotoUrl && <img src={variantPhotoUrl} alt='variant image' className='w-full h-full object-cover' />}
            </div>

            {/** detaills */}
            <div className='flex flex-col flex-1 gap-2'>
                <span className='text-[1.5rem]'>{variantName}</span>
                {detailsParts.map((detail, i) => <span key={i} className='text-[var(--foreground-lighter)]'>
                    {detail}
                </span>)}
            </div>

            {/** price && quantity action */}
            <div className='h-full flex justify-between flex-col items-end'>
                <span className='text-[1.5rem]'><span>₱ {variantUnitPrice.toLocaleString('en-us')}</span></span>
                <div className='flex-1' />
                <QuantityAction index={index} quantity={quantity} />
            </div>
        </div>
    )
}
)

interface QuantityProp {
    quantity: number,
    index: number,
}
const QuantityAction = ({ quantity, index }: QuantityProp) => {

    const dispatch = useDispatch();


    return <div className='button-primary-gradient w-[150px] h-[3rem] rounded-[3px] flex justify-evenly items-center text-[1.5rem]'>
        <button
            onClick={() => dispatch(posUpdateCartItemQuantity({
                index,
                isAddition: true,
            }))}
        >+</button>
        <span>{quantity}</span>
        <button className="text-[1.8rem]"
            onClick={() => dispatch(posUpdateCartItemQuantity({
                index,
                isAddition: false,
            }))}
        >-</button>
    </div>

}
