import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ProductProps, BulkTableProp, PromotionalDiscountProp, VariantsProps } from "../models/productModel";
import { ProductKeys, VariantKeys } from "../constants/ProductKeys";
import { CategoryModel } from "../models/categoryModel";

// update bulk tire data prop
interface UpdateBulkTireProp {
    name: keyof BulkTableProp,
    value: number,
    index: number,
}


// for main ui flag 
interface ProductSliceProp {
    data: ProductProps,
    isDatePickerOpen: boolean,
    isAutoComputeSellingPrice: boolean,
    showCategoryTab: boolean,
    categoryUpdateData: CategoryModel,
    isForUpdate: boolean,

}

const initialState: ProductSliceProp = {
    showCategoryTab: false,
    isDatePickerOpen: false,
    isAutoComputeSellingPrice: false,
    isForUpdate: false,
    categoryUpdateData: {
        content: "",
        id: "",
        imageId: "",
        url: "",
    },
    data: {
        discountEnabled: false,
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




const productSlice = createSlice({
    initialState,
    name: "new-product-slice",
    reducers: {
        formUpdateState: <K extends keyof ProductProps>(state: ProductSliceProp, action: PayloadAction<{ name: K, data: ProductProps[K] }>) => {

            const { name, data } = action.payload;

            // validate keys that expected as number 
            const { costPrice, sellingPrice, lowStock, stock, tax } = ProductKeys;

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
        formUpdateBulkTier: <K extends keyof BulkTableProp>(state: ProductSliceProp, actions: PayloadAction<{ name: K, value: BulkTableProp[K], index: number }>) => {

            const { name, value, index } = actions.payload;

            if (typeof value != 'number') {
                throw new Error("Expected number but parameter is string");
            }

            if (state.data.bulkTier[index]) {
                state.data.bulkTier[index][name] = value;
            }
        },
        formUpdateVariants: <K extends keyof VariantsProps>(state: ProductSliceProp, action: PayloadAction<{ name: K, data: VariantsProps[K], index: number }>) => {

            const { name, data, index } = action.payload;

            const { stock, price } = VariantKeys;

            if (name === stock || name === price) {
                if (typeof data !== "number") {
                    throw new Error("Expected is number but parameter is string");
                }
            }

            // list
            const list = state.data.variants;

            list[index][name] = data;
        },
        formAddVariant: (state) => {

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
        formDeleteVariant: (state, action: PayloadAction<number>) => {
            state.data.variants.splice(action.payload, 1);
        },
        formAddBulkTier: (state) => {
            const newData: BulkTableProp = {
                quantity: 0,
                discount: 0
            };

            state.data.bulkTier.push(newData);
        },
        formDeleteBulkTire: (state, actions: PayloadAction<number>) => {

            state.data.bulkTier.splice(actions.payload, 1);
        },
        formToggleDatePicker: (state) => {
            state.isDatePickerOpen = !state.isDatePickerOpen;
        },
        formToggleAutoComputeSellingPrice: (state) => {
            state.isAutoComputeSellingPrice = !state.isAutoComputeSellingPrice;
        },

        formUpdatePromotionalDiscount: <K extends keyof PromotionalDiscountProp>(state: ProductSliceProp, action: PayloadAction<{ name: K, data: PromotionalDiscountProp[K] }>) => {

            const { name, data } = action.payload;

            if (name === "discountRate" && typeof data === "string") {
                throw Error("Gago naka string ka dapat number tong discount rate bobo")
            }

            state.data.promotionalDiscount[name] = data;
        },
        formToggleCategoryTab: (state, action: PayloadAction<CategoryModel | null>) => {

            if (action.payload) {

                const { content, id, url, imageId } = action.payload;

                state.categoryUpdateData = {
                    content, id, url, imageId
                }

                state.showCategoryTab = true;
                return;
            } else {
                state.categoryUpdateData = {
                    content: "",
                    id: "",
                    imageId: "",
                    url: ""
                }
                state.showCategoryTab = !state.showCategoryTab;
            }
        },
        // for updating the product, this will set the whole data therefore the page can see the data based on user wants to update
        formSetProductDataForUpdate: (state, action: PayloadAction<ProductProps>) => {
            const { promotionalDiscount } = action.payload;
            // we will check also if it has promotional discount because it is outside the [NewProductProp]

            state.data = action.payload;
            state.isForUpdate = true;
        },
        formResetProductState: () => initialState,
    }
});


export const { formUpdateState,
    formAddBulkTier,
    formUpdateBulkTier,
    formDeleteBulkTire,
    formToggleDatePicker,
    formToggleAutoComputeSellingPrice,
    formUpdateVariants,
    formAddVariant,
    formResetProductState,
    formDeleteVariant,
    formSetProductDataForUpdate,
    formToggleCategoryTab,
    formUpdatePromotionalDiscount } = productSlice.actions;
export default productSlice.reducer;