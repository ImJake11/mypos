import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import ToasEnum from "../enum/toastEnum";
import ListenerPayload from "./utils/models/appListenerModel";

interface ToasProp {
    type: ToasEnum,
    message: string,
    payload?: any,
    context?: string,
}


const initialState = {
    type: ToasEnum.DEFAULT,
    message: "",
    isVisible: false,
    payload: null,
    context: "",
}


export const promptConfirmed = createAction<ListenerPayload>("prompt/confirmed");

const toasSlice = createSlice({
    initialState,
    name: "toas slice",
    reducers: {
        openToas: (state, action: PayloadAction<ToasProp>) => {

            const { message, type, context, payload, } = action.payload;

            if (context && payload) {
                state.context = context;
                state.payload = payload;
            }

            state.message = message;
            state.type = type;
            state.isVisible = true;
        },
        closeToas: () => initialState,
    }
});


export const { openToas, closeToas } = toasSlice.actions;
export default toasSlice.reducer;