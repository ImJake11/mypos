import Sidebar from '@/app/lib/components/Sidebar/Sidebar'
import React from 'react'
import { ProductProps } from '@/app/lib/models/productModel';
import ViewProductTab from './components/InventoryProductViewTab/ProductTab';
import ProductList from './components/InventoryProductList';
import Toas from '@/app/lib/components/Toas';
import InventoryAppar from './components/InventoryAppar';
import { CategoryModel } from '@/app/lib/models/categoryModel';
import ProcessDialog from '@/app/lib/components/ProcessDialog/ProcessDialog';
import InventoryFilterContainer from './components/InventoryFilterContainer';

export default async function Page() {

    const protocol = process.env.WEBSITE_PROTOCOL;
    const host = process.env.WEBSITE_HOST;
    const port = process.env.WEBSITE_PORT;

    const baseUrl = `${protocol}://${host}:${port}`

    const productResponse = await fetch(`${baseUrl}/api/product`, {
        method: "GET",
    });

    const categoryResponse = await fetch(`${baseUrl}/api/category`, {
        method: "GET",
    });

    if (!productResponse.ok) {
        throw new Error(`Failed to fetch product: ${productResponse.statusText}`)
    }

    const { productData } = await productResponse.json();

    const products: ProductProps[] = productData;

    const { categoryData } = await categoryResponse.json();

    const categories: CategoryModel[] = categoryData;


    return (
        <div className='bg-[var(--background)] w-screen h-screen flex overflow-hidden relative'
            style={{

            }}
        >
            <Sidebar />
            <div className='flex-1  flex flex-col'>
                {/** appbar */}
                <InventoryAppar />
                {/** body */}
                <ProductList rawData={products} categoryData={categoryData} />
            </div>
            <InventoryFilterContainer categories={categoryData} />
            <ViewProductTab />
            <Toas />
            <ProcessDialog />
        </div>
    )
}
