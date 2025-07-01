
import ListenerPayload from "../utils/models/appListenerModel";
import { AppDispatch } from "../store";
import { FilterModel } from "../../models/filterModel";
import { resetProcessDialogState, toggleProcessDialog, updateProcessDialogCurrentValue, updaterPocessDialogMessage } from "../processSlice";
import { setProductListData, toggleFilterTab } from "../inventorySlice";
import { openToas } from "../toastSlice";
import ToasEnum from "../../enum/toastEnum";
import { NewProductProps } from "../../models/productModel";


export default class InventoryMiddleWareService {
    private data: ListenerPayload;
    private dispatch: AppDispatch;

    constructor({ dispatch, data }: { data: ListenerPayload, dispatch: AppDispatch }) {
        this.dispatch = dispatch;
        this.data = data;
    }

    private params = new URLSearchParams();



    public async handleDataFiltering() { // <--- Added async

        // 1. Initial UI Setup (before any network call)
        this.dispatch(resetProcessDialogState()); // Reset any prior state
        this.dispatch(toggleProcessDialog());     // <--- SHOW THE DIALOG NOW
        this.dispatch(updaterPocessDialogMessage("Filtering Products"));
        this.dispatch(updateProcessDialogCurrentValue(0)); // Start progress from 0

        // Clear params from previous calls, if any
        // This is important if this instance of InventoryMiddleWareService persists
        // between filter operations. Otherwise, params will accumulate.
        this.params = new URLSearchParams();


        const { context, payload } = this.data;
        const filterData: FilterModel = payload;

        const {
            maxPrice,
            maxStock,
            minPrice,
            minStock,
            withBulkPricing,
            withDiscount,
            categoryID,
            name,
        } = filterData;

        // Populate params (ensure correctness as discussed previously for numbers/booleans)
        if (name) this.params.append("name", name);
        if (categoryID) this.params.append("category_id", categoryID); // Corrected typo 'categori_id' to 'category_id'
        if (minPrice !== undefined && minPrice !== null) this.params.append("min_price", String(minPrice)); // Safer check for 0
        if (maxPrice !== undefined && maxPrice !== null) this.params.append("max_price", String(maxPrice));
        if (minStock !== undefined && minStock !== null) this.params.append("min_stock", String(minStock));
        if (maxStock !== undefined && maxStock !== null) this.params.append("max_stock", String(maxStock));

        // Booleans: Ensure these are correctly converted on the frontend
        // If `withBulkPricing` is a boolean (true/false) from `filterData`, this is fine.
        // If it was derived from `Boolean(searchParams.get("with_bulk"))` which is problematic,
        // ensure `FilterModel` holds actual booleans derived safely.
        this.params.append("with_bulk", String(withBulkPricing));
        this.params.append("with_discounts", String(withDiscount));


        this.dispatch(updateProcessDialogCurrentValue(25)); // Progress update after params are built

        const route = `/api/product/filter?${this.params.toString()}`;

        try {
            const res = await fetch(route, {
                method: "GET",
            });

            this.dispatch(updateProcessDialogCurrentValue(75)); // Progress update after fetch completes

            if (!res.ok) {
                // Network request failed or server returned non-2xx status
                const errorData = await res.json().catch(() => ({ message: "Unknown error" })); // Try parsing error message
                throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
            }

            const { products } = await res.json(); // Destructure data
            this.dispatch(setProductListData(products as NewProductProps[]));

            this.dispatch(updateProcessDialogCurrentValue(100)); // Final progress update

            // Success feedback
            this.dispatch(openToas({
                message: "Successfully filtered the products",
                type: ToasEnum.SUCCESS,
            }));

            // Close dialog immediately after success message, or slightly delayed if desired
            this.dispatch(toggleProcessDialog()); // Close the dialog

        } catch (error: any) {
            console.error("Filtering failed:", error);

            // Error feedback
            this.dispatch(openToas({
                message: error.message || "Failed to fetch filtered products",
                type: ToasEnum.ERROR,
            }));

            // Close dialog on error as well
            this.dispatch(toggleProcessDialog());

        } finally {
            // Any cleanup that should happen regardless of success or failure
            // If you had a loading spinner *outside* the dialog, you'd hide it here
        }
    }
}

