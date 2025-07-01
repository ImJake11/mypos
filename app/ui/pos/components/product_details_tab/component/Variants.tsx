import { VariantsProps } from "@/app/lib/models/productModel";
import { posSelectVariant } from "@/app/lib/redux/posSlice";
import { RootState } from "@/app/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";

interface Prop {
    variants: VariantsProps[],
    sellingPrice: number,
}
export default
    function Variants({ variants, sellingPrice }: Prop) {

    return <div className='flex flex-col w-full items-center mt-2 gap-2'>
        <span className='font-semibold italic tracking-wider'>*** Variants ***</span>

        {/** data */}
        {variants.map((variant, i) => <VariantTile key={variant.id} sellingPrice={sellingPrice} variant={variant} />)}
    </div>
}

interface VariantTileProp {
    variant: VariantsProps,
    sellingPrice: number,
}

const VariantTile = ({ variant, sellingPrice }: VariantTileProp) => {

    const dispatch = useDispatch();

    const selectedVariantID = useSelector((state: RootState) => state.posSlice.selectedVariantID);

    const { imageUrl, isPositive, price, stock, name, id, details, isArchived } = variant;

    const parts = details != undefined ? details.split(",") : [];//variant details

    const isSelected = selectedVariantID === id;

    const variantPrice = getVariantPrice(sellingPrice, variant.price, variant.isPositive
    ).toLocaleString('en-us');

    return <div className={`w-full bg-[var(--main-bg-secondary-dark)] h-fit flex flex-col p-4 gap-4 rounded-[11px] ${isArchived ? "text-gray-500" : "text-white"}`}
        style={{
            transform: isArchived ? "scale(0.9)" : "scale(1)"
        }}
    >

        <div className="flex w-full gap-3">
            {/** image */}
            <div className='w-[7rem] h-[7rem] bg-[var(--main-bg-primary-dark)] rounded-[7px] overflow-hidden'>
                <img src={imageUrl} alt="variant image" className='w-full h-full object-cover' />
            </div>
            {/** details */}
            <div className="flex flex-col gap-2">
                <span className="font-semibold">{name}</span>
                <span>In Stock: {stock}</span>
                <span>Price Adjustment: {isPositive ? "+" : "-"} {price}%</span>
                <span className="font-semibold">Php {variantPrice}</span>
            </div>
        </div>

        <div className='flex-1 flex gap-3'>
            {/** variant details */}
            {parts !== undefined && parts.map((part, i) => part &&

                <div key={i} className="flex items-center gap-2">
                    {/** indicator */}
                    <div className="h-[.8rem] w-[.8rem] rounded-full bg-[var(--color-brand-primary)]" />
                    <span key={i}>
                        {/** circle indicator */}
                        {part}</span>
                </div>
            )}
        </div>

        {/** add to cart */}

        {isArchived ? <span className="text-center">This variant is Archived</span> : <div className={`${isSelected ? "bg-linear-0" : "button-primary-gradient"} h-[3rem] w-full rounded-[11px] grid place-content-center`}
            style={{
                border: "solid 1px var(--color-brand-primary)",
            }}
            onClick={() => {
                dispatch(posSelectVariant(variant.id ?? ""));
            }}
        >
            {isSelected ? "Cancel" : "Select Variant"}
        </div>}
    </div>;
}

function getVariantPrice(sellingPrice: number, priceAdjustment: number, isPositive: boolean) {

    const totalValue = (priceAdjustment / 100) * sellingPrice;

    if (isPositive) {
        return sellingPrice + totalValue;
    } else {
        return sellingPrice - totalValue;
    }
}