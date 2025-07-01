import { BulkTableProp } from "@/app/lib/models/productModel"


interface TierInterface {
    index: number,
    tier: BulkTableProp,// -- current number of quantity applied on the selected variant
}


interface Prop {
    data: BulkTableProp[],
    quantity: number,
}
export default function BulkTable({ data, quantity }: Prop) {

    const indexOfTierApplied = data.findLastIndex(tier => quantity >= tier.quantity);

    const Tier = ({ index, tier }: TierInterface) => {

        const isTierApplier = indexOfTierApplied === index;

        return <div className='flex w-full h-[3rem] border border-[var(--main-bg-secondary-dark)] items-center text-[var(--foreground-lighter)]'>
            {/** tier */}
            <span className='flex-1 flex gap-2 justify-center'>
                <span className='font-semibold text-[var(--color-brand-primary)]'>Tier {index + 1} </span>
            </span>

            {/** min quantity */}
            <span className='flex-1 flex gap-2 justify-center'>
                <span>Minimum Quantity: </span>
                <span className='font-semibold italic'>{tier.quantity}</span>
            </span>

            {/** discount rate */}
            <span className='flex-1 flex gap-2 justify-center'>
                <span>Discount Rate: </span>
                <span className='font-semibold italic'>{tier.discount}%</span>
            </span>

            {/** status (eg. applied or not) */}
            <span className={`flex-1 flex gap-2 justify-center ${isTierApplier ? "text-[var(--color-brand-primary)] font-semibold" : "text-[var(--foreground-lighter)]"}`}>
                {isTierApplier ? "Applied" : "Not applicable"}
            </span>
        </div>
    }

    return <div className='flex flex-col w-full items-center gap-3 mt-3'>
        {data.length > 0 && <span>--- Bulk Pricing ---</span>}

        {/** body */}
        {data.map((tier, i) => <Tier key={i} index={i} tier={tier} />)}
    </div>
}
