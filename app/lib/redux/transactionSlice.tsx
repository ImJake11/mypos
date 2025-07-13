import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransactionDetailsModel } from "../models/transactionModel";


const initialState = {
    isLoading: false,
    isError: false,
    isFilterVisible: false,
    transactionsData: [] as TransactionDetailsModel[],
}

const transactionSlice = createSlice({
    initialState,
    name: "transaction",
    reducers: {
        transactionSetLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        transactionSetError: (state, action: PayloadAction<boolean>) => {
            state.isError = action.payload;
        },
        transactionSetData: (state, action: PayloadAction<TransactionDetailsModel[]>) => {
            state.transactionsData = action.payload;
        },
        transactionToggleFilterTab: (state) => {
            state.isFilterVisible = !state.isFilterVisible;
        }
    }
});

export const {
    transactionSetData,
    transactionSetError,
    transactionToggleFilterTab,
    transactionSetLoading,
} = transactionSlice.actions;
export default transactionSlice.reducer;