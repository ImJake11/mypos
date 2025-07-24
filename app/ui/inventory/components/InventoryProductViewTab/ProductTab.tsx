"use client";

import React, { useEffect, useState } from 'react';
import { ProductProps } from '@/app/lib/models/productModel';
import { inventoryToggleProductView } from '@/app/lib/redux/slice/inventorySlice';
import { RootState } from '@/app/lib/redux/store';
import { faCartPlus, faClose, faEdit } from '@fortawesome/free-solid-svg-icons'
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
import { fetchSingleProductData } from '@/app/lib/utils/data/fetchSingeProductData';
import ProductTabLoadingState from './ProductTabLoadingState';

const ViewProductTab = () => {

  const router = useRouter();
  const dispatch = useDispatch();

  const [data, setProductData] = useState<ProductProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { productViewID, isProductViewVisible } = useSelector((state: RootState) => state.inventorySlice)

  const cartItems = useSelector((state: RootState) => state.posSlice.cartItems);

  const handleUpdate = () => {
    const isExisiting = cartItems.find(item => item.productID === data!.id);

    if (isExisiting) {
      dispatch(openToas({
        message: "This item is already in the cart and cannot be update",
        type: ToasEnum.ERROR,
      }))
    } else {
      router.push(`/ui/inventory/product-form?product-id=${productViewID}`)
    }
  }

  useEffect(() => {
    setIsLoading(true);

    if (!isProductViewVisible) return;

    const fetchData = async () => {
      try {
        const product = await fetchSingleProductData(productViewID);

        setProductData(product);
      } catch (e) {
        dispatch(inventoryToggleProductView({
          id: "",
          isOpen: false,
        }))
        dispatch(openToas({
          message: "Failed to fetch product",
          type: ToasEnum.ERROR,
        }))
      } finally {
        setIsLoading(false);
      }
    }

    const timeout = setTimeout(() => {
      fetchData();
    }, 1500);

    return () => clearTimeout(timeout);

  }, [isProductViewVisible]);

  return (
    <AnimatePresence>
      {isProductViewVisible && <motion.div className='w-screen h-screen absolute backdrop-blur-[2px]'
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

        onClick={() => dispatch(inventoryToggleProductView({
          id: "",
          isOpen: false,
        }))}
      >
        <div className='w-[40vw] h-screen bg-[var(--main-bg-primary)] absolute right-0'>
          {isLoading ? <ProductTabLoadingState /> : <motion.div className='w-full h-full flex flex-col overflow-auto gap-2 right-0'
            style={{
              backgroundColor: "var(--main-bg-primary)",
            }}
            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            transition={{
              ease: "easeIn",
              duration: .25,
              delay: .3
            }}
          >
            <ImageContainer url={data!.coverImage} />
            <ProductDetails
              isActive={data!.isActive}
              isFavorite={data!.isFavorite}
              name={data!.name}
              sellingPrice={data!.sellingPrice}
              promotionalDiscount={data!.promotionalDiscount}
              description={data!.description ?? ""}
              category={data!.category!}
            />
            {data?.highlights && <KeyFeatures data={data!.highlights} />}

            <VariantsTable variants={data!.variants} lowStock={data!.lowStock} />

            {/** show only if product has bulk pricing data */}
            {data!.bulkEnabled && <BulkTable bulkTier={data!.bulkTier} />}
            <div className='min-h-[2rem]' />

            {/** actions */}
            <div className='flex w-full items-center justify-end gap-3 pr-5'>

              <button className='p-[5px_10px] rounded-[4px] flex items-center gap-2 text-gray-500 border border-gray-500'
              >
                <FontAwesomeIcon icon={faClose} />
                <span>Close</span>
              </button>

              {/** update */}
              <button className='button-primary-gradient p-[5px_10px] rounded-[4px] flex items-center gap-2 text-white'
                onClick={handleUpdate}
              >
                <FontAwesomeIcon icon={faEdit} />
                <span>Update</span>
              </button>
            </div>


            {/** add to cart button */}
            <button className='button-primary-gradient place-self-center w-[calc(100%-3rem)] mb-5 min-h-[2.5rem] rounded-[7px] flex items-center gap-2.5 justify-center text-white'>
              <FontAwesomeIcon icon={faCartPlus} />
              Add to cart
            </button>
          </motion.div>}
        </div>
      </motion.div>}
    </AnimatePresence>
  )
}

export default ViewProductTab
