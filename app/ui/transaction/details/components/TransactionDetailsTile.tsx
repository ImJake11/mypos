'use client';

import { useWindowSize } from "@/app/lib/utils/hooks/useGetWindowSize"

export default function TransactionDetailsTile({ title, data }: { title: string, data: any }) {

    const { width } = useWindowSize();

    const isMobile = width < 576;

    return <div className={`flex w-full justify-between ${isMobile ? "text-[.6rem]" : "text-[.8rem]"}`}>
        <span>{title}</span>
        <span>{data}</span>
    </div>
}
