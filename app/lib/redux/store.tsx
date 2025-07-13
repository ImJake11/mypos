import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import toasSlice from "./toastSlice";
import processSlice from "./processSlice";
import inventorySlice from "./inventorySlice";
import appMiddlewareListner from "./listeners/applicationListener";
import sidebarSlice from "./sidebarSlice";
import posSlice from "./posSlice";
import filterSlice from "./filterSlice";
import transaction from "./transactionSlice";
import datePickerSlice from "./datePickerSlice";

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