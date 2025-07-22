import { createSlice, PayloadAction } from "@reduxjs/toolkit"


const initialState = {
    isSidebarMinimize: false,
    isFloatingVisible: false,
}

const sidebarSlice = createSlice({
    initialState,
    name: "sidebar",
    reducers: {
        sidebarToggleSidebar: (state, action: PayloadAction<boolean>) => {
            state.isSidebarMinimize = action.payload;
        },
        sidebarToggleFloatingButton: (state, action: PayloadAction<boolean>) => {
            state.isFloatingVisible = action.payload;
        }
    }
})

export const {
    sidebarToggleFloatingButton,
    sidebarToggleSidebar,
} = sidebarSlice.actions;
export default sidebarSlice.reducer;