
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CartModel } from "../models/cartModel"
import { ProductProps } from "../models/productModel"
import { PaymentMethod } from "../enum/paymentMethod";


interface SliceProp {
    searchQuery: string,
    selectedCategoryID: string,
    cartItems: CartModel[],
    selectedProduct: ProductProps,
    isProductDetailsTabVisible: boolean,
    selectedVariantID: string,
    quantity: number,
    paymenMethod: PaymentMethod,
    referenceID: string,
    isCartVisible: boolean,
}

const initialState: SliceProp = {
    referenceID: "",
    paymenMethod: PaymentMethod.CASH,
    searchQuery: "",
    isCartVisible: false,
    selectedCategoryID: "", // --- category currently selected by user
    cartItems: [], // --- list of cart items
    selectedProduct: {
        discountEnabled: false,
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
        isFavorite: false
    },
    isProductDetailsTabVisible: false,
    selectedVariantID: "",
    quantity: 0,
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
        posSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload
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
        posSelectCategoryID: (state, action: PayloadAction<string>) => {
            state.selectedCategoryID = action.payload;
        },

    }
});


export const { posAddProductToCart,
    posSetReferenceID,
    posSelectProduct,
    posSelectVariant,
    posSearchQuery,
    posToggleCartTab,
    posCloseProductDetails,
    posTogglePaymentMethod,
    posUpdateSelectedvariantQuantity,
    posUpdateCartItemQuantity,
    posSelectCategoryID,
} = posSlice.actions;

export default posSlice.reducer;

