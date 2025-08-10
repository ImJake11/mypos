import React from 'react'
import Sidebar from '@/app/lib/components/Sidebar/Sidebar'
import ProductList from './components/InventoryProductList';
import InventoryAppar from './components/InventoryAppar';
import FilterTab from '../../lib/components/FilterTab/FilterTab';
import { InventoryAction } from '@/app/lib/redux/utils/enums/inventoryActionEnums';
import GlobalWrapper from '@/app/lib/components/GlobalWrapper';

export default async function Page() {


    return (
        <div className='w-screen h-screen flex overflow-hidden relative'>
            <GlobalWrapper>
                <div className='w-full h-full flex flex-col relative'>
                    {/** appbar */}
                    <InventoryAppar />
                    {/** body */}
                    <ProductList />
                </div>
            </GlobalWrapper>
            <FilterTab
                onPrimaryButtonContext={InventoryAction.INVENTORY_FILTER_DATA}
                onClearFilterContext={InventoryAction.INVENTORY_CLEAR_FILTER_DATA}
            />
        </div>
    )
}
