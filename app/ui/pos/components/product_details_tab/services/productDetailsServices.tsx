import { VATEnum } from "@/app/lib/enum/vatEnum";
import { CartModel } from "../../../../../lib/models/cartModel";
import { BulkTableProp, ProductProps, VariantsProps } from "../../../../../lib/models/productModel";

interface ClassProp {
    productData: ProductProps,
    variantID: string,
    quantity: number,
}

export default class ProductDetailsServices {
    private selectedProductData: ProductProps;
    private selectedVariantID: string;
    private quantity: number;
    private _cachedSelectedVariantData: VariantsProps | undefined;
    private _bulkTierData: BulkTableProp | undefined; // returs the tier meet by the quatity

    constructor({ productData, variantID, quantity }: ClassProp) {
        this.selectedProductData = productData;
        this.selectedVariantID = variantID;
        this.quantity = quantity;
        this._cachedSelectedVariantData = this.selectedProductData.variants.find(variant => variant.id === this.selectedVariantID);
        this._bulkTierData = this.selectedProductData.bulkTier && this.selectedProductData.bulkTier.findLast(tier => this.quantity >= tier.quantity)
    }

    // return the data of selected variant
    private getSelectedVariantData(): VariantsProps | undefined {
        return this._cachedSelectedVariantData;
    }


    /// -- computes the selling price if the product has discount
    public getDiscountedProductPrice(): number {

        const { promotionalDiscount, sellingPrice } = this.selectedProductData;

        const { discountRate } = promotionalDiscount;

        // -- 1. convert discount to decimal value
        const discountInPercentage = discountRate / 100;

        // 2. -- get the discounted value based on price
        const priceDiscount = sellingPrice * discountInPercentage;

        // 3. -- deduct the discount to sellingPrice 
        const total = sellingPrice - priceDiscount;

        return total;
    }

    // -- computes the selectedVariant price;
    // -- the price adjustmets also applied
    public computeVariantPrice(): number {
        const variantData = this.getSelectedVariantData();

        if (variantData === undefined) return 0;


        // calculate price adjustment
        const priceAdjustmentInDecimal = variantData.price / 100;

        // -- is the variant price is positive it means the total value the calculated based on base price
        // will be added to it, but if it false it means deduct the total price adjustmet to its base price
        const adjusmentValue = priceAdjustmentInDecimal * this.selectedProductData.sellingPrice;

        let total: number;

        if (variantData.isPositive) {
            total = this.selectedProductData.sellingPrice + adjusmentValue;
        } else {
            total = this.selectedProductData.sellingPrice - adjusmentValue;
        }
        return total;
    }


    // -- computes the total price of the product that will be added to cart
    // -- variant price adjustment is applied
    // -- if it meets the bulk pricing it will applied too
    public computeOverallTotalPrice(): number {

        const variantUnitPrice = this.computeVariantPrice();

        let total = variantUnitPrice * this.quantity;

        // deduct the discount to total if discount is greater than zero
        const applicableTierDiscount = this._bulkTierData;

        if (applicableTierDiscount !== undefined) {
            total = total - this.applyBulkPricingInTotal(total, applicableTierDiscount.discount);
        }

        return total;
    }

    // compute the total wh a bulk tier pricing is applied
    private applyBulkPricingInTotal(total: number, discount: number) {

        // get the percentage total
        const percentageTotal = total * (discount / 100);

        return percentageTotal;
    }

    // return selected variant current quatity
    public getSelectedVariatMaxStock() {
        return this._cachedSelectedVariantData?.stock;
    }

    // generate the data of the product that will add to cart
    public generateDataForCart(): CartModel | null {

        if (this._cachedSelectedVariantData === undefined) return null;

        // desctructure selected variant data
        const { imageUrl, productId } = this._cachedSelectedVariantData;

        const data: CartModel = {
            vatStatus: this.selectedProductData.vatStatus?.settingKey!,
            details: this._cachedSelectedVariantData.details ?? "",
            variantID: this.selectedVariantID,
            variatName: this._cachedSelectedVariantData.name,
            productID: productId ?? "",
            variantPhotoUrl: imageUrl,
            quantity: this.quantity,
            variantUnitPrice: this.computeVariantPrice(),
            total: this.computeOverallTotalPrice(),
            bulkPricingID: this._bulkTierData?.id ?? "",
            promotionalDiscountID: this.selectedProductData.promotionalDiscount.id ?? "",
            bulkQuantityTier: this._bulkTierData?.quantity ?? 0,
            promotionalDiscountRate: this.selectedProductData.promotionalDiscount.discountRate ?? 0,
            maxStock: this._cachedSelectedVariantData.stock,
        }

        return data;
    }

}