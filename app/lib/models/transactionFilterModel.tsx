

export interface TransactionFilterModel {
    startDate?: string,
    endDate?: string,
    minimunNetTotal?: number,
    maximumNetTotal?: number,
    vatableTran?: boolean,
    zeroRatedTran?: boolean,
    exemptTran?: boolean,
    mixedTran?: boolean,
    transactionStatus?: string,
    paymentOption?: string,
    providedPayment?: string,
}