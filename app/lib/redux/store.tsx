import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slice/productSlice";
import toasSlice from "./slice/toastSlice";
import processSlice from "./slice/processSlice";
import inventorySlice from "./slice/inventorySlice";
import appMiddlewareListner from "./listeners/applicationListener";
import sidebarSlice from "./slice/sidebarSlice";
import posSlice from "./slice/posSlice";
import filterSlice from "./slice/filterSlice";
import transaction from "./slice/transactionSlice";
import datePickerSlice from "./slice/datePickerSlice";

const store = configureStore({
    reducer: {
        productSlice,
        datePickerSlice,
        filterSlice,
        processSlice,
        toasSlice,
        inventorySlice,
        sidebarSlice,
        posSlice,
        transaction,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(appMiddlewareListner.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;