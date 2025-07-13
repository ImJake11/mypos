import { VATEnum } from "@/app/lib/enum/vatEnum";
import { CartModel } from "../../../../../lib/models/cartModel";
import { BulkTableProp, ProductProps, VariantsProps } from "../../../../../lib/models/productModel";
import store from "@/app/lib/redux/store";
import { checkDiscountExpiration } from "@/app/lib/utils/services/checkDiscountExpirationDate";


/**
 * This class handles product pricing logic including:
 * - variant price adjustments
 * - promotional discounts
 * - bulk pricing
 * - and preparing cart-ready product data
 */
export default class ProductDetailsServices {

    private posSlice = store.getState().posSlice;

    public selectedProductData: ProductProps = this.posSlice.selectedProduct;
    private selectedVariantID: string = this.posSlice.selectedVariantID;
    private quantity: number = this.posSlice.quantity;

    // Cache the selected variant data for reuse
    private _cachedSelectedVariantData: VariantsProps | undefined;

    // If a bulk tier matches the quantity, this will hold the matching tier data
    private _bulkTierData: BulkTableProp | undefined;

    constructor() {
        // Find the variant by ID
        this._cachedSelectedVariantData = this.selectedProductData.variants.find(variant => variant.id === this.selectedVariantID);

        // Find the highest bulk tier that matches the quantity
        this._bulkTierData = this.selectedProductData.bulkTier?.findLast(tier => this.quantity >= tier.quantity);
    }

    /**
     * Calculates the discounted product price based on the promotional discount
     */
    public getDiscountedProductPrice(): number {

        const { promotionalDiscount, sellingPrice } = this.selectedProductData;

        if (!promotionalDiscount) return this.selectedProductData.sellingPrice;

        if (!checkDiscountExpiration(promotionalDiscount.expirationDate)) return this.selectedProductData.sellingPrice;


        const discountDecimal = promotionalDiscount.discountRate / 100;
        const discountValue = sellingPrice * discountDecimal;
        const finalPrice = sellingPrice - discountValue;

        return finalPrice;
    }

    /**
     * Computes the price of the selected variant
     * - Applies price adjustment (positive or negative) to base selling price
     */
    public computeVariantPrice(): number {
        const variantData = this._cachedSelectedVariantData;

        if (!variantData) return 0;

        let sellingPrice: number = this.getDiscountedProductPrice();

        const adjustmentDecimal = variantData.price / 100;
        const adjustmentValue = adjustmentDecimal * sellingPrice;

        let finalPrice: number;

        if (variantData.isPositive) {
            finalPrice = sellingPrice + adjustmentValue;
        } else {
            finalPrice = sellingPrice - adjustmentValue;
        }

        return finalPrice;
    }

    /**
     * Computes the total price based on:
     * - selected variant's unit price
     * - quantity
     * - bulk discount if applicable
     */
    public computeOverallTotalPrice(): number {
        const variantUnitPrice = this.computeVariantPrice();
        let total = variantUnitPrice * this.quantity;

        const applicableTierDiscount = this._bulkTierData;

        if (applicableTierDiscount) {
            const discountAmount = this.applyBulkPricingInTotal(total, applicableTierDiscount.discount);
            total -= discountAmount;
        }

        return total;
    }

    /**
     * Calculates discount amount based on a percentage
     * @param total - total before discount
     * @param discount - percentage discount
     */
    private applyBulkPricingInTotal(total: number, discount: number): number {
        return total * (discount / 100);
    }

    /**
     * Returns the available stock for the selected variant
     */
    public getSelectedVariatMaxStock() {
        return this._cachedSelectedVariantData?.stock;
    }

    /**
     * Generates a full cart-ready object from the selected product and variant
     */
    public generateDataForCart(): CartModel | null {
        if (!this._cachedSelectedVariantData) return null;

        const { promotionalDiscount, vatStatus } = this.selectedProductData;
        const { imageUrl,
            productId,
            isPositive,
            details,
            name,
            stock,
        } = this._cachedSelectedVariantData;

        const data: CartModel = {
            isPositive: isPositive,
            vatStatus: this.selectedProductData.vatStatus?.settingKey!,
            details: details ?? "",
            variantID: this.selectedVariantID,
            variantName: name,
            productID: productId!,
            variantPhotoUrl: imageUrl,
            quantity: this.quantity,
            variantUnitPrice: this.computeVariantPrice(),
            total: this.computeOverallTotalPrice(),
            bulkPricingID: this._bulkTierData?.id ?? "",
            promotionalDiscountID: promotionalDiscount ? promotionalDiscount.id : "",
            bulkQuantityTier: this._bulkTierData?.quantity ?? 0,
            promotionalDiscountRate: promotionalDiscount ? promotionalDiscount.discountRate : 0,
            maxStock: stock,
        };

        return data;
    }
}
