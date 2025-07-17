"use client";

import React from 'react';
import { ProductProps } from '@/app/lib/models/productModel';
import { inventoryToggleProductView } from '@/app/lib/redux/slice/inventorySlice';
import { formSetProductDataForUpdate } from '@/app/lib/redux/slice/productSlice';
import { RootState } from '@/app/lib/redux/store';
import { faCartPlus, faClose, faEdit, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from "framer-motion";
import { KeyFeatures } from './ProductTabKeyFeatures';
import ProductDetails from './ProductTabDetails';
import VariantsTable from './ProductTabVariants';
import BulkTable from './ProductTabBulkTable';
import ImageContainer from './ProductTabImageContainer';
import { openToas } from '@/app/lib/redux/slice/toastSlice';
import ToasEnum from '@/app/lib/enum/toastEnum';

const ViewProductTab = () => {

  const router = useRouter();

  const dispatch = useDispatch();

  const { selectedProductDataForView, productViewOpen } = useSelector((state: RootState) => state.inventorySlice);

  const cartItems = useSelector((state: RootState) => state.posSlice.cartItems);

  const data: ProductProps = selectedProductDataForView as ProductProps;


  const handleUpdate = () => {
    const isExisiting = cartItems.find(item => item.productID === data.id);

    if (isExisiting) {
      dispatch(openToas({
        message: "This item is already in the cart and cannot be update",
        type: ToasEnum.ERROR,
      }))
    } else {
      dispatch(formSetProductDataForUpdate(data));
      router.push("/ui/inventory/product-form")
    }
  }

  return (
    <AnimatePresence>
      {productViewOpen && <motion.div className='w-screen h-screen absolute backdrop-blur-[2px]'
        style={{
          backgroundColor: "rgb(0,0,0, .8)"
        }}

        initial={{
          opacity: 0,
        }}

        animate={{
          opacity: 1,
        }}

        exit={{
          opacity: 0
        }}

        onClick={() => dispatch(inventoryToggleProductView(null))}
      >
        <motion.div className='absolute h-screen w-[40vw] right-0 flex flex-col overflow-auto gap-4'
          style={{
            backgroundColor: "var(--main-bg-primary-dark)"
          }}
          initial={{
            x: "100%",
          }}

          animate={{
            x: 0,
          }}

          transition={{
            ease: "easeIn",
            duration: .25,
            delay: .3
          }}
        >
          <ImageContainer url={data.coverImage} />
          <ProductDetails
            isActive={data.isActive}
            isFavorite={data.isFavorite}
            name={data.name}
            sellingPrice={data.sellingPrice}
            promotionalDiscount={data.promotionalDiscount}
            description={data.description ?? ""}
            category={data.category!}
          />
          {data?.highlights && <KeyFeatures data={data.highlights} />}
          <div className='h-[1rem]' />
          <VariantsTable variants={data.variants} lowStock={data.lowStock} />
          <div className='h-[1rem]' />

          {/** show only if product has bulk pricing data */}
          {data.bulkEnabled && <BulkTable bulkTier={data.bulkTier} />}
          <div className='min-h-[2rem]' />

          {/** actions */}
          <div className='flex w-full items-center justify-end gap-3 pr-5'>

            <button className='p-[10px_15px] rounded-[7px] flex items-center gap-2'
              style={{
                border: "1px solid var(--main-bg-secondary-dark)"
              }}
            >
              <FontAwesomeIcon icon={faClose} />
              <span>Close</span>
            </button>

            {/** update */}
            <button className='button-primary-gradient p-[10px_15px] rounded-[7px] flex items-center gap-2'
              onClick={handleUpdate}
            >
              <FontAwesomeIcon icon={faEdit} />
              <span>Update</span>
            </button>
          </div>


          {/** add to cart button */}
          <button className='button-primary-gradient place-self-center w-[calc(100%-3rem)] mb-5 min-h-[4rem] rounded-[7px] flex items-center gap-2.5 justify-center'>
            <FontAwesomeIcon icon={faCartPlus} />
            Add to cart
          </button>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  )
}


export default ViewProductTab
