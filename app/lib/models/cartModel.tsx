


export interface CartModel {
    variantID: string,
    variatName: string,
    productID: string,
    variantPhotoUrl: string,
    variantUnitPrice: number,
    quantity: number,
    promotionalDiscountID?: string,
    promotionalDiscountRate?: number,
    bulkPricingID?: string,
    bulkQuantityTier?: number,
    total: number,
    details: string,
    maxStock: number,
}