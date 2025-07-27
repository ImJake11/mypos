import { VariantsProps } from "@/app/lib/models/productModel";
import { posSelectVariant, posUpdateSelectedvariantQuantity } from "@/app/lib/redux/slice/posSlice";
import { RootState } from "@/app/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsServices from "../services/productDetailsServices";
import { calculatePriceAdjustment } from "@/app/lib/utils/services/priceCalculations/calculatePriceAdjusment";
import { PromotionalDiscount } from "@/app/generated/prisma";

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

    const { selectedVariantID, cartItems } = useSelector((state: RootState) => state.posSlice);

    const isCurrentlySelected = cartItems.filter(item => item.variantID === variant.id);

    const { imageUrl, isPositive, price, stock, name, id, details, isArchived } = variant;

    const parts = details != undefined ? details.split(",") : [];//variant details

    const isSelected = selectedVariantID === id;

    const variantPrice = calculatePriceAdjustment(sellingPrice, price, isPositive);

    return <div className={`w-full bg-[var(--main-bg-secondary)] h-fit flex flex-col p-4 gap-4 rounded-[11px] ${isArchived ? "text-gray-500" : "text-black"}`}
        style={{
            transform: isArchived ? "scale(0.9)" : "scale(1)"
        }}
    >

        <div className="flex w-full gap-3">
            {/** image */}
            <div className='w-[7rem] h-[7rem] bg-[var(--main-bg-primary)] rounded-[7px] overflow-hidden'>
                <img src={imageUrl} alt="variant image" loading="lazy" className='w-full h-full object-cover' />
            </div>
            {/** details */}
            <div className="flex flex-col gap-2">
                <span className="font-semibold">{name}</span>
                <span>In Stock: {stock}</span>
                <span>Price Adjustment: {isPositive ? "+" : "-"} {price}%</span>
                <span className="font-semibold">Php {variantPrice.toLocaleString('en-us')}</span>
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

        <SelectVariantButton
            isArchive={variant.isArchived}
            isExisting={isCurrentlySelected.length > 0}
            isSelected={selectedVariantID === variant.id}
            variantID={variant.id ?? ""}
        />
    </div>;
}

function SelectVariantButton({
    isSelected,
    isExisting,
    isArchive,
    variantID,
}: {
    isSelected: boolean,
    isExisting: boolean,
    isArchive: boolean,
    variantID: string,
}) {

    const dispatch = useDispatch();

    if (isArchive) return <span className="text-center">This variant is Archived</span>;

    if (isExisting) return <span className="text-center text-gray-400">
        This Product is already on the Cart
    </span>

    return <div className={`${isSelected ? "bg-linear-0" : "button-primary-gradient text-white"} h-[2.5rem] w-full rounded-[11px] grid place-content-center`}
        style={{
            border: "solid 1px var(--color-brand-primary)",
        }}

        onClick={() => {
            if (!variantID) return;

            dispatch(posUpdateSelectedvariantQuantity({
                isAddition: true,
                quantity: 1,
            }));
            
            dispatch(posSelectVariant(variantID));
        }}
    >
        {isSelected ? "Cancel" : "Select Variant"}
    </div>

}
