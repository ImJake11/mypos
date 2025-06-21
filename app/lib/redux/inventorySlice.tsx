import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { NewProductProps } from "../models/newProductModel"

interface Prop {
    productViewOpen: boolean,
    currentData: {},
}


const initialState: Prop = {
    productViewOpen: false,
    currentData: {

    },
}


const inventorySlice = createSlice({
    initialState,
    name: "inventory slice",
    reducers: {
        toggleProductView: (state, action: PayloadAction<NewProductProps | null>) => {
            if (action.payload) {
                state.currentData = action.payload;
                state.productViewOpen = true;
            } else {
                state.productViewOpen = false;
                state.currentData = {};
            }
        },
        resetInventoryState: ()=> initialState,
    }
});

export const { toggleProductView , resetInventoryState} = inventorySlice.actions;
export default inventorySlice.reducer;