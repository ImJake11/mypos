import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ProductProps } from "../../models/productModel"
import ListenerPayload from "../utils/models/appListenerModel";

interface Prop {
    isProductViewVisible: boolean,
    isListView: boolean,
    isLoading: boolean,
    isError: boolean,
    isFiltering: boolean,
    productViewID: string,
    rawProductData: ProductProps[], // initially fetched product from api
}


const initialState: Prop = {
    isError: false,
    productViewID: "",
    rawProductData: [],
    isFiltering: false,
    isLoading: false,
    isProductViewVisible: false,
    isListView: false,
}


const inventorySlice = createSlice({
    initialState,
    name: "inventory slice",
    reducers: {
        inventorySetErrorState: (state, action: PayloadAction<boolean>) => {
            state.isError = action.payload;
        },
        inventorySetLoadingState: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        inventorySetRawData: (state, action: PayloadAction<ProductProps[]>) => {
            state.rawProductData = action.payload;
        },
        inventoryToggleFiltering: (state, action: PayloadAction<boolean>) => {
            state.isFiltering = action.payload;
        },
        inventoryCategoryEvent: (state, action: PayloadAction<{ id: any, isFavorite: any }>) => { // handle category event from web socket

            const { id, isFavorite } = action.payload;

            console.log(id);

            state.rawProductData = state.rawProductData.map(prev => prev.id === id ? { ...prev, isFavorite } : prev);
        },
        inventoryToggleProductView: (state, action: PayloadAction<{
            isOpen: boolean,
            id: string,
        }>) => {
            const { id, isOpen } = action.payload;
            state.productViewID = id;
            state.isProductViewVisible = isOpen;
        },
        inventoryToggleInventoryListView: state => {
            state.isListView = !state.isListView;
        },
        inventoryResetInventoryState: () => initialState,
    }
});

export const createdActionInventoryFiltering = createAction<ListenerPayload>("inventory_filtering");
export const createdActionInventoryClearFilters = createAction<ListenerPayload>("inventory_clears_filter");

export const { inventoryToggleProductView,
    inventoryResetInventoryState,
    inventoryToggleInventoryListView,
    inventorySetErrorState,
    inventoryCategoryEvent,
    inventorySetLoadingState,
    inventorySetRawData,
    inventoryToggleFiltering,
} = inventorySlice.actions;
export default inventorySlice.reducer;