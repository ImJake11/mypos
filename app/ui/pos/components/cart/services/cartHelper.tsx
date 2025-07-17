import { CartCacheModel, CartModel } from "../../../../../lib/models/cartModel";


/**
 * CartHelpers is a utility class for handling cart-related data transformations.
 * It operates independently of React and Redux, focusing purely on business logic.
 * 
 * Key functionalities include:
 * - Checking if a product already exists in the cart
 * - Computing the overall cart total
 * - Generating cache data from the current cart list
 * - Converting cached API data into usable CartModel format
 */
interface ClassProp {
    cartItems: CartModel[],
}

export default class CartHelpers {
    private cartList: CartModel[];

    constructor({ cartItems }: ClassProp) {
        this.cartList = cartItems;
    }


    /**
     * Checks whether a product variant already exists in the current cart list.
     * 
     * @param variantID - The unique identifier of the product variant
     * @returns True if the variant is already in the cart, false otherwise
     */
    public isProductExisingInCart(variantID: string): boolean {

        const existingData: CartModel | undefined = this.cartList.find(item => item.variantID === variantID);

        if (existingData === undefined) return false;

        return true;
    }

    /**
     * Computes the total cost of all items in the current cart list.
     * 
     * @returns The total amount as a number. Returns 0 if the cart is empty.
     */
    public computeOverAllTotalCartItems(): number {

        if (this.cartList.length <= 0) {
            return 0;
        }

        const total = this.cartList.reduce((accum: number, currentVal: CartModel) => {

            return accum + currentVal.total;

        }, 0);


        return total;
    }

    /**
     * Generates a list of CartCacheModel objects from the current cart items,
     * formatted and ready to be saved to the backend cache.
     * 
     * @returns An array of CartCacheModel objects
     */
    public generateCartCacheData(newCartItem: CartModel): CartCacheModel {

        let cacheData: CartCacheModel = {
            cartId: newCartItem.cartId,
            vatStatus: newCartItem.vatStatus,
            productId: newCartItem.variantID,
            variantUnitPrice: newCartItem.variantUnitPrice,
            userId: "tempo",
            mainProductID: newCartItem.productID,
            quantity: newCartItem.quantity,
            total: newCartItem.total,
            bulkPricingID: newCartItem.bulkPricingID ?? "",
            promotionalDiscountID: newCartItem.promotionalDiscountID ?? "",
        }
        return cacheData;
    }


    /**
    * Converts cached cart data retrieved from the API into CartModel format
    * usable by the front-end components and state.
    * 
    * @param cachedData - Array of CartCacheModel objects fetched from the backend
    * @returns An array of CartModel objects for rendering or storing in Redux
    */
    public getCartItemsFromApi(cachedData: CartCacheModel[]): CartModel[] {

        let cartItems: CartModel[] = [];

        for (const cache of cachedData) {

            cartItems.push({
                isPositive: cache.product?.isPositive!,
                cartId: cache.cartId,
                details: cache.product?.details ?? "",
                variantID: cache.productId,
                variantName: cache.product?.name ?? "",
                bulkPricing: cache.bulkPricing,
                productID: cache.mainProductID,
                variantPhotoUrl: cache.product?.imageUrl ?? "",
                variantUnitPrice: cache.variantUnitPrice,
                quantity: cache.quantity,
                promotionalDiscountRate: cache.promotionalDiscount?.discountRate,
                total: cache.total,
                maxStock: cache.product?.stock ?? 0,
                vatStatus: cache.vatStatus,
            });
        }

        return cartItems;
    }
}