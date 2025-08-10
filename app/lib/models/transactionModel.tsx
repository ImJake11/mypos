import { BulkTableProp, VariantsProps } from "./productModel";


export interface TransactionDetailsModel {
    transactionId?: string;
    date?: string; userid: string;
    taxablSales: number;
    totalValSales: number;
    nonTaxableSales: number;
    exemptSales: number;
    netTotal: number;
    amountPaid: number;
    paymentProvider?: string | null,
    changeGiven: number;
    paymentMethod: string;
    discountID?: string | null;
    purchasedItems: TransactionItemModel[];
    referenceId?: string | null,
    status: string,
    transactionReferenceID?: string | null,
    reason?: string | null,
}

export interface TransactionItemModel {
    id?: string;
    transactionId?: string | null;
    productId: string;
    quantity: number;
    product?: VariantsProps,
    unitPrice: number;
    bulkTierID?: string | null,
    bulkTier?: BulkTableProp | null,
    vatStatus: string;
    mainProductId: string,
}
