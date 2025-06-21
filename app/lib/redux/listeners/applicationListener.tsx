import { createListenerMiddleware, PayloadAction } from "@reduxjs/toolkit";
import {  promptConfirmed } from "../toastSlice";
import { updateVariants } from "../newProductSlice";
import { VariantsProps } from "../../models/newProductModel";
import ListenerPayload from "../utils/models/appListenerModel";
import { VariantActionModel } from "../utils/models/productRelatedModel";
import { ProductActionEnums } from "../utils/enums/productActionEnums";


const appMiddlewareListner = createListenerMiddleware();

appMiddlewareListner.startListening({

    effect: async (action: PayloadAction<ListenerPayload>, listenerApi) => {

        if (!action.payload) return;

        const { context, payload } = action.payload;

        // for updating variants
        if (context === ProductActionEnums.UPDATE_VARIANT) {

            const payLoadData = payload as VariantActionModel<keyof VariantsProps>;

            const { name, data, index } = payload;

            listenerApi.dispatch(updateVariants({
                name: name as keyof VariantsProps,
                data,
                index,
            }))
        }
    },
    actionCreator: promptConfirmed,

},

)


export default appMiddlewareListner;