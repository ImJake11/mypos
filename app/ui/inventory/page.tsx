import React from 'react'
import Sidebar from '@/app/lib/components/Sidebar/Sidebar'
import { ProductProps } from '@/app/lib/models/productModel';
import ViewProductTab from './components/InventoryProductViewTab/ProductTab';
import ProductList from './components/InventoryProductList';
import Toas from '@/app/lib/components/Toas';
import InventoryAppar from './components/InventoryAppar';
import { CategoryModel } from '@/app/lib/models/categoryModel';
import ProcessDialog from '@/app/lib/components/ProcessDialog/ProcessDialog';
import InventoryFilterContainer from './components/InventoryFilterTab/InventoryFilterContainer';

export default async function Page() {


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
                <ProductList />
            </div>
            <InventoryFilterContainer categories={[]} />
            <ViewProductTab />
            <Toas />
            <ProcessDialog />
        </div>
    )
}
