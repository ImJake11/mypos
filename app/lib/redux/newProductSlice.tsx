import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { NewProductProps, BulkTableProp, PromotionalDiscountProp, VariantsProps } from "../models/newProductModel";
import { NewProductKeys, VariantKeys } from "../constants/NewProductKeys";
import { CategoryModel } from "../models/categoryModel";

// update bulk tire data prop
interface UpdateBulkTireProp {
    name: keyof BulkTableProp,
    value: number,
    index: number,
}

// for updating category
interface UpdateCategoryProp {
    id: string,
    content: string,
}

// for main ui flag 
interface SliceProp {
    data: NewProductProps,
    promotionalEnabled: boolean,
    isDatePickerOpen: boolean,
    isAutoComputeSellingPrice: boolean,
    showCategoryTab: boolean,
    updateCategory: UpdateCategoryProp,
    isForUpdate: boolean,

}

const initialState: SliceProp = {
    showCategoryTab: false,
    isDatePickerOpen: false,
    isAutoComputeSellingPrice: false,
    promotionalEnabled: false,
    isForUpdate: false,
    updateCategory: {
        content: "",
        id: "",
    },
    data: {
        id: "",
        isActive: true,
        isFavorite: false,
        highlights: "",
        promotionalDiscount: {
            description: "",
            expirationDate: "",
            discountRate: 0
        },
        name: "",
        description: null,
        categoryID: "",
        sellingPrice: 0,
        costPrice: 0,
        tax: 0,
        bulkEnabled: false,
        bulkTier: [] as BulkTableProp[],
        stock: 0,
        lowStock: 0,
        variants: [] as VariantsProps[],
        coverImage: "",
        photoSnapshots: [],
    },
}




const newProductSlice = createSlice({
    initialState,
    name: "new-product-slice",
    reducers: {
        updateNewProductState: <K extends keyof NewProductProps>(state: SliceProp, action: PayloadAction<{ name: K, data: NewProductProps[K] }>) => {

            const { name, data } = action.payload;

            console.log(state.data.id);

            // validate keys that expected as number 
            const { costPrice, sellingPrice, lowStock, stock, tax } = NewProductKeys;

            if (name === costPrice ||
                name === sellingPrice ||
                name === lowStock ||
                name === stock ||
                name === tax) {

                if (typeof data != "number") {
                    throw new Error("Gumamit ka ng string sa dapat ay number obob");
                }

            }


            const currentData = state.data;

            currentData[name] = data;

        },
        updateBulkTier: <K extends keyof BulkTableProp>(state: SliceProp, actions: PayloadAction<{ name: K, value: BulkTableProp[K], index: number }>) => {

            const { name, value, index } = actions.payload;

            if (typeof value != 'number') {
                throw new Error("Expected number but parameter is string");
            }

            if (state.data.bulkTier[index]) {
                state.data.bulkTier[index][name] = value;
            }
        },
        updateVariants: <K extends keyof VariantsProps>(state: SliceProp, action: PayloadAction<{ name: K, data: VariantsProps[K], index: number }>) => {

            const { name, data, index } = action.payload;

            const { stock, price } = VariantKeys;

            console.log(typeof data)

            if (name === stock || name === price) {
                if (typeof data !== "number") {
                    throw new Error("Expected is number but parameter is string");
                }
            } 

            // list
            const list = state.data.variants;

            list[index][name] = data;
        },
        addVariant: (state) => {

            const newData: VariantsProps = {
                isArchived: false,
                name: "",
                price: 0,
                isPositive: true,
                stock: 0,
                imageUrl: ""
            };

            state.data.variants.push(newData);
        },
        deleteVariant: (state, action: PayloadAction<number>) => {
            state.data.variants.splice(action.payload, 1);
        },
        addBulkTire: (state) => {
            const newData: BulkTableProp = {
                quantity: 0,
                discount: 0
            };

            state.data.bulkTier.push(newData);
        },
        deleteBulkTire: (state, actions: PayloadAction<number>) => {

            state.data.bulkTier.splice(actions.payload, 1);
        },
        toggleDatePicker: (state) => {
            state.isDatePickerOpen = !state.isDatePickerOpen;
        },
        togglePromotionalDiscount: (state) => {
            state.promotionalEnabled = !state.promotionalEnabled;
        },
        toggleAutoComputeSellingPrice: (state) => {
            state.isAutoComputeSellingPrice = !state.isAutoComputeSellingPrice;
        },

        updatePromotionalDiscount: <K extends keyof PromotionalDiscountProp>(state: SliceProp, action: PayloadAction<{ name: K, data: PromotionalDiscountProp[K] }>) => {

            const { name, data } = action.payload;

            if (name === "discountRate" && typeof data === "string") {
                throw Error("Gago naka string ka dapat number tong discount rate bobo")
            }

            state.data.promotionalDiscount[name] = data;
        },
        toggleCategoryTab: (state, action: PayloadAction<UpdateCategoryProp | undefined>) => {

            if (action.payload) {

                const { content, id } = action.payload;

                state.updateCategory = {
                    content, id,
                }

                state.showCategoryTab = true;
                return;
            } else {

                state.showCategoryTab = !state.showCategoryTab;
            }
        },

        // for updating the product, this will set the whole data therefore the page can see the data based on user wants to update
        setProductDataForUpdate: (state, action: PayloadAction<NewProductProps>) => {
            const { promotionalDiscount } = action.payload;
            // we will check also if it has promotional discount because it is outside the [NewProductProp]

            if (promotionalDiscount.id) {
                state.promotionalEnabled = true;
            }

            state.data = action.payload;
            state.isForUpdate = true;
        },
        resetNewProductState: () => initialState,
    }
});


export const { updateNewProductState,
    addBulkTire,
    updateBulkTier,
    deleteBulkTire,
    toggleDatePicker,
    togglePromotionalDiscount,
    toggleAutoComputeSellingPrice,
    updateVariants,
    addVariant,
    resetNewProductState,
    deleteVariant,
    setProductDataForUpdate,
    toggleCategoryTab,
    updatePromotionalDiscount } = newProductSlice.actions;
export default newProductSlice.reducer;