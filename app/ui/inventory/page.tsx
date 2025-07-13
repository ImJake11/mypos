import React from 'react'
import Sidebar from '@/app/lib/components/Sidebar/Sidebar'
import { ProductProps } from '@/app/lib/models/productModel';
import ViewProductTab from './components/InventoryProductViewTab/ProductTab';
import ProductList from './components/InventoryProductList';
import Toas from '@/app/lib/components/Toas';
import InventoryAppar from './components/InventoryAppar';
import { CategoryModel } from '@/app/lib/models/categoryModel';
import ProcessDialog from '@/app/lib/components/ProcessDialog/ProcessDialog';
import FilterTab from '../../lib/components/FilterTab/FilterTab';
import { InventoryAction } from '@/app/lib/redux/utils/enums/inventoryActionEnums';
import Cart from '../pos/components/cart/Cart';

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
            <FilterTab
                onPrimaryButtonContext={InventoryAction.INVENTORY_FILTER_DATA}
                onClearFilterContext={InventoryAction.INVENTORY_CLEAR_FILTER_DATA}
            />
            <ViewProductTab />
            <Cart />
            <Toas />
            <ProcessDialog />
        </div>
    )
}
