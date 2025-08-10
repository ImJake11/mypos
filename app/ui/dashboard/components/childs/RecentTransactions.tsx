import { gcashIcon, mastercartIcon, mayaIcon } from '@/app/lib/constants/IconLink'
import { PaymentProvider } from '@/app/lib/enum/paymentMethod'
import { TransactionStatus } from '@/app/lib/enum/transactionStatus'
import { RootState } from '@/app/lib/redux/store'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const RecentTransactions = () => {

    const { recentTransactions } = useSelector((state: RootState) => state.dashboarSlice);

    return (
        <div className='w-full h-full flex flex-col gap-2 pt-3 overflow-auto'>
            {recentTransactions.map((transaction, i) => <Tile data={transaction} key={i} />)}
        </div>
    )
}


function Tile({
    data
}: {
    data: any
}) {

    const date = new Date(data.date);

    const formattedDate = date.toLocaleDateString('en-US', { dateStyle: 'long' });
    const formattedTime = date.toLocaleTimeString('en-US', { timeStyle: "short" });

    const getIcon = (): string | null => {
        switch (data.paymentProvider) {
            case PaymentProvider.GCASH:
                return gcashIcon; case PaymentProvider.MASTERCARD:
                return mastercartIcon;
            case PaymentProvider.MAYA:
                return mayaIcon;
            default:
                return null;
        }
    }

    const getBgColor = () => {

        switch (data.status) {
            case TransactionStatus.COMPLETED:
                return "bg-green-500/10"
            case TransactionStatus.REFUND:
                return "bg-orange-500/10";
            default:
                return "bg-red-500/10"
        }
    }

    const getTextColor = () => {

        switch (data.status) {
            case TransactionStatus.COMPLETED:
                return "text-green-500"
            case TransactionStatus.REFUND:
                return "text-orange-500";
            default:
                return "text-red-500"
        }
    }

    return (
        <motion.div className='text-gray-500 w-full flex gap-2.5 items-center pl-2 p-[5px_0] pr-2 rounded-[4px] min-h-[3.5rem] bg-gray-100/40 dark:bg-[var(--main-bg-primary-dark)]'
        >
            <div className='w-[2.5rem] h-[1.5rem] bg-gray-200 rounded-[4px] overflow-hidden p-1.5 flex'>
                {getIcon() ? <img src={getIcon()!} alt="i" className='object-contain w-full h-full' /> : <span className='h-full grid place-content-center w-full'>
                    <span className='text-[.6rem] text-gray-600 font-[500]'>Cash</span>
                </span>}
            </div>
            <span>{formattedDate} - {formattedTime}</span>
            <div className='flex-1' />


            <Link href={`/ui/transaction/details/${data.transactionId}`}>
                <span className={`${getBgColor()} p-[2px_6px] rounded-[4px] ${getTextColor()} font-[500]`}>View</span>
            </Link>
        </motion.div>
    )
}

export default RecentTransactions
