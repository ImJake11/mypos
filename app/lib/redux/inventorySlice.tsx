import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ProductProps } from "../models/productModel"
import { FilterModel } from "../models/filterModel";
import ListenerPayload from "./utils/models/appListenerModel";

interface Prop {
    productViewOpen: boolean,
    productsList: ProductProps[], // products that fetch from parent component that passed here for filtering 
    currentData: {},
    isListView: boolean,
    filterData: FilterModel,
    isFilterTabVisible: boolean,
}


const initialState: Prop = {
    productsList: [],
    productViewOpen: false,
    currentData: {},
    isListView: false,
    isFilterTabVisible: false,
    filterData: {
        categoryID: undefined,
        name: undefined,
        maxPrice: undefined,
        minPrice: undefined,
        maxStock: undefined,
        minStock: undefined,
        withDiscount: undefined,
        withBulkPricing: undefined
    }
}


export const confirmFilterData = createAction<ListenerPayload>("inventory/filterData");


const inventorySlice = createSlice({
    initialState,
    name: "inventory slice",
    reducers: {
        toggleProductView: (state, action: PayloadAction<ProductProps | null>) => {
            if (action.payload) {
                state.currentData = action.payload;
                state.productViewOpen = true;
            } else {
                state.productViewOpen = false;
                state.currentData = {};
            }
        },
        toggleInventoryListView: state => {
            state.isListView = !state.isListView;
        },
        setFilterData: <K extends keyof FilterModel>(state: Prop, action: PayloadAction<{ name: K, data: FilterModel[K] }>) => {
            const { name, data } = action.payload;

            state.filterData[name] = data;
        },
        toggleFilterTab: (state, action: PayloadAction<boolean>) => {
            state.isFilterTabVisible = action.payload;
        },
        setProductListData: (state, action: PayloadAction<ProductProps[]>) => {
            state.productsList = action.payload;

        },
        resetInventoryState: () => initialState,
    }
});

export const { toggleProductView,
    resetInventoryState,
    toggleFilterTab,
    toggleInventoryListView,
    setProductListData,
    setFilterData } = inventorySlice.actions;
export default inventorySlice.reducer;