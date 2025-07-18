import { createListenerMiddleware, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { promptConfirmed } from "../slice/toastSlice";
import { formUpdateState, formUpdateVariants } from "../slice/productSlice";
import { ProductProps, VariantsProps } from "../../models/productModel";
import ListenerPayload from "../utils/models/appListenerModel";
import { ProductActionEnums } from "../utils/enums/productActionEnums";
import { InventoryAction } from "../utils/enums/inventoryActionEnums";
import { middlewareInventoryClearFilter, middlewareInventoryFilter } from "../services/middlewareInventoryFilter";
import { AppDispatch } from "../store";
import { FilterModel } from "../../models/filterModel";
import { createdActionInventoryClearFilters, createdActionInventoryFiltering } from "../slice/inventorySlice";
import { createdActionPosClearFilter, createdActionPosFiltering } from "../slice/posSlice";
import { PosActionEnum } from "../utils/enums/posActionEnum";
import { middlewarePosClearFilters, middlewarePosFiltering } from "../services/middlewarePosFilter";
import { ProductKeys } from "../../constants/ProductKeys";
import { datePickerSave } from "../slice/datePickerSlice";
import { datePickerMiddleWareActions } from "../services/middlewareDatePickerActions";

const appMiddlewareListner = createListenerMiddleware();

appMiddlewareListner.startListening({

    effect: async (action: PayloadAction<ListenerPayload>, listenerApi) => {

        const { context, payload } = action.payload;

        if (typeof action.payload === undefined) return;

        ///--- PRODUCT MIDDLEWARES---///
        // for archving and archiving variants
        if (context === ProductActionEnums.UPDATE_VARIANT) {

            const { name, data, index } = payload;

            // update the variant through reducer
            listenerApi.dispatch(formUpdateVariants({
                name: name as keyof VariantsProps,
                data,
                index,
            }));

        }

        if (context === ProductActionEnums.CONFIRM_PRODUCT_DEACTIVATION) {

            listenerApi.dispatch(formUpdateState({
                data: payload.data,
                name: ProductKeys.isActive as keyof ProductProps,
            }))
        }


        /// --- INVENTORY MIDDLEWARES --- ////
        // inventory filtering
        if (context === InventoryAction.INVENTORY_FILTER_DATA) {
            middlewareInventoryFilter({
                dispatch: listenerApi.dispatch as AppDispatch,
                filterData: payload as FilterModel,
            });
        }

        // clear filter data and set to false all state listening to filer slice
        if (context === InventoryAction.INVENTORY_CLEAR_FILTER_DATA) {
            middlewareInventoryClearFilter({ dispatch: listenerApi.dispatch as AppDispatch });
        }

        /// --- POS MIDDLEWARES --- ///
        if (context === PosActionEnum.POS_FILTER_DATA) {
            middlewarePosFiltering({
                dispatch: listenerApi.dispatch as AppDispatch,
                filterData: payload as FilterModel,
            });
        }

        if (context === PosActionEnum.POST_CLEAR_FILTER_DATA) {
            middlewarePosClearFilters({
                dispatch: listenerApi.dispatch as AppDispatch,
            })
        }


        // date picker actions
        datePickerMiddleWareActions({
            context, payload, dispatch: listenerApi.dispatch as AppDispatch
        });
    },
    matcher: isAnyOf(
        promptConfirmed,
        createdActionInventoryFiltering,
        createdActionInventoryClearFilters,
        createdActionPosClearFilter,
        datePickerSave,
        createdActionPosFiltering,
    ),

},)


export default appMiddlewareListner;