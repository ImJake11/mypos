
import Sidebar from '@/app/lib/components/Sidebar/Sidebar'
import React from 'react'
import { PosProductList } from './components/PosProductList'
import { CategoryModel } from '@/app/lib/models/categoryModel'
import { ProductProps } from '@/app/lib/models/productModel'
import ProductDetailsTab from './components/product_details_tab/ProductDetailsTab'
import Toas from '@/app/lib/components/Toas'
import PosAppbar from './components/PosAppbar'
import Cart from './components/cart/Cart'

const page = async () => {
  const protocol = process.env.WEBSITE_PROTOCOL;
  const port = process.env.WEBSITE_PORT;
  const host = process.env.WEBSITE_HOST;

  const categoryUrl = `${protocol}://${host}:${port}/api/category`;
  const productsUrl = `${protocol}://${host}:${port}/api/product`;

  const categoryRes = await fetch(categoryUrl, {
    method: "GET",
  })

  const productRes = await fetch(productsUrl, {
    method: "GET",
  })

  if (!categoryRes.ok || !productRes.ok) return null;

  const { categoryData } = await categoryRes.json();

  const { productData } = await productRes.json();

  const categories: CategoryModel[] = categoryData;

  const products: ProductProps[] = productData;

  return (
    <div className='w-screen h-screen bg-[var(--main-bg-primary-dark)] flex relative overflow-hidden'>
      <Sidebar />
      <div className='flex-1 flex flex-col'>
        <PosAppbar />
        {/** body */}
        <div className='flex-1 flex bg-[var(--background)]'>
          <PosProductList categories={categories} products={products} />
        </div>
      </div>

      <ProductDetailsTab />
      <Cart />
      <Toas />
    </div>
  )
}

export default page
