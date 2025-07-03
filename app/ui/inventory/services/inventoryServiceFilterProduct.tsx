import ToasEnum from "@/app/lib/enum/toastEnum";
import { FilterModel } from "@/app/lib/models/filterModel";
import { ProductProps } from "@/app/lib/models/productModel";
import { inventorySetLoadingState, inventorySetFilteredData, inventorySetErrorState, inventoryToggleFilterTab } from "@/app/lib/redux/inventorySlice";
import { AppDispatch } from "@/app/lib/redux/store";
import { openToas } from "@/app/lib/redux/toastSlice";
import { filterProduct } from "@/app/lib/utils/api/product/productFilter";


export async function inventoryServiceHandleFiltering(filterData: FilterModel, dispatch: AppDispatch) {

    try {
        // close filter tab
        dispatch(inventoryToggleFilterTab(false));

        // set state to loading 
        dispatch(inventorySetLoadingState());

        const result: ProductProps[] = await filterProduct(filterData);

        dispatch(inventorySetFilteredData(result));

        dispatch(openToas({
            message: "Filtered data successfully",
            type: ToasEnum.SUCCESS,
        }));

    } catch (e) {
        dispatch(inventorySetErrorState(true));
        dispatch(openToas({
            message: "Fetching api failed",
            type: ToasEnum.ERROR,
        }));

        dispatch(inventorySetLoadingState());
    } finally {
        dispatch(inventorySetLoadingState());
    }


}