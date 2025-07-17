import { TransactionFilterKeys } from "../../constants/TransactionFilterKeys";
import { datePickerToggleVisibility } from "../slice/datePickerSlice";
import { transactionUpdateFilterData } from "../slice/transactionSlice";
import { AppDispatch } from "../store";
import { TransactionActions } from "../utils/enums/transactionActions";



export function datePickerMiddleWareActions({
    context, dispatch, payload,
}: {
    context: string,
    payload: any,
    dispatch: AppDispatch,
}
) {

    if (!context) return;

    if (context === TransactionActions.SET_START_DATE) {
        dispatch(transactionUpdateFilterData({
            data: payload,
            name: TransactionFilterKeys.startDate,
        }))
    }

    if (context === TransactionActions.SET_END_DATE) {
        dispatch(transactionUpdateFilterData({
            data: payload,
            name: TransactionFilterKeys.endDate,
        }))
    }

    dispatch(datePickerToggleVisibility(null));
}