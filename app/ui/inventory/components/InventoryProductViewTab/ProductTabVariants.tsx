import { VariantsProps } from "@/app/lib/models/productModel";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



{/** variants */ }
interface VarintsProp {
    variants: VariantsProps[],
    lowStock: number,
}

export default function VariantsTable({ variants, lowStock }: VarintsProp) {


    const totalStock: number = variants.reduce((acc, variannt) => acc + variannt.stock, 0);


    return (
        <div className='w-full flex flex-col gap-2 p-5'>

            {/** */}
            <div className='flex w-full justify-between mb-2'>
                <span className='flex justify-center items-center gap-1.5 italic font-[600]'><i className="ri-checkbox-multiple-blank-fill text-[1.2rem]"
                    style={{
                        color: "var(--color-brand-primary)"
                    }}
                /> Variants</span>
            </div>

            {/** header */}
            <div className='w-full grid grid-cols-4'>
                {variantHeaders.map((h, i) => <div key={i} className='h-[2rem]  uppercase grid place-content-center'
                    style={{
                        border: "solid 1px var(--main-bg-secondary-dark)"
                    }}
                >
                    <span>{h}</span>
                </div>)}
            </div>

            {/** body */}
            <div className='flex flex-col w-full gap-3'>
                {variants.map((v, i) => {
                    return <div key={i} className="h-[5rem] w-full grid grid-cols-4 p-2"
                        style={{
                            border: "solid 1px var(--main-bg-secondary-dark)"
                        }}
                    >
                        {/** image */}
                        <div className='h-full w-full grid place-content-center'
                            style={{
                                backgroundColor: "var(--secondary-background)"
                            }}
                        >
                            {/** return a icon if image is null */}
                            <div className="h-[4rem] aspect-square rounded-[8px] overflow-hidden">
                                {v.imageUrl ? <img src={v.imageUrl} alt="variant image" className='object-fill h-[5rem] aspect-square rounded-[8px]' /> :
                                    <div className='w-full h-full grid place-content-center'>
                                        <FontAwesomeIcon icon={faImage} size='3x' className='text-gray-300' />
                                    </div>}
                            </div>
                        </div>


                        {/** variant description */}
                        <div className='grid place-content-center'><span>{v.name}</span></div>
                        {/** price adjusment */}
                        <div className='grid place-content-center'><span>{v.isPositive ? "+" : "-"} {v.price}%</span></div>
                        <div className='grid place-content-center'>{v.stock}</div>
                    </div>
                })}
            </div>

            {/** instock units */}
            <div className='button-primary-gradient w-fit h-fit rounded-[8px] text-white p-[3px_5px] flex gap-3 items-center'>
                <i className="ri-stock-fill text-[1.2rem]" /><span>Stock in units: {totalStock}</span>
            </div>

            {/** low stock treshold */}
            <div className='border border-[var(--main-bg-secondary-dark)] w-fit h-fit rounded-[8px] text-white p-[3px_5px] flex gap-3 items-center'>
                <i className="ri-stock-fill text-[1.2rem]" /><span>Low stock treshhold: {lowStock}</span>
            </div>
        </div>
    )
}

const variantHeaders: string[] = [
    "Photo", "Variant", "Price", "Stock",
]
