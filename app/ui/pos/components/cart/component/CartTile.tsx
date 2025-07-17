import { CartModel } from "@/app/lib/models/cartModel";
import { posRemoveVariant, posUpdateCartItemQuantity } from "@/app/lib/redux/slice/posSlice";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartHelpers from "../services/cartHelper";
import store, { AppDispatch, RootState } from "@/app/lib/redux/store";
import { useDeleteCartCache } from "@/app/ui/pos/services/deleteCartCache";
import { cartCacheSave } from "../../../services/saveCartCache";

interface Prop {
    data: CartModel,
    index: number,
    cartHelper: CartHelpers,
}

export default React.memo(function CartTile({ data, index, cartHelper }: Prop) {
    const dispatch = useDispatch<AppDispatch>();


    const handleDelete = () => {
        if (data.cartId !== undefined) {
            useDeleteCartCache({
                cartHelper,
                dispatch,
                id: data.cartId,
                userId: "tempo"
            })
        }

        dispatch(posRemoveVariant({ variantID: data.variantID }));
    }

    return <div className='flex items-center h-fit p-[7px_9px] w-full bg-[var(--main-bg-secondary-dark)] rounded-[7px] gap-2 text-center'>

        {/** image container and name */}
        <div className='flex-3 flex items-center text-nowrap overflow-hidden text-ellipsis gap-2'>
            <div className='h-[3rem] w-[3rem] bg-[var(--background)] rounded-[3px] overflow-hidden'>
                <img src={data.variantPhotoUrl} alt="i" className="h-full w-full object-cover" />
            </div>
            <span>{data.variantName}</span>
        </div>


        {/** price */}
        <div className='flex-2 grid place-content-start'>
            <span>Php {data.total.toLocaleString('en-us')}</span>
        </div>

        <QuantityAction quantity={data.quantity} index={index} />

        {/** actions */}
        <div className='flex-1'>
            <FontAwesomeIcon icon={faClose} onClick={handleDelete} />
        </div>
    </div>
});



const QuantityAction = ({ quantity, index }:
    { quantity: number, index: number }
) => {

    const debounceRef = useRef<NodeJS.Timeout | null>(null)

    const dispatch = useDispatch();

    const handlePlusMinus = async (isAddition: boolean) => {

        dispatch(posUpdateCartItemQuantity({ index, isAddition }));

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(async () => {

            const cartItems = store.getState().posSlice.cartItems;

            const cartHelper = new CartHelpers({ cartItems });

            await cartCacheSave(cartHelper.generateCartCacheData(cartItems[index]));
        }, 2000);
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
