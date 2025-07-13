import React from 'react'
import Sidebar from '@/app/lib/components/Sidebar/Sidebar'
import ProductInformationDetails from './components/ProductInformationDetails'
import Prices from './components/ProductFormPrices'
import Stock from './components/ProductFormStock'
import Variants from './components/ProductFormVariants'
import UploadMedia from './components/ProductFormMedia'
import Actions from './components/ProductFormActions'
import Toas from '@/app/lib/components/Toas'
import ProcessDialog from '@/app/lib/components/ProcessDialog/ProcessDialog'
import ProductFormStatus from './components/ProductFormStatus'


const page = () => {

    return (
        <div className='w-screen h-screen flex overflow-hidden relative'>
            <Sidebar />

            <div className='flex-1 flex flex-col overflow-hidden'>
                {/** appbar */}
                <div className='flex w-full min-h-[4rem] justify-between items-center p-[0_20px] bg-[var(--main-bg-primary-dark)]'
                >
                    <span className='text-[1.2rem] font-semibold italic '>Product form</span>
                </div>
                {/** body */}
                <div className='gap-5 flex flex-col flex-1 rounded-[11px] m-1.5 p-3 overflow-auto bg-[var(--main-bg-secondary-dark)]'
                >
                    <ProductFormStatus />
                    <ProductInformationDetails />
                    <Prices />
                    <Stock />
                    <Variants />
                    <UploadMedia />
                    <Actions />
                </div>
            </div>
            <Toas />
            <ProcessDialog />
        </div>
    )
}

export default page
