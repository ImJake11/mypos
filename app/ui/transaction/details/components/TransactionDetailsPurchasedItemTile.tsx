import { capitalizeFirtLetter } from "@/app/lib/utils/services/capitalizeFirstLetter";


export function TransactionPurchasedItemsTile({ price, quantity, url, name }: {
    productID: string,
    price: number,
    quantity: number,
    name: string,
    url: string,
}) {

    return <div className={`flex w-full items-center gap-5 text-[.6rem] md:text-[.8rem]`}>
        {/** image container */}
        <div className=' w-[2rem] md:w-[3rem] rounded-[8px] aspect-square overflow-hidden'
        >
            <img src={url} alt="image" className="w-full h-full" />
        </div>
        {/** name */}
        <span>{capitalizeFirtLetter(name)}</span>
        <span>{Number(price).toLocaleString('en-us', {
            style: "currency",
            currency: "PHP",
        })} (x{quantity})</span>
        {/** total */}
        <span className='flex-1 grid place-content-end'>{Number(quantity * price).toLocaleString("en-US", {
            style: "currency",
            currency: "PHP"
        })}</span>
    </div>
}
