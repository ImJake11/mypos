
export interface StockStatusFlagProp {
    color: string,
    text: string
}

const OUT_OF_STOCK = 1; // Assuming 0 means out of stock
const LOW_STOCK = .90;    // e.g., if stock is 5 or less, it's very low
const HIGH_STOCK_RATIO = 0.15; // From our previous discussion: lowStockTreshold / stock < 0.15 for high stock
const NEAR_LOW_RATIO = 0.85;

export function generateStockStatusFlag(
    lowStockTreshold: number,
    stock: number,
): StockStatusFlagProp {

    let stockStatus: StockStatusFlagProp = {
        color: "var(--stock-flag-safe)",
        text: "Sufficient"
    }

    const value = lowStockTreshold / stock;

    if (value <= HIGH_STOCK_RATIO) {
        stockStatus = {
            color: "var(--stock-flag-over-stock)",
            text: "Over stock"
        }
    } else if (value >= NEAR_LOW_RATIO) {
        stockStatus = {
            color: "var(--stock-flag-near)",
            text: "Low stock"
        }
    } else if (value >= LOW_STOCK) {
        stockStatus = {
            color: "var(--stock-flag-critcal)",
            text: "Critically low",
        }
    } else if (value >= OUT_OF_STOCK) {
        stockStatus = {
            color: "var(--stock-flag-sold-out)",
            text: "Out of stock"
        }
    }

    return stockStatus;

}