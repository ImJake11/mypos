import Sidebar from '@/app/lib/components/Sidebar/Sidebar'
import React from 'react'
import ProductTile from './components/ProductTile'
import { NewProductProps } from '@/app/lib/models/newProductModel';
import ViewProductTab from './components/ViewProductTab';
import ProductList from './components/ProductList';
import Toas from '@/app/lib/components/Toas';
import InventoryAppar from './components/InventoryAppar';
import CategoriesList from './components/CategoriesList';
import { CategoryModel } from '@/app/lib/models/categoryModel';

export default async function Page() {

    const protocol = process.env.WEBSITE_PROTOCOL;
    const host = process.env.WEBSITE_HOST;
    const port = process.env.WEBSITE_PORT;

    const baseUrl = `${protocol}://${host}:${port}`

    const productResponse = await fetch(`${baseUrl}/api/product`, {
        method: "GET",
    });

    if (!productResponse.ok ) {
        throw new Error(`Failed to fetch product: ${productResponse.statusText}`)
    }

    const { data } = await productResponse.json();

    const productData: NewProductProps[] = data;
    

    return (
        <div className='gradient-main-background w-screen h-screen flex overflow-hidden relative'
            style={{

            }}
        >
            <Sidebar />

            <div className='flex-1  flex flex-col'>
                {/** appbar */}
                <InventoryAppar />
                <CategoriesList />
                {/** body */}
                <ProductList rawData={productData} />
            </div>
            <ViewProductTab />
            <Toas />

        </div>
    )
}
