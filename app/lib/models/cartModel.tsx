import { BulkTableProp, ProductProps, PromotionalDiscountProp, VariantsProps } from "./productModel";



export interface CartModel {
    cartId?: string,
    variantID: string,
    variantName: string,
    productID: string,
    variantPhotoUrl: string,
    variantUnitPrice: number,
    quantity: number,
    promotionalDiscountID?: string,
    promotionalDiscountRate?: number,
    bulkPricingID?: string,
    bulkPricing?: BulkTableProp,
    bulkQuantityTier?: number,
    total: number,
    details: string,
    maxStock: number,
    isPositive: boolean,
    vatStatus: string,
}

export interface CartCacheModel {
    cartId?: string;
    productId: string;
    userId: string,
    mainProductID: string;
    quantity: number;
    total: number;
    promotionalDiscountID?: string;
    bulkPricingID?: string;
    vatStatus: string,
    variantUnitPrice: number,
    mainProduct?: ProductProps;
    product?: VariantsProps;
    promotionalDiscount?: PromotionalDiscountProp;
    bulkPricing?: BulkTableProp;
}