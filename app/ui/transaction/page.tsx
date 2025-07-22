import Sidebar from '@/app/lib/components/Sidebar/Sidebar'
import React from 'react'
import TransactionBody from './components/TransactionBody'
import TransactionFilterTab from './components/TransactionFilter/TransactionFilterTab'
import Toas from '@/app/lib/components/Toas'
import TransactionPDFLayout from './components/TransactionPDF/TransactionPDFLayout'
import GlobalWrapper from '@/app/lib/components/GlobalWrapper'

const page = () => {

    return (
        <div className='w-screen h-screen flex overflow-hidden relative'>
            <GlobalWrapper child={<TransactionBody />} />
            <Sidebar />
            <TransactionFilterTab />
            <Toas />
            <TransactionPDFLayout />
            <Toas />
        </div>
    )
}



export default page
