
import { TransactionFilterKeys } from '@/app/lib/constants/TransactionFilterKeys';
import { TransactionFilterModel } from '@/app/lib/models/transactionFilterModel';
import { RootState } from '@/app/lib/redux/store'
import { transactionUpdateFilterData } from '@/app/lib/redux/slice/transactionSlice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const TransactionTaxOptions = () => {

    const {
        mixedTran,
        vatableTran,
        zeroRatedTran,
        exemptTran,
    } = useSelector((state: RootState) => state.transaction.filterData);

    return (
        <div className='w-full flex flex-col gap-4'>
            <span>Transaction Tax Options</span>
            {/** mixed transactions */}
            <CheckBoxOptions isSelected={mixedTran !== undefined && mixedTran} name='Mixed Transactions' modelKey={TransactionFilterKeys.mixedTran} />

            {/** includes tax */}
            <CheckBoxOptions isSelected={vatableTran !== undefined && vatableTran} name='Taxable Sales' modelKey={TransactionFilterKeys.vatableTran} />

            {/** includes tax */}
            <CheckBoxOptions isSelected={zeroRatedTran !== undefined && zeroRatedTran} name='Zero-rated Sales' modelKey={TransactionFilterKeys.zeroRatedTran} />

            {/** includes zero tax */}
            <CheckBoxOptions isSelected={exemptTran !== undefined && exemptTran} name='VAT-Exempt Sales' modelKey={TransactionFilterKeys.exemptTran} />
        </div>
    )
}

function CheckBoxOptions({ name, isSelected, modelKey }: {
    name: string,
    isSelected: boolean
    modelKey: string,
}) {

    const dispatch = useDispatch();

    const handleAction = () => {
        dispatch(transactionUpdateFilterData({
            data: !isSelected,
            name: modelKey as keyof TransactionFilterModel,
        }));
    }

    return <div className='flex gap-3 w-full items-center'>
        {/** check box */}
        <div className='w-[1.5rem] h-[1.5rem] rounded-[3px] border border-[var(--tf-border-default)] relative overflow-hidden'
            onClick={handleAction}
        >
            {isSelected && <div className='absolute inset-0 button-primary-gradient grid place-content-center'>
                <i className="ri-check-fill" />
            </div>}
        </div>
        <span>{name}</span>
    </div>
}

export default TransactionTaxOptions
