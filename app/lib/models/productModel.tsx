import { CategoryModel } from "./categoryModel";
import { VatModel } from "./vatModel";

export interface ProductProps {
    id?: string,
    name: string,
    description: string | null,
    categoryID: string,
    sellingPrice: number,
    costPrice: number,
    tax: number,
    bulkEnabled: boolean,
    stock: number,
    lowStock: number,
    category?: CategoryModel,
    variants: VariantsProps[],
    coverImage: string,
    coverImageId?: string,
    photoSnapshots: string[]
    bulkTier: BulkTableProp[],
    promotionalDiscountID?: string,
    promotionalDiscount?: PromotionalDiscountProp,
    highlights: string,
    isActive: boolean,
    isFavorite: boolean,
    discountEnabled: boolean,
    vatId?: string,
    vatStatus?: VatModel,
}



export interface PromotionalDiscountProp {
    id?: string,
    expirationDate: string,
    discountRate: number,
    description: string,
}


export interface VariantsProps {
    id?: string,
    name: string,
    price: number,
    isPositive: boolean, // positive if price is increase and negative if decreease
    stock: number,
    imageUrl: string,
    isArchived: boolean,
    productId?: string,
    details?: string, // for uploading image in firebase
}



export interface BulkTableProp {
    id?: string,
    quantity: number,
    discount: number,
}


