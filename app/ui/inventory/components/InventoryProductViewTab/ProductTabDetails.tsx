import { CategoryModel } from "@/app/lib/models/categoryModel";
import { PromotionalDiscountProp } from "@/app/lib/models/productModel";
import { extractPromotionalDiscountExpirationDate } from "@/app/lib/utils/services/extractPromitionalDiscountExpDate";
import { faFilter, faCircle, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

{/** product details */ }
interface ProductDetailsProp {
    category: CategoryModel,
    name: string,
    isActive: boolean,
    description: string,
    sellingPrice: number,
    promotionalDiscount: PromotionalDiscountProp,
    isFavorite: boolean,

}

export default function ProductDetails({ category,
    name,
    isActive,
    description,
    sellingPrice,
    promotionalDiscount,
    isFavorite }:
    ProductDetailsProp
) {

    const { discountRate, expirationDate } = promotionalDiscount;

    // compute total price if product has discount
    function computeTotalPrice(): number {
        const computed = (discountRate / 100) * sellingPrice;
        const total = sellingPrice - computed;
        return total;
    }

    const price = <>
        {/** total price */}
        <div className='flex gap-2 text-[1.5rem] items-center'>
            <div className='p-2'>
                <FontAwesomeIcon icon={faTag} style={{ color: "var(--color-brand-primary)" }} />
            </div>
            <span>Php {discountRate !== 0 ? computeTotalPrice() : sellingPrice}</span>

            {/** show only if product has discount */}
            {discountRate !== 0 && <span className='line-through text-gray-400'>~ Php {sellingPrice}</span>}
        </div>


    </>

    const discount = <>
        {discountRate !== 0 && <div className='button-primary-gradient w-fit h-[3rem] flex gap-1.5 rounded-[7px] text-white items-center p-[5px_15px] text-[1rem]'>
            <i className="ri-discount-percent-fill"></i>
            <span>{discountRate}% OFF ( Valid until: {extractPromotionalDiscountExpirationDate(expirationDate)} )</span>
        </div>}
    </>


    return <div className='flex-2 flex flex-col p-[var(--form-section-padding)] gap-6'>
        {/** name & status */}
        <div className='flex flex-col gap-3 w-full'>

            <div className='flex gap-1.5'>
                <span className='italic text-3xl'>{name}</span>
                <div className="flex-1" />
                <div className='button-primary-gradient rounded-[7px] text-white text-[.7rem] p-[5px_15px] flex gap-2 items-center'>
                    <FontAwesomeIcon icon={faFilter} /><span>{category.content}</span>
                </div>
                <div className='button-primary-gradient rounded-[7px] text-white text-[.7rem] p-[5px_15px] flex gap-2 items-center'>
                    <FontAwesomeIcon icon={faCircle} /><span>Active</span>
                </div>
            </div>
        </div>

        <div className="flex  justify-between w-full">
            {price}
        </div>
        {discount}

        {/** description */}
        <div className='w-full flex-1 flex-col flex  text-[var(--foreground-lighter)] text-left gap-3'>
            <p className="font-semibold italic">Product Description: </p>
            <p>{description ? description : "No description"}</p>
        </div>


    </div>
}

