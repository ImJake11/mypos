import { CategoryModel } from "./categoryModel";

export interface NewProductProps {
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
    photoSnapshots: string[]
    bulkTier: BulkTableProp[],
    promotionalDiscount: PromotionalDiscountProp,
    highlights: string,
    isActive: boolean,
    isFavorite: boolean,
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
}




export interface BulkTableProp {
    id?: string,
    quantity: number,
    discount: number,
}


