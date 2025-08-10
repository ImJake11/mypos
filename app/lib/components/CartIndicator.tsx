
import React from 'react'
import CartIcon from '../icons/cartIcon'
import { posToggleCartTab } from '../redux/slice/posSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { IconShoppingCart, IconShoppingCartFilled } from '@tabler/icons-react'

const CartIndicator = () => {

    const dispatch = useDispatch();

    const cart = useSelector((state: RootState) => state.posSlice.cartItems);

    return (
        <div className='h-[2rem] w-[2rem] bg-gray-100 dark:bg-[var(--main-bg-tertiary-dark)] border border-gray-300 dark:border-gray-500 rounded-full grid place-content-center relative'
            onClick={() => dispatch(posToggleCartTab(true))}
        >
            <IconShoppingCartFilled size={19} className=' fill-gray-400 dark:fill-gray-300' />
            {/** items number indicator
                    * show cart indicator if cart items is more than 0
                    */}
            {cart.length > 0 && <div className='absolute top-0 right-0 h-4 w-4 rounded-full bg-red-400 grid place-content-center text-[.6rem] text-white'>
                {cart.length}
            </div>}

        </div>
    )
}

export default CartIndicator
