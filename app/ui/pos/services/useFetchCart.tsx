import cartHelper from "@/app/ui/pos/components/cart/services/cartHelper";
import { useEffect } from "react";

import CartHelpers from "@/app/ui/pos/components/cart/services/cartHelper";
import ToasEnum from "@/app/lib/enum/toastEnum";
import { CartModel } from "@/app/lib/models/cartModel";
import { posSetCartItemsFromAPI } from "@/app/lib/redux/posSlice";
import store, { AppDispatch } from "@/app/lib/redux/store";
import { openToas } from "@/app/lib/redux/toastSlice";
import { useDispatch } from "react-redux";

/**
 * Custom hook that attempts to fetch a cached cart from the backend
 * if the current cart is empty. This is useful for restoring the user's
 * previous cart session (draft) on app load or page refresh.
 *
 * The hook uses a helper class (`CartHelpers`) to process and format
 * the fetched data, then dispatches the parsed items to the Redux store
 * using `posSetCartItemsFromAPI`.
 *
 * Toast notifications are shown to inform the user whether a cached draft
 * was successfully retrieved or not.
 *
 * Optional `onSuccess` and `onError` callbacks can be passed for additional
 * side effects or UI handling outside the hook.
 *
 * @param cartData - Current cart items from the Redux state
 * @param dispatch - Redux dispatch function
 * @param onError - Optional callback executed when no cached cart is found or fetch fails
 * @param onSuccess - Optional callback executed after successfully restoring cached cart
  **/

export const useFetchCart = ((
    { onError, onSuccess }
        : {
            onError?: () => void,
            onSuccess?: () => void,
        }
) => {

    const dispatch = useDispatch();

    const cartData = store.getState().posSlice.cartItems;

    useEffect(() => {

        const cartService = new CartHelpers({
            cartItems: cartData,
        })

        const handleCartCaching = async () => {

            try {
                const res = await fetch("/api/cart_cache", {
                    method: "GET",
                });

                if (!res.ok) {
                    throw new Error("Something wrong on getting cache data");
                }

                const { cachedData } = await res.json();

                const cachedCartItems = cartService.getCartItemsFromApi(cachedData);

                dispatch(posSetCartItemsFromAPI(cachedCartItems));

                if (onSuccess) onSuccess();

            } catch (e) {
                dispatch(openToas({
                    message: "No cached draft found for this user.",
                    type: ToasEnum.DEFAULT,
                }));

                if (onError) onError();

            }
        }

        handleCartCaching();

    }, []);

});
