import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface SubrouteProp {
    route: string,
    name: string,
}

const initialState = {
    isVisible: false,
    userData: {
        username: "",
        photoUrl: "",
    },
    isSidebarMinimize: false,
    activeParentRoute: "",
}

const sidebarSlice = createSlice({
    initialState,
    name: "sidebar",
    reducers: {
        sidebarToggleSidebar: (state, action: PayloadAction<boolean>) => {
            state.isSidebarMinimize = action.payload;
        },
        sidebarOpen: (state, action: PayloadAction<boolean>) => {
            state.isVisible = action.payload;
        },
        sidebarSetUserData: (state, action: PayloadAction<{
            username: string,
            photoUrl: string,
        }>) => {
            state.userData = action.payload;
        },
        sidebarSetActiveRoute: (state, action: PayloadAction<string>) => {
            state.activeParentRoute = action.payload;
        }
    }
})

export const {
    sidebarToggleSidebar,
    sidebarOpen,
    sidebarSetActiveRoute,
    sidebarSetUserData,
} = sidebarSlice.actions;
export default sidebarSlice.reducer;