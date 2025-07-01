import { CartModel } from "../../../../../lib/models/cartModel";

interface ClassProp {
    cartItems: CartModel[],
}

export default class CartHelpers {
    private cartList: CartModel[];

    constructor({ cartItems }: ClassProp) {
        this.cartList = cartItems;
    }


    // check if the product that will add to cart is existing in current list
    public isProductExisingInCart(variantID: string): boolean {

        const existingData: CartModel | undefined = this.cartList.find(item => item.variantID === variantID);

        if (existingData === undefined) return false;

        return true;
    }

    // computes over total of all cart items
    public computeOverAllTotalCartItems(): number {

        if (this.cartList.length <= 0) {
            return 0;
        }


        const total = this.cartList.reduce((accum: number, currentVal: CartModel) => {

            return accum + currentVal.total;

        }, 0);


        return total;
    }

}