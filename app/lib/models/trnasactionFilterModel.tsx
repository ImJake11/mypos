

export interface TransactionFilterModel {
    month?: number,
    day?: number,
    year?: number,
    minimun?: number,
    maximum?: number,
    
    items?: number,
    productName?: string,
    vatable: boolean,
    zeroRated: boolean,
    exempt: boolean,

}