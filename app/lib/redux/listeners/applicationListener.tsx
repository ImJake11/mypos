import { createListenerMiddleware, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { promptConfirmed } from "../toastSlice";
import { formUpdateVariants } from "../productSlice";
import { ProductProps, VariantsProps } from "../../models/productModel";
import ListenerPayload from "../utils/models/appListenerModel";
import { VariantActionModel } from "../utils/models/productRelatedModel";
import { ProductActionEnums } from "../utils/enums/productActionEnums";
import { confirmFilterData, inventorySetFilteredData } from "../inventorySlice";
import { InventoryAction } from "../utils/enums/inventoryActionEnums";
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
            listenerApi.dispatch(formUpdateVariants({
                name: name as keyof VariantsProps,
                data,
                index,
            }));

        } else if (context === InventoryAction.FILTERDATA) {
            listenerApi.dispatch(inventorySetFilteredData(payload as ProductProps[]));
        }
    },
    matcher: isAnyOf(promptConfirmed, confirmFilterData),

},)


export default appMiddlewareListner;