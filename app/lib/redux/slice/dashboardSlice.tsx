import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AnnualTransactionModel } from "../../models/annualTransactionModel"
import { AnnualChartModel } from "../../models/AnnualChartModel"

interface SliceProp {
    annualTransactionData: AnnualTransactionModel[],
    annualChartData: AnnualChartModel[],
}


const initialState: SliceProp = {
    annualTransactionData: [],
    annualChartData: []
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
        }
    }
})

export const { dashboardSetAnnualTransactionData, dashboarSetChartData } = dashboardSlice.actions;

export default dashboardSlice.reducer;