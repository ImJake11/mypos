"use client";

import { CategoryModel } from '@/app/lib/models/categoryModel';
import { BulkTableProp, ProductProps, PromotionalDiscountProp, VariantsProps } from '@/app/lib/models/productModel';
import { toggleProductView } from '@/app/lib/redux/inventorySlice';
import { setProductDataForUpdate } from '@/app/lib/redux/productSlice';
import { RootState } from '@/app/lib/redux/store';
import { faCartPlus, faCartShopping, faCircle, faClose, faEdit, faExpand, faFilter, faHeart, faImage, faKey, faListNumeric, faLock, faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from "framer-motion";
import { KeyFeatures } from './ProductTabKeyFeatures';
import ProductDetails from './ProductTabDetails';
import VariantsTable from './ProductTabVariants';
import BulkTable from './ProductTabBulkTable';
import ImageContainer from './ProductTabImageContainer';

const ViewProductTab = () => {

  const router = useRouter();

  const dispatch = useDispatch();

  const { currentData, productViewOpen } = useSelector((state: RootState) => state.inventorySlice);

  const data: ProductProps = currentData as ProductProps;



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

        onClick={() => dispatch(toggleProductView(null))}
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
              onClick={() => {
                dispatch(setProductDataForUpdate(data));
                router.push("/ui/inventory/product-form")
              }}
            >
              <FontAwesomeIcon icon={faEdit} />
              <span>Update</span>
            </button>

            <button className='button-primary-gradient p-[10px_15px] rounded-[7px] flex items-center gap-2'>
              <FontAwesomeIcon icon={faLock} />
              <span>Deactivate Product</span>
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
