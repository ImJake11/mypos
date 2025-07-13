/**
 * Custom hook to calculate the adjusted price based on a percentage.
 * 
 * @param basePrice - The original price of the product or item.
 * @param priceAdjustment - The percentage value to adjust (increase/decrease).
 * @param isPositive - If true, the price will increase by the given percentage; if false, it will decrease.
 * @returns The adjusted price as a number.
 */
export const calculatePriceAdjustment = (
    basePrice: number,
    priceAdjustment: number,
    isPositive: boolean,
    discountRate?: number,
): number => {

    let total: number = 0;

    let sellingPrice = basePrice;

    if (discountRate) {
        sellingPrice = basePrice - (basePrice * (discountRate / 100))
    }

    // Calculate the adjustment value based on the percentage
    const percentageValue = sellingPrice * (priceAdjustment / 100);

    // Apply the adjustment: add if positive, subtract if negative
    if (isPositive) {
        total = sellingPrice + percentageValue;
    } else {
        total = sellingPrice - percentageValue;
    }

    // Return the final adjusted price
    return total;
}
