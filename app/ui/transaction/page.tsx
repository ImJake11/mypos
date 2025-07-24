import React from 'react'
import TransactionBody from './components/TransactionBody'
import TransactionFilterTab from './components/TransactionFilter/TransactionFilterTab'
import TransactionPDFLayout from './components/TransactionPDF/TransactionPDFLayout'
import GlobalWrapper from '@/app/lib/components/GlobalWrapper'

const page = () => {

    return (
        <div className='w-screen h-screen flex overflow-hidden relative'>
            <GlobalWrapper child={<TransactionBody />} />
            <TransactionFilterTab />
            <TransactionPDFLayout />
        </div>
    )
}



export default page
