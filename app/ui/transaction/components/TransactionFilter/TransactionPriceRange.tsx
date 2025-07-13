

import React from 'react'
import TransactionTF from './components/TransactionTF'

const TransactionPriceRange = () => {
    return (
        <div className='w-full flex flex-col gap-3'>
            <span>Total amount range</span>

            <div className='w-full flex gap-2 items-center'>
                <PriceField child={<TransactionTF paddingLeft="1.5rem" placeHolder={""} name={'Minimum'} />} />

                <span className='translate-y-3.5'>To</span>

                <PriceField child={<TransactionTF paddingLeft="1.5rem" placeHolder={""} name={'Maximum'} />} />
            </div>

        </div>
    )
}

function PriceField({ child }: { child: React.JSX.Element }) {
    return <div className='flex-1 relative'>
        {child}
        <span className='absolute left-2 top-1/2'>₱</span>
    </div>
}


export default TransactionPriceRange 
