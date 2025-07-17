

import React from 'react'
import TransactionTF from './TransactionTF'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/lib/redux/store';
import { transactionUpdateFilterData } from '@/app/lib/redux/slice/transactionSlice';
import { TransactionFilterKeys } from '@/app/lib/constants/TransactionFilterKeys';

const TransactionPriceRange = () => {

    const dispatch = useDispatch();

    const { maximumNetTotal, minimunNetTotal } = useSelector((state: RootState) => state.transaction.filterData);

    return (
        <div className='w-full flex flex-col gap-3'>
            <span>Total amount range</span>

            <div className='w-full flex gap-2 items-center'>
                <PriceField child={<TransactionTF paddingLeft="1.5rem" placeHolder={""} value={String(minimunNetTotal ?? "")} name={'Minimum'} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                    const { value } = e.target;

                    dispatch(transactionUpdateFilterData({
                        data: value,
                        name: TransactionFilterKeys.minimunNetTotal
                    }))
                }} />} />

                <span className='translate-y-3.5'>To</span>

                <PriceField child={<TransactionTF paddingLeft="1.5rem" placeHolder={""} value={String(maximumNetTotal ?? "")} name={'Maximum'} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                    const { value } = e.target;

                    dispatch(transactionUpdateFilterData({
                        data: value,
                        name: TransactionFilterKeys.maximumNetTotal
                    }))
                }} />} />
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
