


export function computeSellingPrice(
    costPrice: number,
    tax: number,
    vat: number,


): number {

    let total: number = 0;

    // --get vat total 
    const vatTotal = costPrice * (vat / 100);

    // -- get tax total
    const taxTotal = costPrice * (tax / 100);

    total = costPrice + vatTotal + taxTotal;

    return total;

}