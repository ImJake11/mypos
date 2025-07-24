
import { gcashIcon, mastercartIcon, mayaIcon } from '@/app/lib/constants/IconLink';
import { PaymentMethod, PaymentProvider } from '@/app/lib/enum/paymentMethod';
import { TransactionStatus } from '@/app/lib/enum/transactionStatus';
import { TransactionReturned, TransactionSuccessfulIcon, TransactionVoidIcon } from '@/app/lib/icons/transactionTypeIcons';
import { TransactionDetailsModel } from '@/app/lib/models/transactionModel'
import React from 'react'

const TransactionDetailsStatus = ({ data }: { data: TransactionDetailsModel }) => {

    const {
        status,
        paymentMethod,
        paymentProvider,
        netTotal,
    } = data;

    const getPaymentProviderIcon = (): string => {
        if (paymentMethod === PaymentMethod.CASH) return "";

        if (paymentProvider === PaymentProvider.GCASH) {
            return gcashIcon;
        } else if (paymentProvider === PaymentProvider.MASTERCARD) {
            return mastercartIcon;
        } else {
            return mayaIcon;
        }
    }

    const generateStatusIcon = (): React.JSX.Element => {

        const color = "var(--main-bg-secondary)";
        const size = 70;

        if (status === TransactionStatus.COMPLETED) {
            return <TransactionSuccessfulIcon color={color} size={size} />;

        } else if (status === TransactionStatus.REFUND) {
            return <TransactionReturned size={size} color={color} />;

        } else {
            return <TransactionVoidIcon color={color} size={size} />;
        }
    }

    return (
        <div className='w-full flex gap-4'>
            <div className='w-[10rem] aspect-square rounded-full relative grid place-content-center'
                style={{
                    backgroundColor: "var(--main-bg-primary)",
                    border: "8px solid var(--main-bg-secondary)",
                }}
            >
                {generateStatusIcon()}

                {/** payment provider icon container */}
                <div className='absolute -right-2 bottom-0 w-[3rem] aspect-square rounded-full grid place-content-center'
                    style={{
                        backgroundColor: "var(--main-bg-primary)",
                        border: "5px solid var(--main-bg-secondary)",
                    }}
                >
                    {getPaymentProviderIcon() ? <img src={getPaymentProviderIcon()} alt="img" width={24} height={24} /> : <span className='text-[1.5rem] font-bold'>C</span>}
                </div>

            </div>

            {/** details */}
            <div className='flex-1 flex flex-col justify-end gap-3'>
                <span>paid via <span className='font-bold'>{paymentMethod}</span>
                </span>

                {/** total */}
                <span className='text-[1.5rem] font-bold'>{Number(netTotal).toLocaleString('en-US', {
                    style: "currency",
                    currency: "PHP"
                })}</span>
                <div className='h-[3rem] w-[10rem] overflow-hidden rounded-[50px] grid place-content-center'
                    style={{
                        backgroundColor: "var(--main-bg-primary)"
                    }}
                >
                    {status.toUpperCase()}
                </div>
            </div>
        </div>
    )
}

export default TransactionDetailsStatus
