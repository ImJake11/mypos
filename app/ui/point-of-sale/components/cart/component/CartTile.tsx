import { CartModel } from "@/app/lib/models/cartModel";
import { posRemoveVariant, posUpdateCartItemQuantity } from "@/app/lib/redux/slice/posSlice";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import CartHelpers from "../services/cartHelper";
import store, { AppDispatch } from "@/app/lib/redux/store";
import { useDeleteCartCache } from "@/app/ui/point-of-sale/services/deleteCartCache";
import { cartCacheSave } from "../../../services/saveCartCache";
import { capitalizeFirtLetter } from "@/app/lib/utils/services/capitalizeFirstLetter";
import { IconTrashFilled } from "@tabler/icons-react";
import {motion} from "framer-motion";

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

    return <motion.div className='flex items-center h-fit p-[7px_9px] w-full bg-[var(--main-bg-primary)] rounded-[7px] gap-2 text-center'
    initial={{
        boxShadow: "0px 2px 3px rgb(0,0,0, .2)"
    }}
    whileHover={{
        boxShadow: "0px 2px 3px rgb(0,0,0, .4)"
    }}
    >

        {/** image container and name */}
        <div className='h-[3rem] w-[3rem] rounded-[3px] overflow-hidden'>
            <img src={data.variantPhotoUrl} alt="i" className="h-full w-full object-cover" />
        </div>

        <div className="flex-1 flex flex-col">
            <span className="text-left text-[.7rem]">{capitalizeFirtLetter(data.variantName)}</span>

            <div className="flex-1 flex items-center gap-2">
                {/** price */}
                <span className="text-[1.2rem] font-semibold">{Number(data.total).toLocaleString('en-us', { currency: "PHP", style: "currency" })}</span>

                <div className="flex-1" />
                <QuantityAction quantity={data.quantity} index={index} />

                {/** delete button */}
                <div className="w-[1.7rem] h-[1.7rem] rounded-[4px] bg-red-300/40 grid place-content-center">
                    <IconTrashFilled className="fill-red-500" size={18} onClick={handleDelete}/>
                </div>
            </div>
        </div>
    </motion.div>
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

            const cartHelper = new CartHelpers();

            await cartCacheSave(cartHelper.generateCartCacheData(cartItems[index]));
        }, 2000);
    }

    return <div className='h-[2rem] rounded-[3px] flex justify-evenly items-center gap-2'>
        <button
            className="text-[1.2rem] text-[var(--color-brand-primary)] bg-gray-100 h-[1.7rem] w-[1.7rem] grid place-content-center rounded-[4px]"
            onClick={() => handlePlusMinus(true)}>+</button>
        <span className="text-[]">{quantity}</span>
        <button
            className="text-[1.4rem] text-gray-500 bg-gray-100 h-[1.7rem] w-[1.7rem] grid place-content-center rounded-[4px]"
            onClick={() => handlePlusMinus(false)}>-</button>
    </div>
}
