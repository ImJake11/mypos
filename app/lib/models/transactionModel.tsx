import { BulkTableProp, VariantsProps } from "./productModel";


export interface TransactionDetailsModel {
    transactionId?: string;
    date?: string; // ISO date string (e.g., from Date.toISOString())
    userid: string;
    taxablSales: number;
    totalValSales: number;
    nonTaxableSales: number;
    exemptSales: number;
    netTotal: number;
    amountPaid: number;
    paymentProvider?: string,
    changeGiven: number;
    paymentMethod: string;
    discountID?: string;
    purchasedItems: TransactionItemModel[];
    referenceId?: string,
    status: string,
    transactionReferenceID?: string,
    reason?: string,
}

export interface TransactionItemModel {
    id?: string;
    transactionId?: string;
    productId: string;
    mainProductId: string,
    quantity: number;
    product?: VariantsProps,
    unitPrice: number;
    bulkTierID?: string,
    bulkTier?: BulkTableProp,
    vatStatus: string;
}
