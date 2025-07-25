'use client';

import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import CartTile from './component/CartTile';
import CartHelpers from './services/cartHelper';
import CartOrderSummary from './component/CartOrderSummary';
import CartIcon from '@/app/lib/icons/cartIcon';
import { useFetchCart } from '@/app/ui/point-of-sale/services/useFetchCart';
import { AnimatePresence, motion } from "framer-motion";

const Cart = () => {

    const posSlice = useSelector((state: RootState) => state.posSlice);

    const cartData = posSlice.cartItems;

    const cartHelper = useMemo(() => {
        return new CartHelpers({
            cartItems: cartData,
        })
    }, [cartData]);

    useFetchCart({});

    return (
        <AnimatePresence>
            {posSlice.isCartVisible && <motion.div className='absolute w-screen h-screen backdrop-blur-[2px]'
                style={{
                    backgroundColor: "rgb(0,0,0, .5)",
                }}

                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                exit={{
                    opacity: 0,
                }}
            >
                <motion.div className='absolute right-0 w-[40vw] h-full bg-[var(--main-bg-primary)] flex flex-col p-5 gap-2'
                    initial={{
                        x: "100%"
                    }}
                    animate={{
                        x: "0%"
                    }}
                    exit={{
                        x: "100%"
                    }}

                    transition={{
                        delay: .3,
                        ease: "easeInOut",
                        type: "tween"
                    }}
                >
                    <div className='flex w-full items-center gap-2 '>
                        <CartIcon size={22} />
                        <span className='font-semibold italic'>Cart</span>
                    </div>

                    {/** list of items */}
                    <div className='w-full h-[75vh] flex flex-col overflow-auto gap-2'>
                        {cartData.length === 0 ? <div className='w-full h-full grid place-content-center'>
                            No items
                        </div> :
                            cartData.map((data, i) => <CartTile key={i} cartHelper={cartHelper} index={i} data={data} />)}
                    </div>

                    {/** summary */}
                    <CartOrderSummary
                        overallCartTotal={cartHelper.computeOverAllTotalCartItems()} />
                </motion.div>
            </motion.div>}
        </AnimatePresence>
    )
}


export default Cart
