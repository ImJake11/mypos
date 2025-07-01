"use client";
import { BulkTableProp, ProductProps } from "@/app/lib/models/productModel";
import { deleteBulkTire, updateBulkTier } from "@/app/lib/redux/productSlice";
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

    const Header = (name: string) => <div className='flex-1 h-[3rem] grid place-content-center'
        style={{
            border: "solid 1px var(--main-bg-secondary-dark)"
        }}
    ><span>{name}</span></div>

    return (
        <div className='flex flex-col w-full'>
            {/** header */}
            <div className='flex'>
                {Header("Minimum Quantity")}
                {Header("Discount (%)")}
                {Header("Total")}
                {Header("Action")}
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



const Cell = ({ quantity, discount, index, total, sellingPrice, dispatch }: CellProp) => {

    const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {

        const name = e.target.name as keyof BulkTableProp;

        const { value } = e.target;

        const isNan = isNaN(Number(value));

        if (isNan) return;

        dispatch(updateBulkTier({ index, name, value: Number(value), }));
    }


    return (
        <div className='flex w-full h-[3rem] gap-1 mt-2'>
            <input type="text" name="quantity" value={String(quantity)} className={`flex-1 h-full border ${generateBorderColor(quantity > 0)} rounded-[7px] p-1.5`}
                onChange={(e) => handleUpdate(e, index)}
            />
            <input type="text" name="discount" value={String(discount)} className={`flex-1 h-full border ${generateBorderColor(true)} rounded-[7px] p-1.5`}
                onChange={(e) => handleUpdate(e, index)}
            />

            <div className="flex-1 items-center justify-center text-gray-500 flex gap-1.5">
                <span>Php {sellingPrice * quantity}</span>
                <FontAwesomeIcon icon={faArrowRight} />
                <span>Php  {total}</span>
            </div>
            <FontAwesomeIcon icon={faTrash} className='text-red-500 text-[1.5rem] flex-1' onClick={() => dispatch(deleteBulkTire(index))} />
        </div>
    )
}
