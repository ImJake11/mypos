import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FilterModel } from "../models/filterModel"
import { ProductProps } from "../models/productModel"
import { stat } from "fs";

interface SliceProp {
    filterData: FilterModel,
    filteredData: ProductProps[],
    isVisible: boolean,
}


const initialState: SliceProp = {
    filterData: {
        withBulkPricing: false,
        withDiscount: false,
    },
    isVisible: false,
    filteredData: [],
}

const filterSlice = createSlice({
    initialState,
    name: "filter_slice",
    reducers: {
        filterToggleFilterTab: (state, action: PayloadAction<boolean>) => {
            state.isVisible = action.payload;

        },
        filterSetFilteredData: (state, action: PayloadAction<ProductProps[]>) => {
            state.filteredData = action.payload;
        },
        filterUpdateData: <K extends keyof FilterModel>(state: SliceProp, action: PayloadAction<{ name: K, data: FilterModel[K] }>) => {
            const { name, data } = action.payload;

            state.filterData[name] = data;
        },
        filterWebSocketFavoriteEvent: (state, action: PayloadAction<{ isFavorite: boolean, id: string }>) => {
            
            const { id, isFavorite } = action.payload;

            console.log(id);
            
            state.filteredData = state.filteredData.map(prev => prev.id === id ? { ...prev, isFavorite: isFavorite } : prev);
        },
        filterResetData: () => initialState,
    }
});

export const { filterResetData,
    filterSetFilteredData,
    filterWebSocketFavoriteEvent,
    filterUpdateData,
    filterToggleFilterTab } = filterSlice.actions;
export default filterSlice.reducer;