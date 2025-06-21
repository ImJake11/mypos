"use client";

import { CategoryModel } from '@/app/lib/models/categoryModel';
import { BulkTableProp, NewProductProps, PromotionalDiscountProp, VariantsProps } from '@/app/lib/models/newProductModel';
import { toggleProductView } from '@/app/lib/redux/inventorySlice';
import { setProductDataForUpdate } from '@/app/lib/redux/newProductSlice';
import { RootState } from '@/app/lib/redux/store';
import { faCartPlus, faCartShopping, faCircle, faClose, faEdit, faExpand, faFilter, faHeart, faImage, faKey, faListNumeric, faLock, faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from "framer-motion";

const ViewProductTab = () => {

  const router = useRouter();

  const dispatch = useDispatch();

  const { currentData, productViewOpen } = useSelector((state: RootState) => state.inventorySlice);

  const data: NewProductProps = currentData as NewProductProps;



  return (
    <AnimatePresence>
      {productViewOpen && <motion.div className='w-screen h-screen absolute backdrop-blur-[3px]'
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
        <motion.div className='absolute h-screen w-[40vw] right-0 flex flex-col p-6 overflow-auto gap-4'
          style={{
            backgroundColor: "var(--background)"
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
          <ProductDetails
            isActive={data.isActive}
            isFavorite={data.isFavorite}
            name={data.name}
            sellingPrice={data.sellingPrice}
            promotionalDiscount={data.promotionalDiscount}
            description={data.description ?? ""}
            category={data.category!}
          />
          <ImageContainer url={data.coverImage} />
          {data?.highlights && <KeyFeatures data={data.highlights} />}
          <div className='h-[1rem]' />
          <VariantsTable variants={data.variants} />
          <div className='h-[1rem]' />

          {/** show only if product has bulk pricing data */}
          {data.bulkEnabled && <BulkTable bulkTier={data.bulkTier} />}
          <div className='min-h-[2rem]' />

          {/** actions */}
          <div className='flex w-full items-center justify-end gap-3'>

            <button className='p-[10px_15px] rounded-[7px] flex items-center gap-2'
            style={{
              border: "1px solid var(--foreground)"
            }}
            >
              <FontAwesomeIcon icon={faClose} />
              <span>Close</span>
            </button>

            {/** update */}
            <button className='linear-bg-40 p-[10px_15px] rounded-[7px] flex items-center gap-2'
              onClick={() => {
                dispatch(setProductDataForUpdate(data));
                router.push("/ui/inventory/new-product")
              }}
            >
              <FontAwesomeIcon icon={faEdit} />
              <span>Update</span>
            </button>

            <button className='linear-bg-40 p-[10px_15px] rounded-[7px] flex items-center gap-2'>
              <FontAwesomeIcon icon={faLock} />
              <span>Deactivate Product</span>
            </button>
          </div>


          {/** add to cart button */}
          <button className='linear-bg-40 w-full min-h-[4rem] rounded-[7px] flex items-center gap-2.5 justify-center'>
            <FontAwesomeIcon icon={faCartPlus} />
            Add to cart
          </button>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  )
}

{/** key features */ }
interface KeyFeaturesProp {
  data: string,
}

function KeyFeatures({ data }: KeyFeaturesProp) {

  const parts: string[] = data.split(".");

  function Tile({ content }: { content: string }) {

    return <div className='flex items-center gap-2 ml-6'>
      <div className='h-[.7rem] w-[.7rem] rounded-full bg-linear-to-br from-blue-500 to-blue-700' />
      <span>{content}</span>
    </div>
  }


  return (
    <div className='flex-col w-full flex gap-1.5'>
      <span className='flex justify-start items-center gap-1.5 italic font-semibold mb-3.5'>
        <i className="ri-key-fill text-[1.5rem]"
          style={{
            color: "var(--primary)"
          }}
        ></i> Key Features
      </span>
      {parts.map((d, i) => d ? <Tile key={i} content={d} /> : null)}

    </div>
  )
}

{/** product details */ }
interface ProductDetailsProp {
  category: CategoryModel,
  name: string,
  isActive: boolean,
  description: string,
  sellingPrice: number,
  promotionalDiscount: PromotionalDiscountProp,
  isFavorite: boolean,

}

function ProductDetails({ category,
  name,
  isActive,
  description,
  sellingPrice,
  promotionalDiscount,
  isFavorite }:
  ProductDetailsProp
) {

  const { discountRate, expirationDate } = promotionalDiscount;

  // compute total price if product has discount
  function computeTotalPrice(): number {
    const computed = (discountRate / 100) * sellingPrice;
    const total = sellingPrice - computed;
    return total;
  }

  return <div className='flex-2  flex flex-col p-2.5 gap-4'>
    {/** name & status */}
    <div className='flex flex-col gap-3 w-full'>
      <span className='italic text-5xl'>{name}</span>
      <div className='flex gap-1.5'>
        <div className='bg-linear-to-r from-blue-400 to-blue-700 rounded-[7px] text-white text-[.7rem] p-[5px_15px] flex gap-2 items-center'>
          <FontAwesomeIcon icon={faFilter} /><span>{category.content}</span>
        </div>
        <div className='bg-linear-to-r from-blue-400 to-blue-700 rounded-[7px] text-white text-[.7rem] p-[5px_15px] flex gap-2 items-center'>
          <FontAwesomeIcon icon={faCircle} /><span>Active</span>
        </div>
      </div>
    </div>

    {/** description */}
    <div className='w-full flex-1  text-left '>
      <p>{description ? description : "No description"}</p>
    </div>

    {/** price */}
    <div className='flex w-full justify-between'>
      {/** total price */}
      <div className='flex gap-2 text-[1.2rem] items-center'>
        <div className='p-2'>
          <FontAwesomeIcon icon={faTag} className='text-blue-500' />
        </div>
        <span>Php {discountRate !== 0 ? computeTotalPrice() : sellingPrice}</span>

        {/** show only if product has discount */}
        {discountRate !== 0 && <span className='line-through text-gray-400'>~ Php {sellingPrice}</span>}
      </div>
      {/** favorite */}
      <div className='flex-1' />
      <div className='w-[2.5rem] h-[2.5rem] rounded-full grid place-content-center'
        style={{
          border: "solid var(--tertiary)"
        }}
      >
        <i className="ri-heart-2-fill  text-[1.5rem]"></i>
      </div>
    </div>


    {/** discount */}
    {discountRate !== 0 && <div className='w-[60%] flex gap-1.5 bg-linear-to-br from-blue-400 to-blue-700 rounded-[7px] text-white items-center p-[5px_15px] text-[1rem]'>
      <i className="ri-discount-percent-fill"></i>
      <span>{discountRate}% OFF ( Valid until: {expirationDate} )</span>
    </div>}
  </div>
}


{/** variants */ }
interface VarintsProp {
  variants: VariantsProps[],
}

function VariantsTable({ variants }: VarintsProp) {


  const totalStock: number = variants.reduce((acc, variannt) => acc + variannt.stock, 0);


  return (
    <div className='w-full flex flex-col gap-2'>

      {/** */}
      <div className='flex w-full justify-between mb-2'>
        <span className='flex justify-center items-center gap-1.5 italic font-[600]'><i className="ri-checkbox-multiple-blank-fill text-[1.5rem]"
          style={{
            color: "var(--primary)"
          }}
        /> Variants</span>
      </div>

      {/** header */}
      <div className='w-full grid grid-cols-4'>
        {variantHeaders.map((h, i) => <div key={i} className='h-[3rem]  uppercase grid place-content-center'
          style={{
            border: "solid var(--tertiary)"
          }}
        >
          <span>{h}</span>
        </div>)}
      </div>

      {/** body */}
      <div className='flex flex-col w-full gap-3'>
        {variants.map((v, i) => {
          return <div key={i} className="h-[8rem] w-full grid grid-cols-4"
            style={{
              border: "solid var(--tertiary)"
            }}
          >
            {/** image */}
            <div className='flex h-full w-full rounded-[7px] overflow-hidden'
              style={{
                backgroundColor: "var(--secondary-background)"
              }}
            >

              {/** return a icon if image is null */}
              {v.imageUrl ? <img src={v.imageUrl} alt="variant image" className='object-fill h-full ' /> :
                <div className='w-full h-full grid place-content-center'>
                  <FontAwesomeIcon icon={faImage} size='3x' className='text-gray-300' />
                </div>}
            </div>
            {/** variant description */}
            <div className='grid place-content-center'><span>{v.name}</span></div>
            {/** price adjusment */}
            <div className='grid place-content-center'><span>{v.isPositive ? "+" : "-"} {v.price}%</span></div>
            <div className='grid place-content-center'>{v.stock}</div>
          </div>
        })}
      </div>

      {/** instock units */}
      <div className='linear-bg-40 w-fit h-fit rounded-[11px] text-white p-[10px_15px] flex gap-3 items-center'>
        <i className="ri-stock-fill text-[1.2rem]" /><span>Stock in units: {totalStock}</span>
      </div>
    </div>
  )
}


{/** bulk tiers */ }
interface BulkProp {
  bulkTier: BulkTableProp[],
}

function BulkTable({ bulkTier }: BulkProp) {

  return (
    <div className='w-full flex flex-col gap-2'>
      <div className='flex w-full justify-between mb-2'>
        <span className='flex justify-center items-center gap-1.5 italic font-[600]'><i className="ri-table-fill text-[1.5rem]"
          style={{
            color: "var(--primary)"
          }}
        /> Bulk Tiers</span>
      </div>
      {/** header */}
      <div className='w-full grid grid-cols-2'>
        {bulkHeader.map((h, i) => <div key={i} className='h-[3rem]  uppercase grid place-content-center '
          style={{
            border: "solid var(--tertiary)"
          }}
        >
          <span>{h}</span>
        </div>)}
      </div>

      {/** body */}
      <div className='flex flex-col w-full gap-3'>
        {bulkTier.map((tier, i) => {
          return <div key={i} className="h-[3rem] w-full grid grid-cols-2 "
            style={{
              border: "solid var(--tertiary)"
            }}
          >
            <div className='grid place-content-center'><span>{tier.quantity}</span></div>
            <div className='grid place-content-center'><span>{tier.discount}% OFF</span></div>
          </div>
        })}
      </div>

    </div>
  )
}


{/** image container */ }
interface ImageProp {
  url: string | null,
}
function ImageContainer({ url }: ImageProp) {

  return (
    <div className='aspect-square bg-gray-100 w-full rounded-[11px] relative flex'>
      {url ? <img src={url} alt="cover image" className='object-cover' /> :
        <FontAwesomeIcon icon={faImage} size='4x' className='place-self-center text-gray-400' />}
    </div>
  )
}

export default ViewProductTab


const variantHeaders: string[] = [
  "Photo", "Variant", "Price", "Stock",
]

const bulkHeader: string[] = ["Minimum Quantity", "Discount Rate"];