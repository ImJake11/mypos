import { CartCacheModel } from "@/app/lib/models/cartModel";
import { useEffect } from "react";

/**
 * Custom hook that automatically saves the cart cache data to the backend
 * after a short debounce delay (1 second). This prevents excessive API calls
 * when the cart data is updated rapidly (e.g., during user interactions).
 *
 * @param cartCacheData - An array of cart items to be cached
 */
export const cartCacheSave = async (
    cartCacheData: CartCacheModel,
) => {
    try {
        
        const res = await fetch("/api/cart_cache/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ cartCacheData })
        });

        if (!res.ok) {
            throw new Error("Failed to save cart draft");
        }

        console.log("Successfully saved draft");

    } catch (e) {
        console.log("Saving draft error")
        throw new Error("Failed to save cache");
    }
};