import ToasEnum from "../../enum/toastEnum";
import { FilterModel } from "../../models/filterModel";
import { filterProduct } from "../../utils/api/product/productFilter";
import { filterSetFilteredData, filterToggleFilterTab } from "../filterSlice";
import { inventorySetLoadingState, inventoryToggleFiltering } from "../inventorySlice";
import { AppDispatch } from "../store";
import { openToas } from "../toastSlice";



export async function middlewareInventoryFilter(
    {
        dispatch, filterData,
    }
        : {
            dispatch: AppDispatch, filterData: FilterModel
        }) {

    try {
        // --display loading state
        dispatch(inventorySetLoadingState());

        // --  hide the filter tab
        dispatch(filterToggleFilterTab(false));

        // -- fetch filtered product
        const res = await filterProduct(filterData);

        // -- set filtered data to redux state
        dispatch(filterSetFilteredData(res));

        // -- set inventory state to filtering
        dispatch(inventoryToggleFiltering(true));

        // -- dispplay notification message
        dispatch(openToas({
            message: "Successfully fetched filtered product",
            type: ToasEnum.SUCCESS,
        }));
    } catch (e) {
        dispatch(openToas({
            message: "Failed to filter data",
            type: ToasEnum.ERROR,
        }))
        throw new Error("Filtering data failed");
    } finally {
        dispatch(inventorySetLoadingState());
    }

}

export function middlewareInventoryClearFilter({dispatch}:{
    dispatch: AppDispatch
}) {
    // -- display loading state
    dispatch(inventorySetLoadingState());

    dispatch(inventoryToggleFiltering(false));

    setTimeout(()=> {
        dispatch(inventorySetLoadingState());
    },800);
}