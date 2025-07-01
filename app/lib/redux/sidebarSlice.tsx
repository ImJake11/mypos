import { Payload } from "@/app/generated/prisma/runtime/library";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"



const initialState = {
    isSidebarMinimize: false,
}

const sidebarSlice = createSlice({
    initialState,
    name: "sidebar",
    reducers: {
        toggleSidebar: (state, action: PayloadAction<boolean>) => {
            state.isSidebarMinimize = action.payload;
        }
    }
})

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;