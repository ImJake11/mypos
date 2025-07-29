'use client';

import { TransactionStatus } from '@/app/lib/enum/transactionStatus';
import { IconArrowBackUpDouble, IconProgressX, IconTransitionLeftFilled } from '@tabler/icons-react';
import Link from 'next/link';
import React, { useState } from 'react'
import TransactionDetailsVoidConfirmationPrompt from './TransactionDetailsVoidConfirmationPrompt';
import { useWindowSize } from '@/app/lib/utils/hooks/useGetWindowSize';

const TransactionDetailsActions = ({
    id,
    status
}: {
    id: string,
    status: string,
}) => {
    const [isVoid, setIsVoid] = useState(false);
    const isComplete = status === TransactionStatus.COMPLETED;

    const { width } = useWindowSize();

    const isMobile = width < 576;

    if (isVoid) return <TransactionDetailsVoidConfirmationPrompt onCancel={() => setIsVoid(false)} id={id} />;

    return (
        <div className={`w-full flex flex-col gap-3 bg-white rounded-[12px]
        ${isMobile ? "p-3" : "p-5"}
        `}>

            {isComplete && <Link href={`/ui/transaction/refund-page/${id}`}>
                <ButtonTile
                    color='orange-500'
                    icon={<IconArrowBackUpDouble size={18} />}
                    title='Refund'
                />
            </Link>}

            {isComplete &&
                <ButtonTile
                    color='red-500'
                    icon={<IconProgressX size={18} />}
                    title='Void'
                    onClick={() => setIsVoid(true)}
                />
            }

            <Link href={`/ui/transaction`}>
                <ButtonTile
                    color='blue-500'
                    icon={<IconTransitionLeftFilled size={18} />}
                    title='Back To Transactions'
                />

            </Link>
        </div>
    )
}

function ButtonTile({
    icon,
    title,
    color,
    onClick,
}: {
    icon: React.JSX.Element,
    title: string,
    color: string,
    onClick?: () => void,
}) {

    return <div className='w-full flex gap-2 items-center'>
        {icon}
        <span>{title}</span>
        <div className='flex-1' />
        <button className={`text-[.7rem] border border-${color} text-${color} rounded-[4px] p-[4px_7px]`} onClick={onClick}>Proceed</button>

    </div>
}

export default TransactionDetailsActions
