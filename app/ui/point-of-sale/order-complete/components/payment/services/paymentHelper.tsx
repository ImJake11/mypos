import { PaymentMethod } from "@/app/lib/enum/paymentMethod";
import { TransactionStatus } from "@/app/lib/enum/transactionStatus";
import { VATEnum } from "@/app/lib/enum/vatEnum";
import { CartModel } from "@/app/lib/models/cartModel";
import { BulkTableProp } from "@/app/lib/models/productModel";
import { TransactionDetailsModel, TransactionItemModel } from "@/app/lib/models/transactionModel";
import store from "@/app/lib/redux/store";

/**
 * PaymentHelper handles all transaction-related calculations
 * such as VAT breakdown, net total, change, and structuring
 * data for saving the transaction.
 */
export default class PaymentHelper {
    // Get current POS state (cart, payment method, etc.)
    private posSlice = store.getState().posSlice;

    // Total of all cart items (before tax breakdown)
    private overAllCartItemTotal: number;

    // Current VAT rate passed to the class
    private vatValue: number;

    // Converted cart items into transaction item structure
    private purchasedItems: TransactionItemModel[];

    // Raw cart items from state
    private cart: CartModel[] = this.posSlice.cartItems;

    // Selected payment method (cash or e-wallet)
    private paymentMethod = this.posSlice.paymenMethod;

    /**
     * Initializes the helper with VAT value
     */
    constructor({ vatValue }: { vatValue: number }) {
        this.vatValue = vatValue;

        // Calculate the total amount of the cart
        this.overAllCartItemTotal = this.cart.reduce((acc, item) => {
            return acc + item.total;
        }, 0);

        // Convert cart items to transaction format
        this.purchasedItems = this.cart.map(item => ({
            productId: item.variantID,
            quantity: item.quantity,
            unitPrice: item.variantUnitPrice,
            vatStatus: item.vatStatus,
            mainProductId: item.productID,
        }));
    }

    /**
     * Returns the total price of the cart (net)
     */
    public getCartNetTotal(): number {
        return this.overAllCartItemTotal;
    }

    /**
     * Returns the subtotal (taxable + zero-rated + exempt sales)
     */
    public getCartSubTotal(): number {
        const { exempt, zeroRated, taxableSale } = this.getVatSalesBreakdown();
        return taxableSale + exempt + zeroRated;
    }

    /**
     * Calculates change to give based on amount paid
     */
    public calculateExchange(payment: number): number {
        return payment - this.overAllCartItemTotal;
    }

    /**
     * Breaks down the cart into:
     * - taxable sales
     * - VAT amount
     * - zero-rated sales
     * - exempt sales
     */
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

        for (const item of this.cart) {
            const { quantity, vatStatus, variantUnitPrice, total } = item;

            if (vatStatus === VATEnum.VAT_TAXABLE) {
                // Calculate VAT value for one unit
                const totalVat = variantUnitPrice * (this.vatValue / 100);

                // Multiply VAT by quantity
                const totalValue = totalVat * quantity;

                // Subtract VAT from total to get taxable sales
                const taxableValue = total - totalValue;

                taxableSales += taxableValue;
                vatTotal += totalValue;

            }

            else {
                // For VAT-exempt and zero-rated items, just compute total value
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

    /**
     * Generates a TransactionDetailsModel to be sent to the backend
     * @param dynamicInput - If payment is cash, it's the amount paid.
     *                       If payment is e-wallet, it's the reference ID.
     */
    public generateTransactionData(dynamicInput: number): TransactionDetailsModel {
        const { exempt, taxableSale, vat, zeroRated } = this.getVatSalesBreakdown();
        
        const total = this.getCartNetTotal();

        const newData: TransactionDetailsModel = {
            status: TransactionStatus.COMPLETED,
            userid: "tempo", // Hardcoded for now
            taxablSales: taxableSale,
            totalValSales: vat,
            nonTaxableSales: zeroRated,
            exemptSales: exempt,
            netTotal: total,
            paymentProvider: this.posSlice.paymentProvider ?? undefined,
            amountPaid: this.paymentMethod === PaymentMethod.CASH ? dynamicInput : 0,
            changeGiven: this.paymentMethod === PaymentMethod.CASH ? this.calculateExchange(dynamicInput) : 0,
            paymentMethod: this.paymentMethod,
            purchasedItems: this.purchasedItems,
            referenceId: this.paymentMethod === PaymentMethod.E_WALLET ? dynamicInput.toString() : undefined,
        };

        return newData;
    }
}
