import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import toasSlice from "./toastSlice";
import processSlice from "./processSlice";
import inventorySlice from "./inventorySlice";
import appMiddlewareListner from "./listeners/applicationListener";
import sidebarSlice from "./sidebarSlice";
import posSlice from "./posSlice";

const store = configureStore({
    reducer: {
        productSlice,
        processSlice,
        toasSlice,
        inventorySlice,
        sidebarSlice,
        posSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(appMiddlewareListner.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;