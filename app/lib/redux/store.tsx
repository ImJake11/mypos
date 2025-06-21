import { configureStore } from "@reduxjs/toolkit";
import newProductSlice from "./newProductSlice";
import toasSlice from "./toastSlice";
import processSlice from "./processSlice";
import inventorySlice from "./inventorySlice";
import appMiddlewareListner from "./listeners/applicationListener";


const store = configureStore({
    reducer: {
        newProductSlice,
        processSlice,
        toasSlice,
        inventorySlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(appMiddlewareListner.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;