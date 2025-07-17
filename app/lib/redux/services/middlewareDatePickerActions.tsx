import { TransactionFilterKeys } from "../../constants/TransactionFilterKeys";
import ToasEnum from "../../enum/toastEnum";
import { datePickerToggleVisibility } from "../slice/datePickerSlice";
import { openToas } from "../slice/toastSlice";
import { transactionUpdateFilterData } from "../slice/transactionSlice";
import store, { AppDispatch } from "../store";
import { TransactionActions } from "../utils/enums/transactionActions";



export function datePickerMiddleWareActions({
    context, dispatch, payload,
}: {
    context: string,
    payload: any,
    dispatch: AppDispatch,
}
) {

    const state = store.getState();

    const { endDate, startDate } = state.transaction.filterData;

    if (!context) return;

    if (context === TransactionActions.SET_START_DATE) {
        if (endDate) {
            const end = new Date(endDate);
            const start = new Date(payload);

            if (start >= end) {
                dispatch(openToas({
                    message: "Invalid date range",
                    type: ToasEnum.ERROR,
                }));
                return;
            }
        }

        dispatch(transactionUpdateFilterData({
            data: payload,
            name: TransactionFilterKeys.startDate,
        }))
    }

    if (context === TransactionActions.SET_END_DATE) {

        if (startDate) {
            const end = new Date(payload);
            const start = new Date(startDate);

            if (end <= start) {
                dispatch(openToas({
                    message: "Invalid date range",
                    type: ToasEnum.ERROR,
                }));
                return;
            }
        }

        dispatch(transactionUpdateFilterData({
            data: payload,
            name: TransactionFilterKeys.endDate,
        }))
    }

    dispatch(datePickerToggleVisibility(null));
}