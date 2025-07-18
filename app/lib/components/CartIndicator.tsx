
import React from 'react'
import CartIcon from '../icons/cartIcon'
import { posToggleCartTab } from '../redux/slice/posSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const CartIndicator = () => {

    const dispatch = useDispatch();

    const cart = useSelector((state: RootState) => state.posSlice.cartItems);

    return (
        <div className='h-[2rem] w-[2rem] relative mr-3'
            onClick={() => dispatch(posToggleCartTab())}
        >
            <CartIcon />
            {/** items number indicator
                    * show cart indicator if cart items is more than 0
                    */}
            {cart.length > 0 && <div className='absolute top-0 right-0 h-5 w-5 rounded-full bg-[var(--color-brand-primary)] grid place-content-center'>
                {cart.length}
            </div>}

        </div>
    )
}

export default CartIndicator
