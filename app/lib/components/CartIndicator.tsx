
import React from 'react'
import CartIcon from '../icons/cartIcon'
import { posToggleCartTab } from '../redux/slice/posSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const CartIndicator = () => {

    const dispatch = useDispatch();

    const cart = useSelector((state: RootState) => state.posSlice.cartItems);

    return (
        <div className='h-[2rem] w-[5rem] border border-gray-500 rounded-[4px] relative flex gap-2 justify-center items-center shadow-[1px_1px_5px_rgb(0,0,0,.3)]'
            onClick={() => dispatch(posToggleCartTab())}
        >
            <span>Cart</span>
            <CartIcon size={25} />
            {/** items number indicator
                    * show cart indicator if cart items is more than 0
                    */}
            {cart.length > 0 && <div className='absolute top-0.5 right-1 h-4 w-4 rounded-full bg-[var(--color-brand-primary)] grid place-content-center text-[.6rem] text-white'>
                {cart.length}
            </div>}

        </div>
    )
}

export default CartIndicator
