import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ProductProps } from "../models/productModel"
import { FilterModel } from "../models/filterModel";
import ListenerPayload from "./utils/models/appListenerModel";

interface Prop {
    productViewOpen: boolean,
    selectedProductDataForView: {},
    isListView: boolean,
    filterData: FilterModel,
    isFilterTabVisible: boolean,
    isLoading: boolean,
    isError: boolean,
    isFiltering: boolean,
    rawProductData: ProductProps[], // initially fetched product from api
    filteredProductData: ProductProps[], // filtered products from api

}


const initialState: Prop = {
    isError: false,
    rawProductData: [],
    filteredProductData: [],
    isFiltering: false,
    isLoading: false,
    productViewOpen: false,
    selectedProductDataForView: {},
    isListView: false,
    isFilterTabVisible: false,
    filterData: {
        categoryID: undefined,
        name: undefined,
        maxPrice: undefined,
        minPrice: undefined,
        maxStock: undefined,
        minStock: undefined,
        withDiscount: false,
        withBulkPricing: false
    }
}


// listener middleware funcitons
export const confirmFilterData = createAction<ListenerPayload>("inventory/filterData");


const inventorySlice = createSlice({
    initialState,
    name: "inventory slice",
    reducers: {
        inventorySetErrorState: (state, action: PayloadAction<boolean>) => {
            state.isError = action.payload;
        },
        inventorySetLoadingState: (state) => {
            state.isLoading = !state.isLoading;
        },
        inventorySetRawData: (state, action: PayloadAction<ProductProps[]>) => {
            state.rawProductData = action.payload;
        },
        inventorySetFilteredData: (state, action: PayloadAction<ProductProps[]>) => {
            state.filteredProductData = action.payload;
            state.isFiltering = true;
        },
        inventoryClearFilteredData: (state) => {
            state.filteredProductData = []; // cleaer current filtered data
            state.isFiltering = false; // set to false
        },
        inventoryCategoryEvent: (state, action: PayloadAction<{ id: any, isFavorite: any }>) => { // handle category event from web socket

            const { id, isFavorite } = action.payload;

            console.log(id);

            state.rawProductData = state.rawProductData.map(prev => prev.id === id ? { ...prev, isFavorite } : prev);
        },
        inventoryToggleProductView: (state, action: PayloadAction<ProductProps | null>) => {
            if (action.payload) {
                state.selectedProductDataForView = action.payload;
                state.productViewOpen = true;
            } else {
                state.productViewOpen = false;
                state.selectedProductDataForView = {};
            }
        },
        inventoryToggleInventoryListView: state => {
            state.isListView = !state.isListView;
        },
        inventorySetFilterData: <K extends keyof FilterModel>(state: Prop, action: PayloadAction<{ name: K, data: FilterModel[K] }>) => {
            const { name, data } = action.payload;

            state.filterData[name] = data;
        },
        inventoryToggleFilterTab: (state, action: PayloadAction<boolean>) => {
            state.isFilterTabVisible = action.payload;
        },
        inventoryResetInventoryState: () => initialState,
    }
});

export const { inventoryToggleProductView,
    inventoryResetInventoryState,
    inventoryToggleFilterTab,
    inventoryToggleInventoryListView,
    inventoryClearFilteredData,
    inventorySetErrorState,
    inventoryCategoryEvent,
    inventorySetFilteredData,
    inventorySetLoadingState,
    inventorySetRawData,
    inventorySetFilterData } = inventorySlice.actions;
export default inventorySlice.reducer;