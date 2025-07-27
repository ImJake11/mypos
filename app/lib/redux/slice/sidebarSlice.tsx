import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface SubrouteProp {
    route: string,
    name: string,
}

const initialState = {
    isVisible: false,
    isSidebarMinimize: false,
    isFloatingVisible: false,
    hasScreenOverlay: false,
    isButtonHover: false,
    hoveredButtonOptions: [] as SubrouteProp[] | undefined,
    subMenuYTranslation: 0,
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
        },
        sidebarToggleAllowScreenOverlay: (state, action: PayloadAction<boolean>) => {
            state.hasScreenOverlay = action.payload;
        },
        sidebarHandleHover: (state, action: PayloadAction<{
            routes?: SubrouteProp[],
            isHover: boolean,
            yValue: number,
        }>) => {
            if (!state.isSidebarMinimize) return;

            const { isHover, routes, yValue } = action.payload;
            state.isButtonHover = isHover;
            state.hoveredButtonOptions = routes;
            state.subMenuYTranslation = yValue;
        },
        sidebarOpen: (state, action: PayloadAction<boolean>) => {
            state.isVisible = action.payload;
        }
    }
})

export const {
    sidebarToggleFloatingButton,
    sidebarToggleAllowScreenOverlay,
    sidebarHandleHover,
    sidebarToggleSidebar,
    sidebarOpen,
} = sidebarSlice.actions;
export default sidebarSlice.reducer;