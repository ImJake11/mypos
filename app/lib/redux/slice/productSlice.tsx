import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ProductProps, BulkTableProp, VariantsProps } from "../../models/productModel";
import { ProductKeys, VariantKeys } from "../../constants/ProductKeys";

// for main ui flag 
interface ProductSliceProp {
    data: ProductProps,
    isAutoComputeSellingPrice: boolean,
    isLoading: boolean,
    isError: boolean,
}

const initialState: ProductSliceProp = {
    isAutoComputeSellingPrice: false,
    data: {
        vatId: "",
        discountEnabled: false,
        id: undefined,
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
    isLoading: false,
    isError: false
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
        formToggleAutoComputeSellingPrice: (state) => {
            state.isAutoComputeSellingPrice = !state.isAutoComputeSellingPrice;
        },
        formSetProductData: (state, action: PayloadAction<ProductProps>) => {

            state.data = action.payload;
        },
        formResetProductState: () => initialState,
        formToggleLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        formToggleError: (state, action: PayloadAction<boolean>) => {
            state.isError = action.payload;
        }
    }
});

export const { formUpdateState,
    formAddBulkTier,
    formUpdateBulkTier,
    formDeleteBulkTire,
    formToggleAutoComputeSellingPrice,
    formUpdateVariants,
    formAddVariant,
    formResetProductState,
    formToggleError,
    formToggleLoading,
    formDeleteVariant,
    formSetProductData } = productSlice.actions;
export default productSlice.reducer;