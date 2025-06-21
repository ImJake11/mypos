import { Payload } from "@/app/generated/prisma/runtime/library";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Prop {
    isOpen: boolean,
    currentValue: number,
    maxValue: number,
    message: string,
}


const initialState: Prop = {
    isOpen: false,
    currentValue: 0,
    maxValue: 100,
    message: ""
}


const processSlice = createSlice({
    initialState,
    name: "process slice",
    reducers: {
        toggleProcessDialog: (state) => {
            state.isOpen = !state.isOpen;
        },
        updaterPocessDialogMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
        },
        updateProcessDialogCurrentValue: (state, action: PayloadAction<number>) => {
            state.currentValue = action.payload;
        },
        resetProcessDialogState: () => initialState,
    }
});

export const { toggleProcessDialog, updaterPocessDialogMessage, updateProcessDialogCurrentValue, resetProcessDialogState} = processSlice.actions;
export default processSlice.reducer;