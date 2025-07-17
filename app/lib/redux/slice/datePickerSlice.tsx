import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit"
import ListenerPayload from "../utils/models/appListenerModel";



const initialState = {
    isVisible: false,
    context: "", // for action when save button is clicked
    startingDate: "",
    endDate: "",
}

const datePickerSlice = createSlice({
    initialState,
    name: "date_picker_slice",
    reducers: {
        datePickerToggleVisibility: (state, action: PayloadAction<{
            context: string,
        } | null>) => {

            const payload = action.payload;

            if (payload) {
                state.context = payload.context;
            }
            
            state.isVisible = !state.isVisible;
        },
        datePickerUpdateDates: (state, action: PayloadAction<{ isStart: boolean, isoString: string }>) => {

            const { isStart, isoString } = action.payload;
            if (isStart) {
                state.startingDate = isoString;
            } else {
                state.endDate = isoString;
            }
        }
    }
});

export const datePickerSave = createAction<ListenerPayload>("date_picker_save");

export const { datePickerToggleVisibility, datePickerUpdateDates } = datePickerSlice.actions;
export default datePickerSlice.reducer;