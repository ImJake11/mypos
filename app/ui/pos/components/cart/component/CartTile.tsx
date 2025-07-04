import { CartModel } from "@/app/lib/models/cartModel";
import { posRemoveVariant, posUpdateCartItemQuantity } from "@/app/lib/redux/posSlice";
import { faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";

interface Prop {
    data: CartModel,
    index: number,
}

export default React.memo(function CartTile({ data, index }: Prop) {
    const dispatch = useDispatch();

    return <div className='flex items-center h-fit p-[7px_9px] w-full bg-[var(--main-bg-secondary-dark)] rounded-[7px] gap-2 text-center'>

        {/** image container and name */}
        <div className='flex-3 flex items-center text-nowrap overflow-hidden text-ellipsis gap-2'>
            <div className='h-[3rem] w-[3rem] bg-[var(--background)] rounded-[3px] overflow-hidden'>
                <img src={data.variantPhotoUrl} alt="i" className="h-full w-full object-cover" />
            </div>
            <span>{data.variatName}</span>
        </div>



        {/** price */}
        <div className='flex-2 grid place-content-start'>
            <span>Php {data.total.toLocaleString('en-us')}</span>
        </div>

        <QuantityAction quantity={data.quantity} index={index} />

        {/** actions */}
        <div className='flex-1'>
            <FontAwesomeIcon icon={faClose} onClick={() => dispatch(posRemoveVariant({ variantID: data.variantID }))} />
        </div>
    </div>
});


interface QuantityProp {
    quantity: number,
    index: number,
}
const QuantityAction = ({ quantity, index }: QuantityProp) => {

    const dispatch = useDispatch();

    const handlePlusMinus = (isAddition: boolean) => {

        dispatch(posUpdateCartItemQuantity({ index, isAddition }))
    }

    return <div className="flex-2">
        <div className='button-primary-gradient w-[80%] h-[2rem] rounded-[3px] flex justify-evenly items-center'>
            <button
                className="text-[1.2rem]"
                onClick={() => handlePlusMinus(true)}>+</button>
            <span>{quantity}</span>
            <button
                className="text-[1.4rem]"
                onClick={() => handlePlusMinus(false)}>-</button>
        </div>
    </div>
}
