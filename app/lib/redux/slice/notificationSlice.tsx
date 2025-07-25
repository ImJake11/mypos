import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { NotificationModel } from "../../models/notificationModel";
import { NotificationFilterType } from "../../enum/notificationType";

const initialState = {
    isHovered: false,
    isClickedATile: false,
    notifications: [] as NotificationModel[],
    isVisible: false,
    notificationCount: 0,
    isInitialPageDataLoad: false,
    isMaxDataReach: false,
    currentFilter: NotificationFilterType.TODAY,
    pageNotifications: [] as NotificationModel[],
}

const notificationSlice = createSlice({
    initialState,
    name: "notification_slice",
    reducers: {
        notificationHandleHover: (state, action: PayloadAction<boolean>) => {
            state.isHovered = action.payload;

            if (!action.payload) {
                state.isClickedATile = false;
            }
        },
        notificationHandleClickTile: (state, action: PayloadAction<boolean>) => {
            state.isClickedATile = action.payload;
        },
        notificationUpdateNotifications: (state, action: PayloadAction<NotificationModel[]>) => {
            state.notifications = state.notifications.concat(action.payload);
        },
        notificationDelete: (state, action: PayloadAction<string>) => {
            state.notifications = state.notifications.filter(notif => notif.id !== action.payload);
        },
        notificationAdd: (state, action: PayloadAction<NotificationModel>) => {

            const newData = action.payload;

            state.notifications.pop();

            state.notifications = [newData, ...state.notifications]
        },
        notificationChangeVisiblity: (state, action: PayloadAction<boolean>) => {
            state.isVisible = action.payload;
        },
        notificationToggleFilter: (state, aciton: PayloadAction<NotificationFilterType>) => {
            state.isMaxDataReach = false;
            state.pageNotifications = [];
            state.currentFilter = aciton.payload;

        },
        notificationSetPageNotifications: (state, action: PayloadAction<NotificationModel[]>) => {
            state.pageNotifications = action.payload;
        },
        notificationSetIsInitialPageLoad: (state, action: PayloadAction<boolean>) => {
            state.isInitialPageDataLoad = action.payload;
        },
        notificationSetIsMaxDataReach: (state, action: PayloadAction<boolean>) => {
            state.isMaxDataReach = action.payload;
        },
        notificationSetCount: (state, action: PayloadAction<number>) => {
            state.notificationCount = action.payload;
        }
    }
});

export const {
    notificationHandleClickTile,
    notificationSetIsInitialPageLoad,
    notificationHandleHover,
    notificationSetCount,
    notificationDelete,
    notificationSetIsMaxDataReach,
    notificationAdd,
    notificationSetPageNotifications,
    notificationUpdateNotifications,
    notificationChangeVisiblity,
    notificationToggleFilter,
} = notificationSlice.actions;
export default notificationSlice.reducer;