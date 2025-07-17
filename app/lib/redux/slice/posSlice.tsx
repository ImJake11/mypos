
import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CartModel } from "../../models/cartModel"
import { ProductProps } from "../../models/productModel"
import { PaymentMethod, PaymentProvider } from "../../enum/paymentMethod";
import ListenerPayload from "../utils/models/appListenerModel";


interface SliceProp {
    isLoading: boolean,
    isError: boolean,
    isFiltering: boolean,
    cartItems: CartModel[],
    selectedProduct: ProductProps,
    isProductDetailsTabVisible: boolean,
    selectedVariantID: string,
    quantity: number,
    paymenMethod: PaymentMethod,
    referenceID: string,
    isCartVisible: boolean,
    rawProductData: ProductProps[],
    paymentProvider: string,
    transactionIDLength: number,
}

const initialState: SliceProp = {
    referenceID: "", // if user paid via e wallet
    paymenMethod: PaymentMethod.CASH,
    isCartVisible: false,
    cartItems: [], // --- list of cart items
    selectedProduct: {
        vatId: "",
        name: "",
        description: null,
        categoryID: "",
        sellingPrice: 0,
        costPrice: 0,
        tax: 0,
        bulkEnabled: false,
        stock: 0,
        lowStock: 0,
        variants: [],
        coverImage: "",
        photoSnapshots: [],
        bulkTier: [],
        promotionalDiscount: {
            expirationDate: "",
            discountRate: 0,
            description: ""
        },
        highlights: "",
        isActive: false,
        isFavorite: false,
        discountEnabled: false
    },
    isProductDetailsTabVisible: false,
    selectedVariantID: "",
    quantity: 1,
    isLoading: true,
    isError: false,
    isFiltering: false,
    rawProductData: [],
    paymentProvider: "",
    transactionIDLength: 10,
}


const posSlice = createSlice({
    initialState,
    name: "pos slice",
    reducers: {
        posToggleCartTab: (state) => {
            state.isCartVisible = !state.isCartVisible;
        },
        posSetReferenceID: (state, action: PayloadAction<string>) => {
            state.referenceID = action.payload;
        },
        posTogglePaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
            state.paymenMethod = action.payload;
        },
        posTogglePaymentProvider: (state, action: PayloadAction<PaymentProvider>) => {
            state.paymentProvider = action.payload;
        },
        posSelectProduct: (state, action: PayloadAction<ProductProps>) => {
            state.selectedProduct = action.payload;
            state.isProductDetailsTabVisible = true;
        },
        posAddProductToCart: (state, action: PayloadAction<CartModel>) => {
            state.cartItems.push(action.payload);
            state.isProductDetailsTabVisible = false;
        },
        posCloseProductDetails: (state) => {
            state.quantity = 0;
            state.isProductDetailsTabVisible = false
            state.selectedVariantID = "";
        },
        posSelectVariant: (state, action: PayloadAction<string>) => {
            // if the passed payload is empty mean deselecting the variant;
            state.selectedVariantID = action.payload;
        },
        posUpdateSelectedvariantQuantity: (state, action: PayloadAction<{ isAddition?: boolean, quantity?: number }>) => {

            const { isAddition, quantity } = action.payload;

            // -- set selected variant quantity if quantity in payload is not null
            // it means user input only the quantity 
            if (quantity !== undefined) {
                state.quantity = quantity;
                return;
            }

            if (isAddition !== undefined) {
                if (isAddition) {
                    state.quantity++;
                } else {
                    if (state.quantity > 0) {
                        state.quantity--;
                    }
                }
            }
        },
        posUpdateCartItemQuantity: (state, action: PayloadAction<{
            isAddition: boolean,
            index: number,
        }>) => {

            const { index, isAddition } = action.payload;

            if (index === undefined) {
                console.log("Index not find");
                return;
            }

            const currentItem = state.cartItems[index];

            let newQuantity = currentItem.quantity;

            if (isAddition) {
                newQuantity = currentItem.quantity + 1;
            } else {
                newQuantity = currentItem.quantity - 1;
            }

            // re calculate item total 
            const newTotal = newQuantity * currentItem.variantUnitPrice;

            state.cartItems[index] = {
                ...currentItem,
                quantity: newQuantity,
                total: newTotal,
            }
        },
        posToggleFiltering: (state, action: PayloadAction<boolean>) => {
            state.isFiltering = action.payload;
        },
        posToggleErrorState: (state, action: PayloadAction<boolean>) => {
            state.isError = action.payload;
        },
        posToggleLoadingState: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        posSetRawProductData: (state, action: PayloadAction<ProductProps[]>) => {
            state.rawProductData = action.payload;
        },
        posRemoveVariant: (state, action: PayloadAction<{ variantID: string }>) => {

            const { variantID } = action.payload;

            const indexFromList = state.cartItems.findIndex(item => item.variantID === variantID);

            if (indexFromList !== -1) {
                state.cartItems.splice(indexFromList, 1);
            }
        },
        posSetCartItemsFromAPI: (state, action: PayloadAction<CartModel[]>) => {
            state.cartItems = action.payload;
        },
        posResetPosState: () => initialState,
    }
});

export const createdActionPosFiltering = createAction<ListenerPayload>("pos_filtering");
export const createdActionPosClearFilter = createAction<ListenerPayload>("pos_clear_filter");

export const { posAddProductToCart,
    posSetRawProductData,
    posSetReferenceID,
    posSelectProduct,
    posSelectVariant,
    posToggleCartTab,
    posCloseProductDetails,
    posToggleErrorState,
    posSetCartItemsFromAPI,
    posTogglePaymentProvider,
    posToggleFiltering,
    posToggleLoadingState,
    posTogglePaymentMethod,
    posRemoveVariant,
    posUpdateSelectedvariantQuantity,
    posResetPosState,
    posUpdateCartItemQuantity,
} = posSlice.actions;

export default posSlice.reducer;

