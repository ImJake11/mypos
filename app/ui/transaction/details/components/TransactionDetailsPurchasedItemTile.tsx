import { capitalizeFirtLetter } from "@/app/lib/utils/services/capitalizeFirstLetter";


export async function TransactionPurchasedItemsTile({ price, quantity, url, name }: {
    productID: string,
    price: number,
    quantity: number,
    name: string,
    url: string,
}) {


    return <div className='flex w-full items-center gap-5'>
        {/** image container */}
        <div className='w-[3rem] rounded-[8px] aspect-square overflow-hidden'
            style={{
                backgroundColor: "var(--main-bg-primary-dark)"
            }}
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
