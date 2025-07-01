import { CartModel } from "@/app/lib/models/cartModel";


export default class PaymentHelper {
    private cartItems: CartModel[];
    private overAllCartItemTotal: number;

    constructor({ cart }: { cart: CartModel[] }) {
        this.cartItems = cart;
        this.overAllCartItemTotal = cart.reduce((acc, item) => {
            return acc + item.total;
        }, 0);
    }


    public overallCartTotal(): number {
        return this.overAllCartItemTotal;
    }

    public calculateExchange(payment: number) {
        return payment - this.overAllCartItemTotal;
    }
}