import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AnnualTransactionModel } from "../../models/annualTransactionModel"
import { AnnualChartModel } from "../../models/AnnualChartModel"
import { TransactionDetailsModel } from "../../models/transactionModel"
import { ProductProps } from "../../models/productModel"
import { RootState } from "../store"

interface SummaryProp {
    netTotal: number,
    taxablSales: number,
    totalValSales: number,
    expenses: number,
}

export interface ProductSummaryProp {
    id: string,
    url: string,
    stock: number,
    minStock: number,
    lastSoldDate: string | null,
    name: string,
}

interface SliceProp {
    annualTransactionData: AnnualTransactionModel[],
    annualChartData: AnnualChartModel[],
    yesterSummary: SummaryProp,
    dailySummary: SummaryProp,
    recentTransactions: any[],
    slowMovingProducts: ProductSummaryProp[],
    lowStockProducts: ProductSummaryProp[],
}


const initialState: SliceProp = {
    dailySummary: {
        netTotal: 0,
        taxablSales: 0,
        totalValSales: 0,
        expenses: 0
    },
    annualTransactionData: [],
    annualChartData: [],
    yesterSummary: {
        netTotal: 0,
        taxablSales: 0,
        totalValSales: 0,
        expenses: 0
    },
    recentTransactions: [],
    slowMovingProducts: [],
    lowStockProducts: []
}

const dashboardSlice = createSlice({
    initialState,
    name: "dashboar slice",
    reducers: {
        dashboardSetAnnualTransactionData: (state, action: PayloadAction<AnnualTransactionModel[]>) => {
            state.annualTransactionData = action.payload;
        },
        dashboarSetChartData: (state, action: PayloadAction<AnnualChartModel[]>) => {
            state.annualChartData = action.payload;
        },
        dashboardSetDailySummary: (state, action: PayloadAction<{
            yesterdaySummary: any,
            dailySummary: any;
            recentTransactions: any,
        }>) => {
            const { dailySummary, yesterdaySummary, recentTransactions } = action.payload;

            state.recentTransactions = recentTransactions;
            state.dailySummary = dailySummary;
            state.yesterSummary = yesterdaySummary;
        },
        dashboardSetProductsSummary: (state, action: PayloadAction<{
            slowProducts: ProductSummaryProp[],
            lowStockProducts: ProductSummaryProp[],
        }>) => {
            const { lowStockProducts, slowProducts } = action.payload;
            state.slowMovingProducts = slowProducts;
            state.lowStockProducts = lowStockProducts;
        }
    }
})

export const {
    dashboardSetAnnualTransactionData,
    dashboarSetChartData,
    dashboardSetDailySummary,
    dashboardSetProductsSummary,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;