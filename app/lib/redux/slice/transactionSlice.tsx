import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransactionDetailsModel } from "../../models/transactionModel";
import { TransactionFilterModel } from "../../models/transactionFilterModel";
import { TransactionFilterKeys } from "../../constants/TransactionFilterKeys";

interface SliceProp {
    isLoading: boolean,
    isError: boolean,
    isFilterVisible: boolean,
    transactionsData: TransactionDetailsModel[],
    filterData: TransactionFilterModel,
    isFiltering: boolean,
    isPDFVisible: boolean,
    filteredData: TransactionDetailsModel[],
}

const initialState: SliceProp = {
    isLoading: true,
    isError: false,
    isPDFVisible: false,
    isFilterVisible: false,
    transactionsData: [],
    filterData: {},
    filteredData: [],
    isFiltering: false,
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
        trnasactionTogglePDF: (state) => {
            state.isPDFVisible = !state.isPDFVisible;
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

            if (name === TransactionFilterKeys.paymentOption && data === undefined) {
                state.filterData[TransactionFilterKeys.providedPayment] = undefined;
            }

            state.filterData[name] = data;

            if (state.filterData.exemptTran && state.filterData.zeroRatedTran && state.filterData.vatableTran) {
                state.filterData.mixedTran = true;
            }
        },
        transactionSetFilteredData: (state, action: PayloadAction<TransactionDetailsModel[]>) => {
            state.filteredData = action.payload;
        },
        transactionToggleIsFiltering: (state, action: PayloadAction<boolean>) => {
            state.isFiltering = action.payload;
        }
    }
});

export const {
    transactionSetData,
    transactionSetError,
    transactionToggleFilterTab,
    transactionSetFilteredData,
    trnasactionTogglePDF,
    transactionToggleIsFiltering,
    transactionSetLoading,
    transactionUpdateFilterData,
} = transactionSlice.actions;
export default transactionSlice.reducer;