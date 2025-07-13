import { TransactionDetailsModel } from "@/app/lib/models/transactionModel";
import { posResetPosState } from "@/app/lib/redux/posSlice";
import { toggleProcessDialog, updateProcessDialogCurrentValue, updaterPocessDialogMessage } from "@/app/lib/redux/processSlice";
import { AppDispatch } from "@/app/lib/redux/store";
import { useDeleteCartCachedItems } from "./deleteCartCachedtems";
import { openToas } from "@/app/lib/redux/toastSlice";
import ToasEnum from "@/app/lib/enum/toastEnum";

export const saveTransaction = async ({
    dispatch,
    transactionData,
}: {
    dispatch: AppDispatch,
    transactionData: TransactionDetailsModel,
}) => {
    try {

        dispatch(toggleProcessDialog(true));
        dispatch(updaterPocessDialogMessage("Saving this transaction"));
        dispatch(updateProcessDialogCurrentValue(30));

        const res = await fetch("/api/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ transactionData }),
        });

        dispatch(updateProcessDialogCurrentValue(60));

        if (!res.ok) {
            dispatch(toggleProcessDialog(false));
            throw new Error("Failed to save transaction");
        }

        dispatch(updateProcessDialogCurrentValue(70));

        await useDeleteCartCachedItems();

        dispatch(updateProcessDialogCurrentValue(90))

        dispatch(posResetPosState());

        dispatch(updateProcessDialogCurrentValue(100));

        dispatch(openToas({
            message: "Transaction saved successfully.",
            type: ToasEnum.SUCCESS,
        }));

        
    } catch (e) {
        const err = "Failed to save transaction. Please try again.";

        dispatch(openToas({
            message: err,
            type: ToasEnum.ERROR,
        }));

        throw new Error(err)
    } finally {
        dispatch(toggleProcessDialog(false))
    }
}