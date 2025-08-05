"use client";
import { BulkTableProp, ProductProps } from "@/app/lib/models/productModel";
import { formDeleteBulkTire, formUpdateBulkTier } from "@/app/lib/redux/slice/productSlice";
import { AppDispatch } from "@/app/lib/redux/store";
import { faArrowRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";

interface Prop {
    data: ProductProps
}

function generateBorderColor(condition: boolean) {

    if (condition) {
        return "border-[var(--color-brand-primary)]"
    }

    return "border-red-400";

}

interface CellProp {
    dispatch: AppDispatch,
    quantity: number,
    discount: number,
    index: number
    total: number,
    sellingPrice: number,
}

export default function BulkTable({ data }: Prop) {

    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className={`flex flex-col w-full text-[.6rem] md:text-[.8rem]`}>
            {/** header */}
            <div className='flex'>
                {Header("Min Qty", "flex-2")}
                {Header("Discount (%)", "flex-2")}
                {Header("Total", "flex-2")}
                {Header("Action", `flex-1 md:flex-2`)}
            </div>

            {/** cells */}
            {data.bulkTier.map((d, i) => {

                // compute the total 
                function total() {
                    // 1. Get the total of all items (before discount)
                    const allItemsTotal = d.quantity * data.sellingPrice;

                    // 2. Calculate the discount AMOUNT (e.g., if discount is 10, it's 10% of allItemsTotal)
                    const discountPercentage = d.discount / 100;
                    const totalDiscountAmount = allItemsTotal * discountPercentage;

                    // 3. Deduct the total discount amount from the total value
                    const finalTotal = allItemsTotal - totalDiscountAmount;

                    return finalTotal;
                }


                return <Cell key={i} index={i} sellingPrice={data.sellingPrice} discount={d.discount} quantity={d.quantity} total={total()} dispatch={dispatch} />
            })}
        </div>
    );
}


const Header = (name: string, flex: string) => (
    <div className={`${flex} h-[2.5rem] grid place-content-center border border-gray-200`}
    ><span>{name}</span>
    </div>
)


const Cell = ({
    quantity,
    discount,
    index,
    total,
    sellingPrice,
}: CellProp) => {

    const dispatch = useDispatch();

    const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {

        const name = e.target.name as keyof BulkTableProp;

        const { value } = e.target;

        const isNan = isNaN(Number(value));

        if (isNan) return;

        dispatch(formUpdateBulkTier({ index, name, value: Number(value), }));
    }

    return (
        <div className='flex w-full h-[2rem] mt-2 items-center'>
            <input type="text" maxLength={5} name="quantity" value={String(quantity)} className={`flex-2 min-w-0 h-full border pl-1 ${generateBorderColor(quantity > 0)} rounded-[4px]`}
                onChange={(e) => handleUpdate(e, index)}
            />

            <input type="text" name="discount" value={String(discount)} className={`flex-2 min-w-0 h-full border ${generateBorderColor(true)} rounded-[4px] pl-1`}
                onChange={(e) => handleUpdate(e, index)}
            />

            <div className="flex-2 items-center justify-center text-gray-500 flex gap-1.5">
                <span>{Number(sellingPrice * quantity).toLocaleString('en-US', { style: "currency", currency: "PHP" })}</span>
                <FontAwesomeIcon icon={faArrowRight} />
                <span>{Number(total).toLocaleString('en-US', { style: "currency", currency: "PHP" })}</span>
            </div>

            <FontAwesomeIcon icon={faTrash} className={`text-red-500 text-[1rem] flex-1 md:flex-2`} onClick={() => dispatch(formDeleteBulkTire(index))} />
        </div>
    )
}
