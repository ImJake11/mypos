import Sidebar from '@/app/lib/components/Sidebar/Sidebar'
import React from 'react'
import ProductTile from './components/ProductTile'
import { NewProductProps } from '@/app/lib/models/newProductModel';
import ViewProductTab from './components/ViewProductTab';
import ProductList from './components/ProductList';
import Toas from '@/app/lib/components/Toas';

export default async function Page() {

    const protocol = process.env.WEBSITE_PROTOCOL;
    const host = process.env.WEBSITE_HOST;
    const port = process.env.WEBSITE_PORT;

    const baseUrl = `${protocol}://${host}:${port}`

    const res = await fetch(`${baseUrl}/api/product`, {
        method: "GET",
    });

    if (!res.ok) {
      
        throw new Error(`Failed to fetch product: ${res.statusText}`)
    }

    const { data } = await res.json();

    const rawData: NewProductProps[] = data; 

    return (
        <div className='w-screen h-screen flex overflow-hidden relative'
        style={{
            backgroundColor: "var(--secondary-background)",
        }}
        >
            <Sidebar />

            <div className='flex-1  flex flex-col'>
                {/** appbar */}
                <div className='flex w-full min-h-[4rem] h-[4rem] justify-between items-center p-[0_20px]'
                style={{
                    backgroundColor: "var(--background)"
                }}
                >
                    <span className='text-[1.2rem] font-semibold italic'>Inventory</span>
                </div>

                {/** body */}
                <ProductList rawData={rawData} />
            </div>
            <ViewProductTab />
            <Toas />

        </div>
    )
}
