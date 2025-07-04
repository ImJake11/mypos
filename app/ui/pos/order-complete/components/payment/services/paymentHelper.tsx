import { VATEnum } from "@/app/lib/enum/vatEnum";
import { CartModel } from "@/app/lib/models/cartModel";


export default class PaymentHelper {
    private cartItems: CartModel[];
    private overAllCartItemTotal: number;
    private vatValue: number;

    constructor({ cart, vatValue }:
        {
            cart: CartModel[],
            vatValue: number
        }) {
        this.cartItems = cart;
        this.vatValue = vatValue;
        this.overAllCartItemTotal = cart.reduce((acc, item) => {
            return acc + item.total;
        }, 0);
    }


    public getCartNetTotal(): number {
        return this.overAllCartItemTotal;
    }

    public getCartSubTotal(): number {

        const {  exempt, zeroRated, taxableSale } = this.getVatSalesBreakdown();
        return taxableSale + exempt + zeroRated;
    }

    public calculateExchange(payment: number) {
        return payment - this.overAllCartItemTotal;
    }

    // computes vats of the current cart items 
    // computes taxable, zero-rated and exempt vat 
    public getVatSalesBreakdown(): {
        vat: number,
        zeroRated: number,
        exempt: number,
        taxableSale: number,
    } {

        let vatTotal: number = 0;
        let zeroRatedTotal: number = 0;
        let exemptTotal: number = 0;
        let taxableSales: number = 0;

        // compute each item vat total
        for (const item of this.cartItems) {


            const { quantity, vatStatus, variantUnitPrice, total } = item;

            //  items with vat
            if (vatStatus === VATEnum.VAT_TAXABLE) {

                // compute total vat based on price
                const totalVat = variantUnitPrice * (this.vatValue / 100);

                // then multiple the total vat to its quantity
                const totalValue = totalVat * quantity;

                // compute taxable value 
                const taxableValue = total - totalValue;

                //
                taxableSales += taxableValue;
                // add the total value to total
                vatTotal += totalValue;
            }

            else { // since zero-rated and exempt product both has 0 rate
                // we will pass its data logically based on its key
                const totalValue = variantUnitPrice * quantity;

                if (vatStatus === VATEnum.VAT_EXEMPT) {
                    exemptTotal += totalValue;
                }
                if (vatStatus === VATEnum.ZERO_RATED) {
                    zeroRatedTotal += totalValue;
                }
            }
        }
        return {
            taxableSale: taxableSales,
            exempt: exemptTotal,
            vat: vatTotal,
            zeroRated: zeroRatedTotal,
        };
    }
}