import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AnnualTransactionModel } from "../../models/annualTransactionModel"
import { AnnualChartModel } from "../../models/AnnualChartModel"

interface SummaryProp {
    netTotal: number,
    taxablSales: number,
    totalValSales: number,
    expenses: number,
}

interface SliceProp {
    annualTransactionData: AnnualTransactionModel[],
    annualChartData: AnnualChartModel[],
    yesterSummary: SummaryProp,
    dailySummary: SummaryProp,
    transactionStatus: any[],
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
    transactionStatus: []
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
            transactionStatus: any,
        }>) => {
            const { dailySummary, yesterdaySummary, transactionStatus } = action.payload;

            state.transactionStatus = transactionStatus;
            state.dailySummary = dailySummary;
            state.yesterSummary = yesterdaySummary;
        }
    }
})

export const {
    dashboardSetAnnualTransactionData,
    dashboarSetChartData,
    dashboardSetDailySummary,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;