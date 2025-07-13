import ToasEnum from "../../enum/toastEnum";
import { FilterModel } from "../../models/filterModel";
import { filterProduct } from "../../utils/data/fetchFilteredProduct";
import { filterResetData, filterSetFilteredData, filterToggleFilterTab } from "../filterSlice";
import { posToggleFiltering, posToggleLoadingState } from "../posSlice";
import { AppDispatch } from "../store";
import { openToas } from "../toastSlice";



export async function middlewarePosFiltering({
    dispatch, filterData,
}:
    { dispatch: AppDispatch, filterData: FilterModel }
) {

    try {
        dispatch(filterToggleFilterTab(false));
        // -- display loading state
        dispatch(posToggleLoadingState(true));

        // -- fetch product
        const result = await filterProduct(filterData);
        // -- pass data to redux state
        dispatch(filterSetFilteredData(result));

        // -- set pos in filtering mode
        dispatch(posToggleFiltering(true));

        // -- success mmessage
        dispatch(openToas({
            message: "Succesfully Filtered the products",
            type: ToasEnum.SUCCESS,
        }))

    } catch (e) {
        // -- dispalay toas message
        dispatch(openToas({
            message: "Product filtering failed",
            type: ToasEnum.ERROR,
        }));

        throw new Error("Failed to fetched product");

    } finally {
        dispatch(posToggleLoadingState(false));
    }
}


export async function middlewarePosClearFilters({
    dispatch,
}:
    {
        dispatch: AppDispatch
    }) {
    // -- close filter tab
    dispatch(filterToggleFilterTab(false));
    // -- display loading state
    dispatch(posToggleLoadingState(true));
    // -- clear filter data
    dispatch(filterResetData())
    // -- set pos to original list mode
    dispatch(posToggleFiltering(false));
    // -- hide loading state

    setTimeout(() => {
        dispatch(posToggleLoadingState(false));
    }, 800);
}