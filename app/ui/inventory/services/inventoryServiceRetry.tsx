import ToasEnum from "@/app/lib/enum/toastEnum";
import { inventorySetErrorState, inventorySetLoadingState, inventorySetRawData } from "@/app/lib/redux/inventorySlice";
import { AppDispatch } from "@/app/lib/redux/store";
import { openToas } from "@/app/lib/redux/toastSlice";
import { fetchAllProducts } from "@/app/lib/utils/api/product/productFetching";



export async function inventoryServiceRetry(dispatch: AppDispatch) {

    try {
        dispatch(inventorySetLoadingState());
        dispatch(inventorySetErrorState(false));

        const res = await fetchAllProducts();

        dispatch(inventorySetRawData(res));

        setTimeout(() => {
            dispatch(inventorySetLoadingState());
        }, 1000);


    } catch (e) {
        dispatch(inventorySetLoadingState());
        dispatch(inventorySetErrorState(true));
        dispatch(openToas({
            message: "Something went wrong",
            type: ToasEnum.ERROR,
        }))
    } finally {
        dispatch(inventorySetLoadingState())
    }
}