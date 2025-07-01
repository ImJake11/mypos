import { createListenerMiddleware, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { promptConfirmed } from "../toastSlice";
import { updateVariants } from "../productSlice";
import { VariantsProps } from "../../models/productModel";
import ListenerPayload from "../utils/models/appListenerModel";
import { VariantActionModel } from "../utils/models/productRelatedModel";
import { ProductActionEnums } from "../utils/enums/productActionEnums";
import { confirmFilterData } from "../inventorySlice";
import { InventoryAction } from "../utils/enums/inventoryActionEnums";
import InventoryMiddleWareService from "../services/inventoryMiddlewareActions";
import { AppDispatch } from "../store";


const appMiddlewareListner = createListenerMiddleware();

appMiddlewareListner.startListening({

    effect: async (action: PayloadAction<ListenerPayload>, listenerApi) => {

        if (!action.payload) return;

        const { context, payload } = action.payload;

        // for updating variants
        if (context === ProductActionEnums.UPDATE_VARIANT) {

            const { name, data, index } = payload;

            // update the variant through reducer
            listenerApi.dispatch(updateVariants({
                name: name as keyof VariantsProps,
                data,
                index,
            }));

        } else if (context === InventoryAction.FILTERDATA) {


            const inventoryMiddlewareServices = new InventoryMiddleWareService({
                data: { context, payload },
                dispatch: listenerApi.dispatch as AppDispatch,
            });

            inventoryMiddlewareServices.handleDataFiltering();
            console.log("filtering starting");

        }
    },
    matcher: isAnyOf(promptConfirmed, confirmFilterData),

},)


export default appMiddlewareListner;