import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransactionDetailsModel } from "../../models/transactionModel";
import { TransactionFilterModel } from "../../models/trnasactionFilterModel";
import { TransactionFilterKeys } from "../../constants/TransactionFilterKeys";

interface SliceProp {
    isLoading: boolean,
    isError: boolean,
    isFilterVisible: boolean,
    transactionsData: TransactionDetailsModel[],
    filterData: TransactionFilterModel,
}

const initialState: SliceProp = {
    isLoading: false,
    isError: false,
    isFilterVisible: false,
    transactionsData: [],
    filterData: {},
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
        },
        transactionUpdateFilterData: <K extends keyof TransactionFilterModel>(state: SliceProp, action: PayloadAction<{ name: K, data: TransactionFilterModel[K] }>) => {

            const { name, data } = action.payload;

            if (name === TransactionFilterKeys.mixedTran) {
                if (typeof data === "boolean") {
                    state.filterData = {
                        ...state.filterData,
                        mixedTran: data,
                        exemptTran: data,
                        zeroRatedTran: data,
                        vatableTran: data,
                    }
                    return;
                }
            }

            if (name === TransactionFilterKeys.zeroRatedTran || name === TransactionFilterKeys.vatableTran || name === TransactionFilterKeys.exemptTran && !data) {
                state.filterData.mixedTran = false;
            }


            state.filterData[name] = data;

            if (state.filterData.exemptTran && state.filterData.zeroRatedTran && state.filterData.vatableTran) {
                state.filterData.mixedTran = true;
            }
        }
    }
});

export const {
    transactionSetData,
    transactionSetError,
    transactionToggleFilterTab,
    transactionSetLoading,
    transactionUpdateFilterData,
} = transactionSlice.actions;
export default transactionSlice.reducer;