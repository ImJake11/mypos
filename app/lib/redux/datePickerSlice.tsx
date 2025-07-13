import { createSlice, PayloadAction } from "@reduxjs/toolkit"



const initialState = {
    isVisible: false,
    startingDate: "",
    endDate: "",
}

const datePickerSlice = createSlice({
    initialState,
    name: "date_picker_slice",
    reducers: {
        datePickerToggleVisibility: (state) => {
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


export const {datePickerToggleVisibility,datePickerUpdateDates} = datePickerSlice.actions;
export default datePickerSlice.reducer;