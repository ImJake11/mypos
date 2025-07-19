import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TransactionDetailsModel, TransactionItemModel } from "../../models/transactionModel"

interface SliceProp {
    isLoading: boolean,
    isError: boolean,
    transactionData?: TransactionDetailsModel,
    returnedItems: TransactionItemModel[],
}

const initialState: SliceProp = {
    isLoading: false,
    isError: false,
    returnedItems: []
}

const refundReducer = createSlice({
    initialState,
    name: "reducer slice",
    reducers: {
        refundToggleLoadingState: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        refundSetTransactionData: (state, action: PayloadAction<TransactionDetailsModel>) => {
            state.transactionData = action.payload;
        },
        refundToggleErrorState: (state, action: PayloadAction<boolean>) => {
            state.isError = action.payload;
        },
        refundReturnItem: (state, action: PayloadAction<TransactionItemModel>) => {

            const data = action.payload;

            const exist = state.returnedItems.some(item => item.id === data.id);

            state.returnedItems = exist ? state.returnedItems = state.returnedItems.filter(item => item.id !== data.id) :
                [...state.returnedItems, data];
        },
        refundUpdateQuantity: (state, action: PayloadAction<{
            id: string,
            index: number,
            payloadAction: "all" | "plus" | "minus",
        }>) => {

            const { id, payloadAction, index } = action.payload;

            const data = state.returnedItems.find(item => item.id === id);

            if (!data) return;

            const currentQuantity = state.returnedItems[index].quantity;

            if (payloadAction === "minus" && currentQuantity > 0) {
                state.returnedItems[index] = {
                    ...state.returnedItems[index],
                    quantity: currentQuantity - 1,
                }
            } else {

                const rawData = state.transactionData?.purchasedItems.find(item => item.id === id);

                if (payloadAction === "all") {
                    state.returnedItems[index] = rawData!;
                } else {

                    const maxQuantity = rawData?.quantity;

                    if (maxQuantity! <= currentQuantity) return;

                    state.returnedItems[index] = {
                        ...state.returnedItems[index],
                        quantity: currentQuantity + 1,
                    }
                }
            }


        }
    }
})

export const {
    refundSetTransactionData,
    refundToggleErrorState,
    refundToggleLoadingState,
    refundUpdateQuantity,
    refundReturnItem,
} = refundReducer.actions;
export default refundReducer.reducer;