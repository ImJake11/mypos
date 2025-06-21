import React from 'react'
import Sidebar from '@/app/lib/components/Sidebar/Sidebar'
import ProductInformationDetails from './ProductInformationDetails'
import Prices from './Prices'
import Stock from './Stock'
import Variants from './Variants'
import UploadMedia from './UploadMedia'
import Actions from './Actions'
import DatePicker from '@/app/lib/components/DatePicker/DatePicker'
import Toas from '@/app/lib/components/Toas'
import NewCategoryTab from './components/NewCategoryTab'
import ProcessDialog from '@/app/lib/components/ProcessDialog/ProcessDialog'


const page = () => {
    
    return (
        <div className='w-screen h-screen flex overflow-hidden relative'>
            <Sidebar />

            <div className='flex-1 flex flex-col overflow-hidden'>
                {/** appbar */}
                <div className='flex w-full  min-h-[4rem] justify-between items-center p-[0_20px]'
                style={{
                    backgroundColor: "var(--background)"
                }}
                >
                    <span className='text-[1.2rem] font-semibold italic '>New Product</span>
                </div>
                {/** body */}
                <div className='gap-5 flex flex-col flex-1 rounded-[11px] m-1.5 p-3 overflow-auto'
                style={{
                    backgroundColor: "var(--secondary-background)"
                }}
                >
                    <ProductInformationDetails />
                    <Prices />
                    <Stock />
                    <Variants />
                    <UploadMedia />
                    <Actions />
                </div>
            </div>
            <NewCategoryTab />
            <DatePicker />
            <Toas />
            <ProcessDialog />
           
        </div>
    )
}

export default page
