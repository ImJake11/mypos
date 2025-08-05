import { PaymentMethod } from "@/app/lib/enum/paymentMethod";
import ToasEnum from "@/app/lib/enum/toastEnum";
import { TransactionStatus } from "@/app/lib/enum/transactionStatus";
import { VATEnum } from "@/app/lib/enum/vatEnum";
import { TransactionDetailsModel } from "@/app/lib/models/transactionModel";
import { toggleProcessDialog, updateProcessDialogCurrentValue, updaterPocessDialogMessage } from "@/app/lib/redux/slice/processSlice";
import { openToas } from "@/app/lib/redux/slice/toastSlice";
import store, { AppDispatch } from "@/app/lib/redux/store";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


export default class TransactionRefundServices {

    public subTotal: number = 0;
    public netTotal: number = 0;
    public taxSales: number = 0
    public zeroRatedSales: number = 0;
    public exemptSales: number = 0;

    private vatValue = 12;
    private state = store.getState().refundSlice;

    constructor() {
        this.taxSales = this.computeTaxSales().tax;
        this.zeroRatedSales = this.computeTaxSales().zero;
        this.exemptSales = this.computeTaxSales().exempt;
        this.netTotal = this.computeNetTotal();
        this.subTotal = this.netTotal - this.taxSales;
    }

    private computeTaxSales(): {
        tax: number,
        zero: number,
        exempt: number,
    } {
        let taxTotal = 0;
        let zeroTotal = 0;
        let exemptTotal = 0;

        this.state.returnedItems.forEach(item => {

            const { quantity, vatStatus, unitPrice } = item;

            if (vatStatus === VATEnum.VAT_TAXABLE) {

                const calculateTax = unitPrice * (this.vatValue / 100);

                taxTotal += calculateTax * quantity;
            } else if (vatStatus === VATEnum.ZERO_RATED) {
                zeroTotal += unitPrice * quantity;
            } else {
                exemptTotal += unitPrice * quantity;
            }
        });

        return {
            exempt: exemptTotal,
            tax: taxTotal,
            zero: zeroTotal,
        };

    }

    private computeNetTotal(): number {

        let total = this.state.returnedItems.reduce((sum, item) => sum + this.computeItemTotal(item.id!), 0);

        return total;
    }

    public computeItemTotal(id: string): number {

        const item = this.state.returnedItems.find(item => item.id === id);

        const { quantity, unitPrice, bulkTier } = item!;

        // if bluk tire pricing is existin, means this product original transaction meet the minimum quantity to get bulk discount
        if (bulkTier) {

            let curretTotal = quantity * unitPrice;

            const discountedValue = curretTotal * (bulkTier.discount / 100);

            if (quantity < bulkTier.quantity) {
                return curretTotal;
            } else {
                return curretTotal - discountedValue;
            }
        }

        return quantity * unitPrice;
    }

    private validate(): boolean {
        const {
            returnedItems,
            paymenthMethod,
            paymentProvider,
            referenceID,
        } = this.state;

        if (returnedItems.length <= 0) {
            return false;
        }

        if (paymenthMethod === PaymentMethod.E_WALLET) {
            if (!paymentProvider) {
                return false;
            }

            if (!referenceID) {
                return false;
            }
        }

        return true;
    }

    private generateTransactionData(): TransactionDetailsModel | null {

        const { transactionData,
            referenceID,
            paymentProvider,
            paymenthMethod,
            returnedItems,
        } = this.state;

        if (!transactionData) return null;

        const data: TransactionDetailsModel = {
            userid: "tempo",
            taxablSales: this.taxSales,
            totalValSales: this.subTotal,
            nonTaxableSales: this.zeroRatedSales,
            exemptSales: this.exemptSales,
            netTotal: this.netTotal,
            amountPaid: transactionData.amountPaid,
            changeGiven: transactionData.changeGiven,
            paymentMethod: paymenthMethod,
            purchasedItems: returnedItems.map(item => ({
                mainProductId: item.product?.productId!,
                productId: item.productId,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                vatStatus: item.vatStatus,
                bulkTierID: item.bulkTierID,
            })),
            paymentProvider: paymentProvider,
            status: TransactionStatus.REFUND,
            referenceId: referenceID,
            reason: this.state.reason,
            transactionReferenceID: transactionData.transactionId,
        };

        return data;
    }

    public async saveTransaction(dispatch: AppDispatch, router: AppRouterInstance) {
        try {

            if (!this.validate()) {
                dispatch(openToas({
                    message: "Refund cannot be processed. Please make sure the return data is correct ",
                    type: ToasEnum.ERROR,
                }))
                return;
            }
            dispatch(toggleProcessDialog(true));
            dispatch(updaterPocessDialogMessage("Processing transaction"));
            dispatch(updateProcessDialogCurrentValue(60));
            const res = await fetch(`/api/transactions/refund`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    transactionData: this.generateTransactionData()
                }),
            });

            if (!res.ok) {
                throw new Error("Server Error");
            }

            dispatch(updaterPocessDialogMessage("Processing transaction"));
            dispatch(updateProcessDialogCurrentValue(100));
            dispatch(openToas({
                message: "Refund processed successfully ",
                type: ToasEnum.SUCCESS,
            }))
            router.push("/ui/transaction");
        } catch (e) {
            dispatch(openToas({
                message: "Failed to process refund",
                type: ToasEnum.ERROR,
            }))
            throw new Error("Failed to process transaction");
        } finally {
            dispatch(toggleProcessDialog(false));
        }
    }

}