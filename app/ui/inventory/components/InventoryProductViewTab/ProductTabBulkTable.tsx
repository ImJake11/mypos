import { BulkTableProp } from "@/app/lib/models/productModel"


{/** bulk tiers */ }
interface BulkProp {
    bulkTier: BulkTableProp[],
}

export default function BulkTable({ bulkTier }: BulkProp) {

    return (
        <div className='w-full flex flex-col gap-2 p-5'>
            <div className='flex w-full justify-between mb-2'>
                <span className='flex justify-center items-center gap-1.5 italic font-[600]'><i className="ri-table-fill text-[1.5rem]"
                    style={{
                        color: "var(--color-brand-primary)"
                    }}
                /> Bulk Tiers</span>
            </div>
            {/** header */}
            <div className='w-full grid grid-cols-2'>
                {bulkHeader.map((h, i) => <div key={i} className='h-[2rem]  uppercase grid place-content-center '
                    style={{
                        border: "solid 1px var(--main-bg-secondary-dark)"
                    }}
                >
                    <span>{h}</span>
                </div>)}
            </div>

            {/** body */}
            <div className='flex flex-col w-full gap-3'>
                {bulkTier.map((tier, i) => {
                    return <div key={i} className="h-[2rem] w-full grid grid-cols-2 "
                        style={{
                            border: "solid 1px var(--main-bg-secondary-dark)"
                        }}
                    >
                        <div className='grid place-content-center'><span>{tier.quantity}</span></div>
                        <div className='grid place-content-center'><span>{tier.discount}% OFF</span></div>
                    </div>
                })}
            </div>

        </div>
    )
}

const bulkHeader: string[] = ["Minimum Quantity", "Discount Rate"];